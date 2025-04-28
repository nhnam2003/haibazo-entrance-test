const HintButton = ({ gameStarted, gameOver, onClick }) => {
  return (
    <div>
      {gameStarted && !gameOver && (
        <button
          onClick={onClick}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
        >
          Hint
        </button>
      )}
    </div>
  );
};
export default HintButton;