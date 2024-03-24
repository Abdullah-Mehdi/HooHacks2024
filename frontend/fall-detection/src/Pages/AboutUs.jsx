import React from 'react';
import Information from '../Components/Information/Information';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ResearchMarket from '../Components/Information/ResearchMarket';
import Solution from '../Components/Information/Solution'
const AboutUs = () => {
    return(
        <div>
            <Parallax pages={3}>
                <ParallaxLayer offset={0} speed={1} factor={2}>
                    <Information></Information>
                </ParallaxLayer>
               
                <ParallaxLayer offset={1} speed={0.5}>
                    <ResearchMarket></ResearchMarket>
                </ParallaxLayer> 

                <ParallaxLayer offset={2} speed={0.5}>
                    <Solution></Solution>
                </ParallaxLayer>
                   
            </Parallax>   
        </div>
    );
};

export default AboutUs;