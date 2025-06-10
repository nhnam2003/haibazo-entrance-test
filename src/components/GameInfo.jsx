const GameInfo = ({
  gameOver,
  pointCount,
  time,
  onPointCountChange,
  gameStarted,
}) => {
  return (
    <div className="m-4 w-3/5">
      <div className="flex items-center justify-start mb-4">
        <label className="text-sm font-medium mr-5">Number of Points:</label>
        {!gameStarted || !gameOver ? (
          <input
            type="number"
            className="border rounded p-1 w-20 text-center"
            value={pointCount}
            onChange={(e) => onPointCountChange(e.target.value)}
            min="1"
          />
        ) : (
          <span className="border rounded p-1 w-20 text-center bg-gray-100 ">
            {pointCount}
          </span>
        )}
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="text-sm font-medium mr-28">Time:</label>
        <div className="font-mono">{time.toFixed(1)}s</div>
      </div>

    </div>
  );
};
export default GameInfo;
