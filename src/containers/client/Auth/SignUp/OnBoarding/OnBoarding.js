import React, { useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpAction } from 'store/action/authAction'
import * as yup from "yup";
import { useDispatch,useSelector } from 'react-redux'
import { AuthContainer, AuthContainerSize, AuthDisplay, AuthTitle, AuthContent, AuthInfo, AuthText } from '../SignUp.style';
import { Avatar, Button, TextField } from '@mui/material';

const schema = yup.object({
    name: yup.string().required("Please enter your name"),
    phoneNumber: yup.string().required("Please enter the phone number"),
    passWord: yup.string().required("Please enter passwords")
}).required();

export default function OnBoarding() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {isLogged} = useSelector(state => state.authReducer)
    useEffect(() => {
        if(!localStorage.getItem('email')){
            history.push("/")
        }
        if(isLogged){
            history.push("/createproject")
        }
    }, [history,isLogged])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        const formData = {
            email:localStorage.getItem('email'),
            ...data
        }
        dispatch(signUpAction(formData))
    }

    const handleChangeEmail = () => {
        localStorage.removeItem('email')
    }

    return (
        <Fragment>
            <AuthContainer>
                <AuthContainerSize>
                    <AuthDisplay>
                        <AuthTitle>Welcome to JiraNote</AuthTitle>
                        <p>First things first, tell us a bit about yourself.</p>
                        <AuthContent style={{marginBottom:"20px"}}>
                            <Avatar
                                alt="AvatarUser"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 64, height: 64 }}
                            />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField {...register("name")}
                                    error={errors.name ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 20px 0" }} id="outlined-search-small" color="primary" label="What should we call you?" type="search" helperText={errors?.name ? errors.name.message : null} size="small" />
                                <TextField {...register("phoneNumber")} error={errors.phoneNumber ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 20px 0" }} id="outlined-search-small" color="primary" label="What's your phone number?" helperText={errors?.phoneNumber ? errors.phoneNumber.message : null} type="number" size="small" />
                                <TextField {...register("passWord")}
                                    error={errors.passWord ? true : false}
                                    helperText={errors?.passWord ? errors.passWord.message : null}
                                    style={{ width: "100%", height: "20px", margin: "30px 0 50px 0" }}
                                    id="outlined-search-small" color="primary" label="Set a password" type="password" size="small" />
                                <Button type="submit" style={{ width: "100%" }} color="error"
                                    variant="contained" >Registration</Button>
                            </form>
                        </AuthContent>
                        <AuthInfo>
                        <p>You're creating an account for <AuthText> {localStorage.getItem('email')}</AuthText> <br />
                            If you don't intend to set up a new account, you can <Link to="/" onClick={() => handleChangeEmail()}>login with another email</Link></p>
                        </AuthInfo>
                    </AuthDisplay>
                </AuthContainerSize>
            </AuthContainer>
        </Fragment>
    )
}
