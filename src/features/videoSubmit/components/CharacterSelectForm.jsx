import PropTypes from "prop-types";

function CharacterSelectFrom({ selectedCharacter, onCharacterSelect }) {
  return (
    <>
      <div className="text-2xl mb-8 font-mediumm">
        분석할 캐릭터를 선택하세요
      </div>
      <div className="flex justify-evenly items-center mb-8 text-[#515151] ">
        <button
          type="button"
          onClick={() => {
            onCharacterSelect("left");
          }}
          className={`border-none focus:outline-none px-4 py-2 rounded-md transition-colors
          ${selectedCharacter === "left" ? "bg-blue-50 text-blue-500 font-bold" : "bg-white text-gray-600"}`}
        >
          왼쪽 캐릭터
        </button>
        <div>|</div>
        <button
          type="button"
          onClick={() => {
            onCharacterSelect("right");
          }}
          className={`border-none focus:outline-none px-4 py-2 rounded-md transition-colors
          ${selectedCharacter === "right" ? "bg-blue-50 text-blue-500 font-bold" : "bg-white text-gray-600"}`}
        >
          오른쪽 캐릭터
        </button>
      </div>
    </>
  );
}

CharacterSelectFrom.propTypes = {
  selectedCharacter: PropTypes.string.isRequired,
  onCharacterSelect: PropTypes.func.isRequired,
};

export default CharacterSelectFrom;
