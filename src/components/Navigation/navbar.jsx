import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import styles from './Navbar.module.css'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Pedidos'];

const Navbar = ({ setOpenSignIn, setOpenLogin, setOpenCarShop, shoppingCart, products, ItemsCount }) => {

  const handleOpenSigIn = () => setOpenSignIn(true)
  const handleOpenLogin = () => setOpenLogin(true)
  const handleOpenCarShop = () => setOpenCarShop(true)
  
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [UserId, setUserId] = useState(localStorage.UserId);
  const [UserName, setUserName] = useState(localStorage.UserName);
  const [UserLastName, setUserLastName] = useState(localStorage.UserLastName);

  const name = useSelector(state => state.user.name);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //LogOut
  const handleLogOut = (event) => {

    localStorage.setItem('UserId', '')
    localStorage.setItem('UserName', '')
    localStorage.setItem('UserLastName', '')
    localStorage.setItem('UserEmail', '')
    localStorage.setItem('UserSecretKey', '')
    handleCloseUserMenu()

  }

  // useEffect(() => {
  //   if(localStorage.getItem('UserId')){
  //     setUser(JSON.parse(localStorage.getItem('user')))
  //   }
  //   if(localStorage.getItem('room')){
  //     setroom(localStorage.getItem('room'))
  //   }
  // }, [])

  // const handleUser = () => {
  //   return true if localStorage.getItem("UserId")
  // }

  return (

    <AppBar position="static" style={{
      background: 'rgb(6 11 21 / 80%)',
      height: '5rem',
      boxShadow: 'none',
      zIndex: '1'
    }}>
      <Container maxWidth="xl" style={{ marginTop: '0.5rem' }}>
        <Toolbar disableGutters>
          {/*------------------------------------Large Screen NavBar Menu----------------------------------------*/}
          <Box sx={{ flexGrow: 1 }} style={{ margin: '0' }}>
            <Toolbar onClick={handleCloseNavMenu} style={{ display: 'flex', justifyContent: 'flex-end', height: '-webkit-fill-available', marginLeft: '1rem' }} >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <ButtonUnstyled className={styles.navbarLink} style={{
                    fontSize: '1.15rem',
                    fontfamily: 'arial',
                    textTransform: 'none',
                    background: 'none',
                    border: '0',
                    margin: '0, 1rem, 0, 0',
                    padding: '0'
                }}>
                    {name}  
                </ButtonUnstyled>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={name} src={name} />
                    </IconButton>
                </Tooltip>
              </Typography>
            </Toolbar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Navbar