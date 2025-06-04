const HintButton = ({ gameStarted, gameOver, onClick, isAutoPlaying }) => {
  return (
    <div>
      {gameStarted && !gameOver && (
        <button
          onClick={onClick}
          className={`px-4 py-2 rounded-full text-white transition-colors duration-200 ${
            isAutoPlaying 
              ? "bg-green-500 hover:bg-green-600 shadow-lg" 
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          Auto Play: {isAutoPlaying ? "ON" : "OFF"}
        </button>
      )}
    </div>
  );
};

export default HintButton;
