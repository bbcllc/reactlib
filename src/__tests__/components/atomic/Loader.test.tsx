import { act, render } from '@testing-library/react';
import React from 'react';
import { Loader } from '../../../components';

describe('Loader component', () => {
  it('renders correctly to the DOM with no props', () => {
    const { queryByText } = render(<Loader />);

    expect(queryByText(/loading/i)).toBeTruthy();
  });

  jest.useFakeTimers();
  it('correctly progresses the Dots interval', () => {
    const { queryAllByText } = render(<Loader />);

    // No dots initially
    expect(queryAllByText('.')).toHaveLength(0);

    // Increment by 500ms, there should be ONE dot
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(queryAllByText('.')).toHaveLength(1);
    expect(queryAllByText('...')).toHaveLength(0);

    // Increment by another 1000ms there should be 3 dots
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(queryAllByText('...')).toHaveLength(1);

    // After another 500ms it should be back to no dots
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(queryAllByText('.')).toHaveLength(0);
  });
});
