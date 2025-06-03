import { message } from "antd";
import PropTypes from "prop-types";

import Button from "@/shared/components/Button";

import TrimSlider from "./TrimSlider";
import useVideoEditor from "./useVideoEditor";
import VideoPlayer from "./VideoPlayer";

function VideoEditor({ videoSrc }) {
  const {
    trim,
    duration,
    playing,
    playerRef,
    handlePlay,
    handlePause,
    handleDuration,
    handleTrimChange,
    handleProgress,
    handleEdit,
  } = useVideoEditor(videoSrc, message);

  return (
    <div>
      <VideoPlayer
        ref={playerRef}
        url={videoSrc}
        playing={playing}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      <TrimSlider trim={trim} duration={duration} onChange={handleTrimChange} />
      <Button onClick={handleEdit}>편집 요청</Button>
    </div>
  );
}

VideoEditor.propTypes = {
  videoSrc: PropTypes.string.isRequired,
};

export default VideoEditor;
