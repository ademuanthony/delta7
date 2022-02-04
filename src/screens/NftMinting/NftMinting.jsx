import React from 'react';
import './nft-minting.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import NftGallery from '../../components/NftGallery/NftGallery';

// import medaline from '../../images/minting/medaline.png'
import arrow from '../../images/minting/arrow-bottom.png'

const NftMinting = () => {
  return (
    <section>
      <Header />
      <section className='nft-minting-section'>
        <div className="container">
          <div className="page-heading">
            <h3>Bid and win in the Most anticipated <span className="text-warning">NFT Minting</span> </h3>
            <img src={arrow} alt="" className="arrow-bottom img-fluid"/>
          </div>
         <NftGallery/>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default NftMinting;
