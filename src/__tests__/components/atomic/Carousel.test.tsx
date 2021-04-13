import { render } from '@testing-library/react';
import React from 'react';
import { Carousel } from '../../../components';

describe('Carousel component', () => {
  it('renders correctly to the DOM', () => {
    const { container } = render(<Carousel />);
    expect(container.firstElementChild).toBeInstanceOf(HTMLDivElement);
  });
});
