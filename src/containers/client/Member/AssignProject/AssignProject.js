import React, { Fragment, useEffect, useState } from 'react'
import { Menu, MenuItem, Button, Box, CircularProgress, Tooltip } from '@mui/material'
import userApi from 'apis/userApi';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'
import { assignUserProjectAction } from 'store/action/projectAction';
import AddIcon from '@mui/icons-material/Add';
const Avatar = styled.img`
border-radius: 50%;
height: 30px;
width: 30px;
margin-right: 10px;
`


export default function AssignProject(props) {
    let { id } = useParams();
    console.log(id);
    const [listUsers, setlistUsers] = useState([]);
    const [listUserInProject, setlistUserInProject] = useState([]);
    const [listUserAssign, setlistUserAssign] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAssign = Boolean(anchorEl);
    useEffect(() => {
        userApi.fetchAllUser().then(async function (res) {
            await setlistUsers(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })
        userApi.fetchUserProjectId(id).then(async function (res) {
            console.log(res);
            await setlistUserInProject(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })
        let test = _.xorBy(listUsers, listUserInProject, "userId");
        console.log(test);
    }, [id])
    const handleOpenAssign = (event) => {
        // if(listUserInProject){
        //     listUserAssign = _.xorBy(listUsers, listUserInProject, "userId");
        //     console.log("assignUser",listUserAssign);
        // }else{
        //     listUserAssign = listUsers
        //     console.log("assignUser2",listUserAssign);
        // }
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAssign = () => {
        setAnchorEl(null);
    };
    
    const dispatch = useDispatch()
    const handleAssignUser = (e) => {
        console.log("id", id);
        if (id === "undefined") {
            alert("Khong ton tai project")
        } else {
            const formData = {
                projectId: id,
                userId: e.target.value
            }
            dispatch(assignUserProjectAction(formData))
            handleCloseAssign()
        }
    }
    
    return (
        <Fragment>
            <Tooltip title="Add" placement="top-start">
                <Button
                    id="fade-button"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    aria-expanded={openAssign ? 'true' : undefined}
                    onClick={handleOpenAssign}
                >
                    <AddIcon />
                </Button>
            </Tooltip>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openAssign}
                onClose={handleCloseAssign}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {listUserAssign?.length === 0 ?
                    (<MenuItem>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress color="inherit" size={50} />
                        </Box>
                    </MenuItem>) :
                    (listUserAssign?.map(item => (
                        <MenuItem onClick={handleAssignUser} key={item.userId} value={item.userId}>
                            <Avatar src={item.avatar} />
                            {item.name}
                        </MenuItem>
                    )))}
            </Menu>
        </Fragment>
    )

}
