import PropTypes from "prop-types";

import Button from "./Button";

function Modal({ children, onClick, buttonText }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="py-8 px-6 bg-white rounded-md">
        {children}
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Modal;
