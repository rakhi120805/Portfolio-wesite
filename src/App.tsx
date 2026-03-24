import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import IntroSequence from './components/IntroSequence';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Training from './components/Training';
import Certifications from './components/Certifications';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  // Force GSAP ScrollTrigger to recalculate DOM layout once intro completes
  useEffect(() => {
    if (isIntroFinished) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isIntroFinished]);

  return (
    <div className="app">
      {!isIntroFinished && (
        <IntroSequence onComplete={() => setIsIntroFinished(true)} />
      )}
      <div className="global-spline-bg">
        <iframe 
          src='https://my.spline.design/aidatamodelinteraction-HlhXtL3HhUQ6T9QdGNUBPUuT/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline 3D Background"
        ></iframe>
      </div>
      
      {isIntroFinished && (
        <>
          <Navbar />
          <main>
            <Hero isIntroFinished={isIntroFinished} />
            <About />
            <Education />
            <Training />
            <Certifications />
            <TechStack />
            <Projects />
          </main>
          <Contact />
        </>
      )}
    </div>
  );
};

export default App;
