import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IRenderCarouselProps } from './CarouselTypes';

const RenderCarousel = ({
  prev,
  numItems,
  children,
  getClassName,
  next,
  circles,
  hideArrows,
  hideCircles,
}: React.PropsWithChildren<IRenderCarouselProps>): React.ReactElement => {
  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {!hideArrows && (
          <div className="carousel-left" onClick={prev} role="button">
            <MdKeyboardArrowLeft />
          </div>
        )}
        <div className="carousel-body">
          {React.Children.map(children, (elem, i) => (
            <div key={i} className={`carousel-card ${getClassName(i)}`}>
              {elem}
            </div>
          ))}
        </div>
        {!hideArrows && (
          <div className="carousel-right" onClick={next} role="button">
            <MdKeyboardArrowRight />
          </div>
        )}
      </div>
      {!hideCircles && <div className="carousel-circles">{circles()}</div>}
    </div>
  );
};

export default RenderCarousel;
