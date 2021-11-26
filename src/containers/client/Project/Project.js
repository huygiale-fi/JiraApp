import ArrowRight from '@mui/icons-material/ArrowRight';
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link,useHistory,Redirect } from 'react-router-dom'
import { fetchAllProjectAction } from 'store/action/projectAction';

import styled from 'styled-components'

const LinkProject = styled(Link)`
  text-decoration:none;
  color:#e3e3e3;
  transition:0.5 all;
  &:focus{
    color:black;
  }
`
export default function Project() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch()
  const { userProject } = useSelector(state => state.projectReducer)
  console.log(userProject);
  useEffect(() => {
    dispatch(fetchAllProjectAction())
    if(userProject){
      return <Redirect to={`/project/${userProject[0]?.id}`}/>
    }
  }, [])

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Fragment>
      {userProject?.map((projectAdmin, index) => {
        return <MenuItem key={projectAdmin.id}>
          <LinkProject to={`/project/${projectAdmin.id}`}>
            <ListItemButton selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}>
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
              <ListItemText primary={projectAdmin.projectName} />
            </ListItemButton>
          </LinkProject>
        </MenuItem>
      })}
    </Fragment>
  )
}