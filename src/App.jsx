import { useEffect, useState, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'LocalMart',
    type: 'Full-stack Marketplace / MERN Stack',
    year: '2025',
    tags: ['All', 'Digital'],
    desc: 'Hyperlocal e-commerce platform connecting local merchants with buyers featuring inventory tracking, secure payments, and interactive vendor dashboards.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
    githubUrl: 'https://github.com/lezscripts',
    className: 'project-wide'
  },
  {
    id: 2,
    title: 'Solar Power Prediction',
    type: 'AI & Machine Learning / Python',
    year: '2025',
    tags: ['All', 'Data'],
    desc: 'Predictive machine learning pipeline forecasting solar power output using atmospheric weather data, Random Forest, and XGBoost regression.',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Streamlit'],
    githubUrl: 'https://github.com/lezscripts',
    className: ''
  },
  {
    id: 3,
    title: 'Krishi Mitra',
    type: 'AgriTech Smart Advisory System',
    year: '2025',
    tags: ['All', 'Digital', 'Data'],
    desc: 'Agricultural decision-support system analyzing soil quality, weather metrics, and crop yield forecasting for farmers.',
    tech: ['React', 'FastAPI', 'Python', 'Machine Learning'],
    githubUrl: 'https://github.com/lezscripts',
    className: ''
  }
];

const services = ['Python / SQL / JavaScript', 'React / Node / Express', 'MongoDB / MySQL', 'Git / GitHub / VS Code'];
const welcomeMessages = [
  'Hello',
  'नमस्ते',
  'नमस्कार',
  'Hallo',
  'こんにちは',
  'Welcome | स्वागत है'
];

function Arrow({ direction = 'up-right' }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">{direction === 'left' ? '←' : '↗'}</span>;
}

function CounterNumber({ target, decimals = 0, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = document.getElementById('about');
    if (!el) return;

    let animId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startTime = null;
            const duration = 1200;

            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(easeOut * target);

              if (progress < 1) {
                animId = requestAnimationFrame(animate);
              } else {
                setDisplayValue(target);
              }
            };

            animId = requestAnimationFrame(animate);
          } else {
            setDisplayValue(0);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [target]);

  return (
    <span>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue)}
      {suffix}
    </span>
  );
}

function RandomLetterReveal({ text, className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$&*!?/[]';

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let iteration = 0;
            const maxIterations = text.length;

            const interval = setInterval(() => {
              setDisplayText(
                text
                  .split('')
                  .map((char, index) => {
                    if (char === ' ' || char === '\n' || char === "'") return char;
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                  })
                  .join('')
              );

              iteration += 1 / 3;

              if (iteration >= maxIterations) {
                setDisplayText(text);
                clearInterval(interval);
              }
            }, 30);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={elementRef} className={`random-letter-reveal ${className}`}>
      {displayText}
    </span>
  );
}

const skillCategories = [
  {
    name: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'HTML5', 'CSS3', 'SQL']
  },
  {
    name: 'Frontend & UI',
    items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Bootstrap', 'HTML']
  },
  {
    name: 'Backend & DB',
    items: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST APIs', 'FastAPI', 'Flask', 'SQLite']
  },
  {
    name: 'AI / ML & Data',
    items: ['PyTorch', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Data Analysis', 'NLP', 'Vector DBs', 'Ollama']
  },
  {
    name: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Vercel', 'Postman', 'Figma', 'CLI/TUI']
  }
];

function App() {
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [welcomeLeaving, setWelcomeLeaving] = useState(false);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [filter, setFilter] = useState('All');
  const [sent, setSent] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [scrollOffset, setScrollOffset] = useState(0);

  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.tags.includes(filter));

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!welcomeExiting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [welcomeExiting]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], main[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isLastMessage = welcomeIndex === welcomeMessages.length - 1;
    const leaveTimer = setTimeout(() => {
      if (!isLastMessage) setWelcomeLeaving(true);
    }, 700);
    const changeTimer = setTimeout(() => {
      if (isLastMessage) {
        setWelcomeExiting(true);
      } else {
        setWelcomeLeaving(false);
        setWelcomeIndex((currentIndex) => currentIndex + 1);
      }
    }, isLastMessage ? 1000 : 1000);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(changeTimer);
    };
  }, [welcomeIndex]);

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const sliderRef = useRef(null);

  const handleSlide = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 380;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, .project-card, .vibe-card, .circle-link, .filter')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.scroll-reveal');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      revealItems.forEach((item) => observer.observe(item));
    }

    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-active');
        }
      });
    }, { threshold: 0.12 });
    projectCards.forEach((card) => cardObserver.observe(card));

    const handleScrollHorizontal = () => {
      const workSection = document.getElementById('work');
      const track = sliderRef.current;
      if (!workSection || !track) return;

      const rect = workSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);

      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      if (maxScrollLeft > 0) {
        track.scrollLeft = progress * maxScrollLeft;
      }
    };

    window.addEventListener('scroll', handleScrollHorizontal, { passive: true });

    return () => {
      cardObserver.disconnect();
      window.removeEventListener('scroll', handleScrollHorizontal);
    };
  }, [filter]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (response.ok) { setSent(true); form.reset(); }
  }

  return (
    <div className="site-shell">
      <div className={`custom-cursor-dot ${cursorHovered ? 'hovered' : ''}`} style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }} />
      <div className={`custom-cursor-ring ${cursorHovered ? 'hovered' : ''}`} style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }} />
      <div className={`welcome-screen ${welcomeExiting ? 'welcome-screen-exiting' : ''}`} aria-hidden="true">
        <div className={`welcome-message ${welcomeLeaving ? 'welcome-message-leaving' : ''} ${welcomeIndex === welcomeMessages.length - 1 ? 'welcome-final' : ''}`}>
          <div className="welcome-text-wrap">
            <span className="welcome-text" key={welcomeIndex}>{welcomeMessages[welcomeIndex]}</span>
          </div>
        </div>
      </div>
      <header className={`topbar ${!welcomeExiting ? 'topbar-hidden' : 'topbar-visible'}`}>
        <a className="nav-brand" href="#intro" aria-label="Lekhit Zambre home">
          <div className="nav-logo-wrap">
            <img src="/logo.png" alt="LZ Emblem" className="nav-logo-img" />
            <div className="logo-sparkle s-1">✳</div>
            <div className="logo-sparkle s-2">✦</div>
            <div className="logo-sparkle s-3">✳</div>
          </div>
        </a>

        <div className="nav-divider" />

        <nav className="nav-links-pill" aria-label="Main navigation">
          <a href="#intro" className={`nav-pill ${activeSection === 'intro' ? 'active' : ''}`}>INTRO</a>
          <a href="#about" className={`nav-pill ${activeSection === 'about' ? 'active' : ''}`}>ABOUT</a>
          <a href="#skills" className={`nav-pill ${activeSection === 'skills' ? 'active' : ''}`}>SKILLS</a>
          <a href="#work" className={`nav-pill ${activeSection === 'work' ? 'active' : ''}`}>WORK</a>
          <a href="#contact" className={`nav-pill ${activeSection === 'contact' ? 'active' : ''}`}>CONTACT</a>
          <a href="#vibe" className={`nav-pill ${activeSection === 'vibe' ? 'active' : ''}`}>VIBE</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad scroll-reveal" id="intro">
          <div className="hero-main">
            <div className="hero-headline-wrap">
              <h1>I build <em>what's next.</em><br /><span className="hero-identity">LeZScripts / Lekhit Zambre</span></h1>
              <p className="hero-intro">Code with purpose. Building useful full-stack products and machine learning solutions for real-world problems.</p>
              <div className="hero-cta-row">
                <a
                  href="https://drive.google.com/file/d/1Li3jpLQGE4xcl3ghW8qaKXkcGAT5M3mq/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-resume-hero"
                >
                  VIEW RESUME ↗
                </a>
              </div>
            </div>
            <div
              className="hero-photo-wrap"
              style={{
                opacity: Math.max(1 - scrollOffset / 280, 0),
                filter: `blur(${Math.min(scrollOffset / 6, 32)}px) brightness(${Math.max(1 - scrollOffset / 300, 0.15)})`,
                transform: `translateY(-${scrollOffset * 0.35}px) scale(${1 + scrollOffset / 600})`
              }}
            >
              <img src="/profile.png" alt="Lekhit Zambre" className="hero-profile-img" />
              <div
                className="smoke-puff-layer"
                style={{
                  opacity: Math.min(scrollOffset / 50, 1) * Math.max(1 - scrollOffset / 380, 0),
                  filter: `blur(${16 + Math.min(scrollOffset / 8, 22)}px)`
                }}
              >
                <span className="smoke-particle p1" />
                <span className="smoke-particle p2" />
                <span className="smoke-particle p3" />
                <span className="smoke-particle p4" />
              </div>
            </div>
          </div>
        </section>

        <section className="marquee scroll-reveal" aria-label="Binary intro marquee">
          <div className="marquee-track">
            01001100 01100101 01101011 01101000 01101001 01110100 00100000 01011010 01100001 01101101 01100010 01110010 01100101 <span>✳</span> 01000110 01110101 01101100 01101100 00101101 01010011 01110100 01100001 01100011 01101011 00100000 01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010 <span>✳</span> 01001101 01001100 00100000 01000101 01101110 01100111 01101001 01101110 01100101 01100101 01110010 <span>✳</span> 01001100 01100101 01101011 01101000 01101001 01110100 00100000 01011010 01100001 01101101 01100010 01110010 01100101 <span>✳</span> 01000110 01110101 01101100 01101100 00101101 01010011 01110100 01100001 01100011 01101011 00100000 01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010 <span>✳</span> 01001101 01001100 00100000 01000101 01101110 01100111 01101001 01101110 01100101 01100101 01110010 <span>✳</span>
          </div>
        </section>

        <section className="about section-pad scroll-reveal" id="about">
          <div className="about-top-header">
            <div className="about-ghost-num">01</div>
            <h2 className="about-main-title"><RandomLetterReveal text="ABOUT ME" /></h2>
            <div className="about-subtitle-tag">[ WHO I AM &amp; WHAT I DO ]</div>
          </div>

          <div className="about-stats-grid">
            <div className="stat-card">
              <div className="stat-num">
                <CounterNumber target={3} suffix="+" />
              </div>
              <div className="stat-label">PROJECTS SHIPPED</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <CounterNumber target={7.77} decimals={2} />
              </div>
              <div className="stat-label">CGPA</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <CounterNumber target={10} suffix="+" />
              </div>
              <div className="stat-label">TECHNOLOGIES MASTERED</div>
            </div>
          </div>

          <div className="about-content-grid">
            <div className="about-bio-col">
              <h3>Building robust solutions<br /><span className="dimmed">with precision and purpose.</span></h3>
              <p>I am an IT Engineering student at Shah and Anchor Kutchhi Engineering College (University of Mumbai). I specialize in building real, working software — from high-performance MERN web apps to intelligent machine learning predictive models.</p>
              <p>As a core developer at the Krishi Mitra Hackathon (August 2025), I engineered farmer-vendor platform modules for crop recommendation, price prediction, disease detection, and land leasing assistance.</p>
            </div>

            <div className="about-cards-col">
              <div className="about-mini-card">
                <span className="mini-card-tag">EDUCATION &amp; CREDENTIALS</span>
                <h4>Shah &amp; Anchor Kutchhi Engg College</h4>
                <p className="mini-card-sub">B.Tech Information Technology (2023–2027) • CGPA: 7.77</p>
                <p className="mini-card-desc">Cisco Python Essentials 1 • Infosys Basics of Python • Complete HTML/CSS/JS (2024)</p>
              </div>

              <div className="about-mini-card">
                <span className="mini-card-tag">TECHNICAL SKILLS</span>
                <div className="about-pills">
                  {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'SQL', 'MySQL', 'Scikit-Learn', 'Git', 'HTML/CSS'].map(pill => (
                    <span className="about-pill" key={pill}>{pill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad scroll-reveal" id="skills">
          <div className="about-top-header">
            <div className="about-ghost-num">02</div>
            <h2 className="about-main-title"><RandomLetterReveal text="SKILLS" /></h2>
            <div className="about-subtitle-tag">[ TECHNICAL PROFICIENCY ]</div>
          </div>

          <div className="skills-marquee-container">
            {skillCategories.map((cat, idx) => (
              <div className={`skills-marquee-row ${idx % 2 === 1 ? 'reverse' : ''}`} key={cat.name}>
                <div className="skills-track">
                  {[...cat.items, ...cat.items, ...cat.items, ...cat.items].map((skill, sIdx) => (
                    <div className="skill-glass-pill" key={`${cat.name}-${sIdx}`}>
                      <span className="skill-pill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="work section-pad scroll-reveal" id="work">
          <div className="work-header-row">
            <div>
              <div className="about-ghost-num">03</div>
              <h2 className="work-main-title"><RandomLetterReveal text="FEATURED WORK" /></h2>
              <div className="about-subtitle-tag">[ PROJECTS &amp; MODELS ]</div>
            </div>
            <div className="work-controls-row">
              <div className="filter-row" role="group" aria-label="Filter projects">
                {['All', 'Digital', 'Data'].map((item) => (
                  <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>
                ))}
              </div>
              <div className="slider-nav-btns">
                <button className="slider-btn" onClick={() => handleSlide('left')} aria-label="Slide left">←</button>
                <button className="slider-btn" onClick={() => handleSlide('right')} aria-label="Slide right">→</button>
              </div>
            </div>
          </div>

          <div className="project-slider-wrapper">
            <div className="project-slider-track" ref={sliderRef}>
              {filteredProjects.map((project, index) => (
                <article
                  className="project-card compact-card"
                  key={project.id}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="project-image-wrap">
                    <div className={`project-visual project-visual-${project.id}`}>
                      <span className="visual-topline">LEZ / SYS 0{project.id}</span>
                      <span className="visual-symbol">{project.id === 1 ? '↗' : project.id === 2 ? '∿' : '✳'}</span>
                    </div>
                    <span className="project-index">0{index + 1}</span>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-action-link" aria-label={`View ${project.title} on GitHub`}>
                      <Arrow />
                    </a>
                  </div>

                  <div className="project-card-body">
                    <div className="project-card-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-year-badge">{project.year}</span>
                    </div>
                    <p className="project-type-subtitle">{project.type}</p>
                    <p className="project-desc-short">{project.desc}</p>
                    <div className="project-tech-pills">
                      {project.tech.map((t) => (
                        <span className="tech-pill" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad scroll-reveal" id="contact">
          <div className="contact-heading">
            <h2><RandomLetterReveal text="Let's build" /><br /><em><RandomLetterReveal text="something." /></em></h2>
            <p>Open to internships, collaborations, and opportunities where thoughtful technology can make a difference.</p>

            <div className="connect-social-wrapper">
              <div className="connect-label">[ CONNECT &amp; NETWORK ]</div>
              <div className="social-pill-grid">
                <a href="mailto:zlekhit@gmail.com" target="_blank" rel="noopener noreferrer" className="social-pill-item priority-high" title="Direct Email (zlekhit@gmail.com)">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/lekhit-zambre-19610a28b" target="_blank" rel="noopener noreferrer" className="social-pill-item priority-high" title="LinkedIn Profile">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                <a href="https://github.com/lezscripts" target="_blank" rel="noopener noreferrer" className="social-pill-item priority-high" title="GitHub Code Repos">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </a>
                <a href="https://x.com/Lezscripts" target="_blank" rel="noopener noreferrer" className="social-pill-item" title="X (Twitter) Profile">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://medium.com/@zlekhit" target="_blank" rel="noopener noreferrer" className="social-pill-item" title="Medium Blog">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm2.99 0c0 3.02-.45 5.47-1 5.47-.56 0-1-2.45-1-5.47s.44-5.47 1-5.47c.55 0 1 2.45 1 5.47z"/></svg>
                </a>
                <a href="https://www.instagram.com/lekhittt" target="_blank" rel="noopener noreferrer" className="social-pill-item" title="Instagram Profile">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card-window">
            <div className="contact-card-header">
              <div className="contact-window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="contact-window-title">GET IN TOUCH</div>
              <div className="contact-window-dummy" />
            </div>

            <form className="contact-card-body" onSubmit={handleSubmit}>
              {sent ? (
                <div className="success-message">
                  <span className="success-icon">✳</span>
                  <h3>Message received.</h3>
                  <p>Thanks for reaching out. I'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="contact-field-group">
                    <label htmlFor="contact-name" className="contact-field-label">YOUR NAME</label>
                    <input id="contact-name" name="name" required placeholder="Enter your name" className="contact-field-input" />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-email" className="contact-field-label">YOUR EMAIL</label>
                    <input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="contact-field-input" />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-subject" className="contact-field-label">SUBJECT</label>
                    <input id="contact-subject" name="subject" placeholder="e.g. Custom Web App MVP" className="contact-field-input" />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-message" className="contact-field-label">MESSAGE</label>
                    <textarea id="contact-message" name="message" required rows={3} placeholder="Tell me about your project timeline, requirements, or idea..." className="contact-field-input contact-field-textarea" />
                  </div>

                  <div className="contact-card-footer">
                    <span className="contact-status-text">Ready to send.</span>
                    <button className="contact-submit-btn" type="submit">
                      SEND MESSAGE
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </section>

        <section className="vibe section-pad scroll-reveal" id="vibe">
          <div className="vibe-card">
            <div className="vibe-header">
              <div className="vibe-brand">
                <span className="spotify-mark">●</span> LeZScripts FM
              </div>
              <div className="vibe-controls">
                <div className="vibe-live-badge">
                  <span className="vibe-live-dot">●</span>
                  <span>LIVE</span>
                  <div className="audio-wave">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className="vibe-content">
              <div>
                <h2><RandomLetterReveal text="Vibe" /><br /><em><RandomLetterReveal text="with me." /></em></h2>
                <p>Late-night builds, clean commits, and a little extra bass.</p>
              </div>
            </div>
            <iframe
              className="spotify-player"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
              title="LeZScripts FM Spotify playlist"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </section>
      </main>
      <footer className="footer section-pad scroll-reveal"><span>© 2026 LeZScripts / Lekhit Zambre</span><div><a href="#top">Back to top <Arrow direction="left" /></a></div></footer>
    </div>
  );
}

export default App;
