import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiExternalLink } from 'react-icons/hi';
import './styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'News Sentiment Analysis on Stock Trends',
    description: 'Flask-based web app processing 1,000+ news headlines/day to assess real-time sentiment impact on stock prices. Integrated VADER for sentiment scoring (accuracy to 85%). Used PCA and ML regression to forecast price trends (15% MSE reduction). Enabled real-time camera-based gesture confirmation using OpenCV.',
    tools: ['Python', 'Flask', 'VADER', 'OpenCV', 'HTML/CSS'],
    link: '#',
  },
  {
    title: 'Tesla Stock Interactive Dashboard',
    description: 'Interactive dashboard visualizing 5+ key KPIs of Tesla stock, using auto-refreshed web data pulled via Power Query. Automated data collection, reducing manual updates. Created visuals like candlestick charts, KPIs, and speedometers.',
    tools: ['Excel', 'Power Query', 'VBA Macros', 'Web Integration'],
    link: '#',
  },
  {
    title: 'Virtual Plant Care Assistant',
    description: 'Interactive chatbot providing plant care advice using real-time Perenual API data. Implemented watering schedule predictions and integrated image capture to upload plant photos and identify type for personalized watering timers.',
    tools: ['Python', 'HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects__title-area > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.projects__title-area', start: 'top 85%' }
        }
      );

      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: '.projects__grid', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Gradient Descent Visualization Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    // "Weights" stepping down the gradient
    const particles: { x: number, y: number, history: {x:number, y:number}[] }[] = [];

    const init = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      centerX = width / 2;
      centerY = height / 2;

      particles.length = 0;
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          history: []
        });
      }
    };

    window.addEventListener('resize', init);
    init();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const scrollY = window.scrollY;
      const effectiveCenterY = centerY - (scrollY * 0.1);

      // Draw contour map (cost function surface)
      ctx.lineWidth = 1;
      const numContours = 15;
      for (let c = 1; c <= numContours; c++) {
        const radiusX = c * 50;
        const radiusY = c * 30;
        
        ctx.beginPath();
        ctx.ellipse(centerX, effectiveCenterY, radiusX, radiusY, 0, 0, Math.PI * 2);
        
        // Fading cyan rings
        const alpha = 0.04 * (1 - c / numContours);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.stroke();
      }

      // Update and draw particles (Gradient Descent steps)
      const stepSize = 1.5;
      
      particles.forEach((p) => {
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 40) p.history.shift();

        // Calculate gradient points towards center
        const dx = centerX - p.x;
        const dy = effectiveCenterY - p.y;
        
        // Add "SGD" noise
        const noiseX = (Math.random() - 0.5) * 4;
        const noiseY = (Math.random() - 0.5) * 4;

        p.x += (dx * 0.005) + (noiseX * 0.1) * stepSize;
        p.y += (dy * 0.005) + (noiseY * 0.1) * stepSize;

        const distToMin = Math.sqrt(dx*dx + dy*dy);
        if (distToMin < 15) {
           p.x = Math.random() > 0.5 ? -100 : width + 100;
           p.y = Math.random() * height;
           p.history = [];
        }

        // Optimization Path
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i = 1; i < p.history.length; i++) {
            ctx.lineTo(p.history[i].x, p.history[i].y);
          }
          ctx.strokeStyle = `rgba(0, 229, 255, 0.3)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Particle head (Current weight value)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00E5FF';
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Global Minimum Marker
      ctx.beginPath();
      ctx.arc(centerX, effectiveCenterY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="section-container">
        <div className="projects__title-area">
          <p className="section-subtitle">Projects</p>
          <h2 className="section-title">
            Neural <span>Network</span> of Work
          </h2>
          <p className="projects__desc">
            Data science and AI/ML projects connected through a neural pathway — each one building upon learned knowledge.
          </p>
        </div>
        <div className="projects__grid-wrapper">
          <canvas className="projects__neural-canvas" ref={canvasRef} />
          <div className="projects__grid">
            {projectsData.map((project, i) => (
              <div className="project-card" key={i}>
                <div className="project-card__number">
                  <span>0{i + 1}</span>
                </div>
                <div className="project-card__content">
                  <div className="project-card__agent-badge">
                    <span className="pulse-dot"></span> AGENT ACTIVE
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-card__tools">
                    {project.tools.map((tool, j) => (
                      <span key={j} className="project-card__tool">{tool}</span>
                    ))}
                  </div>
                  <div className="project-card__links">
                    <a href={project.link} target="_blank" rel="noreferrer" className="project-card__link">
                       View Project <HiExternalLink />
                    </a>
                  </div>
                </div>
                <div className="project-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
