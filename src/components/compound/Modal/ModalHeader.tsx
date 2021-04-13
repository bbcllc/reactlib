import React from 'react';
import { IModalHeaderProps } from './modalTypes';
import useModal from './useModal';

const ModalHeader: React.FC<IModalHeaderProps> = ({
  children,
  hideCloseButton = false,
}): React.ReactElement => {
  // TODO add a proper close button
  const { closeModal } = useModal();

  return (
    <div className="modal-header-wrapper">
      <div className="modal-header-container">
        <div className="modal-header-content">{children}</div>
        {!hideCloseButton && (
          <div className="modal-close-button" onClick={closeModal}>
            &times;
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
