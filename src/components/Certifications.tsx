import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiBadgeCheck } from 'react-icons/hi';
import './styles/Certifications.css';

gsap.registerPlugin(ScrollTrigger);

const certificationsData = [
  {
    title: 'Git and GitHub',
    issuer: 'Cipher School',
    date: "Jul '25",
    link: '#',
  },
  {
    title: 'Data Structures and Algorithm Certificate',
    issuer: 'NeoColab',
    date: "Apr '24",
    link: '#',
  },
  {
    title: 'Responsive Web design Certification',
    issuer: 'FreeCodeCamp',
    date: "Aug '23",
    link: '#',
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.certifications__title-area > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.certifications__title-area', start: 'top 85%' }
        }
      );

      gsap.fromTo('.certifications__card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.certifications__grid', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="section-container">
        <div className="certifications__title-area">
          <p className="section-subtitle">Licenses & Certifications</p>
          <h2 className="section-title">
            My <span>Certifications</span>
          </h2>
        </div>
        <div className="certifications__grid">
          {certificationsData.map((cert, i) => (
            <a href={cert.link} target="_blank" rel="noreferrer" className="certifications__card" key={i} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
              <div className="certifications__icon">
                <HiBadgeCheck />
              </div>
              <div className="certifications__content">
                <h3>{cert.title}</h3>
                <p className="certifications__issuer">{cert.issuer}</p>
                <p className="certifications__date">{cert.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
