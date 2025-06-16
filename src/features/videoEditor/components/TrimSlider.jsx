import { useEffect, useRef, useState } from "react";

import { Slider } from "antd";
import PropTypes from "prop-types";

const THUMB_W = 60;
const THUMB_H = 60;

const TrimSlider = ({ width, duration, videoSrc, trim, onChange }) => {
  const [thumbs, setThumbs] = useState([]);
  const videoEl = useRef(null);
  const count = Math.max(8, Math.ceil(width / THUMB_W));

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);

    return h
      ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!videoSrc || !duration || !width) return;

    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.crossOrigin = "anonymous";
    videoEl.current = video;

    const grab = (t) => {
      return new Promise((res) => {
        const c = document.createElement("canvas");

        const done = () => {
          c.width = video.videoWidth;
          c.height = video.videoHeight;
          c.getContext("2d").drawImage(video, 0, 0);
          return res(c.toDataURL("image/jpeg", 0.55));
        };

        video.currentTime = t;
        video.addEventListener("seeked", done, { once: true });
      });
    };

    const build = async () => {
      const list = [];

      for (let i = 0; i < count; i += 1) {
        list.push(await grab((duration * i) / (count - 1)));
      }

      setThumbs(list);
    };

    video.addEventListener("loadedmetadata", build, { once: true });
  }, [videoSrc, duration, width, count]);

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width, height: THUMB_H }}
    >
      <div
        className="flex overflow-hidden rounded-md w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        {thumbs.map((src) => (
          <img
            key={src}
            src={src}
            alt="thumb"
            style={{
              width: `${100 / count}%`,
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
      <Slider
        range
        min={0}
        max={duration || 1}
        step={0.01}
        value={trim}
        onChange={onChange}
        disabled={!duration}
        tooltip={{ formatter: formatTime }}
        styles={{
          rail: { background: "transparent", height: THUMB_H },
          track: { background: "rgba(156, 163, 175, 0.5)", height: THUMB_H },
          handle: { opacity: 0, boxShadow: "none" },
        }}
        style={{
          position: "absolute",
          inset: 0,
          padding: 0,
          margin: 0,
        }}
      />
    </div>
  );
};

TrimSlider.propTypes = {
  width: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  videoSrc: PropTypes.string.isRequired,
  trim: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrimSlider;
