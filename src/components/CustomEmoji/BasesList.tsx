import React from 'react';

function BasesList({ bases, setBaseIndex }: { bases: JSX.Element[]; setBaseIndex: (baseIndex: number) => void }) {
  return (
    <>
      {bases.map((base, key) => (
        <li key={key}>
          <svg viewBox="0 0 36 36" key={key} onClick={() => setBaseIndex(key)}>
            {base}
          </svg>
        </li>
      ))}
    </>
  );
}

export default BasesList;
