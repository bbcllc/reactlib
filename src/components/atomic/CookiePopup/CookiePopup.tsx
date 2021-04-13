import React, { useState } from 'react';
import { useLocalStorage } from '../../../hooks';

const CookiePopup = ({
  localStorageKey = 'hideCookiePopup',
}: {
  localStorageKey?: string;
}): React.ReactElement => {
  const [isChecked, setIsChecked] = useLocalStorage({
    key: localStorageKey,
    defaultValue: false,
  });
  const [isShowing, setIsShowing] = useState(isChecked);

  const toggleCheck = () => setIsChecked((prev) => !prev);
  const closePopup = () => setIsShowing(false);

  return (
    <>
      {isShowing && (
        <div className="cookie-popup-wrapper">
          <div className="cookie-popup-container">
            <h2>Cookie Policy</h2>
            <p>
              This website stores data such as cookies to enable necessary site
              functionality and analytics. By remaining on this website you
              indicate your consent.
            </p>
            <div className="cookie-popup-footer">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleCheck}
                />{' '}
                Don&apos;t show again
              </label>
              <button onClick={closePopup}>Okay</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopup;
