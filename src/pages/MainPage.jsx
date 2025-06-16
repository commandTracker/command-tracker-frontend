import { useState } from "react";

import axios from "axios";
import { LuMousePointerClick } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import CharacterGrid from "@/features/Character/CharacterGrid";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/ErrorModal";
import Input from "@/shared/components/Input";
import LoadingModal from "@/shared/components/LoadingModal";
import champions from "@/shared/data/champions";

const MainPage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (url.trim() === "") {
        throw new Error("유튜브 링크를 입력해주세요.");
      }

      setIsLoading(true);
      const response = await axios.post("/api/video", { youtubeUrl: url });
      setIsLoading(false);
      setUrl("");

      navigate("/video_editor", {
        state: {
          videoSrc: response.data.download_url,
          videoId: response.data.video_id,
        },
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      
      setIsLoading(false);
      setError(message);
    }
  };

  return (
    <div className="flex flex-col items-center py-5 px-4 w-full">
      <div className="flex gap-5">
        <LuMousePointerClick className="h-16 w-10" />
        <p className="flex justify-center text-4xl mb-10">
          Command
          <br />
          Tracker
        </p>
      </div>
      <div className="space-y-1 text-center mb-10">
        <p className="text-gray-700 text-lg">
          캐릭터의 동작을 분석하고, 커맨드 입력을 추적합니다.
        </p>
      </div>
      <div className="flex gap-3 w-full">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="유튜브 링크를 입력하세요"
        />
        <Button onClick={handleSubmit}>제출</Button>
      </div>
      {isLoading && <LoadingModal />}
      {error && <ErrorModal onClick={() => setError("")} message={error} />}
      <section className="w-full max-w-3xl mt-20">
        <h2 className="text-xl font-semibold mb-6">챔피언 목록</h2>
        <CharacterGrid list={champions} />
      </section>
    </div>
  );
};

export default MainPage;
