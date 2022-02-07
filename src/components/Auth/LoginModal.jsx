import React from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
  } from "@web3-react/injected-connector";
  import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
  } from "@web3-react/walletconnect-connector";
  
import { Modal } from 'react-bootstrap';
import cancel from '../../images/minting/cancel.png'
import { injected, walletconnect } from './Connector';

const LoginModal = ({ show, handleClose }) => {

    const { activate } = useWeb3React()

    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
          return "No wallet browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
          return "You're connected to an unsupported network.";
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          return "Please authorize this website to access your BSC account.";
        } else {
          console.error(error);
          return "An unknown error occurred. Check the console for more details.";
        }
      }

    const connect = async (connector) => {
        try {
          await activate(connector)
          handleClose()
        } catch (ex) {
          console.log(ex)
          alert(getErrorMessage(ex))
        }
      }
 
    return (
    <div>
        <Modal show={show} onHide={handleClose} centered dialogClassName='character-modal'>

            <Modal.Body>
                <div className="d-flex justify-content-end mb-2">
                    <img src={cancel} alt="" className='img-fluid' role="button" onClick={() => handleClose()} />
                </div>
                <div className="px-md-3 px-1 character-inner-modal">
                    <h3>Select Wallet Provider</h3>
                    <p>
                        <button className='btn btn-outline-primary' onClick={() => connect(injected)}>Metamask</button>
                    </p>
                    <p>
                    <button className='btn btn-outline-primary' onClick={() => connect(walletconnect)}>WalletConnect</button>
                    </p>
                </div>
            </Modal.Body>

        </Modal>
    </div>
    );
};

export default LoginModal;
