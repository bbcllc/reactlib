import React from 'react';
import Dots from './Dots';

const Loader = ({
  message = 'Loading',
  showDots = true,
}: {
  message?: string;
  showDots?: boolean;
}): React.ReactElement => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="message">
          {message}
          {showDots && <Dots />}
        </div>
      </div>
    </div>
  );
};

export default Loader;
