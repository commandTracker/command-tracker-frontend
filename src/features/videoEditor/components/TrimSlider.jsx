import { Slider } from "antd";
import PropTypes from "prop-types";

const TrimSlider = ({ trim, duration, onChange }) => {
  return (
    <Slider
      range
      min={0}
      max={duration || 1}
      value={trim}
      onChange={onChange}
      disabled={duration === 0}
    />
  );
};

TrimSlider.propTypes = {
  trim: PropTypes.arrayOf(PropTypes.number).isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrimSlider;
