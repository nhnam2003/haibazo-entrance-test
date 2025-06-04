import React from "react";
import "../App.css";

const BoardGame = ({
  points,
  nextNumber,
  clickedPoints,
  allCleared,
  gameOver,
  handlePointClick,
  gameBoardRef,
  hintPoint,
  clickedTimers,
}) => {
  const pointSize = 50;
  const halfSize = pointSize / 2;

  return (
    <div>
      <div
        ref={gameBoardRef}
        className="relative border-2 border-gray-300 w-full h-[60vh] min-h-[400px] max-h-[600px] aspect-square mx-auto"
      >
        {allCleared ? (
          <div className="absolute inset-0 flex items-center justify-center bg-green-50">
            <h2 className="text-4xl font-bold text-green-500 animate-bounce">
              ALL CLEARED!
            </h2>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <h2 className="text-4xl font-bold text-red-500">GAME OVER!</h2>
          </div>
        ) : (
          <>
            {[...points]
              .sort((a, b) => a.id - b.id)
              .map((point, index) => {
                const isClicked = clickedPoints.includes(point.id);
                const timerValue = clickedTimers[point.id] ?? 0;

                return (
                  <div
                    key={point.id}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer rounded-full border-2 text-black
          ${point.id === hintPoint ? "scale-110 bg-yellow-200" : ""}
          ${isClicked ? "transition-all duration-3000 ease-out" : ""}
          hover:bg-gray-100`}
                    style={{
                      left: `${Math.max(
                        0,
                        Math.min(
                          point.x - halfSize,
                          gameBoardRef.current?.clientWidth - pointSize || 0
                        )
                      )}px`,
                      top: `${Math.max(
                        0,
                        Math.min(
                          point.y - halfSize,
                          gameBoardRef.current?.clientHeight - pointSize || 0
                        )
                      )}px`,
                      width: `${pointSize}px`,
                      height: `${pointSize}px`,
                      zIndex: points.length - index,
                      backgroundColor: isClicked
                        ? `rgba(167, 243, 208, ${timerValue / 3})`
                        : point.id === hintPoint
                          ? "#FEF08A"
                          : "#FFFFFF",
                      opacity: isClicked ? timerValue / 3 : 1,
                    }}
                    onClick={() => !isClicked && handlePointClick(point.id)}
                  >
                    <span className="text-2xl font-bold">{point.id}</span>
                    {isClicked && (
                      <span className="text-xs">
                        {timerValue > 0 ? timerValue.toFixed(1) + "s" : "0.0s"}
                      </span>
                    )}
                  </div>
                );
              })}

          </>
        )}
      </div>
    </div>
  );
};

export default BoardGame;
