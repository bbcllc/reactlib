export interface ICarouselContainerProps {
  secondsToChange?: number;
  hideCircles?: boolean;
  hideArrows?: boolean;
}

export interface IRenderCarouselProps {
  prev: () => void;
  next: () => void;
  numItems: number;
  getClassName: (i: number) => string;
  circles: () => React.ReactNode;
  hideCircles?: boolean;
  hideArrows?: boolean;
}
