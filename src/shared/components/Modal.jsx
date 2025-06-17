import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="py-8 px-6 bg-white rounded-md relative space-y-3">
        <IoCloseOutline
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
