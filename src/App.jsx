import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import VideoEditor from "@/pages/VideoEditor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video_editor" element={<VideoEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
