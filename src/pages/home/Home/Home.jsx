import * as React from 'react'
import Home from '../home.jsx'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import style from './card.css'
const HomeBox = () => {


    return (
        <>
            <ul className="menu cf">
                <li><a href="#">Home</a></li>
                <li><a href="#/plan">Plan</a></li>
                <li><a href="#/login">Login</a></li>
                <li><a href="#/signup">Sign Up</a></li>
            </ul>

        </>
    )

}

export default HomeBox

