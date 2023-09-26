import * as React from 'react';
import './homepage.css';
import Histroy from '../maps/history'
import Navs from '../common/navbar'
import CarouselDefault from "../homepage/Crousels";
function Home() {
    return (
        <div>
            <Navs />
            <div className='containerr'>
                <div className='text-mid'>
                    <h1>Embark on a Global Journey..</h1>
                    <p >Travel Through Time, One Spot at a Time</p>
                    <button>Get Started</button>
                    <p style={{display:'inline',paddingLeft:'40px'}}>Explore More</p>
                </div>

                <div className='just'>

                </div>
            </div>
                <CarouselDefault/>

            <Histroy/>

        </div>
    );
}
export default Home;