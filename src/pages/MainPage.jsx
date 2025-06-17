import { useState } from "react";

import axios from "axios";
import {
  LuMousePointerClick,
  LuLink,
  LuLoader,
  LuCircleCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import StepCard from "@/features/userGuide/components/StepCard";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/ErrorModal";
import Input from "@/shared/components/Input";
import LoadingModal from "@/shared/components/LoadingModal";

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
      <p className="text-gray-700 text-lg mb-10">
        캐릭터의 동작을 분석하고, 커맨드 입력을 추적합니다.
      </p>
      <div className="flex gap-3 w-full">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="유튜브 링크를 입력하세요"
        />
        <Button onClick={handleSubmit}>제출</Button>
      </div>
      {isLoading && <LoadingModal />}
      {error && <ErrorModal onClose={() => setError("")} message={error} />}
      <section className="w-full max-w-2xl mt-16">
        <h2 className="text-xl font-semibold mb-6">사용 방법</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={<LuLink className="h-10 w-10 text-indigo-500" />}
            title="1. 링크 입력"
            desc="분석할 유튜브 영상의 URL을 입력하고 제출버튼을 누르면 영상이 불러와집니다."
          />
          <StepCard
            icon={
              <LuLoader className="h-10 w-10 text-indigo-500 animate-spin" />
            }
            title="2. 분석 요청"
            desc="불러온 영상의 편집을 끝내고 분석 요청을 하면 분석이 시작됩니다."
          />
          <StepCard
            icon={<LuCircleCheck className="h-10 w-10 text-indigo-500" />}
            title="3. 결과 확인"
            desc="커맨드 추적 결과를 메일로 확인 할 수 있습니다."
          />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
