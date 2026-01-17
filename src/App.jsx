import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [expandedProject, setExpandedProject] = useState(null)
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = formData
    
    if (!name || !email || !message) {
      alert('Please fill in all fields')
      return
    }

    const subject = `Portfolio Contact from ${name}`
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`
    const mailtoLink = `mailto:adithya23bcs55@iiitkottayam.ac.in?subject=${encodeURIComponent(subject)}&body=${body}`
    
    window.location.href = mailtoLink
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('light-mode')
  }

  // Floating Orbs Animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let orbs = []
    const orbCount = 20

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initOrbs()
    }

    const initOrbs = () => {
      orbs = []
      for (let i = 0; i < orbCount; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 120 + 60,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.12 + 0.05
        })
      }
    }

    const drawOrbs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isLight = document.body.classList.contains('light-mode')
      
      orbs.forEach(orb => {
        orb.x += orb.vx
        orb.y += orb.vy

        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        if (isLight) {
          gradient.addColorStop(0, `rgba(127, 90, 240, ${orb.opacity * 2})`)
          gradient.addColorStop(0.4, `rgba(127, 90, 240, ${orb.opacity * 1.2})`)
          gradient.addColorStop(1, 'rgba(127, 90, 240, 0)')
        } else {
          gradient.addColorStop(0, `rgba(127, 90, 240, ${orb.opacity})`)
          gradient.addColorStop(0.4, `rgba(127, 90, 240, ${orb.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(127, 90, 240, 0)')
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(drawOrbs)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    drawOrbs()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
      const scrollPos = window.scrollY + 200
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skills = {
    languages: {
      title: 'Languages',
      icon: '{ }',
      items: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      ]
    },
    frameworks: {
      title: 'Frameworks',
      icon: '⚡',
      items: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      ]
    },
    databases: {
      title: 'Databases',
      icon: '◉',
      items: [
        
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      ]
    },
    infrastructure: {
      title: 'Infrastructure',
      icon: '☁',
      items: [
        { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
        { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      ]
    }
  }

  const projects = [
    {
      id: 1,
      title: 'Employee Tracking App',
      shortDesc: 'Real-time workforce monitoring for shop owners',
      problem: 'Shop owners struggle to monitor distributed workforce efficiently',
      solution: 'Built a comprehensive tracking system with real-time location, attendance management, and analytics',
      tech: ['React', 'Google Maps API', 'Firebase'],
      image: '/employee-tracker.png',
      contribution: 'Full-stack development, API integration, real-time data sync'
    },
    {
      id: 2,
      title: 'AI Subtitle Generator',
      shortDesc: 'Multilingual subtitle generation platform',
      problem: 'Films lack accessible, culturally-aware subtitles across languages',
      solution: 'AI-powered platform generating context-aware subtitles in 50+ languages',
      tech: ['React', 'Python', 'Assembly AI', 'Sarvam AI'],
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=200&fit=crop',
      contribution: 'Frontend architecture, AI integration, UX design'
    },
    {
      id: 3,
      title: 'Narrative Consistency Checker',
      shortDesc: 'AI-powered web application that evaluates character backstory consistency',
      problem: 'Writers and content creators struggle to maintain narrative consistency across complex storylines and character development',
      solution: 'Built an intelligent fact extraction system using LLMs with distributed data processing to analyze 100+ novel chunks and evaluate multiple backstories simultaneously with semantic timeline analysis',
      tech: ['Python', 'React', 'Vite', 'Pathway', 'LLM', 'Tiktoken'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      contribution: 'Distributed pipeline architecture, LLM integration, concurrent processing optimization'
    }
  ]

  const experience = [
    { year: '2023 - Present', title: 'B.Tech in Computer Science', org: 'Indian Institute of Information Technology, Kottayam', logo: '/iiitk-logo.png', detail: 'CGPA: 8.06' },
    { year: '2020 - 2022', title: 'Grade XII', org: 'Silver Hills Higher Secondary School', logo: '/silver.png', detail: 'Score: 98%' },
    { year: '2020', title: 'Grade X', org: 'Providence Girls Higher Secondary School',  detail: 'Score: 99%' }
  ]

  return (
    <div className="portfolio">
      <canvas ref={canvasRef} className="bg-canvas"></canvas>
      
      <nav className="nav">
        <div className="nav-brand">
          <span className="brand-symbol">◆</span>
          <span className="brand-text">AS</span>
        </div>
        <ul className="nav-links">
          {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
            <li key={item}>
              <a href={`#${item}`} className={activeSection === item ? 'active' : ''}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-grid">
          <motion.div className="hero-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-label">Software Engineer</div>
            <h1 className="hero-name">
              <span className="name-line">Adithyaa S Kumar</span>
            </h1>
            <p className="hero-tagline">
              Building scalable applications at the intersection of<span className="highlight"> modern web</span> and<span className="highlight"> intelligent systems</span>
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">View Work</a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </div>
          </motion.div>
          <motion.div className="hero-right" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="hero-terminal">
              <div className="terminal-header">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="terminal-logo" />
                <span className="terminal-title">Terminal</span>
                <div className="terminal-actions">
                  <span>−</span><span>×</span>
                </div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="terminal-prompt">~</span>
                  <span className="terminal-command">whoami</span>
                </div>
                <div className="terminal-output">Adithyaa S Kumar</div>
                <div className="terminal-line">
                  <span className="terminal-prompt">~</span>
                  <span className="terminal-command">cat skills.txt</span>
                </div>
                <div className="terminal-output">Full Stack Developer | Problem Solver</div>
                <div className="terminal-line">
                  <span className="terminal-prompt">~</span>
                  <span className="terminal-command">echo $STATUS</span>
                </div>
                <div className="terminal-output highlight">Open to opportunities ✓</div>
                <div className="terminal-line">
                  <span className="terminal-prompt">~</span>
                  <span className="terminal-cursor">|</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="scroll-indicator"><span>Scroll to explore</span><div className="scroll-line"></div></div>
      </section>

      {/* About Section - VS Code JSON Config */}
      <section id="about" className="about">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-tag">01</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <motion.div className="vscode-window about-editor" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="vscode-titlebar">
            <div className="vscode-brand">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="vscode-logo" />
            </div>
            <div className="vscode-title">
              <span className="json-icon">{ }</span>
              <span>developer.json</span>
            </div>
            <div className="vscode-actions">
              <span>−</span><span>□</span><span>×</span>
            </div>
          </div>
          <div className="vscode-body">
            <div className="vscode-sidebar">
              <div className="sidebar-icon">📁</div>
              <div className="sidebar-icon">🔍</div>
              <div className="sidebar-icon">⚙️</div>
            </div>
            <div className="vscode-editor">
              <div className="line-numbers">
                {Array.from({ length: 24 }, (_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              <div className="code-content">
                <div className="code-line"><span className="json-bracket">{'{'}</span></div>
                <div className="code-line">  <span className="json-key">"name"</span>: <span className="json-string">"Adithyaa S Kumar"</span>,</div>
                <div className="code-line">  <span className="json-key">"role"</span>: <span className="json-string">"Full Stack Developer"</span>,</div>
                <div className="code-line">  <span className="json-key">"location"</span>: <span className="json-string">"India"</span>,</div>
                <div className="code-line">  <span className="json-key">"status"</span>: <span className="json-string json-highlight">"Open to Opportunities"</span>,</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="json-key">"focus_areas"</span>: [</div>
                <div className="code-line">    <span className="json-string">"Web Development"</span>,</div>
                <div className="code-line">    <span className="json-string">"System Design"</span>,</div>
                <div className="code-line">    <span className="json-string">"AI/ML Integration"</span>,</div>
                <div className="code-line">    <span className="json-string">"Problem Solving"</span></div>
                <div className="code-line">  ],</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="json-key">"philosophy"</span>: <span className="json-string">"Clean code that solves real problems,</span></div>
                <div className="code-line">    <span className="json-string">technical precision with creative thinking."</span>,</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="json-key">"interests"</span>: <span className="json-bracket">{'{'}</span></div>
                <div className="code-line interests-line">
                  <div className="interest-chip"><span>📚</span> Reading</div>
                  <div className="interest-chip"><span>💻</span> Coding</div>
                </div>
                <div className="code-line">  <span className="json-bracket">{'}'}</span>,</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="json-key">"available"</span>: <span className="json-bool">true</span></div>
                <div className="code-line"><span className="json-bracket">{'}'}</span></div>
              </div>
            </div>
          </div>
          <div className="vscode-statusbar statusbar-json">
            <div className="status-left">
              <span className="status-branch">main</span>
              <span>JSON</span>
            </div>
            <div className="status-right">
              <span>UTF-8</span>
              <span>Ln 24, Col 1</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience/Journey Section */}
      <section id="experience" className="experience">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-tag">02</span>
          <h2 className="section-title">Journey</h2>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line"></div>
          {experience.map((item, index) => (
            <motion.div key={index} className="timeline-item" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <div className="timeline-marker"><div className="marker-dot"></div></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4 className="timeline-title">{item.title}</h4>
                <div className="timeline-org"><img src={item.logo} alt={item.org} /><span>{item.org}</span></div>
                <span className="timeline-detail">{item.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="profiles-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="profiles-title">Competitive Programming</h3>
          <div className="profiles-grid">
            <a href="https://codeforces.com/profile/Adithyaaaaaa" target="_blank" rel="noopener noreferrer" className="profile-card">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3521352-2944796.png" alt="Codeforces" />
              <div className="profile-info"><span className="profile-name">Codeforces</span><span className="profile-rank">Pupil • Max 788</span></div>
            </a>
            <a href="https://leetcode.com/u/Adithyaaaaaa/" target="_blank" rel="noopener noreferrer" className="profile-card">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png" alt="LeetCode" />
              <div className="profile-info"><span className="profile-name">LeetCode</span><span className="profile-rank">Problem Solver</span></div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills Section - VS Code Editor */}
      <section id="skills" className="skills">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-tag">03</span>
          <h2 className="section-title">Tech Stack</h2>
        </motion.div>

        <motion.div className="vscode-window" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="vscode-titlebar">
            <div className="vscode-brand">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="vscode-logo" />
            </div>
            <div className="vscode-title">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
              <span>tech_stack.py</span>
            </div>
            <div className="vscode-actions">
              <span>−</span><span>□</span><span>×</span>
            </div>
          </div>
          <div className="vscode-body">
            <div className="vscode-sidebar">
              <div className="sidebar-icon">📁</div>
              <div className="sidebar-icon">🔍</div>
              <div className="sidebar-icon">⚙️</div>
            </div>
            <div className="vscode-editor">
              <div className="line-numbers">
                {Array.from({ length: 32 }, (_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              <div className="code-content">
                <div className="code-line"><span className="py-comment"># -*- coding: utf-8 -*-</span></div>
                <div className="code-line"><span className="py-comment">"""Technical Skills & Proficiencies"""</span></div>
                <div className="code-line"></div>
                <div className="code-line"><span className="py-keyword">class</span> <span className="py-class">TechStack</span>:</div>
                <div className="code-line"></div>
                <div className="code-line">    <span className="py-comment"># Programming Languages</span></div>
                <div className="code-line">    <span className="py-property">languages</span> = [</div>
                <div className="code-line skill-icons-line">
                  {skills.languages.items.map((s, i) => (
                    <div key={i} className="skill-icon-item" title={s.name}>
                      <img src={s.icon} alt={s.name} />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
                <div className="code-line">    ]</div>
                <div className="code-line"></div>
                <div className="code-line">    <span className="py-comment"># Frameworks & Libraries</span></div>
                <div className="code-line">    <span className="py-property">frameworks</span> = [</div>
                <div className="code-line skill-icons-line">
                  {skills.frameworks.items.map((s, i) => (
                    <div key={i} className="skill-icon-item" title={s.name}>
                      <img src={s.icon} alt={s.name} />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
                <div className="code-line">    ]</div>
                <div className="code-line"></div>
                <div className="code-line">    <span className="py-comment"># Databases</span></div>
                <div className="code-line">    <span className="py-property">databases</span> = [</div>
                <div className="code-line skill-icons-line">
                  {skills.databases.items.map((s, i) => (
                    <div key={i} className="skill-icon-item" title={s.name}>
                      <img src={s.icon} alt={s.name} />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
                <div className="code-line">    ]</div>
                <div className="code-line"></div>
                <div className="code-line">    <span className="py-comment"># Cloud & DevOps Tools</span></div>
                <div className="code-line">    <span className="py-property">infrastructure</span> = [</div>
                <div className="code-line skill-icons-line">
                  {skills.infrastructure.items.map((s, i) => (
                    <div key={i} className="skill-icon-item" title={s.name}>
                      <img src={s.icon} alt={s.name} />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
                <div className="code-line">    ]</div>
              </div>
            </div>
          </div>
          <div className="vscode-statusbar">
            <div className="status-left">
              <span className="status-branch">main</span>
              <span>Python</span>
            </div>
            <div className="status-right">
              <span>UTF-8</span>
              <span>Ln 32, Col 1</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-tag">04</span>
          <h2 className="section-title">Featured Work</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              <div className="project-preview">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span className="expand-hint">{expandedProject === project.id ? 'Click to collapse' : 'Click to expand'}</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-short">{project.shortDesc}</p>
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div className="project-details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <div className="detail-block"><span className="detail-label">Problem</span><p>{project.problem}</p></div>
                      <div className="detail-block"><span className="detail-label">Solution</span><p>{project.solution}</p></div>
                      <div className="detail-block"><span className="detail-label">My Role</span><p>{project.contribution}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="project-tech">
                  {project.tech.map((t) => (<span key={t} className="tech-chip">{t}</span>))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <motion.div className="contact-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-tag">05</span>
          <h2 className="contact-title">Let's Connect</h2>
          <p className="contact-text">Open to opportunities and interesting conversations.</p>
          <div className="contact-links">
            <a href="https://github.com/AAYHTIDA" target="_blank" rel="noopener noreferrer" className="contact-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/adithyaa-s-kumar-28437b2a7" target="_blank" rel="noopener noreferrer" className="contact-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
            </a>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                className="form-input" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="form-input" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <textarea 
              name="message"
              placeholder="Message" 
              className="form-textarea"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-brand">◆ Adithyaa S Kumar</span>
          <span className="footer-copy">© 2024 • Built with precision</span>
        </div>
      </footer>
    </div>
  )
}

export default App
