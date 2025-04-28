import "../App.css";
import { useEffect, useRef, useState } from "react";
import GameInfo from "../components/GameInfo";
import RestartButton from "../components/button/RestartButton";
import BoardGame from "../components/BoardGame";
import { generateRandomPoints } from "../utils/generateRandomPoints";
import HintButton from "../components/button/HintButton";

function GamePlay() {
  const [time, setTime] = useState(0);
  const [points, setPoints] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [pointCount, setPointCount] = useState(10);
  const gameBoardRef = useRef(null);
  const [allCleared, setAllCleared] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [clickedPoints, setClickedPoints] = useState([]);
  const [hintPoint, setHintPoint] = useState(null);

  useEffect(() => {
    if (gameStarted && points.length === 0) {
      setAllCleared(true);
      if (timer) {
        clearInterval(timer);
      }
    }
  }, [points, gameStarted, timer]);

  const handleStart = () => {
    const board = gameBoardRef.current;
    if (board) {
      const boardWidth = board.clientWidth;
      const boardHeight = board.clientHeight;
      const randomPoints = generateRandomPoints(
        pointCount,
        boardWidth,
        boardHeight
      );

      setGameStarted(true);
      setGameOver(false);
      setTime(0);
      setPoints(randomPoints);
      setAllCleared(false);
      setNextNumber(1);
      setClickedPoints([]);
      setHintPoint(null);

      if (timer) {
        clearInterval(timer);
      }

      const newTimer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);

      setTimer(newTimer);
    }
  };

  const handlePointClick = (clickedId) => {
    if (!gameStarted || allCleared || gameOver) return;

    if (clickedId === nextNumber) {
      setClickedPoints((prev) => [...prev, clickedId]); 
      setTimeout(() => {
        setPoints((prev) => prev.filter((point) => point.id !== clickedId));
        setNextNumber((prev) => prev + 1);

        if (points.length === 1) {
          // Nếu là điểm cuối cùng
          setAllCleared(true);
          if (timer) clearInterval(timer);
        }
      }, 200); 
    } else {
      setGameOver(true);
      if (timer) clearInterval(timer);
    }
  };

  const handleHintClick = () => {
    if (!gameStarted || allCleared || gameOver) return;
    const nextPointToClick = points.find((point) => point.id === nextNumber);
    if (nextPointToClick) {
      setHintPoint(nextPointToClick.id); // Gợi ý điểm tiếp theo cần chọn
    }
  };

  const reset = () => {
    setGameStarted(false);
    setGameOver(false);
    setTime(0);
    setPoints([]);
    setAllCleared(false);
    setNextNumber(1);
    setClickedPoints([]);
    setHintPoint(null);
    if (timer) {
      clearInterval(timer);
    }
  };

  const handlePointCountChange = (newPointCount) => {
    const num = Math.abs(parseInt(newPointCount) || 1);
    const finalValue = Math.max(1, num);
    if (finalValue > 1000) {
      if (
        !window.confirm(
          `Bạn chắc chắn muốn tạo ${finalValue} điểm? Số lượng lớn có thể ảnh hưởng hiệu suất!`
        )
      ) {
        return;
      }
    }
    setPointCount(Math.max(1, num));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-4/5 max-w-2xl">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">LET'S PLAY !</h1>
          <GameInfo
            pointCount={pointCount}
            time={time}
            onPointCountChange={handlePointCountChange}
            gameStarted={gameStarted}
          />
          <div className=" w-full flex justify-around items-center align m-2 ">
            <HintButton
              onClick={handleHintClick}
              gameStarted={gameStarted}
              gameOver={gameOver}
            ></HintButton>
            <RestartButton
              onClick={gameStarted ? reset : handleStart}
              disabled={false}
              label={gameStarted ? "Reset Game" : "Start Game"}
            />
          </div>
          <BoardGame
            points={points}
            nextNumber={nextNumber}
            clickedPoints={clickedPoints}
            allCleared={allCleared}
            gameOver={gameOver}
            handlePointClick={handlePointClick}
            gameBoardRef={gameBoardRef}
            hintPoint={hintPoint}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
