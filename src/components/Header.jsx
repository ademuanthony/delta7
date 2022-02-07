import React, { useState } from 'react';
import { Navbar, Container, Nav,} from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom';
import './Header.css'
import hamburger from '../images/menu.svg'
import logo from '../images/logo.png'
import LoginModal from './Auth/LoginModal';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const { active, deactivate } = useWeb3React()
    // const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const authenticate = () => {
        setShowModal(true);
    }

    return (
        <div>
            <Navbar className="main-navbar" expand="lg" fixed="top">
                <Container>
                {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                <div className="d-flex align-items-center">
                    <Navbar.Toggle aria-controls="navbarScroll" className='me-3'><img src={hamburger} alt=""/></Navbar.Toggle>
                    <Navbar.Brand href="/"><img src={logo} alt="" className='img-fluid'/></Navbar.Brand>
                </div>
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/#about">About</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"  to="/nft-market">NFT Market</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#metaverse">Metaverse</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#token">Token</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link"  href="/#faq">FAQ</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/#news">News</a>
                        </li> */}
                        <li className="nav-item">
                            <Link className=" btn btn-outline-warning" to="/minting">MINT DELTA7</Link>
                        </li>
                        {!active? (
                            <li>
                                <button className="btn btn-outline-success" onClick={() => authenticate()}>Connect</button>
                            </li>
                        ):(
                            <li>
                                <button className="btn btn-outline-danger" onClick={deactivate}>Logout</button>
                            </li>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
        </div>
    )
}

export default Header
