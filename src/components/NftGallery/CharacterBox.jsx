import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from  'ethers'
import auction from "../../images/minting/auction.png";
import { delta7ContractAddress } from "../../web3/contracts";
import delta7Abi from '../../web3/abi/delta7'

const CharacterBox = ({ character, openCharacter }) => {
  const [currentBid, setCurrentBid] = useState('0');
  const [bidCount, setBidCount] = useState(0)
  const {library} = useWeb3React()

  useEffect(() => {
    if (!library) {
      return
    }
    async function fetchData() {
      const contract = new Contract(delta7ContractAddress, delta7Abi, library.getSigner())
      const round = await contract.round()
      if(parseInt(round) <= 0) return

      const item = (parseInt(round)-1) * 10 +character.id-1

      const bidResult = await contract.auctionWinner(item, parseInt(round))
      setCurrentBid(parseInt(bidResult.amount)/1e8)

      const bidCountResult = await contract.bidCount(parseInt(round), item)
      setBidCount(parseInt(bidCountResult))
    }
    fetchData();
    
  })

  return (
    <div className="col-lg-3 col-md-6 col-12 mb-4" key={character.id}>
      <div className="nft-card">
        <div className="nft-image text-center">
          <img src={character.image} alt="" className="img-fluid" />
        </div>
        <div className="nft-name mt-3">
          <h5>{character.name}</h5>
        </div>
        <div className="nft-bidding-info d-flex">
          <div className="current-bid py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="auction-img">
                <img src={auction} alt="" className="img-fluid" />
              </div>
              <div className="auction-text">
                <p className="mb-0">Current Bid</p>
                <p className="mb-0">{currentBid} DFC</p>
              </div>
            </div>
          </div>
          <div className="total-bid ps-2 py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="bid-img">
                <img src={auction} alt="" className="img-fluid" />
              </div>
              <div className="bid-text">
                <p className="mb-0">Total Bids</p>
                <p className="mb-0">{bidCount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning mt-3 bid-btn"
            onClick={() => openCharacter(character)}
          >
            BID NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterBox;
