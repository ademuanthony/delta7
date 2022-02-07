import React from 'react'
import './GamePlay.css'
// import fightShow from '../images/fight-show.png'
import fightShow1 from '../images/fight-show-1.png'
import fightShow2 from '../images/fight-show-22.png'
import fightShow3 from '../images/fight-show-33.png'
// Import Swiper React components
import { Autoplay, Navigation, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import Swiper styles
import 'swiper/swiper.min.css'; // core Swiper
import 'swiper/modules/autoplay/autoplay.min.css'; // core Swiper
// import 'swiper/modules/navigation/react'; // Navigation module
// import 'swiper/modules/pagination/react'; // Pagination module

const GamePlay = () => {
    return (
        <div className="game-play-section">
            <div className="container">
                <h1 className="pt-5 heading">Game<span className="text-warning">Play</span></h1>
                <section className="mt-5">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        autoplay
                        onSlideChange={() => {}}
                        onSwiper={(swiper) => {}}
                        >
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={fightShow1} alt="wolf and man" className="img-fluid" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={fightShow2} alt="wolf and man" className="img-fluid" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={fightShow3} alt="wolf and man" className="img-fluid" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="text-center pb-3 play-friends">
                        <h5>Play with Friends</h5>
                        <p>Why play online games when you can play in the virtual world with friends, build up teammates, share strategies, build your own community and play against each other to see who earns more in delta7; stocking the very best digital items and accoutrement for effective gaming under a platform solidly protected by a decentralized block chain technology.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default GamePlay
