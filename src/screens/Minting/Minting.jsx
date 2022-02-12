import React, { useEffect, useState } from 'react';
import './minting.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import { getRemainingTimeUntilMsTimestamp } from './countdownTmerUtils'
// import { Link } from 'react-router-dom';
const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}
const Minting = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000)
        return () => clearInterval(intervalId)
    }, [countdownTimestampMs])

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
    }
    return (
        <section className='minting-section'>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-section">
                                <div>
                                    <h1>NEW AUCTION STARTS EVERY <span className='text-warning'>SATURDAY</span></h1>
                                    <div className="benefits mt-3">
                                        <ul>
                                            <li className='mb-2'>This is an auction to mint Delta7</li>
                                            <li className='mb-2'>You need DFC to auction</li>
                                            <li className='mb-2'>10 unique NFTs will be released every Saturday</li>
                                            <li className='mb-2'>The highest bidder  wins the auction to mint Delta7</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="counter-section">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6 col-12 mb-3">
                                            <div className="red-circle">
                                                <div className='mt-2'>
                                                    <h5>{remainingTime.days}</h5>
                                                    <p>Days</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-12 mb-3">
                                            <div className="yellow-circle">
                                                <div className='mt-2'>
                                                    <h5>{remainingTime.hours}</h5>
                                                    <p>Hours</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-12 mb-3">
                                            <div className="green-circle">
                                                <div className='mt-2'>
                                                    <h5>{remainingTime.minutes}</h5>
                                                    <p>Minutes</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-12 mb-3">
                                            <div className="purple-circle">
                                                <div className='mt-2'>
                                                    <h5>{remainingTime.seconds}</h5>
                                                    <p>Seconds</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="my-5">
                                        <Link to="/nft-minting" className='btn btn-warning'>Go bidding</Link>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    );
};

export default Minting;
