import formatTime from "@/utils/formatTime";
import { useEffect, useState } from "react";

interface TimerProps {
  stop: boolean; // flag to stop the timer
  duration: number; // in seconds
  onStopped?: () => void; // optional callback when timer expires
}

const Timer = ({ duration = 120, onStopped, stop }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;
        if (stop && isActive) {
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
