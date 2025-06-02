function CharacterSelectFrom() {
  return (
    <>
      <div className="text-2xl mb-8 font-mediumm">
        분석할 캐릭터를 선택하세요
      </div>
      <div className="flex justify-evenly items-center mb-8 text-[#515151] ">
        <button
          type="button"
          onClick={() => {}}
          className="border-none focus:outline-none bg-white"
        >
          왼쪽 캐릭터
        </button>
        <div>|</div>
        <button
          type="button"
          onClick={() => {}}
          className="border-none focus:outline-none bg-white"
        >
          오른쪽 캐릭터
        </button>
      </div>
    </>
  );
}

export default CharacterSelectFrom;
