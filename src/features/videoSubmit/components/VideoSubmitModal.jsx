import { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";
import EmailInputForm from "./EmailInputForm";

const VideoSubmitModal = ({ videoId, trim }) => {
  const [step, setStep] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email.trim() === "") {
        throw new Error("이메일을 입력해주세요");
      }

      if (!videoId) {
        throw new Error("비디오 ID가 없습니다.");
      }

      await axios.post("/api/edit", {
        trimStart: trim[0],
        trimEnd: trim[1],
        videoId,
        selectedCharacter,
        email,
      });

      setSelectedCharacter(null);
      setEmail("");

      navigate("/submit_success", { state: { email, selectedCharacter } });
    } catch (err) {
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
      {error && <ErrorModal onClick={closeModal} message={error} />}
    </>
  );
};

VideoSubmitModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  trim: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default VideoSubmitModal;
