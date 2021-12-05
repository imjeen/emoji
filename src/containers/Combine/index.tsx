import React, { useState, useEffect, useCallback, useRef } from 'react';

import ScrollSnap, { TypeRefScrollSnap } from '@/components/ScrollSnap';
import CopyButton from '@/components/CopyButton';
import styles from './styles.module.less';

import emojis, { getCombineData } from './emojis';

import { downloadFile, sleep } from '@/utils';

import { ReactComponent as ShuffleSVG } from '@/assets/svg/shuffle_on.svg';
import { ReactComponent as DownloadSVG } from '@/assets/svg/file_download.svg';
import { ReactComponent as ShareSVG } from '@/assets/svg/ios_share.svg';

/**
 *  组合 emoji
 *
 * @export
 * @return {*}
 */
export default function Combine() {
  const [state, setState] = useState<{ left?: typeof emojis[0]; right?: typeof emojis[0]; from: number; to: number }>({
    left: undefined,
    right: undefined,
    from: -1,
    to: -1,
  });
  const [result, setResult] = useState({ url: '', name: '' });

  const leftRef = useRef<TypeRefScrollSnap>(null),
    rightRef = useRef<TypeRefScrollSnap>(null);

  const cacheRef = useRef({ odd: true, loading: false, manual: true });

  const onAllRandom = useCallback(async () => {
    if (cacheRef.current.loading) return;

    cacheRef.current.loading = true;
    cacheRef.current.odd = !cacheRef.current.odd;

    await Promise.all([
      cacheRef.current.odd
        ? //
          leftRef.current?.random()
        : rightRef.current?.random(),
    ]);
    await sleep(300);
    cacheRef.current.loading = false;
  }, []);

  useEffect(() => {
    const digest = async () => {
      const { left, right, to } = state;

      if (!(left && right)) return;

      if (left.matches.includes(to) === false) {
        console.warn(`Not Matched!!!`);
        setResult(pre => ({ ...pre, url: '', name: '' }));
        if (cacheRef.current.manual) {
          await onAllRandom();
        }
        return;
      }
      cacheRef.current.manual = false;
      cacheRef.current.loading = false;
      // console.log(`Matched!!!`);
      const { url, name } = getCombineData(left, right);
      setResult(pre => ({ ...pre, url, name }));
    };
    digest();
  }, [onAllRandom, state]);

  const handleDownload = async () => {
    try {
      const { url, name } = result;
      if (!url) {
        console.log(`url Not Found!`);
        return;
      }
      await downloadFile(url, name);
    } catch (error) {}
  };

  const handleRandom = async () => {
    cacheRef.current.manual = true;
    setResult(pre => ({ ...pre, url: '', name: '' }));
    await onAllRandom();
    // cacheRef.current.manual = false;
  };

  return (
    <>
      <h2 className={styles.title}> Combine emoji to create new ones </h2>
      <ResultFigure src={result.url} matching={cacheRef.current.loading} />

      <menu className={styles.menu}>
        <CopyButton text={result.url}>
          <ShareSVG className={styles.icon} />
        </CopyButton>
        {/* 非触摸屏 */}
        {navigator.maxTouchPoints === 0 && <DownloadSVG className={styles.icon} onClick={handleDownload} />}
        <ShuffleSVG className={styles.icon} onClick={handleRandom} />
      </menu>

      <nav className={styles.sliderGroup}>
        <ScrollSnap
          ref={leftRef}
          list={emojis}
          onChange={(left, from) => setState(preState => ({ ...preState, left, from }))}
        />
        <span className={styles.misc}>+</span>
        <ScrollSnap
          ref={rightRef}
          list={emojis}
          onChange={(right, to) => setState(preState => ({ ...preState, right, to }))}
        />
      </nav>
    </>
  );
}

// 结果图片组件
function ResultFigure({
  src,
  name = '',
  matching,
  onLoad,
  onError,
}: {
  src: string;
  name?: string;
  matching?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const handleError = () => {
    if (!navigator.onLine) return; // offline

    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };
  return src ? (
    <figure className={styles.figure}>
      <img src={src} alt={name} width={'100%'} onError={handleError} onLoad={handleLoad} />
    </figure>
  ) : (
    <figure className={styles.figure404}>
      <img src={'./sad.svg'} alt={name} width={'30%'} />
      <figcaption>{matching ? 'Matching...' : 'Not Matched'}</figcaption>
    </figure>
  );
}
