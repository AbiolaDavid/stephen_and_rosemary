import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isComplete = Object.keys(timeLeft).length === 0;

  if (isComplete) {
    return (
      <div className="countdown-complete">
        <p>We are married!</p>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      {Object.keys(timeLeft).map(interval => (
        <div key={interval} className="countdown-item">
          <span className="countdown-number">{timeLeft[interval]}</span>
          <span className="countdown-label">{interval}</span>
        </div>
      ))}
      
      <style jsx>{`
        .countdown-container {
          display: flex;
          justify-content: center;
          gap: clamp(15px, 4vw, 40px);
          margin: 40px 0;
        }
        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(212, 175, 119, 0.3);
          border-radius: 12px;
          padding: 20px 15px;
          min-width: 80px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .countdown-number {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: var(--warm-white);
          font-weight: 700;
          line-height: 1;
        }
        .countdown-label {
          font-family: var(--font-body);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--champagne-gold);
          margin-top: 8px;
        }
        .countdown-complete {
          font-family: var(--font-script);
          font-size: 2.5rem;
          color: var(--champagne-gold);
          margin: 40px 0;
        }
      `}</style>
    </div>
  );
};

export default Countdown;