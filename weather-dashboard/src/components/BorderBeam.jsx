import React from 'react';

const BorderBeam = ({ children, className }) => {
  return (
    <div className={`border-beam-container ${className}`}>
      {children}
      <div className="border-beam"></div>
      <style jsx>{`
        .border-beam-container {
          position: relative;
          overflow: hidden;
        }
        .border-beam {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
          background-size: 200% 200%;
          animation: beam-animation 3s linear infinite;
          opacity: 0.7;
          z-index: -1;
        }
        @keyframes beam-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default BorderBeam;