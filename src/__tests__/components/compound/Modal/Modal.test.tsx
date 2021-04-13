import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary, Modal } from '../../../../components';

describe('Modal component', () => {
  it('renders correctly with no props or children', () => {
    render(<Modal />);
  });

  it('correctly renders a  modal header', () => {
    const HEADER_TEXT = 'Header Text';

    // Create an empty spy function
    const callback = jest.fn(() => null);
    // Render the modal with our spy as the closeModal function
    const { getByText, container } = render(
      <Modal closeModal={callback}>
        <Modal.Header>{HEADER_TEXT}</Modal.Header>
      </Modal>
    );

    // Assert the modal has rendered with the correct text
    expect(getByText(HEADER_TEXT)).toBeTruthy();
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

    expect(getByText(/error!/i)).toBeTruthy();
    expect(getByText(/cannot use modal context/i)).toBeTruthy();

    spy.mockRestore();
  });

  it('throws an error when body is not wrapped in modal', () => {
    // Mock the console.error function so that we don't get a large
    // ugly error message while testing
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Render the body in an ErrorBoundary to catch the error
    const { getByText } = render(
      <ErrorBoundary fallback={(props) => <>Error! {props.error.message}</>}>
        <Modal.Body />
      </ErrorBoundary>
    );

    expect(getByText(/error!/i)).toBeTruthy();
    expect(getByText(/cannot use modal context/i)).toBeTruthy();

    spy.mockRestore();
  });

  it('throws an error when footer is not wrapped in modal', () => {
    // Mock the console.error function so that we don't get a large
    // ugly error message while testing
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Render the footer in an ErrorBoundary to catch the error
    const { getByText } = render(
      <ErrorBoundary fallback={(props) => <>Error! {props.error.message}</>}>
        <Modal.Footer />
      </ErrorBoundary>
    );

    expect(getByText(/error!/i)).toBeTruthy();
    expect(getByText(/cannot use modal context/i)).toBeTruthy();

    spy.mockRestore();
  });
});
