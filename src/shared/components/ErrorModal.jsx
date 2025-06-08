import PropTypes from "prop-types";

import Modal from "./Modal";

const ErrorModal = ({ onClick, message }) => {
  return (
    <Modal onClick={onClick} buttonText="닫기">
      <p className="text-lg text-red-600 mb-4">{message}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
