import React from 'react';

function FacialsList({
  facials,
  facialName,
  facialsConfig,
  setFacialsConfig,
}: {
  facials: any[];
  facialName: any;
  facialsConfig: any[];
  setFacialsConfig: any;
}) {
  return (
    <>
      {/* <li >
				<svg
					className='sm:w-12 sm:h-12 w-8 h-8'
					viewBox='0 0 36 36'
					onClick={() =>
						setFacialsConfig(
							facialsConfig.filter(({ type }) => type !== facialName)
						)
					}
				>
					<path
						d='M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z'
						className={`fill-current ${
							facialsConfig.find(el => el.type === facialName) === undefined
								? `text-gray-500`
								: `text-gray-400`
						}`}
					/>
				</svg>
			</li> */}
      {facials.map((facial, key) => (
        <li key={key}>
          <svg
            viewBox="0 0 36 36"
            onClick={() => {
              if (facialsConfig.find(el => el.type === facialName && el.index === key) !== undefined) {
                setFacialsConfig(facialsConfig.filter(el => el.type !== facialName || el.index !== key));
              } else {
                setFacialsConfig([
                  ...facialsConfig,
                  {
                    type: facialName,
                    index: key,
                    x: 0,
                    y: 0,
                    r: 0,
                  },
                ]);
              }
            }}
          >
            <path
              d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
              className={`fill-current ${
                facialsConfig.find(el => el.type === facialName && el.index === key) !== undefined
                  ? `text-gray-500`
                  : `text-gray-400`
              }`}
            />
            {facial}
          </svg>
        </li>
      ))}
    </>
  );
}

export default FacialsList;
