import { Meta, Story } from '@storybook/react';
import React from 'react';
import '../../../styles/atomic/carousel/carousel.scss';
import CarouselContainer from './CarouselContainer';
import { ICarouselContainerProps } from './carouselTypes';

const Template: Story<React.PropsWithChildren<ICarouselContainerProps>> = (
  args
) => (
  <CarouselContainer {...args}>
    <div style={{ backgroundColor: '#f66700' }} />
    <div style={{ backgroundColor: '#00b67d' }} />
    <div style={{ backgroundColor: '#f7bc50' }} />
  </CarouselContainer>
);

export const Basic = Template.bind({});
Basic.decorators = [
  (story) => (
    <div
      style={{
        backgroundColor: '#40537f',
        minHeight: window.innerHeight - 40,
        padding: '20px',
      }}
    >
      {story()}
    </div>
  ),
];

export const HideScrollButtons = Template.bind({});
HideScrollButtons.args = {
  hideArrows: true,
  hideCircles: true,
  secondsToChange: 2,
};
HideScrollButtons.decorators = [
  (story) => (
    <div
      style={{
        backgroundColor: '#40537f',
        minHeight: window.innerHeight,
      }}
    >
      {story()}
    </div>
  ),
];

export default {
  title: 'Components/Atomic/Carousel',
  component: CarouselContainer,
  parameters: { layout: 'fullscreen' },
} as Meta;
