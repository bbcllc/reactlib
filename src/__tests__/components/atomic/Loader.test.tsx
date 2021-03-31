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
    const { queryByText } = render(<Loader />);

    // No dots initially
    expect(queryByText('.')).toBeFalsy();

    // Increment by 500ms, there should be ONE dot
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(queryByText('.')).toBeTruthy();
    expect(queryByText('...')).toBeFalsy();

    // Increment by another 1000ms there should be 3 dots
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(queryByText('...')).toBeTruthy();

    // After another 500ms it should be back to no dots
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(queryByText('.')).toBeFalsy();
  });

  it("doesn't display dots when disabled in props", () => {
    const { queryByText } = render(<Loader hideDots />);

    // No dots initially
    expect(queryByText('.')).toBeFalsy();

    // Increment by 500ms, STILL no dots
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(queryByText('.')).toBeFalsy();
    expect(queryByText('...')).toBeFalsy();
  });
});
