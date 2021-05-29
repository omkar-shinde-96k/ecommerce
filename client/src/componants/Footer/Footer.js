import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
    return (
        <>
            <a href="#top" className="gotop">Back To Top</a> 
                <div className="upper-footer">
                    <div className="row inner-upper-footer">
                     
                        <div className="footer-link-box col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 "> 
                            <h4>Get to Know us</h4>
                            <NavLink className="navlink" to="">About Us</NavLink>
                            <NavLink className="navlink" to="">Careers</NavLink>
                            <NavLink className="navlink" to="">Press Releases</NavLink>
                            <NavLink className="navlink" to="">Amazon Cares</NavLink>
                            <NavLink className="navlink" to="">Gift a Smile</NavLink> 
                        </div>

                         <div className="footer-link-box col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                            <h4>Connect With Us</h4>
                            <NavLink className="navlink" to="">Facebook</NavLink>
                            <NavLink className="navlink" to="">Twitter</NavLink>
                            <NavLink className="navlink" to="">Instagram</NavLink>
                        </div>

                         <div className="footer-link-box col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                            <h4>Make Money With Us</h4>
                            <NavLink className="navlink" to="">About Us</NavLink>
                            <NavLink className="navlink" to="">Careers</NavLink>
                            <NavLink className="navlink" to="">Press Releases</NavLink>
                            <NavLink className="navlink" to="">Amazon Cares</NavLink>
                            <NavLink className="navlink" to="">Gift a Smile</NavLink>
                            <NavLink className="navlink" to="">Press Releases</NavLink>
                            <NavLink className="navlink" to="">Amazon Cares</NavLink>
                        </div>

                         <div className="footer-link-box col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                            <h4>Let Us Help You</h4>
                            <NavLink className="navlink" to="">About Us</NavLink>
                            <NavLink className="navlink" to="">Careers</NavLink>
                            <NavLink className="navlink" to="">Press Releases</NavLink>
                            <NavLink className="navlink" to="">Amazon Cares</NavLink>
                            <NavLink className="navlink" to="">Gift a Smile</NavLink>
                            <NavLink className="navlink" to="">Press Releases</NavLink>
                            <NavLink className="navlink" to="">Amazon Cares</NavLink>
                        </div>
                    </div>
                </div>    

            <div className="middle-footer">
                    <div className="footer-lang">
                        <div className="footer-lang-logo">amazon</div>
                        <div className="footer-lang-btn"><button>English</button></div>
                    </div>
                    <div className="footer-country">
                        <NavLink className="navlink" to="">About Us</NavLink>
                        <NavLink className="navlink" to="">Careers</NavLink>
                        <NavLink className="navlink" to="">Press Releases</NavLink>
                        <NavLink className="navlink" to="">Amazon Cares</NavLink>
                        <NavLink className="navlink" to="">Gift a Smile</NavLink>
                        <NavLink className="navlink" to="">Press Releases</NavLink>
                        <NavLink className="navlink" to="">Amazon Cares</NavLink>
                    </div>
                </div>
        </>
    )
}

export default Footer
