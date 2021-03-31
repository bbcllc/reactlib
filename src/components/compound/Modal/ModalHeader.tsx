import React, { useContext } from 'react';
import { IModalHeaderProps, ModalContext } from './modalTypes';

const ModalHeader: React.FC<IModalHeaderProps> = ({
  children,
  hideCloseButton = false,
}): React.ReactElement => {
  // TODO add a proper close button
  const { closeModal } = useContext(ModalContext);
  return (
    <div className="modal-header-wrapper">
      <div className="modal-header-container">
        <div className="modal-header-content">{children}</div>
        {!hideCloseButton && (
          <div
            className="modal-close-button"
            onClick={closeModal}
            data-testid="modal-close-button"
          >
            &times;
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
