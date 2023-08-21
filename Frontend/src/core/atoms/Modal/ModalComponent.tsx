import { Button, Modal as RbModal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import styles from './ModalComponent.module.scss';
import { useAtom } from 'jotai';
import { modalAtom } from 'data/atoms/modal';
import { MODAL } from 'constants/modal';
import { useRouter } from 'next/router';

const Modal = () => {
  const [content, setModal] = useAtom(modalAtom);
  const router = useRouter();
  const handleClose = () => {
    setModal(null);
  };
  const handleRedirectToCart = (linkToCart: string) => {
    router.push(linkToCart || '');
    setModal(null);
  };

  if (content?.type === MODAL.COMPONENT && content?.component) {
    return content?.component;
  }

  if (content?.type === MODAL.VIDEO) {
    return (
      <RbModal
        className={`${styles.modalContainer} mx-auto `}
        size="lg"
        show={!!content}
        onHide={handleClose}
      >
        <RbModal.Header
          closeVariant="white"
          closeButton
          className={styles.modalHeader}
        ></RbModal.Header>
        <RbModal.Body className={`${styles.modalBody} mx-auto`}>
          <ReactPlayer
            url={content?.data as string}
            controls
            width=""
            height=""
            className={styles.video}
          />
        </RbModal.Body>
      </RbModal>
    );
  }

  // TODO - discuss approach on modal windows using portals
  if (content?.type === MODAL.ADDED_TO_CART) {
    return (
      <RbModal
        className={`${styles.modalCta} mx-auto `}
        size="lg"
        show={!!content}
        onHide={handleClose}
      >
        <RbModal.Header closeButton className="fw-bold">
          {(content?.data as { title: string }).title as string}
        </RbModal.Header>
        <RbModal.Body className={`${styles.modalBody} mx-auto text-align-center px-5`}>
          <Button className={styles.modalButton} variant="info" onClick={handleClose}>
            {(content?.data as { ctaContinueLabel: string }).ctaContinueLabel as string}
          </Button>
          <Button
            className={styles.modalButton}
            variant="success"
            onClick={() =>
              handleRedirectToCart((content?.data as { linkToCart: string }).linkToCart as string)
            }
          >
            {(content?.data as { ctaBagLabel: string }).ctaBagLabel as string}
          </Button>
        </RbModal.Body>
      </RbModal>
    );
  }

  return <></>;
};

export default Modal;
