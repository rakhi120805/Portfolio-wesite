import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/TechStack.css';

gsap.registerPlugin(ScrollTrigger);

const techData = [
  { name: 'C++', color: '#00599C' },
  { name: 'Python', color: '#3776AB' },
  { name: 'C', color: '#A8B9CC' },
  { name: 'SQL', color: '#CC6600' },
  { name: 'Google Sheets', color: '#34A853' },
  { name: 'Excel', color: '#217346' },
  { name: 'Tableau', color: '#E97627' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#F05032' },
  { name: 'GitHub', color: '#181717' },
  { name: 'Flask', color: '#999999' },
  { name: 'OpenCV', color: '#5C3EE8' },
  { name: 'Pandas', color: '#150458' },
  { name: 'NumPy', color: '#013243' },
  { name: 'Matplotlib', color: '#11557C' },
  { name: 'VADER', color: '#d4a5a5' },
  { name: 'Problem-Solving', color: '#e8a87c' },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.techstack__title-area > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: '.techstack__title-area', start: 'top 85%' }
        }
      );

      // Animate each bubble in
      gsap.fromTo('.tech-bubble',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: { each: 0.06, from: 'random' }, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.techstack__bubbles', start: 'top 85%' }
        }
      );

      // Add parallax scrolling interactivity
      if (bubblesRef.current) {
        gsap.to(bubblesRef.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: '.techstack',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2D Physics Engine for moving bubbles with elastic collisions
  useEffect(() => {
    const container = bubblesRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll('.physics-node');
    if (!nodes.length) return;

    container.style.position = 'relative';
    container.style.minHeight = '600px'; 
    container.style.height = '600px'; 
    container.style.overflow = 'hidden';

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    const radius = 45; // 90px total width/height from CSS

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize physics state
    const particles = Array.from(nodes).map((el) => ({
      el: el as HTMLElement,
      x: Math.random() * (width - radius * 2) + radius,
      y: Math.random() * (height - radius * 2) + radius,
      vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.5),
      vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.5),
      radius: radius
    }));

    // Ensure elements are absolutely positioned for physics
    particles.forEach(p => {
      p.el.style.position = 'absolute';
      p.el.style.left = '-45px'; // Adjust so x,y is the center 
      p.el.style.top = '-45px';
    });

    let animationId: number;

    const updatePhysics = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x - p.radius <= 0) {
          p.x = p.radius;
          p.vx *= -1;
        } else if (p.x + p.radius >= width) {
          p.x = width - p.radius;
          p.vx *= -1;
        }

        if (p.y - p.radius <= 0) {
          p.y = p.radius;
          p.vy *= -1;
        } else if (p.y + p.radius >= height) {
          p.y = height - p.radius;
          p.vy *= -1;
        }
      }

      // Sphere collisions (Elastic 1D momentum transfer)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const v1x = p1.vx * cos + p1.vy * sin;
            const v1y = p1.vy * cos - p1.vx * sin;
            const v2x = p2.vx * cos + p2.vy * sin;
            const v2y = p2.vy * cos - p2.vx * sin;

            // Swap the x velocities for perfectly elastic collision of equal mass
            const newV1x = v2x;
            const newV2x = v1x;

            // Rotate back
            p1.vx = newV1x * cos - v1y * sin;
            p1.vy = v1y * cos + newV1x * sin;
            p2.vx = newV2x * cos - v2y * sin;
            p2.vy = v2y * cos + newV2x * sin;

            // Prevent sticking by separating them instantly
            const overlap = minDist - dist;
            p1.x -= (overlap / 2) * cos;
            p1.y -= (overlap / 2) * sin;
            p2.x += (overlap / 2) * cos;
            p2.y += (overlap / 2) * sin;
          }
        }
      }

      // Apply transform visually
      for (let i = 0; i < particles.length; i++) {
        particles[i].el.style.transform = `translate(${particles[i].x}px, ${particles[i].y}px)`;
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="techstack" id="techstack" ref={sectionRef}>
      <div className="section-container">
        <div className="techstack__title-area">
          <p className="section-subtitle">Tech Stack</p>
          <h2 className="section-title">
            Tools & <span>Technologies</span>
          </h2>
          <p className="techstack__desc">
            Technologies I use to build data-driven solutions and intelligent systems.
          </p>
        </div>
        <div className="techstack__bubbles" ref={bubblesRef}>
          {techData.map((tech, i) => (
            <div className="physics-node" key={i} style={{ willChange: 'transform' }}>
              <div
                className="tech-bubble"
                style={{
                  '--bubble-color': tech.color,
                  '--bubble-glow': `${tech.color}33`,
                } as React.CSSProperties}
              >
                <div className="tech-bubble__inner">
                  <span className="tech-bubble__name">{tech.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
