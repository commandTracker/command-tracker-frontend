import { LuMousePointerClick } from "react-icons/lu";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

function MainPage() {
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
          value="youtube url"
          onChange={() => {}}
          placeholder="유튜브 링크를 입력하세요"
        />
        <Button onClick={() => {}}>제출</Button>
      </div>
    </div>
  );
}

export default MainPage;
