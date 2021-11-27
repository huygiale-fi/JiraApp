import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector } from 'react-redux'
import withLayout from 'hocs/withLayout'
import Project from 'containers/client/Project/Project';
import AssignProject from 'containers/client/Member/AssignProject/AssignProject';
import UpdateProject from 'containers/client/Project/UpdateProject/UpdateProject';
import UserMenu from 'containers/client/User';

const drawerWidth = 220;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  cursor: 'pointer',

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  "&:hover": {
    background: 'rgba(25, 23, 17, 0.1)'
  }

}));

function JiraLayout(props) {

  const theme = useTheme();
  const { detailProject } = useSelector(state => state.projectReducer)
  //   useEffect(() => {
  //     // if(userProject.length === 0){
  //     //   // history.push(`/createProject`)
  //     // }else{
  //     //   history.push(`/page/${userProject[0]?.id}`)
  //     // }
  //     console.log("idproject",userProject[0]?.id);
  //     history.push(`/page/${userProject[0]?.id}`)

  //   }, [userProject])
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "white", maxHeight: "45px" }}>
        <Toolbar size="small" style={{ minHeight: "45px", display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon style={{ color: 'black' }} />
            </IconButton>
            <p style={{ color: "black" }}>
              {detailProject?.projectName}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <AssignProject />
            <UpdateProject />
            {/* <AssginList/> */}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader id="drawerHeader" style={{ minHeight: "45px", height: "45px", display: "flex", justifyContent: "space-between" }}>
          <UserMenu />
          <IconButton id="iconButton" onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          <Project />
        </List>
      </Drawer>

      <Main open={open}>
        {props.children}
      </Main>
    </Box>
  )
}

export default withLayout(JiraLayout)
