import { act, render } from '@testing-library/react';
import React from 'react';
import { Loader } from '../../../components';

describe('Loader component', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  afterEach(() => jest.clearAllTimers());

  it('renders correctly to the DOM with no props', () => {
    const { queryByText } = render(<Loader />);

    expect(queryByText(/loading/i)).toBeTruthy();
  });

  it('displays the correct message when passed a string', () => {
    const MSG_TEXT = 'Special Message';
    const { queryByText } = render(<Loader message={MSG_TEXT} />);

    expect(queryByText(/loading/i)).toBeFalsy();
    expect(queryByText(MSG_TEXT)).toBeTruthy();
  });

  it('correctly renders children', () => {
    // Render a ReactNode as a child of Loader
    const CHILD_TEXT = 'This is rendered inside the loader';
    const { queryByText } = render(
      <Loader>
        <div>{CHILD_TEXT}</div>
      </Loader>
    );

    // Assert that the child was loaded successfully
    expect(queryByText(CHILD_TEXT)).toBeTruthy();
  });

  it('correctly progresses the Dots interval', () => {
    const { queryAllByText } = render(<Loader />);

    // Renders 3 dots
    const dots = queryAllByText('.');
    expect(dots.length).toBe(3);

    // Expect that `every` dot is visible initially (opacity === 1)
    expect(dots.every((dot) => dot.style.opacity === '1')).toBeTruthy();

    // Increment by 500ms, the dots should all be invisible (opacity === 0)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(dots.some((dot) => dot.style.opacity === '1')).toBeFalsy();

    // Increment by another 1000ms and only the first two dots should be visible
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(dots[0].style.opacity).toBe('1');
    expect(dots[1].style.opacity).toBe('1');
    expect(dots[2].style.opacity).toBe('0');
  });

  it("doesn't display dots when disabled in props", () => {
    const { queryAllByText } = render(<Loader hideDots />);

    // Doesn't render dots
    const dots = queryAllByText('.');
    expect(dots.length).toBe(0);
  });

  it('applies the center class only when component center prop is true', () => {
    const { container, rerender } = render(<Loader />);

    // Loader should be rendered with the `center` class initially
    expect(
      (container.querySelector(
        '.loader-wrapper'
      ) as Element).classList.contains('center')
    ).toBeTruthy();

    rerender(<Loader center={false} />);

    // Loader should no longer have the class
    expect(
      (container.querySelector(
        '.loader-wrapper'
      ) as Element).classList.contains('center')
    ).toBeFalsy();
  });
});
