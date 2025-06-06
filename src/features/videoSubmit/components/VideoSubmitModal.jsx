import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";
import EmailInputForm from "./EmailInputForm";
import SubmitResultModal from "./SubmitResultModal";

function VideoSubmitModal() {
  const [step, setStep] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [email, setEmail] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (step === 2) {
      try {
        const response = await fetch("http://localhost:3000/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedCharacter,
            email,
          }),
        });

        if (!response.ok) {
          throw new Error("서버 요청 실패");
        }

        setStep(1);
        setSelectedCharacter(null);
        setEmail("");
        setIsSuccessModalOpen(true);
      } catch {
        alert("제출에 실패했습니다!");
      }
    }
  };

  const handleButtonClick = () => {
    if (step === 1) {
      if (!selectedCharacter) {
        alert("캐릭터를 선택해주세요!");
        return;
      }
      setStep(2);
    } else {
      if (!email) {
        alert("이메일을 입력해주세요!");
        return;
      }
      handleSubmit();
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  return (
    <>
      <Modal
        onClick={handleButtonClick}
        buttonText={step === 1 ? "다음" : "제출"}
      >
        {step === 1 ? (
          <CharacterSelectFrom
            selectedCharacter={selectedCharacter}
            onCharacterSelect={setSelectedCharacter}
          />
        ) : (
          <EmailInputForm
            email={email}
            onEmailChange={setEmail}
            goToPreviousStep={goToPreviousStep}
          />
        )}
      </Modal>
      {isSuccessModalOpen && (
        <SubmitResultModal onClick={handleSuccessModalClose} />
      )}
    </>
  );
}

export default VideoSubmitModal;
