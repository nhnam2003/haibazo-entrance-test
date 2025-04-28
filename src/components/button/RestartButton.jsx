const RestartButton = ({
  onClick,
  disabled = false,
  label = "Restart Game",
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default RestartButton;
