import { useState, useRef } from "react";

const useVideoEditor = (videoSrc, message) => {
  const [trim, setTrim] = useState([0, 0]);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
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
      if (prevStart !== newStart) {
        playerRef.current.seekTo(newStart, "seconds");
        setPlaying(false);
      } else if (prevEnd !== newEnd) {
        playerRef.current.seekTo(newEnd, "seconds");
        setPlaying(false);
      }
    }
  };

  const handleProgress = (state) => {
    const [start, end] = trim;
    const currentTime = state.playedSeconds;

    if (currentTime < start) {
      playerRef.current.seekTo(start, "seconds");
      return;
    }

    if (currentTime >= end) {
      setPlaying(false);
      setTimeout(() => {
        playerRef.current?.seekTo(start, "seconds");
      }, 100);
    }
  };

  const handlePlay = () => {
    const [start] = trim;
    if (playerRef.current) {
      playerRef.current.seekTo(start, "seconds");
    }
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleEdit = async () => {
    const [start, end] = trim;
    if (start === end) {
      return;
    }

    const editData = { trim, videoSrc };
    try {
      const response = await fetch("http://localhost:3000/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error("편집 요청 실패");
    } catch (error) {
      message.error("편집 요청 중 오류 발생");
    }
  };

  return {
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
  };
};

export default useVideoEditor;
