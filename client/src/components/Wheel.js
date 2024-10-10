import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useButtonContext } from './ButtonContext';
import '../App.css'; // Assuming you're using this for global styles like fonts.
import { Dialog } from './Dialog';

function Wheel() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { isButtonDisabled } = useButtonContext();

  useEffect(() => {
    const isLoggedin = localStorage.getItem('user_auth');
    if (!isLoggedin){
      navigate('/user-login');
    }
  },[])

  const finalResult = data.length > 5;

  const fetchTargetNumber = async () => {
    let data = await fetch('http://localhost:5000/get-result');
    const { result } = await data.json();
    setResult(result);
    setTargetNumber(result[index]);
  };

  const spinWheel = () => {
    if (targetNumber === null) {
      
      return;
    }

    if (finalResult) {
      
      return;
    }

    setSpinning(true);
    const totalNumbers = 60;
    const degreesPerNumber = 360 / totalNumbers;

    const fullSpins = 3 + Math.floor(Math.random() * 3); // Ensure at least 2 full spins
    const targetDegree = (targetNumber - 1) * degreesPerNumber; // Degree to reach the target number
    const totalDegrees = fullSpins * 360 + targetDegree;

    // Reset the wheel's transform before applying the new rotation
    wheelRef.current.style.transition = 'none';
    wheelRef.current.style.transform = `rotate(0deg)`; // Reset the wheel to 0 degrees

    // Trigger a reflow to ensure the reset takes effect
    void wheelRef.current.offsetWidth; // Forces reflow to make sure the reset rotation is applied

    // Now apply the actual spin with the new target rotation
    wheelRef.current.style.transition = 'transform 5s ease-out'; // Smooth transition
    wheelRef.current.style.transform = `rotate(${totalDegrees}deg)`; // Rotate to target

    setTimeout(() => {
      setSpinning(false);
      if (index < 5) {
        setTargetNumber(result[index + 1]);
        setIndex((index) => index + 1);
      }
      setData((data) => [...data, result[index]]);
      
    }, 5000);
  };

  useEffect(() => {
    fetchTargetNumber();

    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
    });

    socket.addEventListener('message', (event) => {
      console.log('Message from server: ', event.data);
      try {
        const { message } = JSON.parse(event.data);
        if (message === "Reset") {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  const generateWheelSegments = () => {
    const totalNumbers = 60;
    const degreesPerNumber = 360 / totalNumbers;
    const radius = 200;

    const segments = [];
    for (let i = 0; i < totalNumbers; i++) {
      const startAngle = i * degreesPerNumber;
      const endAngle = (i + 1) * degreesPerNumber;

      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
      const startX = 200 + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
      const startY = 200 + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
      const endX = 200 + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
      const endY = 200 + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

      const pathData = `M 200,200 L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;

      segments.push(
        <path
          key={i}
          d={pathData}
          fill={i % 2 === 0 ? 'yellow' : 'orange'}
          stroke="black"
        />
      );
    }
    return segments;
  };

  const handleLogout = () => {
    localStorage.removeItem('user_auth');
    navigate('/user-login')
  };

  return (
    <div className="text-white Wheel">
      <div className='flex justify-end relative'>
        <button onClick={handleLogout} className="m-2 px-6 py-3 border border-red-500 text-red-500 rounded absolute -top-32  mt-4 justify-end lg:px-8 lg:py-4 2xl:px-12 2xl:py-6 lg:text-2xl 2xl:text-4xl">Logout</button>
      </div>

      <div className='grid grid-rows-1 grid-flow-col gap-4 items-center'>
        <div className="wheel-container flex flex-row items-center justify-center">
          <div className="wheel relative lg:w-96 lg:h-96 2xl:w-128 2xl:h-128" ref={wheelRef}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{
                transformOrigin: '50% 50%',
                transition: 'transform 5s ease-out',
              }}
            >
              {generateWheelSegments()}
              <circle cx="200" cy="200" r="20" fill="black" />
            </svg>
            <div className="pointer"></div>
          </div>


          <div className="numbers-circle">
            {[...Array(60).keys()].map((num) => (
              <div
                key={num}
                className="number"
                style={{
                  '--rotate': `${num * 6}deg`,
                }}
              >
                {num + 1}
              </div>
            ))}
          </div>
        </div>

        <button
          className={`mt-8  rounded-2xl text-black text-md h-14 w-40 text-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition ${spinning || finalResult || isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''} lg:w-64 lg:h-20 2xl:w-96 2xl:h-32 lg:text-2xl 2xl:text-6xl`}
          onClick={spinWheel}
          disabled={spinning || finalResult || isButtonDisabled}
        >
          {spinning ? 'Spinning...' : 'Start'}
        </button>
      </div>


      <div className='flex flex-col ml-96'>
        <h1 className='text-3xl text-white lg:text-5xl 2xl:text-8xl'>Winning Numbers</h1>
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">
          {data.map((r, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-700 text-white py-5 px-7 2xl:px-14 2xl:py-12 2xl:m-3 m-1 rounded-md lg:text-2xl 2xl:text-7xl"
            >
              {r}{idx < data.length - 1 ? ' ' : ''}
            </span>

          ))}
        </h2>
      </div>



      {createPortal(
        <Dialog open={finalResult} result={data} />,
        document.body
      )}
    </div>
  );
}

export default Wheel;
