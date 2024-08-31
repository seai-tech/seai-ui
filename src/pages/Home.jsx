import React, {useState} from 'react';
import styles from '../style/Home.module.css';
import wheel from '../assets/blueWheel.png';
import phone from '../assets/1.png';
import bulb from '../assets/2.png';
import magnifier from '../assets/3.png';
import chart from '../assets/4.png';
import radar from '../assets/5.png';
import puzzle from '../assets/6.png';
import timeManagement from '../assets/time-management.png';
import dataScience from '../assets/data-science.png';
import analysis from '../assets/analysis.png';



const Home = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    { title: 'Scalable', content: 'Embrace digital innovation effortlessly with our scalable platform, tailored to meet your evolving business requirements at your own speed' },
    { title: 'Customer-Centric Approach', content:'We prioritize your needs, offering tailored support and adaptable solutions to help you navigate the complexities of crew management and maritime operations efficiently.' },
    { title: 'Insightful', content:'Benefit from our advanced data processing and analytics, transforming your data into actionable insights and timely notifications' },
    { title: 'Compatability', content:'Our open, user-friendly platform integrates flawlessly with your current systems and dedicated expert services' },
  ];
  
    return (
      <>
      <div className={styles.container} id={styles.firstContainer}>
        <div id={styles.textDiv}>
          <h1 className={styles.heading}>AI driven crew management</h1>
          <p className={styles.text}>At SeAI, we leverage advanced AI and data analytics to transform maritime crew management. Our solutions ensure regulatory compliance, enhance operational efficiency, and streamline crew planning processes, setting new standards in the maritime industry.</p>
        </div>
        <div>
          <img src={wheel} alt="rotating wheel" id={styles.imgDiv} />
        </div>
      </div>

      <h1 className={styles.heading} id={styles.ourAdvantages}>Our advantages</h1>

      <div className={styles.container} id={styles.secondContainer}> 

        <div className={styles.card}>
          <img src={phone} alt="phone" />
          <div className={styles.cardContent}>
            <h3>Modular & user-friendly product</h3>
          </div>
        </div>

        <div className={styles.card}>
          <img src={bulb} alt="bulb" />
          <div className={styles.cardContent}>
            <h3>AI-powered and easy to scale</h3>
          </div>
        </div>

        <div className={styles.card}>
          <img src={magnifier} alt="magnifier" />
          <div className={styles.cardContent}>
            <h3>Turning unexplored data into insights</h3>
          </div>
        </div>

        <div className={styles.card}>
          <img src={chart} alt="chart" />
          <div className={styles.cardContent}>
            <h3>Quantifiable metrics for better planning</h3>
          </div>
        </div>

        <div className={styles.card}>
          <img src={radar} alt="radar" />
          <div className={styles.cardContent}>
            <h3>Complete ecosystem for key stakeholders</h3>
          </div>
        </div>

        <div className={styles.card}>
          <img src={puzzle} alt="puzzle" />
          <div className={styles.cardContent}>
            <h3>Easy to integrate with existing solutions</h3>
          </div>
        </div>

      </div>


      <h1 className={styles.heading} id={styles.whyUs}>Why Us</h1>

      <div className={styles.container}>
      <div id={styles.textDiv}>
          
          <p className={styles.text}>Our team bring deep industry expertise and a clear understanding of crew management eco system pain points. Adopting the latest technology, we are dedicated to offering solutions that not only address these challenges but also enhance efficiency and compliance. Partner with us for insights and innovations designed to navigate the complexities of maritime operations backbones.</p>
        </div>
       


       <div className={styles.accordionContent} >
        {accordionData.map((item, index) => (
          <div key={index}>
            <button
              className={styles.accordion}
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <i class="fa-solid fa-angle-down"></i>
            </button>
            <div
              className={`${styles.panel} ${activeIndex === index ? styles.active : ''}`}
            >
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      </div>

      <h1 className={styles.heading} id={styles.seaiEnableYou}>SeAI enable YOU</h1>
      <div className={styles.container} id={styles.fourthContainer}>
        <div>
          <img src={timeManagement } />
          <p>Become time efficient</p>
        </div>

        <div>
          <img src={dataScience} />
          <p>Streamline core processes</p>
        </div>

        <div>
          <img src={analysis} />
          <p>Make data driven decisions</p>
        </div>
      </div>

        <div className={styles.buttonContainer}>
        <button className={styles.bookDemo}>Book Demo</button>

        </div>
      


      </>
      
    );
  };
  
  export default Home;