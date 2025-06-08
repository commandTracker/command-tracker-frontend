import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import TrimSlider from "@/features/videoEditor/components/TrimSlider";
import VideoPlayer from "@/features/videoEditor/components/VideoPlayer";
import useVideoEditor from "@/features/videoEditor/hooks/useVideoEditor";
import VideoSubmitModal from "@/features/videoSubmit/components/VideoSubmitModal";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/ErrorModal";

const VideoEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoSrc } = location.state || {};

  const {
    trim,
    duration,
    playing,
    playerRef,
    error,
    isDoneEdit,
    setError,
    handlePlay,
    handlePause,
    handleDuration,
    handleTrimChange,
    handleProgress,
    handleEdit,
  } = useVideoEditor();

  const closeModal = () => {
    setError(null);

    if (!videoSrc) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!videoSrc) {
      setError("영상을 불러올 수 없습니다. 다시 시도해주세요.");
    }
  }, [videoSrc]);

  return (
    <>
      {videoSrc && (
        <>
          <VideoPlayer
            ref={playerRef}
            url={videoSrc}
            playing={playing}
            onDuration={handleDuration}
            onProgress={handleProgress}
            onPlay={handlePlay}
            onPause={handlePause}
          />
          <TrimSlider
            trim={trim}
            duration={duration}
            onChange={handleTrimChange}
          />
          <Button onClick={handleEdit}>편집 요청</Button>
          {isDoneEdit && <VideoSubmitModal />}
        </>
      )}
      {error && <ErrorModal onClick={closeModal} message={error} />}
    </>
  );
};

export default VideoEditor;
