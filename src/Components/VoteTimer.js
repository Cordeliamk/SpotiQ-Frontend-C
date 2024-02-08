import { useEffect, useMemo, useState } from "react";

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Michroma&display=swap';
fontLink.rel = 'stylesheet';

const fontStyles = document.createElement('style');
fontStyles.innerHTML = `
  .timerText {
    font-family: 'Michroma', sans-serif;
    color: goldenrod;
    text-shadow: 0 0 10px #fff;
    font-weight: bolder;
    font-size: 40px;
  }

  .glow {
    text-shadow: 0 0 10px #fff, 0 0 20px indigo, 0 0 30px #ED8F03, 0 0 40px #FFB75E, 0 0 50px #FFB75E, 0 0 60px #FFB75E, 0 0 70px #FFB75E;
    animation: glow 1s ease-in-out infinite alternate;
    -webkit-animation: glow 1s ease-in-out infinite alternate;
  }

  @keyframes glow {
    0% {
      text-shadow: 0 0 10px #fff, 0 0 20px indigo, 0 0 30px #ED8F03, 0 0 40px #FFB75E, 0 0 50px #FFB75E, 0 0 60px #FFB75E, 0 0 70px #FFB75E;
    }
    40% {
      text-shadow: none;
    }
    100% {
      text-shadow: 0 0 10px #fff, 0 0 20px indigo, 0 0 30px #ED8F03, 0 0 40px #FFB75E, 0 0 50px #FFB75E, 0 0 60px #FFB75E, 0 0 70px #FFB75E;
    }
  }


  @-webkit-keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px indigo, 0 0 30px #ED8F03, 0 0 40px #FFB75E, 0 0 50px #FFB75E, 0 0 60px #FFB75E, 0 0 70px #FFB75E;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #FFB75E, 0 0 40px #FFB75E, 0 0 50px #FFB75E, 0 0 60px #FFB75E, 0 0 70px #FFB75E, 0 0 80px #FFB75E;
    }
  }
`;

document.head.appendChild(fontLink);
document.head.appendChild(fontStyles);

const SECOND = 1000;
const MINUTE = SECOND * 60;

export const VoteTimer = ({ endTime, pollInfo, setPollInfo, pageState, setPageState }) => {
  const parsedEndTime = useMemo(() => Date.parse(endTime), [endTime]);
  const [time, setTime] = useState((parsedEndTime + 7200000) - Date.now());

  useEffect(() => {
    if (pollInfo && time <= 0) {
      console.log("Tida er ute")
      
      setPageState({...pageState, poll: false, showWinner: true})
    }
  }, [time])

  useEffect(() => {

    const interval = setInterval(
      () => setTime(parsedEndTime - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedEndTime]);

  const minutes = Math.floor(time / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const isLast10Seconds = minutes === 0 && seconds <= 10;
    const timerClass = isLast10Seconds ? "timerText glow" : "timerText";
  

  return (
    <div className="timer">
      <p className={timerClass}>{formattedTime}</p>
    </div>
  );
};

export default VoteTimer;

