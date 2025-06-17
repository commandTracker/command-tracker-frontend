import { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import LoadingModal from "@/shared/components/LoadingModal";
import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";
import EmailInputForm from "./EmailInputForm";
import SubmitResultModal from "./SubmitResultModal";

const VideoSubmitModal = ({
  videoId,
  trim,
  closeModal,
  setError,
  step,
  setStep,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [email, setEmail] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email.trim() === "") {
        throw new Error("이메일을 입력해주세요");
      }

      if (!videoId) {
        throw new Error("비디오 ID가 없습니다.");
      }

      setIsLoading(true);

      await axios.post("/api/edit", {
        trimStart: trim[0],
        trimEnd: trim[1],
        videoId,
        selectedCharacter,
        email,
      });

      setIsLoading(false);
      setStep(1);
      setSelectedCharacter(null);
      setEmail("");
      setIsSubmitSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || err.message);
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
    setIsSubmitSuccess(false);
    navigate("/");
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  return (
    <div>
      <Modal
        onClose={closeModal}
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
      {isSubmitSuccess && (
        <SubmitResultModal
          onClose={handleSuccessModalClose}
          onClick={handleSuccessModalClose}
        />
      )}
      {isLoading && <LoadingModal />}
    </div>
  );
};

VideoSubmitModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  trim: PropTypes.arrayOf(PropTypes.number).isRequired,
  closeModal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default VideoSubmitModal;
