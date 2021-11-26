import { Button, Divider, TextField } from '@mui/material'
import React,{useEffect} from 'react'
import { Fragment } from 'react'
import { Link,useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {useDispatch,useSelector} from 'react-redux'
import { AuthContainer, AuthContainerSize, AuthContent, AuthDisplay, AuthTitle } from '../SignUp/SignUp.style'
import { signInAction } from 'store/action/authAction'
import { fetchAllProjectAction } from 'store/action/projectAction'

const schema = yup.object({
    email: yup.string().required("Please enter your email"),
    passWord: yup.string().required("Please enter your password")
}).required();

export default function SignIn() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {isLogged} = useSelector(state => state.authReducer)
    const {userProject} = useSelector(state => state.projectReducer)
    console.log(userProject);
    useEffect(() => {
        if(userProject.length > 0){
            history.push(`/project/${userProject[0]?.id}`)
        }
    }, [isLogged,history,userProject])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (formData)=>{
        dispatch(signInAction(formData))
    }

    return (
        <Fragment>
            <AuthContainer>
                <AuthContainerSize>
                    <AuthDisplay>
                        <AuthTitle>Sign In</AuthTitle>
                        <AuthContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField {...register("email")} error={errors.email ? true : false} style={{ width: "100%", height: "20px", margin: "0px 0 10px 0" }} id="outlined-search-small" color="primary" label="Email" name="email" type="search" helperText={errors?.email ? errors.email.message : null} size="small" />
                            <TextField {...register("passWord")}
                                error={errors.passWord ? true : false}
                                helperText={errors?.passWord ? errors.passWord.message : null}
                                style={{ width: "100%", height: "20px", margin: "40px 0 50px 0" }}
                                id="outlined-search-small" color="primary" label="Password" type="password" size="small" />
                            <Divider style={{marginBottom:'18px'}}/>
                            <Button type="submit" style={{ width: "100%", marginBottom:"16px" }} color="error" className="signup__email" variant="outlined">Sign In</Button>
                            <Link to="/" style={{textDecoration:'none'}}> <Button  style={{ width: "100%" }} color="primary" className="signup__email" variant="outlined">Sign Up</Button></Link>
                            </form>
                        </AuthContent>
                    </AuthDisplay>
                </AuthContainerSize>
            </AuthContainer>
        </Fragment>
    )
}
