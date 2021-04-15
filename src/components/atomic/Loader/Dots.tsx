import React, { useEffect, useState } from 'react';

const Dots = (): React.ReactElement => {
  const [dots, setDots] = useState(3);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((cur) => {
        if (cur >= 3) return 0;
        else return cur + 1;
      });
    }, 500);
    return () => {
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <>
      <span style={{ opacity: dots >= 1 ? 1 : 0 }}>.</span>
      <span style={{ opacity: dots >= 2 ? 1 : 0 }}>.</span>
      <span style={{ opacity: dots >= 3 ? 1 : 0 }}>.</span>
    </>
  );
};

export default Dots;
