import React from 'react';
import Dots from './Dots';

const Loader = ({
  message = 'Loading',
  hideDots = false,
  children,
}: React.PropsWithChildren<{
  message?: string;
  hideDots?: boolean;
}>): React.ReactElement => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="message">
          {message}
          {!hideDots && <Dots />}
        </div>
        {children && <div className="loader-content">{children}</div>}
      </div>
    </div>
  );
};

export default Loader;
