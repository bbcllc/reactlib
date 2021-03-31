import React from 'react';
import Dots from './Dots';

const Loader = ({
  message = 'Loading',
  hideDots = false,
}: {
  message?: string;
  hideDots?: boolean;
}): React.ReactElement => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="message">
          {message}
          {!hideDots && <Dots />}
        </div>
      </div>
    </div>
  );
};

export default Loader;
