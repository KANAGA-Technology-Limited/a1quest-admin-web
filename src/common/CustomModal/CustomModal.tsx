import React from 'react';
import ReactModal from 'react-modal';
import styles from './style.module.css';

const customStyles: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    width: '900px',
    maxWidth: '90vw',
    padding: 32,
    paddingTop: 16,
    maxHeight: '95vh',
    backgroundColor: '#fff',
    color: '#000',
    transition: 'all 0.3s',
    border: 'none',
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    overscrollBehavior: 'contain',
    zIndex: 20,
  },
};

function CustomModal({
  title,
  isOpen,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true,
  width = '536px',
  ...rest
}: {
  title?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  width?: string;
} & ReactModal.Props) {
  React.useEffect(() => {
    // Check if modal is open and prevent body from scrolling
    if (typeof window !== 'undefined') {
      const body = document.body;

      if (isOpen) {
        // Disable scroll
        body.style.overflow = 'hidden';
        body.style.height = '100vh';
      } else {
        body.style.overflowY = 'auto';
        body.style.height = 'auto';
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // appElement={document.getElementById('modals')!}
      style={{
        // @ts-ignore
        content: {
          ...customStyles.content,
          width: width || customStyles.content?.width,
          opacity: isOpen ? 1 : 0,
        },
        overlay: customStyles.overlay,
      }}
      closeTimeoutMS={500}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      {...rest}
    >
      <div
        className={styles.modalTitleContainer}
        style={{
          justifyContent: title ? 'space-between' : 'flex-end',
        }}
      >
        {title && <h1>{title}</h1>}
        <button
          onClick={onRequestClose}
          style={{
            backgroundColor: 'transparent',
          }}
        >
          &#x2715;
        </button>
      </div>
      {children}
    </ReactModal>
  );
}

export default CustomModal;
