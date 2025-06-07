import PropTypes from "prop-types";

import Modal from "@/shared/components/Modal";

const SubmitResultModal = ({ onClick }) => {
  return (
    <Modal onClick={onClick} buttonText="확인">
      <div className="text-xl mb-4 font-mediumm">제출이 완료되었습니다</div>
      <p className="text-[#515151] mb-4">
        분석이 끝나면 이메일로 결과를 보내드릴게요
      </p>
    </Modal>
  );
};

SubmitResultModal.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SubmitResultModal;
