import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const merchQuery = graphql`
  query {
    merch1: file(relativePath: { eq: "merch-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch2: file(relativePath: { eq: "merch-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch3: file(relativePath: { eq: "merch-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch4: file(relativePath: { eq: "merch-4.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch5: file(relativePath: { eq: "merch-5.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch6: file(relativePath: { eq: "merch-6.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

function Modal({
  onDownloadPNG,
  onDownloadSVG,
  setShowModal,
  canvasRef,
}: {
  onDownloadPNG: any;
  onDownloadSVG: any;
  setShowModal: any;
  canvasRef: any;
}) {
  const { merch1, merch2, merch3, merch4, merch5, merch6 } = useStaticQuery(merchQuery);

  return (
    <div
      className="fixed pin z-50 overflow-auto flex justify-center items-center h-screen w-screen"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div className="w-11/12 h-1/2 bg-white md:px-12 px-4 py-8 rounded-lg">
        <canvas ref={canvasRef} className="hidden" width="320" height="320"></canvas>
        <button className="float-right -mt-4" onClick={() => setShowModal(false)}>
          <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </button>
        <h2 className="font-bold text-lg mb-2">
          Amazing work{' '}
          <span role="img" aria-label="party">
            🎉
          </span>
          !
        </h2>
        <p>A PNG image is best for stickers on Facebook, Whatsapp, and Instagram</p>
        <button
          className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={onDownloadPNG}
        >
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download PNG</span>
        </button>
        <p className="mt-4">An SVG is best for further editing.</p>
        <button
          className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={onDownloadSVG}
        >
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download SVG</span>
        </button>

        <div className="w-full mt-4">
          <p className="flex flex-wrap justify-center space-between">
            <Img className="w-24 md:w-40" fluid={merch1.childImageSharp.fluid} />
            <Img className="w-24 md:w-40" fluid={merch2.childImageSharp.fluid} />
            <Img className="w-24 md:w-40" fluid={merch3.childImageSharp.fluid} />
            <Img className="w-24 md:w-40" fluid={merch4.childImageSharp.fluid} />
            <Img className="w-24 md:w-40" fluid={merch5.childImageSharp.fluid} />
            <Img className="w-24 md:w-40" fluid={merch6.childImageSharp.fluid} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
