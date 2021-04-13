import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Carousel } from '../../../components';

const getClassList = (node: Element): string[] => {
  return Object.values(node.classList);
};

describe('Carousel component', () => {
  it('renders correctly to the DOM', () => {
    // Render the carousel with no children
    const { container } = render(<Carousel />);

    // Expect the wrapper to be rendered
    expect(container.querySelector('.carousel-wrapper')).toBeTruthy();
    // Expect the left button to be rendered
    expect(container.querySelector('.carousel-left')).toBeTruthy();
    // Expect the right button to be rendered
    expect(container.querySelector('.carousel-right')).toBeTruthy();
    // Expect the circle container to be rendered
    expect(container.querySelector('.carousel-circles')).toBeTruthy();
  });

  it('correctly hides the circles and arrows', () => {
    const { container } = render(<Carousel hideArrows hideCircles />);

    // Expect the wrapper to be rendered
    expect(container.querySelector('.carousel-wrapper')).toBeTruthy();
    // Expect the left button to be rendered
    expect(container.querySelector('.carousel-left')).toBeFalsy();
    // Expect the right button to be rendered
    expect(container.querySelector('.carousel-right')).toBeFalsy();
    // Expect the circle container to be rendered
    expect(container.querySelector('.carousel-circles')).toBeFalsy();
  });

  it('renders a carousel with a child', () => {
    const { container } = render(
      <Carousel>
        <div />
      </Carousel>
    );

    // Expect one carousel card to be rendered
    expect(container.querySelectorAll('.carousel-card')).toHaveLength(1);
    // Expect that card to be shown
    expect(container.querySelectorAll('.show')).toHaveLength(1);
    // Expect no cards to be hidden
    expect(container.querySelectorAll('.hide')).toHaveLength(0);
  });

  it('renders a carousel with four children so one is hidden', () => {
    // Render a carousel with 4 inner divs
    const { container } = render(
      <Carousel>
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    );

    // Expect the carousel to render 4 `.carousel-card` components
    expect(container.querySelectorAll('.carousel-card')).toHaveLength(4);
    // Expect one card to have the `show` class
    expect(container.querySelector('.carousel-card.show')).toBeTruthy();
    // Expect one card to have the `next` class
    expect(container.querySelector('.carousel-card.next')).toBeTruthy();
    // Expect one card to have the `hide` class
    expect(container.querySelector('.carousel-card.hide')).toBeTruthy();
    // Expect one card to have the `prev` class
    expect(container.querySelector('.carousel-card.prev')).toBeTruthy();

    // Expect the carousel to render 4 circles
    expect(container.querySelectorAll('.carousel-circle')).toHaveLength(4);
    // Expect one of the rendered circles to be `active`
    expect(container.querySelectorAll('.carousel-circle.active')).toHaveLength(
      1
    );
    // Expect that there are 3 inactive circles
    expect(
      container.querySelectorAll('.carousel-circle:not(.active)')
    ).toHaveLength(3);
  });

  it('correctly changes the shown card and active circle', () => {
    const { container } = render(
      <Carousel>
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    );

    // Get a reference to the left and right buttons
    const leftButton = container.querySelector('.carousel-left') as Element;
    const rightButton = container.querySelector('.carousel-right') as Element;

    // Get a list of all of the carousel cards
    const cards = container.querySelectorAll('.carousel-card');
    // We should receive 4 cards
    expect(cards).toHaveLength(4);
    // Get a list of all of the carousel circles
    const circles = container.querySelectorAll('.carousel-circle');
    // We should get 4 circles
    expect(circles).toHaveLength(4);

    // The first card should be shown and first circle active
    expect(getClassList(cards[0])).toContain('show');
    expect(getClassList(circles[0])).toContain('active');

    // Clicking the left button should move the carousel
    fireEvent['click'](leftButton);

    // The first card should now be `next` and fourth circle active
    expect(getClassList(cards[0])).toContain('next');
    expect(getClassList(circles[3])).toContain('active');

    // Clicking the left button should move the carousel again
    fireEvent['click'](leftButton);

    // The first card should now be hidden and third circle active
    expect(getClassList(cards[0])).toContain('hide');
    expect(getClassList(circles[2])).toContain('active');

    // Clicking the right button should go forward again
    fireEvent['click'](rightButton);

    // The first card should be `next` and fourth circle active
    expect(getClassList(cards[0])).toContain('next');
    expect(getClassList(circles[3])).toContain('active');

    // Clicking the right button should go back to first card
    fireEvent['click'](rightButton);

    // The first card should be shown and first circle active
    expect(getClassList(cards[0])).toContain('show');
    expect(getClassList(circles[0])).toContain('active');

    // Clicking the third circle shows third card and activates third circle
    fireEvent['click'](circles[2]);

    // The first card should be hidden
    expect(getClassList(cards[0])).toContain('hide');
    // Third card should be shown
    expect(getClassList(cards[2])).toContain('show');
    // Third circle active
    expect(getClassList(circles[2])).toContain('active');
  });
});
