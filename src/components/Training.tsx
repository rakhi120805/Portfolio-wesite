import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiLightningBolt } from 'react-icons/hi';
import './styles/Training.css';

gsap.registerPlugin(ScrollTrigger);

const trainingData = [
  {
    title: 'A Guide to Machine Learning with Data Science',
    organization: 'Cipher Schools (Edtech Company)',
    period: "Jun '25 – Jul '25",
    bullets: [
      'Constructed a heart disease risk prediction system using Logistic Regression and Decision Tree models based on clinical features like age, cholesterol, resting BP, and fasting blood sugar.',
      'Compared both models through detailed accuracy, precision, recall, and confusion matrix evaluation to determine the more dependable predictive approach.',
      'Enhanced model performance by refining preprocessing steps, addressing data imbalance, and tuning key hyperparameters for more reliable prediction outcomes.',
    ],
  },
];

const Training = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.training__title-area > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.training__title-area', start: 'top 85%' }
        }
      );

      gsap.fromTo('.training__card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
          scrollTrigger: { trigger: '.training__content', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="training" id="training" ref={sectionRef}>
      <div className="section-container">
        <div className="training__title-area">
          <p className="section-subtitle">Experience & Learning</p>
          <h2 className="section-title">
            Industry <span>Training</span>
          </h2>
        </div>
        <div className="training__content">
          {trainingData.map((item, i) => (
            <div className="training__card" key={i}>
              <div className="training__card-header">
                <div className="training__icon">
                  <HiLightningBolt />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <div className="training__meta">
                    <span className="training__org">{item.organization}</span>
                    <span className="training__dot">•</span>
                    <span className="training__period">{item.period}</span>
                  </div>
                </div>
              </div>
              <ul className="training__bullets">
                {item.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
