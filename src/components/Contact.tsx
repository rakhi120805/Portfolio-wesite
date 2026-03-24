import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMail, HiExternalLink } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact__content > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.contact__content', start: 'top 90%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div className="contact__content">
          <p className="section-subtitle">Get in Touch</p>
          <h2 className="contact__heading">
            Let's Build Something <span>Intelligent</span> Together
          </h2>
          <p className="contact__desc">
            I'm open to data science, machine learning, and AI engineering opportunities. 
            Feel free to reach out if you'd like to collaborate or have a role that fits my skill set.
          </p>

          <a href="mailto:rakhikumarii7277@gmail.com" className="contact__email-btn glow-btn">
            <HiMail />
            rakhikumarii7277@gmail.com
          </a>

          <div className="contact__socials">
            <a href="https://github.com/rakhi120805" target="_blank" rel="noreferrer" className="contact__social-link">
              <FaGithub />
              <span>GitHub</span>
              <HiExternalLink className="contact__social-arrow" />
            </a>
            <a href="http://www.linkedin.com/in/rakhi-kumari-a76503287/" target="_blank" rel="noreferrer" className="contact__social-link">
              <FaLinkedin />
              <span>LinkedIn</span>
              <HiExternalLink className="contact__social-arrow" />
            </a>
            <a href="tel:+918340790941" className="contact__social-link">
              <span>+91 8340790941</span>
              <HiExternalLink className="contact__social-arrow" />
            </a>
          </div>

          <div className="contact__footer">
            <div className="contact__divider" />
            <p>Designed & Built by <span>Rakhi Kumari</span></p>
            <p className="contact__year">© 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
