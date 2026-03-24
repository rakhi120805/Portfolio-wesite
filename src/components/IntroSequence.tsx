import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/IntroSequence.css';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scrolling while intro plays
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
        // Hide container completely after animation
        if (containerRef.current) containerRef.current.style.display = 'none';
      },
    });

    // 1. Fade in the text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    )
    
    // 2. Wait a bit, then fade text out
    .to(textRef.current, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in', delay: 1 })
    
    // 3. Zoom the video dramatically (simulating flying into the data)
    .to(
      videoRef.current,
      { scale: 5, opacity: 0, filter: 'blur(20px)', duration: 1.5, ease: 'power4.in' },
      '-=0.2'
    )
    
    // 4. Fade out the whole container to reveal Hero
    .to(containerRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.5');

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="intro-sequence" ref={containerRef}>
      {/* 
        Using a placeholder tech/data video from Pexels.
        User can replace this with their own local video later.
      */}
      <video
        ref={videoRef}
        className="intro-sequence__video"
        autoPlay
        muted
        loop
        playsInline
        src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
      />
      <div className="intro-sequence__overlay"></div>
      
      <div className="intro-sequence__text" ref={textRef}>
        <h1>INITIALIZING DATA</h1>
        <p>Rakhi Kumari // AI/ML Portfolio</p>
      </div>
    </div>
  );
};

export default IntroSequence;
