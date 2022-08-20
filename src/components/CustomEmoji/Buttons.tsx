import React from 'react';

export function RandomButton({
  setBaseIndex,
  setElsConfig,
  basesLength,
  eyesLength,
  mouthsLength,
  accessoriesLength,
}: {
  setBaseIndex: any;
  setElsConfig: any;
  basesLength: any;
  eyesLength: any;
  mouthsLength: any;
  accessoriesLength: any;
}) {
  function setRandom(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setElsConfig([
      {
        type: 'eyes',
        index: Math.floor(Math.random() * eyesLength),
        x: 0,
        y: 0,
        r: 0,
      },
      {
        type: 'mouths',
        index: Math.floor(Math.random() * mouthsLength),
        x: 0,
        y: 0,
        r: 0,
      },
      {
        type: 'accessories',
        index: Math.floor(Math.random() * accessoriesLength),
        x: 0,
        y: 0,
        r: 0,
      },
    ]);
    setBaseIndex(Math.floor(Math.random() * basesLength));
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full flex inline-flex items-center md:w-16 md:h-16 sm:w-12 sm:h-12 w-8 h-8"
      onClick={setRandom}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full p-2"
      >
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    </button>
  );
}

export function ResetButton({ setBaseIndex, setElsConfig }: { setBaseIndex: any; setElsConfig: any }) {
  function setReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setBaseIndex(6);
    setElsConfig([]);
  }
  return (
    <button onClick={setReset}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
      </svg>
    </button>
  );
}
