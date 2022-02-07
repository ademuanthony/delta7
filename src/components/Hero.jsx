import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';
import gameCards from '../images/Union.png'

const Hero = () => {
    return (
        <div className="hero-section" id="home">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={ gameCards } alt="game-cards" className="img-fluid pt-4"/>
                    </div>
                    <div className="col-md-6">
                        <div className="welcome-section">
                            <h1 className="mb-3">THIS IS DELTA7</h1>
                            {/* <h5 className="mb-5">Play, explore and trade in a unique virtual world that offers monetization of gaming experience and limitless rewards.</h5> */}
                            <h5>Behind you, in a thick/cold weather comes the ancient African mysterious masquerades, to and fro, day and night they move in the realm of your imagination.</h5>
                            <h5>For or against,  a winner must EMERGE.</h5>
                            <h5 className='mb-4'>Fight to Win!!!</h5>
                            <a href="https://deficonnect.tech/markets" className="btn main-btn me-3" target="_blank" rel="noreferrer">BUY DFC</a>
                            <Link className="btn btn-outline-warning" to="/minting">MINT DELTA7</Link>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Hero
