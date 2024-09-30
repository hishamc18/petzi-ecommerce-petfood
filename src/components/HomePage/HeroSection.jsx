import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        interval={2500}
        transitionTime={700}
        axis='vertical'
        centerMode={false}
      >
        <div>
          <img src="src/assets/hero-image1.jpg" alt="Slide-1" />
        </div>
        <div>
          <img src="src/assets/hero-image2.jpg" alt="Slide-2" />
        </div>
        <div>
          <img src="src/assets/hero-image3.jpg" alt="Slide-3" />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;