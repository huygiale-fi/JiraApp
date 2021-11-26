import React from 'react'
import styled from 'styled-components'
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import NewTask from '../Task/NewTask/NewTask';
const Container = styled.div`
display: flex;
align-items: center;
height: 42px;
padding-bottom: 10px;
justify-content:space-between;
margin:0px 13px;
border-bottom:1px solid rgb(233,233,231);
`

const AreaStatus = styled.div`

`
const StatusText = styled.div`
font-size: 14px;
    line-height: 20px;
    color: rgb(55, 53, 47);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    display: flex;
    align-items: center;
`
const AreaPro = styled.div`
    display:flex;
`
const TextProps = styled.div`
user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
    height: 24px;
    border-radius: 3px;
    font-size: 14px;
    line-height: 1.2;
    min-width: 0px;
    padding-left: 6px;
    padding-right: 6px;
    color: rgba(55, 53, 47, 0.6);
    margin-left: 4px;
    &:hover{
        background: rgba(55, 53, 47, 0.08);
    }
`

const ButtonNew = styled.button`
    margin-left: 4px;
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius:3px;
    color: white;
    line-height: 1.2;
    background: rgb(46, 170, 220);
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    font-weight: 500;
    border:none;
    &:hover{
        background: rgb(6, 156, 205);
    }
`
export default function StatusNav() {
    return (
        <Container>
            <AreaStatus><StatusText><AlignVerticalTopIcon style={{height:"14px",width:"14px",marginRight:"4px"}} />By Status</StatusText></AreaStatus>
            <AreaPro>
                <TextProps>Filter</TextProps>
                <TextProps>Sort</TextProps>
                <TextProps>Search</TextProps>
                <NewTask/>
            </AreaPro>
        </Container>
    )
}