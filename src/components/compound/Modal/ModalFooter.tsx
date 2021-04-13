import React from 'react';
import useModal from './useModal';

const ModalFooter = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  const {} = useModal();

  return (
    <div className="modal-footer-wrapper">
      <div className="modal-footer-container">
        <div className="modal-footer-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalFooter;
