import React, { useState, useEffect } from "react";
import { format, differenceInSeconds } from "date-fns";

const CountdownTimer = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = differenceInSeconds(targetDate, currentTime);
      setRemainingTime(difference > 0 ? difference : 0);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="countdown">
      <div className="countdown__item">
        <span>{days.toString().padStart(2, "0")}</span>
        <p>Ngày</p>
      </div>
      <div className="countdown__item">
        <span>{hours.toString().padStart(2, "0")}</span>
        <p>Giờ</p>
      </div>
      <div className="countdown__item">
        <span>{minutes.toString().padStart(2, "0")}</span>
        <p>Phút</p>
      </div>
      <div className="countdown__item">
        <span>{seconds.toString().padStart(2, "0")}</span>
        <p>Giây</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
