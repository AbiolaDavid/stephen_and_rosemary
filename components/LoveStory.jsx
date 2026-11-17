import React from 'react';
import { weddingConfig } from '../config/weddingConfig';

const LoveStory = () => {
  return (
    <section id="story" className="love-story-section">
      <div className="container">
        <h2 className="section-subtitle animate-on-scroll">Our Journey</h2>
        <h3 className="section-title animate-on-scroll">The Love Story</h3>
        
        <div className="story-content">
          <div className="story-profile bride animate-on-scroll">
            <div className="profile-image">
              <img src="/images/bride.jpg" alt={weddingConfig.brideFullName} loading="lazy" />
            </div>
            <h4 className="profile-name">{weddingConfig.brideFullName}</h4>
            <p className="profile-desc">{weddingConfig.brideDescription}</p>
          </div>

          <div className="story-narrative animate-on-scroll">
            <div className="narrative-ornament">✦</div>
            <p>{weddingConfig.loveStory}</p>
            <div className="narrative-ornament">✦</div>
          </div>

          <div className="story-profile groom animate-on-scroll">
            <div className="profile-image">
              <img src="/images/groom.jpg" alt={weddingConfig.groomFullName} loading="lazy" />
            </div>
            <h4 className="profile-name">{weddingConfig.groomFullName}</h4>
            <p className="profile-desc">{weddingConfig.groomDescription}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .love-story-section {
          background: var(--soft-cream);
          text-align: center;
        }
        .story-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 40px;
          align-items: center;
          margin-top: 60px;
        }
        .story-profile {
          text-align: center;
        }
        .profile-image {
          width: 220px;
          height: 220px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid var(--warm-white);
          box-shadow: 0 10px 30px rgba(100, 45, 61, 0.1);
          transition: var(--transition);
        }
        .profile-image:hover {
          transform: scale(1.05);
          border-color: var(--champagne-gold);
        }
        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-name {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--deep-burgundy);
          margin-bottom: 10px;
        }
        .profile-desc {
          font-family: var(--font-text);
          font-size: 1.1rem;
          color: var(--text-light);
          font-style: italic;
        }
        .story-narrative {
          font-family: var(--font-text);
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--text-dark);
          position: relative;
          padding: 20px;
        }
        .narrative-ornament {
          font-size: 1.5rem;
          color: var(--champagne-gold);
          margin: 15px 0;
        }

        @media (max-width: 900px) {
          .story-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .story-narrative {
            order: -1;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default LoveStory;