import React from 'react';
import './modal.css'
import { Modal } from 'react-bootstrap';
import cancel from '../../images/minting/cancel.png'

const SuccessModal = ({show, closeModal}) => {
    return (
        <Modal show={show} onHide={closeModal} centered dialogClassName='character-modal'>
            <Modal.Body>
                <div className="d-flex justify-content-end mb-2">
                    <img src={cancel} alt="" className='img-fluid' role="button" onClick={() => closeModal()} />
                </div>
                <div className="d-flex justify-content-center align-items-center success-modal">
                    <div className='text-center'>
                        <h1 className='mb-5'>CONGRATULATIONS</h1>
                        <p>Your bidding was successful</p>
                    </div>
                </div>

            </Modal.Body>

        </Modal>
    );
};

export default SuccessModal;
