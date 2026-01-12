import { useEffect, useState } from "react";

const useCountdown = (endTime) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const diff = new Date(endTime) - new Date();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { minutes, seconds, timeLeft };
};

export default useCountdown;
