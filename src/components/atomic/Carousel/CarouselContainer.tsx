import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { ICarouselContainerProps } from './carouselTypes';
import RenderCarousel from './RenderCarousel';

const CarouselContainer = ({
  children,
  secondsToChange = 4,
  hideArrows = false,
  hideCircles = false,
}: React.PropsWithChildren<ICarouselContainerProps>): React.ReactElement => {
  const [numItems] = useState(React.Children.count(children));
  const [current, setCurrent] = useState(0);

  const getClassName = (ind: number): 'prev' | 'show' | 'next' | 'hide' => {
    if (ind === current) return 'show';
    else if (ind === current - 1 || (current === 0 && ind === numItems - 1))
      return 'prev';
    else if (ind === current + 1 || (current === numItems - 1 && ind === 0))
      return 'next';
    else return 'hide';
  };

  const next = () => setCurrent((cur) => (cur === numItems - 1 ? 0 : cur + 1));
  const prev = () => setCurrent((cur) => (cur === 0 ? numItems - 1 : cur - 1));
  const setNum = (num: number) => setCurrent(num);

  const circles = (): React.ReactNode => {
    const circleElements = [...new Array(numItems)].map((x, i) => (
      <FaCircle
        key={i}
        className={`carousel-circle${i === current ? ' active' : ''}`}
        onClick={() => setNum(i)}
      />
    ));
    return <>{circleElements.map((c) => c)}</>;
  };

  useEffect(() => {
    // This useEffect is cOOL because it resets the timer to 0 if you manually change
    // the current card, and it won't mess up timings with overlapping changes.
    const goNextHandler = setTimeout(next, secondsToChange * 1000);
    return () => clearTimeout(goNextHandler);
  }, [current]);

  return (
    <RenderCarousel
      children={children}
      circles={circles}
      getClassName={getClassName}
      next={next}
      prev={prev}
      numItems={numItems}
      hideArrows={hideArrows}
      hideCircles={hideCircles}
    />
  );
};

export default CarouselContainer;
