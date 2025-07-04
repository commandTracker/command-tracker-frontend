import { useState, useRef } from "react";

const useVideoEditor = () => {
  const [trim, setTrim] = useState([0, 0]);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playerRef = useRef(null);

  const handleDuration = (videoDuration) => {
    setDuration(videoDuration);
    setTrim([0, videoDuration]);
  };

  const handleTrimChange = (newTrim) => {
    const [newStart, newEnd] = newTrim;
    const [prevStart, prevEnd] = trim;

    setTrim(newTrim);

    if (playerRef.current) {
      if (newStart !== prevStart) {
        playerRef.current.seekTo(newStart, "seconds");
      } else if (newEnd !== prevEnd) {
        playerRef.current.seekTo(newEnd, "seconds");
      }
      setPlaying(false);
    }
  };

  const handleProgress = (state) => {
    const [start, end] = trim;
    const currentTime = state.playedSeconds;

    if (currentTime < start || currentTime > end) {
      playerRef.current.seekTo(start, "seconds");
      setPlaying(false);
    }
  };

  const handlePlay = () => {
    const [start, end] = trim;

    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();

      if (currentTime >= start && currentTime <= end) {
        setPlaying(true);
      } else {
        playerRef.current.seekTo(start, "seconds");

        setPlaying(true);
      }
    }
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleEdit = async () => {
    try {
      const [start, end] = trim;

      if (start === end) {
        throw new Error("영상 편집점을 다시 확인해주세요!");
      }

      setIsModalOpen(true);
    } catch (err) {
      setError(err.message || "편집 요청 실패");
    }
  };

  return {
    trim,
    duration,
    playing,
    playerRef,
    error,
    isModalOpen,
    setIsModalOpen,
    setError,
    handlePlay,
    handlePause,
    handleDuration,
    handleTrimChange,
    handleProgress,
    handleEdit,
  };
};

export default useVideoEditor;
