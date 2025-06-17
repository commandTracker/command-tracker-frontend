import PropTypes from "prop-types";
import { GrFormPreviousLink } from "react-icons/gr";

import Input from "@/shared/components/Input";

const EmailInputForm = ({ email, onEmailChange, goToPreviousStep }) => {
  return (
    <div>
      <GrFormPreviousLink
        size="27"
        onClick={goToPreviousStep}
        className="cursor-pointer absolute top-2 left-2"
      />
      <div className="text-2xl mb-6 mt-6 font-mediumm">
        결과를 받을 이메일을 입력하세요
      </div>
      <div className="flex mb-6 text-[#515151]">
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            onEmailChange(e.target.value);
          }}
          placeholder="example@exam.com"
        />
      </div>
    </div>
  );
};

EmailInputForm.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  goToPreviousStep: PropTypes.func.isRequired,
};

export default EmailInputForm;
