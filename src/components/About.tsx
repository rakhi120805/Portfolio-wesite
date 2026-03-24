import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiSparkles, HiLightBulb, HiChartBar } from 'react-icons/hi';
import './styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const passions = [
  {
    icon: <HiChartBar />,
    title: 'Data Analysis',
    description: 'Uncovering patterns and insights from complex datasets to drive data-informed decision making.',
  },
  {
    icon: <HiSparkles />,
    title: 'Machine Learning',
    description: 'Building predictive models and intelligent systems that learn from data and improve over time.',
  },
  {
    icon: <HiLightBulb />,
    title: 'AI Research',
    description: 'Exploring cutting-edge AI methodologies including deep learning, NLP, and computer vision.',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about__text > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.about__text', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo('.about__passion-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
          scrollTrigger: { trigger: '.about__passions', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="about__content">
          <div className="about__text">
            <p className="section-subtitle">About Me</p>
            <h2 className="section-title">
              Passionate About <span>Data</span> & <span>AI</span>
            </h2>
            <p className="about__description">
              I'm a Data Science student with a deep passion for uncovering meaningful insights from data 
              and building intelligent systems. My journey in data science has equipped me with strong 
              analytical skills and hands-on experience in machine learning, statistical analysis, and 
              data visualization.
            </p>
            <p className="about__description">
              I'm actively seeking opportunities in Data Science, Machine Learning, and AI-related roles 
              where I can contribute my skills and grow alongside talented teams. I believe in the power 
              of data to transform industries and improve lives.
            </p>
          </div>
          <div className="about__passions">
            {passions.map((item, i) => (
              <div className="about__passion-card" key={i}>
                <div className="about__passion-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
