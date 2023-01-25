import { useSelector } from "react-redux"
import classes from './Layout.module.css'
import Sidebar from "../../components/Navigation/sidebar"
import Navbar from "../../components/Navigation/navbar"

const Layout = (props) => {
    
    const authToken = useSelector(state => state.user.authToken)

    return(
        <div className={classes.Layout}>
            <Navbar/>
            <Sidebar
                isAuthenticated={authToken}
            />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout

