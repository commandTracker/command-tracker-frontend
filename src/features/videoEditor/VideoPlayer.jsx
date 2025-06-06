import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  url,
  playing,
  onDuration,
  onProgress,
  onPlay,
  onPause,
  ref,
}) => {
  return (
    <ReactPlayer
      ref={ref}
      url={url}
      controls
      playing={playing}
      onDuration={onDuration}
      onProgress={onProgress}
      onPlay={onPlay}
      onPause={onPause}
    />
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  onDuration: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default VideoPlayer;
