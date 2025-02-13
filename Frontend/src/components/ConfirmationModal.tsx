import "../styles/modal.css";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, eventName }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to book the event: "{eventName}"?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn confirm-btn">
            Confirm
          </button>
          <button onClick={onClose} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
