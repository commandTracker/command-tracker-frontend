import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";
import EmailInputForm from "./EmailInputForm";

function VideoSubmitModal() {
  const step = 1;

  return (
    <Modal onClick={() => {}} buttonText={step === 1 ? "다음" : "제출"}>
      {step === 1 ? <CharacterSelectFrom /> : <EmailInputForm />}
    </Modal>
  );
}

export default VideoSubmitModal;
