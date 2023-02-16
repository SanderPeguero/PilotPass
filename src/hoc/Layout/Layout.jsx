import store from '../../redux/store'
import classes from './Layout.module.css'
import { useSelector } from "react-redux"
import Loader from '../../components/Loader/Loader'
import Sidebar from "../../components/Navigation/sidebar"

const Layout = (props) => {
    
    const authToken = useSelector(state => state.user.authToken)
    const isLoading = store.getState().loading.loading
    
    if(isLoading) {
        return(
            <Loader/>
        )
    }

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

