import React from 'react';
import useModal from './useModal';

const ModalBody = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  const {} = useModal();

  return (
    <div className="modal-body-wrapper" data-testid="modal-body">
      <div className="modal-body-container">
        <div className="modal-body-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalBody;
