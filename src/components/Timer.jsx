import formatTime from "../utils/formatTime";

const Timer = ({ seconds }) => {
  return (
    <h1 className="text-6xl font-bold text-center">
      {formatTime(seconds)}
    </h1>
  );
};

export default Timer;