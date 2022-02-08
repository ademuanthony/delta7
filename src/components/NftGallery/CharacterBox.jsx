import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import auction from "../../images/minting/auction.png";
import SuccessModal from "../CharacterModal/SuccessModal";
import { Contract, BigNumber } from "ethers";
import {
  delta7ContractAddress,
  dfcContractAddress,
} from "../../web3/contracts";
import delta7Abi from "../../web3/abi/delta7";
import dfcAbi from "../../web3/abi/dfc";

const CharacterBox = ({ character }) => {
  const [bidCount, setBidCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dfcEnabled, setDfcEnabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [topBid, setTopBid] = useState(0);
  const [topBidder, setTopBidder] = useState("");
  const [round, setRound] = useState(0);

  const closeSuccessModal = () => {
    setSuccess(false);
  };

  const openSuccesModal = () => {
    setSuccess(true);
  };

  const { library, account } = useWeb3React();

  async function fetchData() {
    const contract = new Contract(
      delta7ContractAddress,
      delta7Abi,
      library.getSigner()
    );
    const dfcContract = new Contract(
      dfcContractAddress,
      dfcAbi,
      library.getSigner()
    );

    const roundResult = await contract.round();
    setRound(parseInt(roundResult));
    if (round <= 0) return;

    const item = (round - 1) * 10 + character.id - 1

    const bidResult = await contract.auctionWinner(
      item,
      round
    );
    setTopBid(parseInt(bidResult.amount) / 1e8);
    setTopBidder(bidResult.account);
    if(amount === 0) {
      setAmount(1000000000 + topBid);
    }

    const bidCountResult = await contract.bidCount(parseInt(round), item);
    setBidCount(parseInt(bidCountResult));

    const allowance = await dfcContract.allowance(
      account,
      delta7ContractAddress
    );
    setDfcEnabled(parseInt(allowance) / 1e8 > topBid);
  }

  useEffect(() => {
    if (!library) {
      return;
    }
    if (!character.id) return;
    fetchData();
  });

  const placeBid = async () => {
    if (!library) return;
    const contract = new Contract(
      delta7ContractAddress,
      delta7Abi,
      library.getSigner()
    );
    const dfcContract = new Contract(
      dfcContractAddress,
      dfcAbi,
      library.getSigner()
    );

    try {
      const dfcBalance = await dfcContract.balanceOf(account);
      if (parseInt(dfcBalance) / 1e8 < amount) {
        alert("Insufficient DFC balance.");
        return;
      }
      if (!dfcEnabled) {
        await dfcContract.approve(
          delta7ContractAddress,
          BigNumber.from(1e14).mul(1e8)
        );
        return;
      }
      const item = (round - 1) * 10 + character.id - 1
      await contract.placeBid(item, BigNumber.from(amount).mul(1e8));
      openSuccesModal();
      await fetchData()
    } catch (error) {
      if (error.data) alert(error.data.message);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-4" key={character.id}>
      <div className="nft-card">
        <div className="nft-image text-center">
          <img src={character.image} alt="" className="img-fluid" />
        </div>
        <div className="nft-name mt-3">
          <h5>{character.name}</h5>
        </div>
        <div className="nft-description mt-2">
          <p>{character.description}</p>
        </div>
        <div className="nft-bidding-info d-flex">
          <div className="current-bid py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="auction-img">
                <img src={auction} alt="" className="img-fluid" />
              </div>
              <div className="auction-text">
                <p className="mb-0">Current Bid</p>
                <p className="mb-0">{topBid} DFC</p>
              </div>
            </div>
          </div>
          <div className="total-bid ps-2 py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="bid-img">
                <img src={auction} alt="" className="img-fluid" />
              </div>
              <div className="bid-text">
                {/* <p className="mb-0">Total Bids</p>
                <p className="mb-0">{bidCount}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          {/* <button
            className="btn btn-warning mt-3 bid-btn"
            onClick={() => openCharacter(character)}
          >
            BID NOW
          </button> */}

          <div className="bid-input-section">
            <div className="input-group mb-3">
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Enter your bid(DFC)"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn bid-btn"
                type="button"
                id="button-addon2"
                onClick={placeBid}
              >
                {dfcEnabled ? "BID NOW" : "ENABLE DFC"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal show={success} closeModal={closeSuccessModal} />
    </div>
  );
};

export default CharacterBox;
