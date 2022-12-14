import { Component } from "react";
import { connect, useSelector } from "react-redux";

import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer.jsx'
import Navbar from "../../components/Navigation/navbar/navbar.jsx";


const Layout = (props) => {
    
    const authToken = useSelector(state => state.user.authToken)

    return(
        <div className={classes.Layout}>

            <Navbar
                isAuthenticated={authToken}
            />

            {/* <Drawer
                isMenuOpen={this.state.isMenuOpen}
                onClose={this.menuCloseHandler}
                isAuthenticated={this.props.isAuthenticated}
            />
            <MenuToggle
                onToggle={this.toggleMenuHandler}
                isMenuOpen={this.state.isMenuOpen}
            /> */}
            <main>
                {props.children}
            </main>
        </div>
    )
}

// class Layout extends Component{
    
//     state = {
//         isMenuOpen: false
//     }

//     toggleMenuHandler = () => {
//         this.setState({
//             isMenuOpen: !this.state.isMenuOpen
//         })
//     }

//     menuCloseHandler = () => {
//         this.setState({
//             isMenuOpen: false
//         })
//     }

//     render(){
//         return(
//             <div className={classes.Layout}>

//                 <Navbar
//                     isAuthenticated={this.props.isAuthenticated}
//                 />

//                 {/* <Drawer
//                     isMenuOpen={this.state.isMenuOpen}
//                     onClose={this.menuCloseHandler}
//                     isAuthenticated={this.props.isAuthenticated}
//                 />
//                 <MenuToggle
//                     onToggle={this.toggleMenuHandler}
//                     isMenuOpen={this.state.isMenuOpen}
//                 /> */}
//                 <main>
//                     {this.props.children}
//                 </main>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state){
//     return {
//         isAuthenticated: Boolean(state.authControl.authToken)
//     }
// }

export default Layout

