import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HiDownload } from 'react-icons/hi';
import './styles/Hero.css';

interface HeroProps {
  isIntroFinished: boolean;
}

const Hero = ({ isIntroFinished }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!isIntroFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero__greeting', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero__name', { y: 30, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero__role-tag', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.8')
        .from('.hero__role-divider', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.8')
        .from('.hero__tagline', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__actions > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.6')
        .from('.hero__image-wrapper', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'power2.out' }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroFinished]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__container section-container">
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__greeting">Hello, I'm</p>
            <h1 className="hero__name">
              Rakhi<br />
              <span>Kumari</span>
            </h1>
            <div className="hero__role">
              <span className="hero__role-tag">Data Scientist</span>
              <span className="hero__role-divider">|</span>
              <span className="hero__role-tag">AI/ML Engineer</span>
            </div>
            <p className="hero__tagline">
              Passionate about turning data into actionable insights and building intelligent systems that solve real-world problems.
            </p>
            <div className="hero__actions">
              <a href="/resume.pdf" download className="glow-btn">
                <HiDownload />
                Download CV
              </a>
              <a href="#contact" className="hero__contact-btn" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Get in Touch
              </a>
            </div>
          </div>
          <div className="hero__image-wrapper">
            <img
              src="/profile.png"
              alt="Rakhi Kumari - Data Scientist"
              className="hero__image"
            />
          </div>
        </div>
        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
