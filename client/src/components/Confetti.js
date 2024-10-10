import React from 'react';
import coinImage from '../coin.png'; // Use import for image paths

const Confetti = () => {
  const generateCoins = (numCoins) => {
    return Array.from({ length: numCoins }).map((_, i) => {
      const randomX = Math.random() * 100; // Random horizontal position
      const randomDelay = Math.random() * 2; // Random animation delay
      const randomSize = Math.random() * 2 + 1; // Increased size multiplier for coins

      return (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${randomX}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: '3s',
            top: '-100px',
            width: `${randomSize * 100}px`,
            height: `${randomSize * 100}px`,
          }}
        >
          {/* Use imported image */}
          <img
            src={coinImage} // Use the imported image reference here
            alt="coin"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {generateCoins(30)} {/* Generate 30 coins */}
    </div>
  );
};

export default Confetti;
