import React, { Fragment } from 'react'
import styled from 'styled-components'


const TitleProject= styled.h3`
    max-width:100%;
    width:100%;
    white-space:pre-wrap;
    word-break:break-word;
    caret-color:rgb(55, 53, 47);
    padding:3px 12px;
`
export default function Title(props) {
    return (
        <Fragment>
            <TitleProject>{props.titleProject}</TitleProject>
        </Fragment>
    )
}