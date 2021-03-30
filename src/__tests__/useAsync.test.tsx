import React, { useState } from 'react';
import { act, render } from '@testing-library/react';
import { useAsync } from '..';

function setup(param: Parameters<typeof useAsync>[0]) {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useAsync(param));
    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

function setupWithSetter(param: Parameters<typeof useAsync>[0]) {
  const returnVal = {};
  function TestComponent() {
    const [state, setState] = useState();
    // Passing in a setter is requiring some nuts typecasting in this particular use case
    Object.assign(
      returnVal,
      useAsync({
        ...param,
        setter: (setState as unknown) as Parameters<
          typeof useAsync
        >[0]['setter'],
      })
    );
    // Cast the state value as the returned state value from the hook
    Object.assign(returnVal, { 2: state });
    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

describe('useAsync', () => {
  it('returns a correct array', async () => {
    const returnObj = setup({
      asyncFunction: async () => null,
    }) as ReturnType<typeof useAsync>;

    // Expect a an array with length 4
    expect(Object.keys(returnObj)).toHaveLength(4);

    // Expect loading state to be false
    expect(returnObj[1]).toBe(false);
    // Expect the initial state value to be undefined
    expect(returnObj[2]).toBeUndefined();
    // Expect there to be no errors
    expect(returnObj[3]).toBeUndefined();

    // Execute the function
    const res = act(returnObj[0]);
    // It should be "Loading" while function is running
    expect(returnObj[1]).toBe(true);

    // Wait for the function to finish executing
    await res;

    // Expect the new state value to be null
    expect(returnObj[2]).toBe(null);
    // Expect there to be no errors
    expect(returnObj[3]).toBeUndefined();
  });

  it('correctly throws an error from the async callback', async () => {
    const ERROR_MSG = 'error message';
    const returnObj = setup({
      asyncFunction: async () => {
        throw new Error(ERROR_MSG);
      },
    }) as ReturnType<typeof useAsync>;

    // Expect a an array with length 4
    expect(Object.keys(returnObj)).toHaveLength(4);

    // Expect loading state to be false
    expect(returnObj[1]).toBe(false);
    // Expect the initial state value to be undefined
    expect(returnObj[2]).toBeUndefined();
    // Expect there to be no errors
    expect(returnObj[3]).toBeUndefined();

    // Execute the function
    const res = act(returnObj[0]);
    // It should be "Loading" while function is running
    expect(returnObj[1]).toBe(true);

    // Wait for the function to finish executing
    await res;

    // Expect the new state value to still be undefined
    expect(returnObj[2]).toBeUndefined();
    // Expect there to be an error
    expect(returnObj[3]?.message).toBe(ERROR_MSG);
  });

  it('correctly utilizes the custom state setter', async () => {
    const returnObj = setupWithSetter({
      asyncFunction: async () => Promise.resolve(true),
    }) as ReturnType<typeof useAsync>;

    // Expect a an array with length 4
    expect(Object.keys(returnObj)).toHaveLength(4);

    // Expect loading state to be false
    expect(returnObj[1]).toBe(false);
    // Expect the initial state value to be undefined
    expect(returnObj[2]).toBeUndefined();
    // Expect there to be no errors
    expect(returnObj[3]).toBeUndefined();

    // Execute the function
    const res = act(returnObj[0]);
    // It should be "Loading" while function is running
    expect(returnObj[1]).toBe(true);

    // Wait for the function to finish executing
    await res;

    // Expect the new state value to be true
    expect(returnObj[2]).toBe(true);
    // Expect there to be no errors
    expect(returnObj[3]).toBeUndefined();
  });
});
