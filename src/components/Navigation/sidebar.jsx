import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../Images/Logo.png'
import Navbar from './navbar'

const Sidebar = ({ isAuthenticated }) => {

    if (isAuthenticated) {

        return (
            <>
                {/* <Navbar/> */}
                {/* <div style={{position: 'fixed' ,height: '5rem', width: '100%', backgroundColor:'rgb(6 11 21 / 80%)', zIndex: '1', display: 'flex', justifyContent: 'flex-end'}}>
                <p style={{color:'white', alignSelf:'center', paddingRight: '5rem'}}>
                    Welcome Sander!
                </p>
            </div> */}
                <nav className="navbar" style={{
                    position: 'fixed',
                    backgroundColor: 'rgb(6 11 21 / 80%)',
                    transition: 'width 600ms ease',
                    overflow: 'hidden',
                    zIndex: '2'
                }}>
                    <ul className="navbar-nav">

                        <li className="logo">
                            <NavLink to="/" className="nav-link">
                                <span className="link-text logo-text">PilotPass</span>
                                <img src={logo} />
                            </NavLink>
                        </li>

                    {/* Test List */}
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" className="fa-primary" d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm32-128c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM128 384c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z"/></svg>
                            <span className="link-text">Tests</span>
                        </NavLink>
                    </li>



                        {/* <li className="nav-item">
                            <NavLink to="/testresult" className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clipRule="evenodd" />
                                </svg>
                                <span className="link-text">Test Result</span>
                            </NavLink>
                        </li> */}



                        {/* Log Out */}
                        <li className="nav-item">
                            <NavLink to="/logout" className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" className="fa-primary" d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                                <span className="link-text">Log Out</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </>
        )

    }


}


export default Sidebar;