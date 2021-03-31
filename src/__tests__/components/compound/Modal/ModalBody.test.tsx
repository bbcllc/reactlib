import { render } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary, Modal } from '../../../../components';

describe('Modal component', () => {
  it('correctly renders a modal body', () => {
    const BODY_TEXT = 'Body Text';

    // Render the modal body with a child
    const { getByText } = render(
      <Modal>
        <Modal.Body>
          <>{BODY_TEXT}</>
        </Modal.Body>
      </Modal>
    );

    // Assert the modal has rendered with the correct text
    expect(getByText(BODY_TEXT)).toBeTruthy();
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
});
