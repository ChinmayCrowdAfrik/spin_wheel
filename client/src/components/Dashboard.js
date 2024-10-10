import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useButtonContext } from './ButtonContext';

function Dashboard() {
  const [targetNumbers, setTargetNumbers] = useState([]);
  const navigate = useNavigate();
  const { isButtonDisabled, setIsButtonDisabled } = useButtonContext();


  useEffect(() => {
    const isLoggedin = localStorage.getItem('auth');
    if (!isLoggedin) {
      navigate('/login');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numbers = targetNumbers.split(',').map(num => num.trim());

    // Check if there are exactly 6 numbers and all are between 1 and 60, and not empty
    if (
      numbers.length === 6 &&
      numbers.every(num =>
        num !== '' &&
        !isNaN(num) &&
        Number.isInteger(Number(num)) &&
        Number(num) >= 1 &&
        Number(num) <= 60
      )
    ) {
      try {
        await fetch('http://localhost:5000/set-numbers', {
          method: "post",
          body: JSON.stringify({ numbers }),
          headers: {
            'content-type': 'application/json'
          }
        });
        alert('Target numbers set successfully!');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Enter 6 valid numbers between 1 and 60 seperated by commas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login')
  };

  const toggleButtonState = () => {
    setIsButtonDisabled((prev) => !prev);

  };

  return (
    <div className="Dashboard">
      <div className="grid grid-cols-2 grid-rows-1 -mt-20 -ml-40">
        <div></div>
        <div className="flex justify-between space-x-4">
          <h1 className="font-bold text-3xl text-white mt-5">Dashboard</h1>
          <div>
            <Link to="/" className="text-sm m-2 p-3 leading-none border rounded text-black bg-white hover:text-white hover:bg-black">
              Go to SpinWheel
            </Link>
            <button onClick={handleLogout} className="bg-black m-2 px-6 py-3 border border-red-500 text-red-500 hover:bg-gray-800 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-rows-2 grid-cols-2 grid-flow-col gap-4 '>
        <div className="mx-auto w-3/4 mt-10 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h1 className='text-white text-3xl flex justify-start'>Enter the winning numbers here</h1>
            <div className="form-group mb-4">
              <input
                type="text"
                className="s rounded w-full placeholder-white border border-white p-3 bg-gray-700 flex justify-start"
                name="numbers"
                onChange={(e) => { setTargetNumbers(e.target.value); }}
                placeholder="Enter target numbers separated by comma"
              />
            </div>
            <button className="rounded text-black text-md h-10 w-1/2 bg-gradient-to-r from-gray-400 to-white">
              Set the target
            </button>
          </form>


          {targetNumbers.length > 0 && (
            <p className="text-white text-xl mt-5">Current Target Numbers: {targetNumbers}</p>
          )}
        </div>

        <div className='mx-auto w-3/4 mt-10 '>
          <h1 className='m-4 text-2xl text-white flex justify-start'>Spin wheel controls</h1>


          <div className="flex flex-col justify-start">

            <label class="inline-flex m-1 items-center cursor-pointer">
              <input type="checkbox" onClick={toggleButtonState} class="sr-only peer" checked={!isButtonDisabled} />
              <span class="ms-3 text-xl  text-white mr-5 ">Off</span>
              <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-orange-600"></div>
              <span class="ms-3 text-xl  text-white ml-5">On</span>
            </label>
            <div className="m-2 rounded-lg flex ">
              <span className="text-red-500 text-2xl mr-1">⚠️</span>
              <p className="text-white text-lg text-left w-3/4">
                Keep in mind that turning it off after every spin is mandatory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
