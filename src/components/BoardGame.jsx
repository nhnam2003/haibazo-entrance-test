import React from "react";

const BoardGame = ({
  points,
  nextNumber,
  clickedPoints,
  allCleared,
  gameOver,
  handlePointClick,
  gameBoardRef,
  hintPoint,
}) => {
  const pointSize = 60;
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
            {points.map((point) => (
              <div
                key={point.id}
                className={`absolute flex items-center justify-center cursor-pointer
                ${point.id === nextNumber ? "bg-white" : "bg-white"}
                ${point.id === hintPoint ? "scale-110 bg-yellow-200" : ""}
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
                  fontSize: "24px",
                  borderRadius: "50%",
                  borderWidth: "2px",
                  transition: "opacity 1.5s ease, background-color 0.5s ease",
                  opacity: clickedPoints.includes(point.id) ? "0" : "1",
                  zIndex: point.id, // Changed to use point.id directly
                  backgroundColor: clickedPoints.includes(point.id)
                    ? "#00FF00"
                    : point.id === hintPoint
                    ? "#FEF08A"
                    : "#FFFFFF",
                }}
                onClick={() => handlePointClick(point.id)}
              >
                {point.id}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardGame;
