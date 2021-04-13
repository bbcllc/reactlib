import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary, Modal } from '../../../../components';

describe('Modal.Header component', () => {
  it('correctly renders a node in modal header', () => {
    const HEADER_TEXT = 'Header Text';

    // Render the modal header with a child
    const { getByText } = render(
      <Modal>
        <Modal.Header>
          <>{HEADER_TEXT}</>
        </Modal.Header>
      </Modal>
    );

    // Assert the modal has rendered with the correct text
    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });

  it('correctly passes closeModal function to close button in header', () => {
    // Create an empty spy function
    const callback = jest.fn(() => null);

    // Render the modal with our spy as the closeModal function
    const { container } = render(
      <Modal closeModal={callback}>
        <Modal.Header />
      </Modal>
    );

    // Assert our closeModal (spy) has not ben called yet
    expect(callback).toHaveBeenCalledTimes(0);

    // Get a reference to the close button
    const closeButton = container.querySelector(
      '.modal-close-button'
    ) as Element;
    // "Click" on the close button to trigger our function spy
    fireEvent['click'](closeButton);

    // Assert our spy has been called once
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('throws an error when header is not wrapped in modal', () => {
    // Mock the console.error function so that we don't get a large
    // ugly error message while testing
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Render the header in an ErrorBoundary to catch the error
    const { getByText } = render(
      <ErrorBoundary fallback={(props) => <>Error! {props.error.message}</>}>
        <Modal.Header />
      </ErrorBoundary>
    );

    // Check that our error boundary is displaying the fallback correctly
    expect(getByText(/error!/i)).toBeTruthy();
    expect(getByText(/cannot use modal context/i)).toBeTruthy();

    // Restore the standard behavior of the console.error function
    spy.mockRestore();
  });
});
