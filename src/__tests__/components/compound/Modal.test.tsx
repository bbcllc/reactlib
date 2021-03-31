import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Modal } from '../../../components/';

describe('Modal component', () => {
  it('renders correctly with no props or children', () => {
    render(<Modal></Modal>);
  });

  it('correctly renders a  modal header', () => {
    const HEADER_TEXT = 'Header Text';
    const callback = jest.fn(() => null);
    const { getByText, getByTestId } = render(
      <Modal closeModal={callback}>
        <Modal.Header>{HEADER_TEXT}</Modal.Header>
      </Modal>
    );

    expect(getByText(HEADER_TEXT)).toBeTruthy();
    expect(callback).toHaveBeenCalledTimes(0);
    const closeButton = getByTestId('modal-close-button');
    fireEvent['click'](closeButton);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
