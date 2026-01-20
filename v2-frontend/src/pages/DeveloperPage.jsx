import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeveloperPage.css';
import Beams from '../components/BeamBackground.jsx';
import { FaReact, FaAngular, FaJava, FaPython, FaDatabase, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiTailwindcss, SiThreedotjs } from 'react-icons/si';
import { TbBrandAstro } from 'react-icons/tb';

const professionalProjects = [
    {
        year: 2025,
        title: "IEC Checklist - File Management System",
        description:
            "Built a modular web tool with Angular, Java, Spring Boot, and PostgreSQL for managing .docx files with PDF preview integration. Implemented secure role-based authentication and improved data access speed by 25% through optimized APIs.",
        img: "/images/professional/checklist.png",
        tags: ["Angular", "Java", "Springboot", "PostgreSQL", "LibreOffice"],
        type: "professional",
        featured: true,
    },
    {
        year: 2025,
        title: "HR Dashboard",
        description:
            "Developed a web-based dashboard to streamline HR workflow, replacing Excel-based logs. Implemented role-based access with RESTful APIs, allowing the Head of HR to view comprehensive work summaries using Chart.js.",
        img: "/images/professional/hr.png",
        tags: ["React", "Java", "Springboot", "PostgreSQL", "Chart.js"],
        type: "professional",
        featured: false,
    },
    {
        year: 2025,
        title: "Parts Manual Web Tool",
        description:
            "Developed a high-availability web tool with Angular, Java, Spring Boot, and PostgreSQL for querying parts by model number. Handles 1M+ records efficiently with optimized queries that reduced response times by 30%.",
        img: "/images/professional/partsmanual.png",
        tags: ["Angular", "Java", "Springboot", "PostgreSQL"],
        type: "professional",
        featured: false,
    },
    {
        year: 2025,
        title: "AI Image Recognition for Floor Planner",
        description:
            "Trained YOLO-V8m model with 60+ large-scale floor plans for accurate element detection. Developed FastAPI endpoints and a web interface for importing images and receiving annotated results.",
        img: "/images/professional/floorplanner.png",
        tags: ["Python", "FastAPI", "React", "YOLO-V8m"],
        type: "professional",
        featured: false,
    },
    {
        year: 2025,
        title: "CCG Prediction Tool",
        description:
            "Created a C# and SQL Server tool that calculates Koax Heating/Cooling conditions and displays PH diagrams. Integrated PlateHX calculation functionality with efficient backend data management.",
        img: "/images/professional/ccg.png",
        tags: ["C#", "SQL Server Management Studio"],
        type: "professional",
        featured: false,
    },
    {
        year: 2025,
        title: "A2L Calculator",
        description:
            "Converted Excel-based refrigerant estimation logic into an Angular, Java, Quarkus, and PostgreSQL web app. Supports GG, Commercial, and Residential calculations with CI/CD integration.",
        img: "/images/professional/a2l.png",
        tags: ["Angular", "Java", "Springboot", "PostgreSQL"],
        type: "professional",
        featured: false,
    },
];

const personalProjects = [
    {
        year: 2026,
        title: "AI Code Assistant",
        description:
            "Designed an AI-powered code review assistant for Java using DeepSeek-Coder 6.7B via Ollama. Implemented FastAPI endpoints for semantic analysis, generating feedback on bugs, code smells, and security concerns with strict JSON validation.",
        img: "/images/personal/aicode.png",
        tags: ["Python", "FastAPI", "React", "Ollama", "DeepSeek"],
        link: "https://github.com/Zaffer-AHM/ai-assistant",
        type: "personal",
        featured: false,
    },
    {
        year: 2025,
        title: "Task Tracker - Kanban Style",
        description:
            "A Kanban-style task management app featuring draggable task cards, status columns, and progress tracking. Built with secure JWT authentication and scalable architecture to demonstrate full-stack development skills.",
        img: "/images/personal/tasktracker.png",
        tags: ["React", "Java", "Tailwind", "PostgreSQL"],
        link: "https://github.com/Zaffer-AHM/task-tracker-kanban-style",
        type: "personal",
        featured: true,
    },
    {
        year: 2025,
        title: "Portfolio Creation",
        description:
            "Developed a highly interactive portfolio using Astro, React, TailwindCSS, Three.js, and simplex-noise. Features smooth animations, 3D visuals, and a clean design to showcase projects and skills.",
        img: "/images/personal/portfolio.png",
        tags: ["Astro", "React", "Tailwind", "Three.js"],
        link: "https://github.com/Zaffer-AHM/personal-portfolio",
        type: "personal",
        featured: true,
    },
    {
        year: 2023,
        title: "Multi-dimensional Ray-casting Game Engine",
        description:
            "Developed a 3D engine in Python using ray-casting principles and built a sample game to demonstrate capabilities. Designed custom sprites using Photoshop for enhanced visual experience.",
        img: "/images/personal/doomgame.png",
        tags: ["Python"],
        link: "https://github.com/Zaffer-AHM/UG-Final-Project",
        type: "personal",
        featured: false,
    },
];

const allProjects = [...personalProjects, ...professionalProjects];
const featuredProjects = allProjects.filter(p => p.featured);

// Tech stack icon mapping
const techIcons = {
    'React': '⚛️',
    'Angular': '🅰️',
    'Astro': '🚀',
    'Java': '☕',
    'Springboot': '🍃',
    'PostgreSQL': '🐘',
    'C#': '#️⃣',
    'Python': '🐍',
    'Tailwind': '🎨',
    'Three.js': '🎲',
    'LibreOffice': '📄',
    'SQL Server Management Studio': '💾',
    'Quarkus': '⚡'
}; // not using this no more

const DeveloperPage = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const cardRefs = useRef([]);
    
    const visibleProjects = showAll ? allProjects : allProjects.slice(0, 3);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [visibleProjects]);

    return (
        <div className="developer-page">
            {/* Background layer */}
            <div className="developer-background">
                <Beams
                    beamWidth={3}
                    beamHeight={30}
                    beamNumber={20}
                    lightColor="#ffffff"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={30}
                />
            </div>

            {/* Back button */}
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Home
            </button>

            {/* Main Content */}
            <div className="dev-content-full">
                <h1 className="page-title">DEVELOPMENT PORTFOLIO</h1>

                {/* Introduction Text */}
                <div className="intro-section">
                    <p className="intro-text">
                        Hi! I'm Zaffer. I have been working as a software engineer for over a year, primarily focusing on full-stack web development using Java and React. I enjoy building and planning scalable systems that solve real-world problems. I have a passion for all tech related things and am actively looking to learn new technologies and opportunities.
                    </p>
                    <div className="tech-stack-icons">
                        <div className="tech-icon-item" title="React">
                            <FaReact />
                        </div>
                        <div className="tech-icon-item" title="Angular">
                            <FaAngular />
                        </div>
                        <div className="tech-icon-item" title="TailwindCSS">
                            <SiTailwindcss />
                        </div>
                        <div className="tech-icon-item" title="Java">
                            <FaJava />
                        </div>
                        <div className="tech-icon-item" title="Spring Boot">
                            <SiSpringboot />
                        </div>
                        <div className="tech-icon-item" title="Python">
                            <FaPython />
                        </div>
                        <div className="tech-icon-item" title="PostgreSQL">
                            <SiPostgresql />
                        </div>
                        <div className="tech-icon-item" title="SQL Server">
                            <FaDatabase />
                        </div>
                        <div className="tech-icon-item" title="Docker">
                            <FaDocker />
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <section className="project-section">
                    <h2 className="section-title-static">PROJECTS</h2>
                    
                    <div className="projects-grid">
                        {visibleProjects.map((project, idx) => (
                            <div 
                                key={idx} 
                                className="project-card-compact fade-in"
                                ref={(el) => (cardRefs.current[idx] = el)}
                            >
                                <div className="card-header-compact">
                                    <h3 className="card-title">{project.title}</h3>
                                    {project.type === 'personal' && (
                                        <span className="personal-project-badge">Personal Project</span>
                                    )}
                                </div>
                                
                                <p className="card-description">{project.description}</p>
                                
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-button">
                                        <span>GitHub</span>
                                    </a>
                                )}
                                
                                <div className="card-tech-labels">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tech-label">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {!showAll && allProjects.length > 3 && (
                        <button className="show-more-button" onClick={() => setShowAll(true)}>
                            Show more
                        </button>
                    )}
                </section>
            </div>

            {/* Image Preview Overlay */}
            {previewImage && (
                <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
                    <img src={previewImage} alt="Preview" />
                </div>
            )}
        </div>
    );
};

export default DeveloperPage;
