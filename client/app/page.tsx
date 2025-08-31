'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- DATA STRUCTURES ---

// skeleton for experience section - 
/*{
    duration: 'Summer 2024',
    title: 'Software Engineer Intern',
    company: 'A Cool Tech Company',
    description: 'Worked on the front-end of a major client-facing application, contributing to the development of new features, fixing bugs, and improving the overall user experience.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
  },*/
const experienceData = [
  {
    duration: 'Present',
    title: 'Professional Experience',
    company: 'N/A',
    description: 'My professional API is in development. Eager to connect with a team where I can build impactful features and begin my career. Endpoint will be updated shortly.',
    technologies: []
  },
  // Add more experience objects here
];

const projectData = [
  {
    title: 'Project Title Coming Soon 1',
    description: 'Project details and a live demo link will be updated soon.',
    githubUrl: 'https://github.com/ShivamVats00',
    liveUrl: '#', // Add live URL when available
    technologies: ['Next.js', 'Prisma', 'Vercel']
  },
  {
    title: 'Project Title Coming Soon 2',
    description: 'Project details and a live demo link will be updated soon.',
    githubUrl: 'https://github.com/ShivamVats00',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'Express']
  },
  // Add more project objects here
];

// --- COMPONENTS ---

// Preloader Component
function Preloader({ onLoaded }: { onLoaded: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(onLoaded, 500); 
      }, 1200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoaded]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-cyan text-2xl font-mono animate-pulse">SC</div>
    </div>
  );
}

// Animated Element Component
function AnimatedElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .group');
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div className={`hidden lg:block fixed pointer-events-none z-50 transition-transform duration-200 ease-in-out ${isHovering ? 'scale-125' : ''}`} style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%)` }}>
      <div className={`w-8 h-8 rounded-full border-2 border-cyan transition-colors ${isHovering ? 'bg-cyan/20' : ''}`}></div>
    </div>
  );
}

// Navigation Component
const NAV_ITEMS = [
  { href: '#about', text: 'About' },
  { href: '#experience', text: 'Experience' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' },
];

function SideNav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden lg:block" aria-label="In-page navigation">
      <ul className="mt-16 w-max">
        {NAV_ITEMS.map((item) => (
          <li key={item.text}>
            <a className="group flex items-center py-3" href={item.href}>
              <span className={`nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-lightest-slate group-focus-visible:w-16 group-focus-visible:bg-lightest-slate ${activeSection === item.href.substring(1) ? 'w-16 bg-lightest-slate' : ''}`}></span>
              <span className={`nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-lightest-slate group-focus-visible:text-lightest-slate ${activeSection === item.href.substring(1) ? 'text-lightest-slate' : ''}`}>
                {item.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


// --- MAIN PAGE ---
export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  useEffect(() => {
    const toggleVisibility = () => setIsBackToTopVisible(window.pageYOffset > 400);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px', threshold: 0.5 });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        {/* Mobile Nav */}
        <button
          className={`lg:hidden fixed top-6 right-6 z-50 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <div className="w-8 h-8 flex flex-col justify-around items-center">
            <span className={`block w-full h-0.5 bg-lightest-slate rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-lightest-slate rounded-full transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-lightest-slate rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
          </div>
        </button>
        <div 
          className={`lg:hidden fixed inset-0 bg-navy/95 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        >
           <nav className="flex flex-col items-center justify-center h-full">
            <ul className="text-center">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.text} 
                    className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${isMenuOpen ? 100 + index * 75 : 0}ms` }}>
                  <a
                    href={item.href}
                    className="block text-3xl font-bold text-lightest-slate py-4 hover:text-cyan transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 lg:cursor-none">
          <div className="lg:flex lg:justify-between lg:gap-4">
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <AnimatedElement delay={100}><h1 className="text-4xl font-bold tracking-tight text-lightest-slate sm:text-5xl">Shivam Choudhary.</h1></AnimatedElement>
                <AnimatedElement delay={200}><h2 className="mt-3 text-lg font-medium tracking-tight text-lightest-slate sm:text-xl">Aspiring Software Engineer</h2></AnimatedElement>
                <AnimatedElement delay={300}><p className="mt-4 max-w-xs leading-normal text-slate">I build accessible, inclusive products and digital experiences for the web.</p></AnimatedElement>
                <SideNav activeSection={activeSection} />
              </div>
              <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
                <li className="mr-5 shrink-0">
                  <a href="https://github.com/ShivamVats00" target="_blank" rel="noopener noreferrer" className="block text-slate hover:text-cyan transition-colors" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </li>
                <li className="mr-5 shrink-0">
                   <a href="https://x.com/ShivamVats1108" target="_blank" rel="noopener noreferrer" className="block text-slate hover:text-cyan transition-colors" aria-label="X (formerly Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </header>

            <main className="pt-24 lg:w-1/2 lg:py-24">
              <section id="about" ref={sectionRefs.about} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <AnimatedElement delay={400}>
                  <p className="mb-4">I'm an upcoming B.Tech Computer Science graduate specializing in building (and occasionally designing) exceptional digital experiences. My journey into web development started with a curiosity for how things work, which has since blossomed into a passion for creating performant and user-friendly web applications.</p>
                  <p>Currently, I'm focused on building accessible, human-centered products and looking for a challenging full-time role as a Software Engineer where I can contribute to meaningful projects and continue to grow my skills.</p>
                </AnimatedElement>
              </section>

              <section id="experience" ref={sectionRefs.experience} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
  <AnimatedElement>
    <h2 className="text-2xl font-bold text-lightest-slate mb-8 sticky top-0 bg-navy/75 backdrop-blur-sm py-4 -mx-6 px-6">Experience</h2>
    <div>
      {experienceData.map((exp, index) => (
        <div key={index} className="mb-12">
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium text-lg text-lightest-slate">{exp.title}</h3>
            {/* FIX: Changed exp.date to exp.duration */}
            <p className="text-sm text-slate">{exp.duration}</p>
          </div>
          <p className="text-md text-cyan mb-3">{exp.company}</p>
          <p className="text-slate mb-4">{exp.description}</p>
          <ul className="flex flex-wrap gap-2">
            {/* FIX: Changed exp.skills to exp.technologies */}
            {exp.technologies.map((skill, i) => (
              <li key={i} className="flex items-center rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </AnimatedElement>
</section>

              <section id="projects" ref={sectionRefs.projects} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <AnimatedElement>
                  <h2 className="text-2xl font-bold text-lightest-slate mb-8 sticky top-0 bg-navy/75 backdrop-blur-sm py-4 -mx-6 px-6">Some Things I've Built</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projectData.map((proj, index) => (
                       <div key={index} className="bg-light-navy p-6 rounded-md shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                         <div className="flex-grow">
                           <div className="flex justify-between items-center mb-4">
                             <span className="text-2xl text-cyan">📁</span>
                             <div>
                               <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-cyan p-2" aria-label="GitHub link for project">🔗</a>
                             </div>
                           </div>
                           <h3 className="text-xl font-bold text-lightest-slate mb-2">{proj.title}</h3>
                           <p className="text-slate mb-4">{proj.description}</p>
                         </div>
                         <ul className="flex flex-wrap gap-2 mt-auto pt-4">
                           {proj.technologies.map((tech, i) => (
                             <li key={i} className="flex items-center rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">{tech}</li>
                           ))}
                         </ul>
                       </div>
                    ))}
                  </div>
                </AnimatedElement>
              </section>

              <section id="contact" ref={sectionRefs.contact} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <AnimatedElement>
                    <h2 className="text-2xl font-medium text-cyan mb-2">What's Next?</h2>
                    <h3 className="text-4xl font-bold text-lightest-slate mb-4">Get In Touch</h3>
                    <p className="max-w-xl mb-8">I'm actively looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!</p>
                    <a href="mailto:shivamchy867@gmail.com" className="inline-block px-8 py-4 border border-cyan text-cyan rounded hover:bg-cyan/10 transition-colors duration-300">Say Hello</a>
                </AnimatedElement>
              </section>

              <footer className="pb-16 text-sm text-slate text-center">
                <p>Built by Shivam Choudhary</p>
              </footer>
            </main>
          </div>
        </div>

        <button onClick={scrollToTop} className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-cyan/10 text-cyan border-2 border-cyan hover:bg-cyan/20 transition-all duration-300 ${isBackToTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      </div>
    </>
  );
}

