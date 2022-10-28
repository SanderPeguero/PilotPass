import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Search } from "./Search.jsx";
// import styles from "../CSS/Navbar.module.css";
// import styles from "../CSS/Navbar2.module.css";

// import logo from "../Images/GatoLogo.svg";
import logo from '../../../Images/Logo.png'

const Navbar = ({ isAuthenticated }) => {

    const [toggleMenu, setToggleMenu] = useState(false)

    const links = [{ to: "/", label: "Home", exact: "true", className: "nav-link" }]
    
    if(isAuthenticated){
     
      return(

        <nav className="navbar" style={{
            position: 'fixed',
            backgroundColor: '#23232e',
            transition: 'width 600ms ease',
            overflow: 'hidden',
            zIndex: '1'
        }}>
            <ul className="navbar-nav">

                <li className="logo">
                    <NavLink to="/" className="nav-link">
                        <span className="link-text logo-text">SCoin</span>
                        <img src={logo}/>                            
                    </NavLink>
                </li>

                {/* Test List Nav Button */}
                <li className="nav-item">
                    <a href="/" className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" className="fa-primary" d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm32-128c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM128 384c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z"/></svg>
                        <span className="link-text">Tests</span>
                    </a>
                </li>

                <li className="nav-item">
                    <NavLink to="/quiz-creator" className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" className="fa-primary" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                        <span className="link-text">Create Quiz</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/payment" className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path 
                                fill="currentColor"
                                d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"
                                className="fa-primary"
                            />
                        </svg>
                        <span className="link-text">Payment</span>
                    </NavLink>
                </li>

                {/* Log Out Nav Button */}
                <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" className="fa-primary" d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                        <span className="link-text">Log Out</span>
                    </NavLink>
                </li>

            </ul>
        </nav>
       
      )

    }else{
        
        return(
            <nav className="navbar" style={{
                position: 'fixed',
                backgroundColor: '#23232e',
                transition: 'width 600ms ease',
                overflow: 'hidden',
                zIndex: '1'
            }}>
                <ul className="navbar-nav">
    
                    <li className="logo">
                        <NavLink to="/" className="nav-link">
                            <span className="link-text logo-text">SCoin</span>
                            <img src={logo}/>                            
                        </NavLink>
                    </li>

    
                    {/* Test List Nav Button */}
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" className="fa-primary" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/></svg>
                            <span className="link-text">Log In</span>
                        </NavLink>
                    </li>
    
                    
    
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fad"
                                data-icon="space-shuttle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="svg-inline--fa fa-space-shuttle fa-w-20 fa-5x"
                            >
                                <g className="fa-group">
                                    <path
                                        fill="currentColor"
                                        d="M32 416c0 35.35 21.49 64 48 64h16V352H32zm154.54-232h280.13L376 168C243 140.59 222.45 51.22 128 34.65V160h18.34a45.62 45.62 0 0 1 40.2 24zM32 96v64h64V32H80c-26.51 0-48 28.65-48 64zm114.34 256H128v125.35C222.45 460.78 243 371.41 376 344l90.67-16H186.54a45.62 45.62 0 0 1-40.2 24z"
                                        className="fa-secondary"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M592.6 208.24C559.73 192.84 515.78 184 472 184H186.54a45.62 45.62 0 0 0-40.2-24H32c-23.2 0-32 10-32 24v144c0 14 8.82 24 32 24h114.34a45.62 45.62 0 0 0 40.2-24H472c43.78 0 87.73-8.84 120.6-24.24C622.28 289.84 640 272 640 256s-17.72-33.84-47.4-47.76zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.91 0 31.94 80 0 80z"
                                        className="fa-primary"
                                    ></path>
                                </g>
                            </svg>
                            <span className="link-text">Quantum</span>
                        </a>
                    </li>
    
                </ul>
            </nav>
        )

    }

   
}


export default Navbar;