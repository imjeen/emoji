import React, { useState, useEffect } from 'react';

import ScrollSnap from '@/components/ScrollSnap';
import CopyButton from '@/components/CopyButton';
import styles from './styles.module.less';

import emojis, { getCombineData, getRandomIndex } from './emojis';

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
  const [randomIndex, setRandomIndex] = useState(getRandomIndex());
  const [result, setResult] = useState({ url: '', name: '' });

  const handleRandom = () => setRandomIndex(() => getRandomIndex());

  useEffect(() => {
    const [from, to] = randomIndex;
    const left = emojis[from],
      right = emojis[to];

    if (left.matches.includes(to) === false) {
      console.warn(`not matched by hand!`);
      setResult(pre => ({ ...pre, url: '', name: '' }));
      return;
    }

    const { url, name } = getCombineData(left, right);
    setResult(pre => ({ ...pre, url, name }));
    return () => {};
  }, [randomIndex]);

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

  return (
    <>
      <h2 className={styles.title}> Combine emoji to create new ones </h2>
      <ResultFigure src={result.url} onClick={handleRandom} />

      <menu className={styles.menu} style={{ display: 'none' }}>
        <CopyButton text={result.url}>
          <ShareSVG className={styles.icon} />
        </CopyButton>
        {/* 非触摸屏 */}
        {navigator.maxTouchPoints === 0 && <DownloadSVG className={styles.icon} onClick={handleDownload} />}
        <ShuffleSVG className={styles.icon} onClick={handleRandom} />
      </menu>

      <nav className={styles.sliderGroup}>
        <ScrollSnap list={emojis} index={randomIndex[0]} onChange={from => setRandomIndex(([_, to]) => [from, to])} />
        <span className={styles.misc}>+</span>
        <ScrollSnap list={emojis} index={randomIndex[1]} onChange={to => setRandomIndex(([from, _]) => [from, to])} />
      </nav>
    </>
  );
}

// 结果图片组件
function ResultFigure({
  src,
  name = '',
  onClick,
  matching,
  onLoad,
  onError,
}: {
  src: string;
  name?: string;
  matching?: boolean;
  onClick?: () => void;
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
    <figure className={styles.figure} onClick={onClick}>
      <img src={src} alt={name} width={'100%'} onError={handleError} onLoad={handleLoad} />
    </figure>
  ) : (
    <figure className={styles.figure404} onClick={onClick}>
      <img src={'./sad.svg'} alt={name} width={'30%'} />
      <figcaption>{matching ? 'Matching...' : 'Not Matched'}</figcaption>
    </figure>
  );
}
