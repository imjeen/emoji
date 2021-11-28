import React, { useState, useEffect, useRef } from 'react';

import ScrollSnap, { TypeRefScrollSnap } from '@/components/ScrollSnap';
import CopyButton from '@/components/CopyButton';
import styles from './styles.module.less';

import emojis, { getCombineData } from './emojis';

import { downloadFile } from '@/utils';

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
  const [state, setState] = useState({ left: undefined, right: undefined });
  const [result, setResult] = useState({ url: '', name: '' });

  const leftRef = useRef<TypeRefScrollSnap>(null),
    rightRef = useRef<TypeRefScrollSnap>(null);

  const onAllRandom = () => {
    leftRef.current?.random();
    rightRef.current?.random();
  };

  useEffect(() => {
    const { left: leftEmoji, right: rightEmoji } = state;

    if (!leftEmoji || !rightEmoji) return;

    const { url, name } = getCombineData(leftEmoji, rightEmoji);
    setResult(pre => ({ ...pre, url, name }));
  }, [state]);

  const handleDownload = async () => {
    try {
      const { url, name } = result;
      await downloadFile(url, name);
    } catch (error) {}
  };

  return (
    <>
      <h2 className={styles.title}> Combine emoji to create new ones </h2>
      <ResultFigure src={result.url} onError={onAllRandom} />
      <nav className={styles.sliderGroup}>
        <ScrollSnap
          ref={leftRef}
          list={emojis}
          onChange={({ emoji: left }) => setState(preState => ({ ...preState, left }))}
        />
        <span className={styles.misc}>+</span>
        <ScrollSnap
          ref={rightRef}
          list={emojis}
          onChange={({ emoji: right }) => setState(preState => ({ ...preState, right }))}
        />
      </nav>

      <menu className={styles.menu}>
        <CopyButton text={result.url}>
          <ShareSVG className={styles.icon} />
        </CopyButton>
        {/* 非触摸屏 */}
        {navigator.maxTouchPoints === 0 && <DownloadSVG className={styles.icon} onClick={handleDownload} />}
        <ShuffleSVG className={styles.icon} onClick={onAllRandom} />
      </menu>
    </>
  );
}

// 结果图片组件
function ResultFigure({
  src,
  name = '',
  onLoad,
  onError,
}: {
  src: string;
  name?: string;
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
  return (
    <figure className={styles.figure}>
      {src && (
        <img
          src={src}
          alt={name}
          width={'100%'}
          onContextMenu={e => e.preventDefault()}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </figure>
  );
}
