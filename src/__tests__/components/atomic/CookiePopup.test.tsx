import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { CookiePopup } from '../../../components';

/** Initialize a helper to simplify tests */
const get = (key: string): string => {
  return localStorage.getItem(key) as string;
};

describe('CookiePopup component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterAll(() => {
    localStorage.clear();
  });

  it('renders correctly to the DOM', () => {
    const { queryByText } = render(<CookiePopup />);
    // Component should be rendered
    expect(queryByText(/cookie policy/i)).toBeTruthy();
  });

  it("doesn't render when hidden in localStorage", () => {
    const STORAGE_KEY = 'hideCookiePopup';
    // Preset the localStorage key to hide the component
    localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
    const { queryByText } = render(
      <CookiePopup localStorageKey={STORAGE_KEY} />
    );
    // Assert that component is correctly hidden
    expect(queryByText(/cookie policy/i)).toBeFalsy();
  });

  it('correctly fires checkbox click event', () => {
    const STORAGE_KEY = 'hideCookiePopup';

    const { queryByText } = render(<CookiePopup />);
    // Component should be rendered
    expect(queryByText(/cookie policy/i)).toBeTruthy();

    // Should find the checkbox label
    const label = queryByText(/don't show again/i) as HTMLLabelElement;
    expect(label).toBeInstanceOf(HTMLLabelElement);

    // localStorage value should not be set!
    expect(JSON.parse(get(STORAGE_KEY))).toBeNull();

    // Click on the label it should set localStorage to true
    fireEvent['click'](label);

    // localStorage value should now be set
    expect(JSON.parse(get(STORAGE_KEY))).toBeTruthy();
    // popup should still be rendered to the DOM until the button is pressed
    expect(queryByText(/cookie policy/i)).toBeTruthy();

    // Click on the label again to set localStorage back to false
    fireEvent['click'](label);

    // localStorage value should now be set
    expect(JSON.parse(get(STORAGE_KEY))).toBeFalsy();
    // popup should still be rendered to the DOM
    expect(queryByText(/cookie policy/i)).toBeTruthy();
  });

  it("hides the popup when the 'okay' button is pressed", () => {
    const BUTTON_TEXT = 'Close Modal';

    // Render the component with our custom button text
    const { queryByText } = render(<CookiePopup buttonText={BUTTON_TEXT} />);
    // Component should be rendered
    expect(queryByText(/cookie policy/i)).toBeTruthy();

    // Find the button in the rendered dom
    const button = queryByText(BUTTON_TEXT) as HTMLButtonElement;
    expect(button).toBeInstanceOf(HTMLButtonElement);

    // Click on the button, this should hide the component
    fireEvent['click'](button);

    // Component should NOT be rendered
    expect(queryByText(/cookie policy/i)).toBeFalsy();
  });
});
