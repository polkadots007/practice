import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClockUnits } from './constants'

interface countDetails {
  [key: string]: number;
}
interface ModalProps  {
  changeVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupModal = ({ changeVisibility }: ModalProps) => {
  return (
    <span className='modal'>
      <p className='modal-text'>Time out finished!</p>
      <button type='submit'onClick={() => changeVisibility((prev: boolean)=>!prev)}>Close</button>
    </span>
  )
}

function formatCount (count: number) {
  return count < 10 ? '0'+count.toString() : count;
}

function App() {
  const [type, setType] = useState<string>('seconds');
  const [userInput, setInput] = useState<string>("");
  const [timerCount, setTimer] = useState<countDetails>({
    seconds: 0, hours: 0, minutes: 0
  })
  const [startTimer, setTimerStatus] = useState<boolean>(false);
  const [showModal, setModalVisibility] = useState<boolean>(false);

  const getType = (event: React.ChangeEvent<HTMLSelectElement>, setType: React.Dispatch<React.SetStateAction<string>>) =>{
    console.log('event', event, event.target.value)
    setType(event.target.value);
  }

  const getTimer = (
    e: React.FormEvent<HTMLInputElement>,
    ) => {
    setInput((e.target as HTMLInputElement).value)

  }

  const updateTimer = (
    value: number,
     type: string, 
    ) => {
    if(startTimer) {
      reset();
    }
    if(type === 'seconds') {
      if(value <= 59) {
        setTimer((prev: countDetails)=>({
          ...prev,
          'seconds': value
        }))
      } else {
        const hours = Math.floor(value / 3600); // Calculate hours
        const remainingAfterHours = value % 3600; // Remaining seconds after hours
        const minutes = Math.floor(remainingAfterHours / 60); // Calculate minutes
        const seconds = remainingAfterHours % 60; // Remaining seconds
        setTimer(() => ({
          hours,
          minutes,
          seconds,
        }));
      }
    } else if (type === 'minutes') {
      if(value <= 59) {
        setTimer((prev: countDetails)=>({
          ...prev,
          'minutes': value
        }))
    } else {
      setTimer(()=>({     
        'hours': Math.floor(value / 60),
        'minutes': Math.floor((value - (value / 60)) / 60),
        'seconds': 0
      }))
    } 
    } else {
      setTimer((prev: countDetails)=>({
        ...prev,
        'hours': value
      }))
    }
    setTimerStatus(true);
  }

  const reset = () => {
    setInput(0);
    setModalVisibility(false);
    return;
  }

  useEffect(()=> {
    console.log('time count', timerCount)
  },[timerCount])
  useEffect(()=> {
    console.log('userInput count', userInput)
  },[userInput])

  useEffect(()=>{
    const initiateTimeout = () => {
      const times = type === 'hours' ? 3600 : type === 'minutes'? 60: 1;
      let tickDownCount = (parseInt(userInput) || 0) * times ;

      const interval = setInterval(() => {
        tickDownCount--;
    
        setTimer((prev: countDetails) => {
          if (prev.seconds > 0) {
            return {
              ...prev,
              seconds: prev.seconds - 1,
            };
          } else if (prev.minutes > 0) {
            return {
              ...prev,
              seconds: 59,
              minutes: prev.minutes - 1,
            };
          } else if (prev.hours > 0) {
            return {
              ...prev,
              seconds: 59,
              minutes: 59,
              hours: prev.hours - 1,
            };
          } else {
            clearInterval(interval); // Stop the interval when the countdown ends
            // Optional: Trigger modal visibility or other actions here
            return prev;
          }
        });
    
        if (tickDownCount <= 0) {
          clearInterval(interval); // Ensure interval stops when count reaches zero
          setModalVisibility(true);
        }
      }, 1000); // Update every second      

    }
      if(userInput !== 0 && startTimer){
          initiateTimeout();
      }
  },[startTimer, type, userInput])

  return (
    <div className="timer-app">
      <h1>Beat the Clock, Hit Your Goals!</h1>
      <div className="clock-face">
      {/* <span className='btn start'>
          <button type='submit' disabled={userInput === 0}>START</button>
        </span> */}
        <div className="clock-timer">
          <div className='unit hh'>
          {formatCount(timerCount.hours)}
          </div>
          <div className='joiner'>
              <div className='joiner-sym'>:</div>
          </div>
          <div className='unit mm'>
          {formatCount(timerCount.minutes)}
          </div>
          <div className='joiner'>
              <div className='joiner-sym'>:</div>
          </div>
          <div className='unit ss'>
          {formatCount(timerCount.seconds)}
          </div>
        </div>
        <div className='btn set'>
        <select value={type} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => getType(event, setType)}>
          <option value="minutes">Minutes</option>
          <option value="seconds">Seconds</option>
          <option value="hours">Hours</option>
        </select>
          <input type="number" value={userInput} className='inp-timer'onInput={(e: React.FormEvent<HTMLInputElement>) => getTimer(e)}/>
          <button type='submit' onClick={() => updateTimer(userInput, type)}>
          {startTimer ? 'STOP':  'START'}
          </button>
          <button type='submit' onClick={() => reset()}>
           RESET
          </button>
        </div>
        {showModal && <PopupModal changeVisibility={setModalVisibility} />}
      </div>
    </div>
  )
}

export default App
