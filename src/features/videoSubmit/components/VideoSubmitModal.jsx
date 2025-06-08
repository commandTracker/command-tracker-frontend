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
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!email) {
        throw new Error("이메일을 입력해주세요");
      }
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
      setIsSuccessSubmit(true);
    } catch (err) {
      setError(err.message || "서버 요청 실패");
    }
  };

  const selectCharacter = () => {
    try {
      if (!selectedCharacter) {
        throw new Error("캐릭터를 선택해주세요");
      }
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessSubmit(false);
    navigate("/");
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <>
      <Modal
        onClick={step === 1 ? selectCharacter : handleSubmit}
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
      {isSuccessSubmit && (
        <SubmitResultModal onClick={handleSuccessModalClose} />
      )}
      {error && (
        <Modal onClick={closeModal} buttonText="닫기">
          <p className="text-red-600 mb-4">{error}</p>
        </Modal>
      )}
    </>
  );
}

export default VideoSubmitModal;
