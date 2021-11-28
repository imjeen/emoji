import React, { useState } from 'react';

import Clipboard from 'react-clipboard.js';

import styles from './styles.module.less';

export default function CopyButton({ text, children }: { text: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleSuccess = () => {
    setCopied(true);
  };

  return (
    <>
      <Clipboard
        data-copy={copied}
        className={styles.clipboard}
        data-clipboard-text={text}
        title={text}
        onSuccess={handleSuccess}
      >
        {children || null}
      </Clipboard>
    </>
  );
}
