import React, { useState } from 'react';
import './modal.css'
import { Modal } from 'react-bootstrap';
import cancel from '../../images/minting/cancel.png'
// import medalineFull from '../../images/minting/medalinefull.png'
import bidPerson from '../../images/minting/bid-person.png'
import SuccessModal from './SuccessModal';

const CharacterModal = ({ show, handleClose, character }) => {
    const [success, setSuccess] = useState(false)
    const closeModal = () => setSuccess(false)
    const openModal = () => {
        handleClose();
        setSuccess(true);
        console.log('open')};
    return (<div>
        <Modal show={show} onHide={handleClose} centered dialogClassName='character-modal'>

<Modal.Body>
    <div className="d-flex justify-content-end mb-2">
        <img src={cancel} alt="" className='img-fluid' role="button" onClick={() => handleClose()} />
    </div>
    <div className="px-3 character-inner-modal">
        <div className="image-box">
            <img src={character.image} alt="" className='img-fluid' />
        </div>
        <div className="character-info mt-3">
            <h4>{character.name}</h4>
            <p>Play, explore and trade in a unique virtual world that offers monetization of gaming experience and limitless rewards  Play, explore and trade in a unique virtual world that offers monetization of gaming experience and limitless rewards</p>
        </div>
        <div className="top-bidders">
            <h5 className='text-center mb-3'>Top Bidders</h5>
            <div className="bidders">
                <div className="bid-person d-flex justify-content-between align-items-center">
                    <div className="bid-image text-center">
                        <img src={bidPerson} alt="" className='img-fluid' />
                    </div>
                    <div className="bidder-info">
                        <h5>Ade YAZZ1</h5>
                        <p className='mb-0'>Wallet Address:</p>
                        <p className='mb-0'>10000000000000 DFC</p>
                    </div>
                </div>
                <div className="bid-person d-flex justify-content-between align-items-center">
                    <div className="bid-image text-center">
                        <img src={bidPerson} alt="" className='img-fluid' />
                    </div>
                    <div className="bidder-info">
                        <h5>Ade YAZZ1</h5>
                        <p className='mb-0'>Wallet Address:</p>
                        <p className='mb-0'>10000000000000 DFC</p>
                    </div>
                </div>
                <div className="bid-person d-flex justify-content-between align-items-center">
                    <div className="bid-image text-center">
                        <img src={bidPerson} alt="" className='img-fluid' />
                    </div>
                    <div className="bidder-info">
                        <h5>Ade YAZZ1</h5>
                        <p className='mb-0'>Wallet Address:</p>
                        <p className='mb-0'>10000000000000 DFC</p>
                    </div>
                </div>
            </div>
            <div className="bid-input-section">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your bid(DFC)" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn bid-btn" type="button" id="button-addon2" onClick={openModal}>BID NOW</button>
                </div>
            </div>
        </div>
    </div>

</Modal.Body>

</Modal>
<SuccessModal show={success} closeModal={closeModal}/>
    </div>
        
    );
};

export default CharacterModal;
