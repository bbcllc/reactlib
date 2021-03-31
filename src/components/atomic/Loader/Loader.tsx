import React, { useMemo } from 'react';
import Dots from './Dots';

const Loader = ({
  message = 'Loading',
  hideDots = false,
}: {
  message?: string;
  hideDots?: boolean;
}): React.ReactElement => {
  const dots = useMemo(() => (hideDots ? null : <Dots />), [hideDots]);
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="message">
          {message}
          {dots}
        </div>
      </div>
    </div>
  );
};

export default Loader;
