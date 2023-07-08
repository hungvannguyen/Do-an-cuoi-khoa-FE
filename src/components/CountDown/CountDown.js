import React, { useState, useEffect } from "react";

const CountdownTimer = ({ days, hours, minutes, seconds }) => {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + days);
  endTime.setHours(endTime.getHours() + hours);
  endTime.setMinutes(endTime.getMinutes() + minutes);
  endTime.setSeconds(endTime.getSeconds() + seconds);

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [isCountdownFinished, setCountdownFinished] = useState(false);

  function calculateRemainingTime() {
    const currentTime = new Date();
    const difference = endTime - currentTime;
    return Math.max(0, Math.floor(difference / 1000));
  }

  useEffect(() => {
    if (remainingTime <= 0) {
      setCountdownFinished(true);
      // Xử lý khi đếm ngược kết thúc
      // Ví dụ: hiển thị thông báo hoặc thực hiện một hành động nào đó
    } else {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          const updatedTime = prevTime - 1;
          if (updatedTime <= 0) {
            clearInterval(intervalId);
            setCountdownFinished(true);
          }
          return updatedTime;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime > 0) {
      localStorage.setItem("countdownRemainingTime", remainingTime.toString());
    }
  }, [remainingTime]);

  useEffect(() => {
    const storedRemainingTime = localStorage.getItem("countdownRemainingTime");
    if (storedRemainingTime && remainingTime <= 0) {
      const parsedRemainingTime = parseInt(storedRemainingTime, 10);
      if (!isNaN(parsedRemainingTime) && parsedRemainingTime > 0) {
        setRemainingTime(parsedRemainingTime);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleBeforeUnload() {
    if (remainingTime > 0) {
      localStorage.setItem("countdownRemainingTime", remainingTime.toString());
    } else {
      localStorage.removeItem("countdownRemainingTime");
    }
  }

  const displayDays = Math.floor(remainingTime / (24 * 60 * 60));
  const displayHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const displayMinutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const displaySeconds = remainingTime % 60;

  return (
    <div className="countdown">
      {isCountdownFinished ? (
        <p>Chương trình đã kết thúc</p>
      ) : (
        <>
          <div className="countdown__item">
            <span>{displayDays.toString().padStart(2, "0")}</span>
            <p>Days</p>
          </div>
          <div className="countdown__item">
            <span>{displayHours.toString().padStart(2, "0")}</span>
            <p>Hours</p>
          </div>
          <div className="countdown__item">
            <span>{displayMinutes.toString().padStart(2, "0")}</span>
            <p>Min</p>
          </div>
          <div className="countdown__item">
            <span>{displaySeconds.toString().padStart(2, "0")}</span>
            <p>Sec</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
