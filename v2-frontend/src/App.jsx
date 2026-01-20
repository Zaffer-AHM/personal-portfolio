import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import DitheringBackground from './components/DitheringBackground.jsx'
import StaggeredMenu from './components/StaggeredMenu.jsx'
import CreativePage from './pages/CreativePage.jsx'
import DeveloperPage from './pages/DeveloperPage.jsx'

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuItems = [
    { label: 'Creative', ariaLabel: 'Go to home page', link: '/creative' },
    { label: 'Development', ariaLabel: 'Learn about us', link: '/development' },
  ];
  const socialItems = [
    { type: 'github', link: 'https://github.com/zaffer-ahm' }];

  return (
    <div className="app-container">
      {/* background */}
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

      {/* Center content - After menu so button is clickable */}
      <div className={`center-content ${isMenuOpen ? 'hidden' : ''}`}>
        <h1 className="main-title animate-fadeIn"> ZAFFER AHMED </h1>
        <h2 className="subtitle animate-fadeIn">software engineer</h2>
        <button 
          className="portfolio-button animate-fadeIn"
          onClick={() => {
            const menuButton = document.querySelector('.sm-toggle');
            if (menuButton) menuButton.click();
          }}
        >
          <span>Portfolio</span>
        </button>
      </div>

      {/* Custom menu options */}
      <div className={`menu-options ${isMenuOpen ? 'visible' : ''}`}>
        <button className="menu-option" onClick={() => {
          navigate('/creative');
          setTimeout(() => {
            const menuButton = document.querySelector('.sm-toggle');
            if (menuButton) menuButton.click();
          }, 1000);
        }}>
          CREATIVE
        </button>
        <button className="menu-option" onClick={() => {
          navigate('/developer');
          setTimeout(() => {
            const menuButton = document.querySelector('.sm-toggle');
            if (menuButton) menuButton.click();
          }, 1000);
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
  )
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div className="page-transition-wrapper">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/creative" element={<CreativePage />} />
        <Route path="/developer" element={<DeveloperPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
