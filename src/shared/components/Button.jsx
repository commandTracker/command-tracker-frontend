import PropTypes from "prop-types";

const buttonClass = `
  text-white text-lg py-2 min-w-32 w-auto
  rounded bg-[#F4A76B]
  hover:bg-[#E08345] hover:border-[#E08345]
  active:font-bold focus:outline-none
  transition-colors duration-200
`;

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
