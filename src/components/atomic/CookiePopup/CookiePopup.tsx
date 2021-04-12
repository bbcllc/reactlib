import React, { useState } from 'react';
import { useLocalStorage } from '../../../hooks';

const CookiePopup = ({
  localStorageKey = 'hideCookiePopup',
}: {
  localStorageKey?: string;
}): React.ReactElement => {
  const [isChecked, setIsChecked] = useLocalStorage<boolean>({
    key: localStorageKey,
  });
  const [isShowing, setIsShowing] = useState(isChecked ? !isChecked : true);

  // TODO FIX THIS TO USE STATE SETTER BETTER
  const toggleCheck = () => setIsChecked(!isChecked);
  const closePopup = () => setIsShowing(false);

  return isShowing ? (
    <div className="cookie-popup-wrapper">
      <div className="cookie-popup-container">
        <h3>Cookie Policy</h3>
        <p>
          This website stores data such as cookies to enable necessary site
          functionality and analytics. By remaining on this website you indicate
          your consent.
        </p>
        <div className="cookie-popup-">
          <label>
            <input type="checkbox" checked={isChecked} onChange={toggleCheck} />{' '}
            Don&apos;t show again
          </label>
          <button onClick={closePopup}>Okay</button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CookiePopup;
