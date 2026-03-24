import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiAcademicCap } from 'react-icons/hi';
import './styles/Education.css';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Bachelor of Technology (Computer Science and Engineering)',
    institution: 'Lovely Professional University | Phagwara, Punjab',
    year: 'Aug 23 – Present',
    detail: 'CGPA: 8.53',
    status: 'current',
  },
  {
    degree: 'Intermediate (PCM)',
    institution: "St Joseph's High School | Patna, Bihar",
    year: 'Mar 21 – May 22',
    detail: 'Percentage: 84%',
    status: 'completed',
  },
  {
    degree: 'Matriculation',
    institution: "St Joseph's High School | Patna, Bihar",
    year: 'Mar 19 – May 20',
    detail: 'Percentage: 90.8%',
    status: 'completed',
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.education__title-area > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.education__title-area', start: 'top 85%' }
        }
      );

      gsap.fromTo('.education__card',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.25,
          scrollTrigger: { trigger: '.education__timeline', start: 'top 85%' }
        }
      );

      gsap.fromTo('.education__timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.2, transformOrigin: 'top', ease: 'power2.out',
          scrollTrigger: { trigger: '.education__timeline', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="education" id="education" ref={sectionRef}>
      <div className="section-container">
        <div className="education__title-area">
          <p className="section-subtitle">Education</p>
          <h2 className="section-title">
            My <span>Academic</span> Journey
          </h2>
        </div>
        <div className="education__timeline">
          <div className="education__timeline-line" />
          {educationData.map((item, i) => (
            <div className={`education__card ${item.status === 'current' ? 'education__card--current' : ''}`} key={i}>
              <div className="education__card-dot">
                <HiAcademicCap />
              </div>
              <div className="education__card-content">
                <span className="education__year">{item.year}</span>
                <h3>{item.degree}</h3>
                <p className="education__institution">{item.institution}</p>
                <div className="education__detail">
                  <span>{item.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
