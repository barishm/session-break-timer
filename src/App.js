import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { decrementBreakTime, 
  incrementBreakTime, 
  decrementSessionTime, 
  incrementSessionTime,
  setIsRunning,
  setTimingType,
  setTimeLeft, 
  setBreakTime,
  setSessionTime,
  stopIsRunning} from "./redux/timeSlice";
  const defaultSessionTime = 25;
  const defaultBreakTime = 5;
  const defaultTimeLeft = 1500;

function App() {
  const dispatch = useDispatch();
  const {breakTime,sessionTime,timeLeft,timingType,isRunning} = useSelector((state) => state.time);
  

  const timeFormatter = () => {
    const mins = Math.floor(timeLeft / 60);
    const seconds = timeLeft - mins * 60;
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${formattedMins}:${formattedSeconds}`;
  }
  const handleReset = () => {
    const audio = document.getElementById("beep");

    dispatch(setSessionTime(defaultSessionTime));
    dispatch(setBreakTime(defaultBreakTime));
    dispatch(setTimingType("Session"));
    dispatch(setTimeLeft(defaultTimeLeft));

    dispatch(stopIsRunning());

    audio.pause();
    audio.currentTime = 0;
  }

  const handlePlay = () => {
    dispatch(setIsRunning());
  }

  const resetTimer = React.useCallback(() => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "Session") {
      dispatch(setTimeLeft(breakTime * 60))
      dispatch(setTimingType("Break"))
      audio.play()
    }
    if (!timeLeft && timingType === "Break") {
      dispatch(setTimeLeft(sessionTime * 60))
      dispatch(setTimingType("Session"))
      audio.pause()
      audio.currentTime = 0;
    }
  }, [dispatch, timeLeft, timingType, breakTime, sessionTime]);

  useEffect(() => {
    let intervalId;
  
    if (isRunning) {
      intervalId = setInterval(() => {
        if (timeLeft > 0) {
          dispatch(setTimeLeft(timeLeft - 1));
        } else {
          resetTimer();
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  
  }, [isRunning, timeLeft, dispatch, resetTimer]);


  return (
    <div id="container">
    <div className="App">
      <div className="main-title">25 + 5 Clock</div>
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button className="btn-level" id="break-decrement" value="-" onClick={() => {dispatch(decrementBreakTime())}}>
          <i className="fa fa-arrow-down fa-2x"></i>
        </button>
        <div className="btn-level" id="break-length">
          {breakTime}
        </div>
        <button className="btn-level" id="break-increment" value="+" onClick={() => {dispatch(incrementBreakTime())}}>
          <i className="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button className="btn-level" id="session-decrement" value="-" onClick={() => {dispatch(decrementSessionTime())}}>
          <i className="fa fa-arrow-down fa-2x"></i>
        </button>
        <div className="btn-level" id="session-length">
          {sessionTime}
        </div>
        <button className="btn-level" id="session-increment" value="+" onClick={() => {dispatch(incrementSessionTime())}}>
          <i className="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>
      <div className="timer" style={{ color: 'white' }}>
        <div className="timer-wrapper">
          <div id="timer-label">{timingType}</div>
          <div id="time-left">{timeFormatter()}</div>
        </div>
      </div>
      <div className="timer-control">
        <button id="start_stop" onClick={handlePlay}>
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
    </div>
  );
}

export default App;