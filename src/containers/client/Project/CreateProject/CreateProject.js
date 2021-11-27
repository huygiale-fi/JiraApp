import React, { useState, useEffect, Fragment } from 'react'
import { Avatar, Button, MenuItem, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useHistory} from 'react-router-dom'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import selectBoxApi from 'apis/selectBoxApi';
import { AuthContainer,AuthContainerSize,AuthDisplay,AuthTitle,AuthContent } from 'containers/client/Auth/SignUp/SignUp.style';
import { createProjectAction } from 'store/action/projectAction';

const schema = yup.object({
    projectName: yup.string().required("Please enter your name project "),
    description: yup.string().required("Please enter your description project "),
    categoryId: yup.string().required("Please enter your category project "),
    alias: yup.string().required("Please enter your alias project "),
}).required();

export default function CreateProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isLogged,user } = useSelector(state => state.authReducer)
    const [category, setcategory] = useState([])

    useEffect(() => {
        if(!user && !isLogged){
            history.push("/")
        }else{
            localStorage.removeItem('email')
            selectBoxApi.fetchProjectCategory().then((value) => {
                setcategory(value.data.content)
            }).catch((err) => {
                
            })
        }
    }, [isLogged,user,history])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        
        dispatch(createProjectAction(data))
    }

    return (
        <Fragment>
            <AuthContainer>
                <AuthContainerSize>
                    <AuthDisplay>
                        <AuthTitle>Create Project</AuthTitle>
                        <p>First things first, tell us a bit about yourself.</p>
                        <AuthContent style={{marginBottom:"20px"}}>
                            <Avatar
                                alt="AvatarUser"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 64, height: 64 }}
                            />
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField {...register("projectName")}
                                error={errors.projectName ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 20px 0" }} id="outlined-search-small" color="primary" label="Project Name" type="search" helperText={errors?.projectName ? errors.projectName.message : null} size="small" />
                            <TextField {...register("categoryId")}
                            error={errors.categoryId ? true : false}
                                id="outlined-select-currency"
                                select
                                size="small"
                                style={{ width: "100%", height: "20px", margin: "30px 0 20px 0" }}
                                label="Select"
                                helperText={errors?.categoryId ? errors.categoryId.message : null}
                            >
                                {category?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.projectCategoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField {...register("description")} error={errors.description ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 40px 0" }} id="outlined-search-small" color="primary" label="Description" helperText={errors?.description ? errors.description.message : null} multiline
                                rows={4} size="small" />

                            <TextField {...register("alias")}
                                error={errors.alias ? true : false}
                                helperText={errors?.alias ? errors.alias.message : null}
                                style={{ width: "100%", height: "20px", margin: "80px 0 50px 0" }}
                                id="outlined-search-small" color="primary" label="Alias" type="text" size="small" />
                            <Button type="submit" style={{ width: "100%" }} color="error"
                                variant="contained" >Create Project</Button>
                        </form>
                        </AuthContent>
                    </AuthDisplay>
                </AuthContainerSize>
            </AuthContainer>
        </Fragment>
    )
}
