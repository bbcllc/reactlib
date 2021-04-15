import React from 'react';
import Dots from './Dots';
import { ILoaderProps } from './loaderTypes';

const Loader = ({
  message = 'Loading',
  hideDots = false,
  center = true,
  children,
}: React.PropsWithChildren<ILoaderProps>): React.ReactElement => {
  return (
    <div className={`loader-wrapper${center ? ' center' : ''}`}>
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
