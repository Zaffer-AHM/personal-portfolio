import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import DitheringBackground from './components/DitheringBackground.jsx'
import StaggeredMenu from './components/StaggeredMenu.jsx'
import CreativePage from './pages/CreativePage.jsx'
import DeveloperPage from './pages/DeveloperPage.jsx'

function MainApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const menuItems = [
    { label: 'Creative', ariaLabel: 'Go to home page', link: '/creative' },
    { label: 'Development', ariaLabel: 'Learn about us', link: '/development' },
  ];
  const socialItems = [
    { type: 'github', link: 'https://github.com/zaffer-ahm' }
  ];

  // Auto-close menu animation when navigating to pages
  useEffect(() => {
    if (location.pathname !== '/') {
      setTimeout(() => {
        const menuButton = document.querySelector('.sm-toggle');
        if (menuButton) {
          menuButton.click(); // Open
          setTimeout(() => {
            if (menuButton) menuButton.click(); // Close with animation
          }, 800);
        }
      }, 50);
    }
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      {/* background - only on home page */}
      {isHomePage && (
        <DitheringBackground
          waveColor={[0, 0, 1]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={5}
          waveSpeed={0.05}
        />
      )}

      {/* Menu - Should be on top of everything */}
      <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#5227FF"
          closeOnClickAway={false}
          onMenuOpen={() => {
            console.log('Menu opened');
            setIsMenuOpen(true);
          }}
          onMenuClose={() => {
            console.log('Menu closed');
            setIsMenuOpen(false);
          }}
        />
      </div>

      {/* Home page content */}
      {isHomePage && (
        <div className="home-page-fade-in">
          <div className={`center-content ${isMenuOpen || isTransitioning ? 'hidden' : ''}`}>
            <h1 className="main-title animate-fadeIn"> ZAFFER AHMED </h1>
            <h2 className="subtitle animate-fadeIn">software engineer</h2>
            <button 
              className="portfolio-button animate-fadeIn"
              onClick={() => {
                const menuButton = document.querySelector('.sm-toggle');
                if (menuButton) menuButton.click();
              }}
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <span>Portfolio</span>
            </button>
          </div>

          {/* Custom menu options */}
          <div className={`menu-options ${isMenuOpen ? 'visible' : ''}`}>
            <button className="menu-option" onClick={() => {
              setIsTransitioning(true);
              const menuButton = document.querySelector('.sm-toggle');
              if (menuButton) menuButton.click();
              setTimeout(() => {
                navigate('/creative');
                setIsTransitioning(false);
              }, 100);
            }}>
              CREATIVE
            </button>
            <button className="menu-option" onClick={() => {
              setIsTransitioning(true);
              const menuButton = document.querySelector('.sm-toggle');
              if (menuButton) menuButton.click();
              setTimeout(() => {
                navigate('/developer');
                setIsTransitioning(false);
              }, 100);
            }}>
              DEVELOPMENT
            </button>
          </div>

          {/* Close button */}
          <button 
            className={`menu-close-button ${isMenuOpen ? 'visible' : ''}`}
            onClick={() => {
              const menuButton = document.querySelector('.sm-toggle');
              if (menuButton) menuButton.click();
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Page content */}
      <div className="page-transition-wrapper">
        {location.pathname === '/creative' && <CreativePage />}
        {location.pathname === '/developer' && <DeveloperPage />}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}

export default App
