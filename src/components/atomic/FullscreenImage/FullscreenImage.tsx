import React, { SetStateAction, useEffect, useState } from 'react';
import { MdClose, MdZoomIn, MdZoomOut, MdZoomOutMap } from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useKey } from '../../../hooks';

const FullscreenImage = (props: FullscreenImageProps): React.ReactElement => {
  const [showInfo, setShowInfo] = useState(false);

  const closeModal = () => {
    console.log('Close Modal');
    props.setIsVisible(false);
  };

  const toggleInfo = () => setShowInfo((cur) => !cur);

  const resizeHandler = () => {
    console.log('Image resized');

    document
      .getElementById(`fullscreen-image-${props.id}`)
      ?.style.setProperty('height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    if (props.isVisible) window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [props.isVisible]);

  useKey({ key: 'Escape', action: closeModal });

  return (
    <TransformWrapper
      options={{
        limitToBounds: false,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform }: TransformProps) => (
        <div className="fullscreen-image" id={`fullscreen-image-${props.id}`}>
          <div className="close-button">
            <MdClose onClick={closeModal} />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <img src={props.src} alt="Submission displayed fullscreen" />
            </TransformComponent>
          </div>
          <div className="controls">
            <div className="bottom-controls">
              <button onClick={zoomOut} title="Zoom Out">
                <MdZoomOut />
              </button>
              <button onClick={resetTransform} title="Reset Image">
                <MdZoomOutMap />
              </button>
              <button onClick={zoomIn} title="Zoom In">
                <MdZoomIn />
              </button>
            </div>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
};

interface FullscreenImageProps {
  id: string;
  src: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface TransformProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

export default FullscreenImage;
