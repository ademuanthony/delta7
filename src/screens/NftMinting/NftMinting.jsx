import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import "./nft-minting.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import NftGallery from "../../components/NftGallery/NftGallery";

import { Contract } from "ethers";
import { delta7ContractAddress } from "../../web3/contracts";
import delta7Abi from "../../web3/abi/delta7";

// import medaline from '../../images/minting/medaline.png'
import arrow from "../../images/minting/arrow-bottom.png";

import { getRemainingTimeUntilMsTimestamp } from "../Minting/countdownTmerUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const NftMinting = () => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [countdownTimestampMs, setCountdownTimestampMs] = useState(0);

  const { library } = useWeb3React();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!library) return;

        const contract = new Contract(
          delta7ContractAddress,
          delta7Abi,
          library.getSigner()
        );

        let endDate = await contract.auctionEndDate();
        setCountdownTimestampMs(parseInt(endDate) * 1000);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <section>
      <Header />
      <section className="nft-minting-section">
        <div className="container">
          <div className="page-heading">
            <h3>
              Bid and win in the Most anticipated{" "}
              <span className="text-warning">NFT Minting</span>{" "}
            </h3>
            <img src={arrow} alt="" className="arrow-bottom img-fluid" />
          </div>

          <div className="row">
            
            <div className="col-md-6 offset-md-3">
              <div className="counter-section">
                <div>
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                      <div className="red-circle">
                        <div className="mt-2">
                          <h5>{remainingTime.days}</h5>
                          <p>Days</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                      <div className="yellow-circle">
                        <div className="mt-2">
                          <h5>{remainingTime.hours}</h5>
                          <p>Hours</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                      <div className="green-circle">
                        <div className="mt-2">
                          <h5>{remainingTime.minutes}</h5>
                          <p>Minutes</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                      <div className="purple-circle">
                        <div className="mt-2">
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

          <NftGallery />
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default NftMinting;
