import React, { Fragment } from 'react'
import styled from 'styled-components'


const Description = styled.p`
max-width: 100%;
    width: 780px;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    font-size: 14px;
    padding-left: 5px;
    padding-bottom: 4px;
    padding-top: 3px;
    margin:8px;
`
export default function DescriptionProject(props) {
    return (
        <Fragment>
            <Description>{props.desProject}</Description>
        </Fragment>
    )
}
