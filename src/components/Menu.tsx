import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store/index';

export default function Menu() {
    const [open, setOpen] = React.useState(false);
    const userData = useSelector((state: RootState) => state.authenticator)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleClick = () => {
      dispatch(authActions.logout())
      navigate('/')
    };

    const isLoggedin = userData.Autenticado
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
    if(!isLoggedin) {
        navigate('/')
    }
    },[isLoggedin,navigate])

    const DrawerList = (
        <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <Link to={'/Home'} style={{textDecoration:'none',color:'black'}}>
              <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Inicio' />
                  </ListItemButton>
                </ListItem>
            </Link>
            <Link to={'/Reports'} style={{textDecoration:'none',color:'black'}}>
              <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Informes' />
                  </ListItemButton>
                </ListItem>
            </Link>
            <Link to={'/Home'} style={{textDecoration:'none',color:'black'}}>
              <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HelpIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Ayuda' />
                  </ListItemButton>
                </ListItem>
            </Link>
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
                <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItemButton>
                </ListItem>
            </Link>
        </List> 
        </Box>
      );


    return (
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={toggleDrawer(true)}
                color="inherit"
              >
              <MenuIcon />
              <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
              </Drawer>
              </IconButton>
              <IconButton sx={{color:"white", flexGrow:1}} onClick={handleClick}>{userData.nombreUsuario}</IconButton>
              <IconButton color='inherit'>
                <AccountCircle/>
              </IconButton>
              </Toolbar>
          </AppBar>
        </Box>
      );

}