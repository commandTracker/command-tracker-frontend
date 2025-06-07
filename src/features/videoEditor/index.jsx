import PropTypes from "prop-types";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";

import TrimSlider from "./TrimSlider";
import useVideoEditor from "./useVideoEditor";
import VideoPlayer from "./VideoPlayer";

function VideoEditor({ videoSrc }) {
  const {
    trim,
    duration,
    playing,
    playerRef,
    error,
    setError,
    handlePlay,
    handlePause,
    handleDuration,
    handleTrimChange,
    handleProgress,
    handleEdit,
  } = useVideoEditor(videoSrc);

  const closeModal = () => {
    setError(null);
  };

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
      {error && (
        <Modal onClick={closeModal} buttonText="닫기">
          <p className="text-red-600 mb-4">{error}</p>
        </Modal>
      )}
    </div>
  );
}

VideoEditor.propTypes = {
  videoSrc: PropTypes.string.isRequired,
};

export default VideoEditor;
