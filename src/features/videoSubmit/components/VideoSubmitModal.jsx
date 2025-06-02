import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";

function VideoSubmitModal() {
  const step = 1;

  return (
    <Modal onClick={() => {}} buttonText={step === 1 ? "다음" : "제출"}>
      <CharacterSelectFrom />
    </Modal>
  );
}

export default VideoSubmitModal;
