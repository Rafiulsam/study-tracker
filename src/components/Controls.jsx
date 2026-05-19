const Controls = ({
  isRunning,
  startTimer,
  stopTimer,
}) => {
  return (
    <div className="flex justify-center mt-8 h-12">
      {!isRunning ? (
        <button
          onClick={startTimer}
          className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out opacity-100 transform hover:scale-105 hover:shadow-lg btn-animate cursor-pointer"
        >
          Start
        </button>
      ) : (
        <button
          onClick={stopTimer}
          className="px-6 py-3 bg-linear-to-r from-red-400 to-red-500 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out opacity-100 transform hover:scale-105 hover:shadow-lg btn-animate cursor-pointer"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default Controls;