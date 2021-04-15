import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useKey } from '../../hooks';
import { IUseKeyProps } from '../../hooks/useKey/useKeyTypes';

function setup<CodeType extends 'key' | 'code'>(param: IUseKeyProps<CodeType>) {
  let returnVal;
  function TestComponent() {
    returnVal = useKey<CodeType>(param);
    return null;
  }
  render(<TestComponent />);
  return returnVal as ReturnType<typeof useKey>;
}

describe('useKeyPress', () => {
  it('returns nothing', () => {
    const returnObj = setup<'key'>({
      action: () => null,
      key: 'Enter',
    });

    expect(returnObj).toBeUndefined();
  });

  it('successfilly runs the action function when bound key is pressed', () => {
    // Initialize a callback action to spy on
    const spy = jest.fn();

    // Set up our hook with the spy function on the enter key
    setup<'key'>({
      action: spy,
      key: 'Enter',
    });

    // Function should not have been called yet
    expect(spy).toHaveBeenCalledTimes(0);

    // Fire the keydown event
    fireEvent.keyDown(document, { key: 'Enter' });

    // Function should have been called once
    expect(spy).toHaveBeenCalledTimes(1);

    // Fire the wrong keydown event
    fireEvent.keyDown(document, { key: 'Escape' });

    // Function should still have only been called once
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
