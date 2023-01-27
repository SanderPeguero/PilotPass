import { useSelector } from "react-redux"
import classes from './Layout.module.css'
import Sidebar from "../../components/Navigation/sidebar"

const Layout = (props) => {
    
    const authToken = useSelector(state => state.user.authToken)

    return(
        <div className={classes.Layout}>
            <Sidebar
                isAuthenticated={authToken}
            />
            <main style={{marginTop: '4rem'}}>
                {props.children}
            </main>
        </div>
    )
}

export default Layout

