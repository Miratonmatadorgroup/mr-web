import formatTime from "@/utils/formatTime";
import { useEffect, useState } from "react";

interface TimerProps {
  duration: number; // in seconds
  onStopped?: () => void; // optional callback when timer expires
}

const Timer = ({ duration = 120, onStopped }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;
        if (newTime === 90 && isActive) {
          console.log("90 seconds left");
          setIsActive(false);
          onStopped && onStopped();
        }
        if (newTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-center px-2">
      <p className="text-xl font-semibold">{formatTime(remainingTime)}</p>
    </div>
  );
};

export default Timer;
