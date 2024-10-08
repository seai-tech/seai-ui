import React, { useState } from 'react';
import wheel from '../../assets/blueWheel.png';
import phone from '../../assets/1.png';
import bulb from '../../assets/2.png';
import magnifier from '../../assets/3.png';
import chart from '../../assets/4.png';
import radar from '../../assets/5.png';
import puzzle from '../../assets/6.png';
import timeManagement from '../../assets/time-management.png';
import dataScience from '../../assets/data-science.png';
import analysis from '../../assets/analysis.png';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="home-container home-first-section">
        <div className="home-text-section">
          <h1 className="home-heading">AI driven crew management</h1>
          <p className="home-description">
            At SeAI, we leverage advanced AI and data analytics to transform maritime crew management. Our solutions ensure regulatory compliance, enhance operational efficiency, and streamline crew planning processes, setting new standards in the maritime industry.
          </p>
        </div>
        <div className="home-image-section">
          <img src={wheel} alt="rotating wheel" className="home-wheel-image" />
        </div>
      </div>

      <h1 className="home-section-title">Our Advantages</h1>

      <div className="home-container home-advantages-section">
        <div className="home-card">
          <img src={phone} alt="phone" className="home-card-image" />
          <div className="home-card-content">
            <h3>Modular & user-friendly product</h3>
          </div>
        </div>

        <div className="home-card">
          <img src={bulb} alt="bulb" className="home-card-image" />
          <div className="home-card-content">
            <h3>AI-powered and easy to scale</h3>
          </div>
        </div>

        <div className="home-card">
          <img src={magnifier} alt="magnifier" className="home-card-image" />
          <div className="home-card-content">
            <h3>Turning unexplored data into insights</h3>
          </div>
        </div>

        <div className="home-card">
          <img src={chart} alt="chart" className="home-card-image" />
          <div className="home-card-content">
            <h3>Quantifiable metrics for better planning</h3>
          </div>
        </div>

        <div className="home-card">
          <img src={radar} alt="radar" className="home-card-image" />
          <div className="home-card-content">
            <h3>Complete ecosystem for key stakeholders</h3>
          </div>
        </div>

        <div className="home-card">
          <img src={puzzle} alt="puzzle" className="home-card-image" />
          <div className="home-card-content">
            <h3>Easy to integrate with existing solutions</h3>
          </div>
        </div>
      </div>

      <h1 className="home-section-title">Why Us</h1>

      <div className="home-container">
          <p className="home-description">
            Our team brings deep industry expertise and a clear understanding of crew management ecosystem pain points. Adopting the latest technology, we are dedicated to offering solutions that not only address these challenges but also enhance efficiency and compliance. Partner with us for insights and innovations designed to navigate the complexities of maritime operations backbones.
          </p>
      </div>

      <h1 className="home-section-title">SeAI Enables YOU</h1>
      <div className="home-container home-seai-enables-section">
        <div className="home-enable-card">
          <img src={timeManagement} alt="Time Management" className="home-enable-card-image" />
          <p>Become time efficient</p>
        </div>

        <div className="home-enable-card">
          <img src={dataScience} alt="Data Science" className="home-enable-card-image" />
          <p>Streamline core processes</p>
        </div>

        <div className="home-enable-card">
          <img src={analysis} alt="Analysis" className="home-enable-card-image" />
          <p>Make data-driven decisions</p>
        </div>
      </div>

      <div className="home-button-container">
        <button className="home-book-demo-button">Book Demo</button>
      </div>
    </>
  );
};

export default Home;
