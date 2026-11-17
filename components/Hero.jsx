import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import Countdown from './Countdown';

const Hero = () => {
  const handleExploreClick = (e) => {
    e.preventDefault();
    document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle animate-fade-in">We are getting married</p>
        <h1 className="hero-names animate-fade-in-delay">
          {weddingConfig.groomFullName.split(' ')[0]} 
          <span className="ampersand">&</span> 
          {weddingConfig.brideFullName.split(' ')[0]}
        </h1>
        <p className="hero-date animate-fade-in-delay-2">
          {new Date(weddingConfig.weddingDate).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}
        </p>
        
        <Countdown targetDate={weddingConfig.weddingDate} />
        
        <button className="btn-primary animate-fade-in-delay-3" onClick={handleExploreClick}>
          Explore Our Wedding
        </button>
      </div>

      <style jsx>{`
        .hero-section {
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: url('/images/hero-bg.jpg') center/cover no-repeat;
          color: var(--warm-white);
          text-align: center;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(100, 45, 61, 0.6), rgba(212, 175, 119, 0.4));
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 0 20px;
          max-width: 800px;
        }
        .hero-subtitle {
          font-family: var(--font-script);
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: var(--champagne-gold);
          margin-bottom: 10px;
          letter-spacing: 2px;
        }
        .hero-names {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 8vw, 6rem);
          color: var(--warm-white);
          margin-bottom: 20px;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .ampersand {
          font-family: var(--font-script);
          color: var(--champagne-gold);
          font-size: 0.8em;
          margin: 0 15px;
          display: inline-block;
          transform: translateY(-5px);
        }
        .hero-date {
          font-family: var(--font-text);
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-style: italic;
          margin-bottom: 40px;
          letter-spacing: 1px;
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-fade-in-delay { animation: fadeIn 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fadeIn 1s ease-out 0.6s forwards; opacity: 0; }
        .animate-fade-in-delay-3 { animation: fadeIn 1s ease-out 0.9s forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Hero;