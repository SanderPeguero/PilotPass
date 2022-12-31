import { useSelector } from "react-redux";
import classes from './Layout.module.css'
import Navbar from "../../components/Navigation/navbar.jsx";

const Layout = (props) => {
    
    const authToken = useSelector(state => state.user.authToken)

    return(
        <div className={classes.Layout}>
            <Navbar
                isAuthenticated={authToken}
            />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout

