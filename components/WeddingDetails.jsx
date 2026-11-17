import React from 'react';
import { weddingConfig } from '../config/weddingConfig';

const WeddingDetails = () => {
  const formattedDate = new Date(weddingConfig.weddingDate).toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <section id="details" className="details-section">
      <div className="container">
        <h2 className="section-subtitle animate-on-scroll">Save The Date</h2>
        <h3 className="section-title animate-on-scroll">Wedding Details</h3>

        <div className="details-grid">
          <div className="detail-card animate-on-scroll">
            <div className="card-icon">📅</div>
            <h4>The Date</h4>
            <p className="detail-text">{formattedDate}</p>
            <p className="detail-subtext">at {weddingConfig.weddingTime}</p>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="card-icon">💒</div>
            <h4>The Ceremony</h4>
            <p className="detail-text">{weddingConfig.venue}</p>
            <p className="detail-subtext">{weddingConfig.venueAddress}</p>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="card-icon">🥂</div>
            <h4>The Reception</h4>
            <p className="detail-text">{weddingConfig.receptionVenue}</p>
            <p className="detail-subtext">Immediately following the ceremony</p>
          </div>
        </div>

        <div className="map-button-container animate-on-scroll">
          <a 
            href={weddingConfig.googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            Get Directions
          </a>
        </div>
      </div>

      <style jsx>{`
        .details-section {
          background: var(--warm-white);
          text-align: center;
        }
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin: 60px 0;
        }
        .detail-card {
          background: var(--ivory);
          padding: 40px 30px;
          border-radius: var(--border-radius);
          border: 1px solid rgba(212, 175, 119, 0.2);
          transition: var(--transition);
          box-shadow: 0 5px 20px rgba(100, 45, 61, 0.03);
        }
        .detail-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(212, 175, 119, 0.15);
          border-color: var(--champagne-gold);
        }
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .detail-card h4 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--deep-burgundy);
          margin-bottom: 15px;
        }
        .detail-text {
          font-family: var(--font-text);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 5px;
        }
        .detail-subtext {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-light);
        }
        .map-button-container {
          margin-top: 40px;
        }
      `}</style>
    </section>
  );
};

export default WeddingDetails;