import "../App.css";
import { useEffect, useRef, useState } from "react";
import GameInfo from "../components/GameInfo";
import RestartButton from "../components/button/RestartButton";
import BoardGame from "../components/BoardGame";
import { generateRandomPoints } from "../utils/generateRandomPoints";
import HintButton from "../components/button/AutoPlayButton";

function GamePlay() {
  const [time, setTime] = useState(0);
  const [points, setPoints] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [pointCount, setPointCount] = useState("0");
  const gameBoardRef = useRef(null);
  const [allCleared, setAllCleared] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [clickedPoints, setClickedPoints] = useState([]);
  const [hintPoint, setHintPoint] = useState(null);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showNextPointIndicator, setShowNextPointIndicator] = useState(true);
  const [clickedTimers, setClickedTimers] = useState({});
  const clickedTimersRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null); // Thêm ref để quản lý auto play timeout

  useEffect(() => {
    if (gameStarted && points.length === 0) {
      setAllCleared(true);
      if (timer) {
        clearInterval(timer);
      }
      setAutoPlaying(false);
    }
  }, [points, gameStarted, timer]);

  useEffect(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }

    if (!autoPlaying || gameOver || allCleared) return;

    const next = points.find((point) => point.id === nextNumber);
    if (!next) {
      setAutoPlaying(false);
      return;
    }

    autoPlayTimeoutRef.current = setTimeout(() => {
      handlePointClick(next.id);
    }, 1000);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
    };
  }, [autoPlaying, nextNumber, points, gameOver, allCleared]);

  useEffect(() => {
    clickedTimersRef.current = setInterval(() => {
      setClickedTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) {
            updated[id] = parseFloat((updated[id] - 0.1).toFixed(1));
            if (updated[id] <= 0) {
              updated[id] = 0;
            }
          }
        });
        return updated;
      });
    }, 100);

    return () => {
      if (clickedTimersRef.current) {
        clearInterval(clickedTimersRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (clickedTimersRef.current) {
        clearInterval(clickedTimersRef.current);
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  const handlePointClick = (clickedId) => {
    console.log("autoPlaying", autoPlaying);
    if (!gameStarted || allCleared || gameOver) return;

    if (clickedId === nextNumber) {
      setClickedTimers((prev) => ({ ...prev, [clickedId]: 3.0 }));
      setClickedPoints((prev) => [...prev, clickedId]);

      setTimeout(() => {
        setPoints((prev) => prev.filter((point) => point.id !== clickedId));
      }, 3000);

      setNextNumber((prev) => prev + 1);

      if (points.length === 1) {
        setTimeout(() => {
          setAllCleared(true);
          setAutoPlaying(false);
          if (timer) clearInterval(timer);
        }, 3000);
      }
    } else {
      setGameOver(true);
      setAutoPlaying(false);
      if (timer) clearInterval(timer);
    }
  };

  const handleAutoPlayToggle = () => {
    if (!gameStarted || allCleared || gameOver) return;

    setAutoPlaying(prev => {
      const newAutoPlaying = !prev;


      if (newAutoPlaying) {
        const nextPointToClick = points.find((point) => point.id === nextNumber);
        if (nextPointToClick) {
          setHintPoint(nextPointToClick.id);
        }
      } else {

        setHintPoint(null);
        if (autoPlayTimeoutRef.current) {
          clearTimeout(autoPlayTimeoutRef.current);
          autoPlayTimeoutRef.current = null;
        }
      }

      return newAutoPlaying;
    });
  };

  const reset = () => {
    if (timer) clearInterval(timer);
    if (clickedTimersRef.current) clearInterval(clickedTimersRef.current);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }

    setAutoPlaying(false);

    const board = gameBoardRef.current;
    if (!board) return;

    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;
    const randomPoints = generateRandomPoints(pointCount, boardWidth, boardHeight);

    setGameStarted(true);
    setGameOver(false);
    setTime(0);
    setPoints(randomPoints);
    setAllCleared(false);
    setNextNumber(1);
    setClickedPoints([]);
    setHintPoint(null);
    setClickedTimers({});

    if (timer) {
      clearInterval(timer);
    }

    const newTimer = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 100);

    setTimer(newTimer);

    clickedTimersRef.current = setInterval(() => {
      setClickedTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) {
            updated[id] = parseFloat((updated[id] - 0.1).toFixed(1));
            if (updated[id] <= 0) {
              updated[id] = 0;
            }
          }
        });
        return updated;
      });
    }, 100);
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
            gameOver={gameOver}
            pointCount={pointCount}
            time={time}
            onPointCountChange={handlePointCountChange}
            gameStarted={gameStarted}
          />
          <div className=" w-full flex justify-around items-center align m-2 ">
            <HintButton
              onClick={handleAutoPlayToggle}
              gameStarted={gameStarted}
              gameOver={gameOver}
              isAutoPlaying={autoPlaying}
            />
            <RestartButton
              onClick={reset}
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
            clickedTimers={clickedTimers}
          />
          {showNextPointIndicator && !allCleared && !gameOver && gameStarted &&  (
            <div className="mt-4 text-lg font-semibold">
              Next point: {nextNumber}
              {autoPlaying && (
                <span className="ml-2 text-green-600">
                  (Auto Playing...)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
