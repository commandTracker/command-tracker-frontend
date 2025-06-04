import { GrFormPreviousLink } from "react-icons/gr";

import Input from "@/shared/components/Input";

function EmailInputForm() {
  return (
    <div>
      <GrFormPreviousLink size="27" />
      <div className="text-2xl mb-8 mt-4 font-mediumm">
        결과를 받을 이메일을 입력하세요
      </div>
      <div className="flex mb-8 text-[#515151]">
        <Input
          type="email"
          value=""
          onChange={() => {}}
          placeholder="example@exam.com"
        />
      </div>
    </div>
  );
}

export default EmailInputForm;
