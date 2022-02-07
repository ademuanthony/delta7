import React, { useState, useEffect } from 'react';
import './modal.css'
import { Modal } from 'react-bootstrap';
import cancel from '../../images/minting/cancel.png'
// import medalineFull from '../../images/minting/medalinefull.png'
import bidPerson from '../../images/minting/bid-person.png'
import SuccessModal from './SuccessModal';
import { useWeb3React } from "@web3-react/core";
import { Contract, BigNumber } from  'ethers'
import { delta7ContractAddress, dfcContractAddress } from "../../web3/contracts";
import delta7Abi from '../../web3/abi/delta7'
import dfcAbi from '../../web3/abi/dfc'

const CharacterModal = ({ show, handleClose, character }) => {
    const [success, setSuccess] = useState(false)
    const [amount, setAmount] = useState(0)
    const [dfcEnabled, setDfcEnabled] = useState(false)
    const [topBid, setTopBid] = useState(0)
    const [topBidder, setTopBidder] = useState('')
    const [round, setRound] = useState(0)

    const closeThisModal = () => {
        handleClose()
        setTopBid(0)
        setTopBidder('')
    }

    const closeSuccessModal = () => {
        setSuccess(false)
    }

    const openSuccesModal = () => {
        handleClose();
        setSuccess(true);
        console.log('open')
    };

    const {library, account} = useWeb3React()

    useEffect(() => {
        if (!library) {
            return
        }
        if(!character.id) return

        async function fetchData() {
            const contract = new Contract(delta7ContractAddress, delta7Abi, library.getSigner())
            const dfcContract = new Contract(dfcContractAddress, dfcAbi, library.getSigner())

            const roundResult = await contract.round()
            setRound(parseInt(roundResult))
            if (round <= 0) return
            const bidResult = await contract.auctionWinner((round-1)*10 + character.id-1, round)
            setTopBid(parseInt(bidResult.amount)/1e8)
            setTopBidder(bidResult.account)
            setAmount(1000000000 + topBid)

            const allowance = await dfcContract.allowance(account, delta7ContractAddress)
            setDfcEnabled(parseInt(allowance)/1e8 > topBid)
        }
        fetchData();
        
    })

    const placeBid = async () => {
        if (!library) return
        const contract = new Contract(delta7ContractAddress, delta7Abi, library.getSigner())
        const dfcContract = new Contract(dfcContractAddress, dfcAbi, library.getSigner())

        try {
            const dfcBalance = await dfcContract.balanceOf(account)
            if (parseInt(dfcBalance)/1e8 < amount) {
                alert('Insufficient DFC balance.')
                return
            }
            if (!dfcEnabled) {
                await dfcContract.approve(delta7ContractAddress, BigNumber.from(1e14).mul(1e8))
                return
            }
            await contract.placeBid((round-1)*10 + character.id, BigNumber.from(amount).mul(1e8))
            handleClose()
            openSuccesModal()
        } catch (error) {
            if(error.data)
                alert(error.data.message)
        }
        
    }

    return (<div>
        <Modal show={show} onHide={closeThisModal} centered dialogClassName='character-modal'>

<Modal.Body>
    <div className="d-flex justify-content-end mb-2">
        <img src={cancel} alt="" className='img-fluid' role="button" onClick={() => closeThisModal()} />
    </div>
    <div className="px-md-3 px-1 character-inner-modal">
        <div className="image-box">
            <img src={character.image} alt="" className='img-fluid' />
        </div>
        <div className="character-info mt-3">
            <h4>{character.name}</h4>
            <p>Play, explore and trade in a unique virtual world that offers monetization of gaming experience and limitless rewards  Play, explore and trade in a unique virtual world that offers monetization of gaming experience and limitless rewards</p>
        </div>
        <div className="top-bidders">
        {topBid > 0? (
            <>
            <h5 className='text-center mb-3'>Top Bid</h5>
            <div className="bidders">
                <div className="bid-person d-flex justify-content-between align-items-center">
                    <div className="bid-image text-center">
                        <img src={bidPerson} alt="" className='img-fluid' />
                    </div>
                    <div className="bidder-info">
                        <p className='mb-0'>Wallet Address: <span style={{fontSize:'10px'}}>{topBidder}</span></p>
                        <p className='mb-0'>{topBid} DFC</p>
                    </div>
                </div>
            </div>
            </>
        ) : ('')}
            
            <div className="bid-input-section">
                <div className="input-group mb-3">
                    <input value={amount} onChange={e => {setAmount(e.target.value)}}
                     type="text" className="form-control" placeholder="Enter your bid(DFC)" 
                     aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn bid-btn" type="button" id="button-addon2" onClick={placeBid}>
                        {dfcEnabled? 'BID NOW': 'ENABLE DFC'}
                    </button>
                </div>
            </div>
        </div>
    </div>

</Modal.Body>

</Modal>
<SuccessModal show={success} closeModal={closeSuccessModal}/>
    </div>
        
    );
};

export default CharacterModal;
