import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { LogoutAction } from 'store/action/authAction';


const AccountMenu = styled.div`
    cursor:pointer;
    display:flex;
    align-items:center;
    padding:0px 5px;
`
const AccountName = styled.h5`
    margin:0px;
`

export default function UserMenu(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch()
    const history = useHistory()
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log("tiep");
        setAnchorEl(null);
    };
    const handleLogout = ()=>{
        dispatch(LogoutAction())
        history.push("/")
    }
    console.log(user);
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <AccountMenu onClick={handleClick} >
                    <Avatar style={{ marginRight: "5px" }} sx={{ width: 24, height: 24 }}>{user.name.substring(0, 1)}</Avatar> <AccountName>{user.name}</AccountName>
                </AccountMenu>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },

                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}