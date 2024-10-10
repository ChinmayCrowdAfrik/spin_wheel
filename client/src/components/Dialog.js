import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; // Import the CSS for the popup styles
import Confetti from './Confetti'; // Assuming your Confetti component is in the same folder

export const Dialog = ({ open, result, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      // Trigger confetti when the dialog opens
      setShowConfetti(true);

      // Stop confetti after a certain time if needed
      const timer = setTimeout(() => {
        setShowConfetti(false); // Optional: if you want to stop the confetti after some time
      }, 5000); // Adjust timing as necessary

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Popup
      open={open}
      closeOnDocumentClick={true}
      onClose={onClose}
      modal
      contentStyle={{ background: 'transparent', border: 'none' }}
    >
      {close => (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={close}
        >
          {/* Confetti component rendered while the popup is open */}
          {showConfetti && <Confetti />}

          <div
            className='bg-custom-gradient w-1/2 h-1/2 flex flex-col text-center rounded-3xl overflow-hidden animate-fadeIn relative z-10'
            onClick={e => e.stopPropagation()} // Prevent closing on inner modal content click
          >
            <div className='mt-7'>
              <h2 className="text-white text-6xl font-semibold text-center 2xl:text-9xl">Congratulations</h2>
              <p className="mt-2 text-2xl 2xl:text-5xl 2xl:mt-5 text-white">The winning number is</p>
              <h2 className="text-4xl lg:text-6xl 2xl:text-8xl font-bold text-white mt-4">{result.join(', ')}</h2>
            </div>
            <div className="flex justify-center">
              <img
                src="./gift.png"
                alt="Gift box"
                className="w-1/2 h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
