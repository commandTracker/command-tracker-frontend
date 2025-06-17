import PropTypes from "prop-types";

import Modal from "./Modal";

const ErrorModal = ({ onClose, message }) => {
  return (
    <Modal onClose={onClose}>
      <p className="text-lg text-red-600">{message}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
