import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { GameContext } from "../../contexts/GameContext";


const Counter = () => {

  const { time, setTime, isActive, handleStart, handleStop, handleReset } = useContext(GameContext);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  })

  const formatTime = (secs) => {
    const pad = (n) => n < 10 ? `0${n}` : n;

    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs / 60) - (h * 60);
    const s = Math.floor(secs - h * 3600 - m * 60);

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  return (
    <>
      <div className={styles['counter-container']} >
        <h2 className={styles['title']}>🕹️ Memory card game 🎮</h2>
        <p className={styles['time']}>{formatTime(time)}</p>
        {
          isActive ? (
            <div className={styles['button']}>
              <button onClick={handleStop} className={`${styles.button} ${styles.stop}`}>Stop</button>
            </div>
          ) : (
            <div className={styles['button-container']}>
              <button onClick={handleStart} className={`${styles.button} ${styles.start}`}>Start</button>
              <button onClick={handleReset} className={`${styles.button} ${styles.reset}`}>Reset</button>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Counter;
