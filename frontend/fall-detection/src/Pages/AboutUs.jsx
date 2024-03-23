import React from 'react';
import Information from '../Components/Information/Information';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
const AboutUs = () => {
    return(
        <div>
            <Parallax pages={4}>
                <ParallaxLayer 
                offset={0} 
                speed={1}
                factor={2}
                bgImage = '../Components/Assets/stock-image1'
                >
                <Information></Information>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={0.5}>
                <Information></Information>
                </ParallaxLayer>
            </Parallax>
            
        </div>
    );
};

export default AboutUs;