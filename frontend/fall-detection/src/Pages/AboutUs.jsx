import React from 'react';
import Information from '../Components/Information/Information';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ResearchMarket from '../Components/Information/ResearchMarket';
import Solution from '../Components/Information/Solution'
import './AboutUs.css'
const AboutUs = () => {
    return(
        <div>
            <Parallax pages={3} style={{top:'0', left: '0'}}>
                <Information></Information>
                <ParallaxLayer offset={0} speed={2.5} className='animation'>
                    <div className='animation_layer parallax' id='4-removebg-preview'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2.5} className='animation'>
                    <div className='animation_layer parallax' id='1-removebg-preview'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2.5} className='animation'>
                    <div className='animation_layer parallax' id='2-removebg-preview'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2.5} className='animation'>
                    <div className='animation_layer parallax' id='3-removebg-preview'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2.5} className='animation'>
                    <div className='animation_layer parallax' id='5-removebg-preview'></div>
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