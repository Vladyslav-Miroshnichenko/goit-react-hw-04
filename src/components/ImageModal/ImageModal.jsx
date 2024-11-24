import Modal from "react-modal";

export default function ImageModal({ image, onClose }) {
  return (
    <Modal isOpen onRequestClose={onClose}>
      <img src={image.urls.regular} alt={image.alt_description} />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}
