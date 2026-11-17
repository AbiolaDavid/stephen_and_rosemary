import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoveStory from './components/LoveStory';
import WeddingDetails from './components/WeddingDetails';
// Future imports: PhotoGallery, Toast, Inspiration, RSVP, MusicPlayer, WishesForm, FloatingWishes, Footer

function App() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <LoveStory />
        <WeddingDetails />
        {/* Add remaining sections here */}
      </main>
      {/* <MusicPlayer /> */}
      {/* <FloatingWishes /> */}
    </div>
  );
}

export default App;