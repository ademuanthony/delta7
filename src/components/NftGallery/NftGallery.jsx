import React, {useState, useCallback} from 'react';
import auction from '../../images/minting/auction.png'
import CharacterModal from '../CharacterModal/CharacterModal';

import './Nftgallery.css'

// Import Swiper React components
// import { Autoplay, Navigation, } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import Swiper styles
// import 'swiper/swiper.min.css'; // core Swiper
// import 'swiper/modules/autoplay/autoplay.min.css'; // core Swiper

import { firstCharacters } from './NftCharacter';


const NftGallery = () => {
    const [showModal, setShowModal] = useState(false);
    const [character, setCharacter] = useState({});
    // const handleShow = (character) =>{ setShowModal(true); console.log('seen:', character)}
    const openCharacter = useCallback((character) => {
        setCharacter({
            id: character.id,
            name : character.name,
            image: character.image,
            description : character.description,
        })
        setShowModal(true);
    }, [])

    return (
        <section>
            <div className="nft-gallery py-5">
                <div className="row">
                    {firstCharacters.map((character) => (
                        <div className="col-lg-3 col-md-6 col-12 mb-4" key={character.id}>
                            <div className="nft-card">
                                <div className="nft-image text-center">
                                    <img src={character.image} alt="" className='img-fluid' />
                                </div>
                                <div className="nft-name mt-3">
                                    <h5>{character.name} {showModal}</h5>
                                </div>
                                <div className="nft-bidding-info d-flex">
                                    <div className="current-bid py-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='auction-img'>
                                                <img src={auction} alt="" className='img-fluid' />
                                            </div>
                                            <div className='auction-text'>
                                                <p className='mb-0'>Current Bid</p>
                                                <p className='mb-0'>10000000 DFC</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="total-bid ps-2 py-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='bid-img'>
                                                <img src={auction} alt="" className='img-fluid' />
                                            </div>
                                            <div className='bid-text'>
                                                <p className='mb-0'>Total Bids</p>
                                                <p className='mb-0'>600</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className='btn btn-warning mt-3 bid-btn' onClick={() => openCharacter(character)}>
                                        BID NOW
                                    </button>
                                </div>
                               
                            </div>
                        </div>

                    ))}

                </div>
            </div>
            <CharacterModal show={showModal} handleClose={() => setShowModal(false)} character={character} />
            {/* <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={6}
                navigation
                autoplay
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetweenSlides: 50
                    },
                    375: {
                        slidesPerView: 2,
                        spaceBetweenSlides: 10
                    },
                    // when window width is <= 999px
                    768: {
                        slidesPerView: 4,
                        spaceBetweenSlides: 10
                    },
                    999: {
                        slidesPerView: 7,
                        spaceBetweenSlides: 10
                    }

                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {characters.map((character) => (
                    <SwiperSlide>
                        <div className="nft-item-box" onClick={(e) => displayCharacter(e, character)}>
                            <img src={character.image} alt={character.name} className="img-fluid" />
                        </div>
                    </SwiperSlide>

                ))}

            </Swiper> */}
        </section>
    );
};

export default NftGallery;
