import { useEffect, useRef, useState } from "react";

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
  const { videoSrc, videoId } = location.state || {};

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

  const videoWrapperRef = useRef(null);
  const [playerWidth, setPlayerWidth] = useState(0);

  useEffect(() => {
    if (!videoWrapperRef.current) {
      return () => {};
    }

    const obs = new ResizeObserver(([entry]) => {
      return setPlayerWidth(entry.contentRect.width);
    });

    obs.observe(videoWrapperRef.current);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!videoSrc || !videoId) {
      setError("영상을 불러올 수 없습니다. 다시 시도해주세요.");
    }
  }, [videoSrc, videoId]);

  const closeModal = () => {
    setError(null);

    if (!videoSrc) navigate("/");
  };

  return (
    <>
      {videoSrc && videoId && (
        <div className="w-full flex flex-col items-center space-y-6">
          <div ref={videoWrapperRef} className="w-fit mx-auto">
            <VideoPlayer
              ref={playerRef}
              url={videoSrc}
              playing={playing}
              onDuration={handleDuration}
              onProgress={handleProgress}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
          <TrimSlider
            trim={trim}
            duration={duration}
            videoSrc={videoSrc}
            onChange={handleTrimChange}
            width={playerWidth}
          />
          <Button onClick={handleEdit}>편집 요청</Button>
          {isDoneEdit && <VideoSubmitModal videoId={videoId} trim={trim} />}
        </div>
      )}
      {error && <ErrorModal onClick={closeModal} message={error} />}
    </>
  );
};

export default VideoEditor;
