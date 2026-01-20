import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreativePage.css';
import PixelSnow from '../components/PixelSnowBackground.jsx';

const CreativePage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="creative-page">
            {/* Background layer */}
            <div className="creative-background">
                <PixelSnow
                    color="#ffffff"
                    flakeSize={0.021}
                    minFlakeSize={1.25}
                    pixelResolution={500}
                    speed={1.9}
                    density={0.4}
                    direction={125}
                    brightness={1}
                    depthFade={8}
                    farPlane={26}
                    gamma={0.4545}
                    variant="snowflake"
                />
            </div>
            {/* Content layer */}
            <div className="page-content">
                <h1 className="page-title">CREATIVE PORTFOLIO</h1>
                <p className="page-description">Work in Progress</p>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default CreativePage;
