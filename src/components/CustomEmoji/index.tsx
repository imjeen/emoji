import React from 'react';

import Base from './Base';
import Mouth from './Mouth';
import Eyes from './Eyes';
import Accessories from './Accessories';

function Emoji({ baseIndex, elsConfig, ...props }: { [x: string]: any; baseIndex: any; elsConfig: any[] }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height={48} width={48} {...props}>
      <Base name="smiley" index={baseIndex} />
      {elsConfig.map((el, key) => {
        if (el.type === 'eyes') return <Eyes key={key} index={el.index} />;
        if (el.type === 'mouths') return <Mouth key={key} index={el.index} />;
        if (el.type === 'accessories') return <Accessories key={key} index={el.index} />;
      })}
    </svg>
  );
}

export default Emoji;
