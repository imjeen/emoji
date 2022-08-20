import React from 'react';
// import { saveAs } from "file-saver"
import { Link } from 'react-router-dom';

import Emoji from '@/components/CustomEmoji';
import { bases } from '@/components/CustomEmoji/Base';
import { eyes } from '@/components/CustomEmoji/Eyes';
import { mouths } from '@/components/CustomEmoji/Mouth';
import { accessoriesList } from '@/components/CustomEmoji/Accessories';
import { RandomButton, ResetButton } from '@/components/CustomEmoji/Buttons';
import FacialsList from '@/components/CustomEmoji/FacialsList';
import BasesList from '@/components/CustomEmoji/BasesList';
// import Modal from '../components/Emoji/Modal';

import ReactDOMServer from 'react-dom/server';

import styles from './styles.module.less';

function Index() {
  const [baseIndex, setBaseIndex] = React.useState(6);
  const [elsConfig, setElsConfig] = React.useState([
    {
      type: 'eyes',
      index: 5,
      x: 0,
      y: 0,
      r: 0,
    },
    {
      type: 'mouths',
      index: 12,
      x: 0,
      y: 0,
      r: 0,
    },
    {
      type: 'accessories',
      index: 4,
      x: 0,
      y: 0,
      r: 0,
    },
  ]);
  const [selectedTab, setSelectedTab] = React.useState<'eyesList' | 'mouthsList' | 'accessoriesList' | 'basesList'>(
    'basesList',
  );
  const canvasRef = React.useRef<any>(null);
  const [showModal, setShowModal] = React.useState(false);

  function triggerDownload(imageBlob: any, fileName: any) {
    // saveAs(imageBlob, fileName);
  }

  function onDownloadSVG() {
    const svgEmoji = ReactDOMServer.renderToStaticMarkup(
      <Emoji width={160} height={160} baseIndex={baseIndex} elsConfig={elsConfig} />,
    );
    const svgBlob = new Blob([svgEmoji], { type: 'image/svg+xml' });
    triggerDownload(svgBlob, 'emoji-maker-jamstack-studio.svg');
  }

  function onDownloadPNG() {
    const svgEmoji = ReactDOMServer.renderToStaticMarkup(
      <Emoji width={160} height={160} baseIndex={baseIndex} elsConfig={elsConfig} />,
    );
    const canvas = canvasRef;
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svg = new Blob([svgEmoji], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);

    img.onload = () => {
      ctx.save();
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      DOMURL.revokeObjectURL(url);
      canvasRef.current?.toBlob((imageBlob: any) => {
        triggerDownload(imageBlob, 'emoji-maker-jamstack-studio.png');
      });
    };
    img.src = url;
  }

  const lists = {
    eyesList: (
      <FacialsList
        {...{
          facials: eyes,
          facialName: 'eyes',
          facialsConfig: elsConfig,
          setFacialsConfig: setElsConfig,
        }}
      />
    ),
    mouthsList: (
      <FacialsList
        {...{
          facials: mouths,
          facialName: 'mouths',
          facialsConfig: elsConfig,
          setFacialsConfig: setElsConfig,
        }}
      />
    ),
    accessoriesList: (
      <FacialsList
        {...{
          facials: accessoriesList,
          facialName: 'accessories',
          facialsConfig: elsConfig,
          setFacialsConfig: setElsConfig,
        }}
      />
    ),
    basesList: (
      <BasesList
        {...{
          bases,
          baseIndex,
          setBaseIndex,
        }}
      />
    ),
  };

  return (
    <div className="bg-white">
      <main>
        {/* {showModal && <Modal {...{ onDownloadPNG, onDownloadSVG, setShowModal, canvasRef }} />} */}

        <div className={styles.box}>
          <aside>
            <div></div>
            <h1>
              <Link to="/">Emoji Maker</Link>
            </h1>
            <button onClick={() => setShowModal(true)}>Export</button>
          </aside>
          <div className={styles.emojiWraper}>
            <Emoji width={160} height={160} className={styles.emoji} baseIndex={baseIndex} elsConfig={elsConfig} />
          </div>

          <div className={styles.group}>
            <ul>{lists[selectedTab]}</ul>
          </div>
          <div className={styles.action}>
            <ul>
              <li onClick={() => setSelectedTab('basesList')}>
                <svg viewBox="0 0 36 36">{bases[6]}</svg>
              </li>
              <li onClick={() => setSelectedTab('eyesList')}>
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
                    className={`fill-current text-gray-400`}
                  />
                  {eyes[5]}
                </svg>
              </li>
              <li onClick={() => setSelectedTab('mouthsList')}>
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
                    className={`fill-current text-gray-400`}
                  />
                  {mouths[12]}
                </svg>
              </li>
              <li onClick={() => setSelectedTab('accessoriesList')}>
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
                    className={`fill-current text-gray-400`}
                  />
                  {accessoriesList[4]}
                </svg>
              </li>
              <li>
                <RandomButton
                  {...{
                    setBaseIndex,
                    setElsConfig,
                    basesLength: bases.length,
                    eyesLength: eyes.length,
                    mouthsLength: mouths.length,
                    accessoriesLength: accessoriesList.length,
                  }}
                />
              </li>
              <li>
                <ResetButton
                  {...{
                    setBaseIndex,
                    setElsConfig,
                  }}
                />
              </li>
            </ul>
          </div>
        </div>

        <h2>⚡ Design Custom Emojis for Free Using the Emoji Maker - Free</h2>
      </main>
    </div>
  );
}

export default Index;
