import { Button, CloseButton, Modal } from 'react-bootstrap';
import styles from './StarterKitPackSelection.module.scss';
export const DetailsModal = (props: { show: boolean; onHide: () => void; html?: string }) => (
  <Modal size="lg" show={props.show} onHide={props.onHide} centered={true}>
    <Modal.Body className={styles.modal}>
      <div dangerouslySetInnerHTML={{ __html: props.html || '' }} />
      <CloseButton className={styles.closeBtn} onClick={props.onHide} />
    </Modal.Body>
    <Modal.Footer className="justify-content-start">
      {/* TODO: Btn value should replace from B.E dict key */}
      <Button className="btn btn-light" onClick={props.onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);
