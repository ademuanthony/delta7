import React, {useState, useCallback} from 'react';
import CharacterModal from '../CharacterModal/CharacterModal';

import './Nftgallery.css'

// Import Swiper React components
// import { Autoplay, Navigation, } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import Swiper styles
// import 'swiper/swiper.min.css'; // core Swiper
// import 'swiper/modules/autoplay/autoplay.min.css'; // core Swiper

import { firstCharacters } from './NftCharacter';
import CharacterBox from './CharacterBox';


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
                        <CharacterBox key={character.id} character={character} openCharacter={openCharacter}/>
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
