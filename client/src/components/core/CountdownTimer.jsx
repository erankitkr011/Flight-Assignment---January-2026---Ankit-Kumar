import { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const remaining = new Date(endTime) - new Date();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <p className="text-sm text-red-600 mt-2">
      High demand! Price resets in {minutes}:{seconds.toString().padStart(2, "0")}
    </p>
  );
};

export default CountdownTimer;
