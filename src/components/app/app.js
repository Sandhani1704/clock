import './app.css';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function App() {

  const [clockTime, setClockTime] = useState(new Date());
  const [timerBack, setTimerBack] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState('');

  const date = new Date().toISOString();
  const formatDigits = (num) => (num < 10 ? `0${num}` : `${num}`);

  // обычные часы
  useEffect(() => {
    if (!timerBack) {

      const interval = setInterval(() => {
        setClockTime((clockTime) => new Date(clockTime.getTime() + 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerBack, date]);

  const goClockBack = () => {
    setTimerBack(true)
    const interval = setInterval(() => {
      setClockTime((clockTime) => new Date(clockTime.getTime() - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }

  const hours = formatDigits(clockTime.getHours());
  const minutes = formatDigits(clockTime.getMinutes());
  const seconds = formatDigits(clockTime.getSeconds());

  const getСurrentTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  }

  return (
    <div className="app">
      <div className="clock__digits">
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{currentTime}</p>
      <div className="clock__buttons">
        <Button
          variant="primary"
          className="m-2 mr-3 btn btn-primary"
          onClick={goClockBack} >
          back
        </Button>
        <Button
          variant="primary"
          className="m-2 mr-3 btn btn-primary"
          onClick={getСurrentTime} >
          getСurrentTime
        </Button>
      </div>
    </div>
  );
}

export default App;
