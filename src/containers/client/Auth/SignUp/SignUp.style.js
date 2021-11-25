import styled from "styled-components"
import { TextField } from '@mui/material'

export const AuthContainer = styled.div`
    background-color: #FFFEFC;
    height: 100vh;
`
export const AuthContainerSize = styled.div`
    width: 100%;
    max-width: 940px;
    margin: 0px auto;
`
export const AuthDisplay = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`

export const AuthTitle = styled.h3`
    font-size: 50px;
    margin-top: 12vh;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    line-height: 1.1;
`
export const AuthContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    margin-bottom: 16vh;
`

export const AuthInput = styled(TextField)`
    width: 100%; 
    height: 20px; 
    margin: 30px 0 35px 0 !important;
`
export const AuthInfo = styled.div`
    color: rgba(55, 53, 47, 0.6);
    font-size: 12px;
`
export const AuthText = styled.span`
    color: rgba(55, 53, 47, 0.6);
    font-weight: 500;
`