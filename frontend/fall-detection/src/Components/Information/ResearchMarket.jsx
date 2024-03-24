import React from 'react';
import './Information.css';
import image1 from '../Assets/stock-image1.jpg';
import image2 from '../Assets/stock-image2.jpg';
import image3 from '../Assets/stock-image3.jpg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




const ResearchMarket = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    return(
        <div className='content'>
            <h2>
                About 36 million falls are reported among older adults 
                each year 
            </h2>
            <h1>resulting in more than 32,000 deaths</h1>
            <h2>
                About 3 million older adults are treated 
                in emergency departments for a fall injury.
            </h2>
            <h2>
            Each year at least 300,000 older people are hospitalized for hip fractures.
            More than 95% of hip fractures are caused by falling—usually by falling sideways.
            </h2>

            <div>
            <Slider {...settings}>
                <div className='carousel-container'>
                    <img src={image1} alt="img1" className='carousel'/>
                </div>
                <div>
                    <img src={image2} alt="img2" className='carousel'/>
                </div>
                <div>
                    <img src={image3} alt="img3" className='carousel'/>
                </div>
            </Slider>


            </div>
            
        </div>
    );
};
export default ResearchMarket;