import './app.css';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function App() {

  const [clockTime, setClockTime] = useState(new Date());
  const [timerBack, setTimerBack] = useState(false);
  const [currentTime, setCurrentTime] = useState([]);
  
  const formatDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

  useEffect(() => {
    if (!timerBack) {

      const interval = setInterval(() => {
        setClockTime((clockTime) => new Date(clockTime.getTime() + 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timerBack) {

      const interval = setInterval(() => {
        setClockTime((clockTime) => new Date(clockTime.getTime() - 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerBack]);

  const getCurrentTime = () => {
    setCurrentTime([...currentTime, new Date().toLocaleTimeString()]);
  }

  const hours = formatDigits(clockTime.getHours());
  const minutes = formatDigits(clockTime.getMinutes());
  const seconds = formatDigits(clockTime.getSeconds());

  return (
    <div className="app">
      <div className="clock__digits">
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {currentTime.map((item, key) => (
        <p key={key}>time: {item}</p>
      ))}
      <div className="clock__buttons">
        <Button
          variant="primary"
          className="m-2 mr-3 btn btn-primary"
          onClick={() => setTimerBack((timerBack) => !timerBack)}>
          {timerBack ? 'Go Clock Forward' : 'Go Clock Back'}
        </Button>
        <Button
          variant="primary"
          className="m-2 mr-3 btn btn-primary"
          onClick={getCurrentTime} >
          Get Current Time
        </Button>
        <Button
          variant="primary"
          className="m-2 mr-3 btn btn-primary"
          onClick={() => setClockTime(new Date())} >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
