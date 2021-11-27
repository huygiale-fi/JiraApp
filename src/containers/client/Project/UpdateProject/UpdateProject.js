import React, { Fragment, useState, useEffect } from 'react'
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { Button, Dialog, DialogTitle, MenuItem, DialogContent, DialogContentText, DialogActions,Tooltip, Slide, TextField } from '@mui/material'
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import projectApi from 'apis/projectApi'
import selectBox from 'apis/selectBoxApi';
import {updateProjectAction} from 'store/action/projectAction'

const ButtonSetting = styled.div`
    color:black;
    cursor:pointer;
    padding:4px 8px;
    border-radius:5px;
    margin-right:5px;
    align-text:center;
    display:flex;
    &:hover{
        background:#F5F5F5;
    }
`

// const schema = yup.object({
//     projectName: yup.string().required(),
//     description: yup.string().required(),
//     categoryId: yup.string().required(),
//     alias: yup.string().required(),
// }).required();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function UpdateProject() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [category, setcategory] = useState([])
    const [projectDetail, setprojectDetail] = useState()
    const [idProjectCategory, setidProjectCategory] = useState()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues:{
            dataProject:{
                projectName:"",
                projectCategory:null,
                description:"",
                alias:""
            }
        },
        // resolver: yupResolver(schema),
    });

    useEffect(() => {
        selectBox.fetchProjectCategory().then((value) => {
            
            setcategory(value.data.content)
        }).catch((err) => {
        })
        if (projectDetail) {
            setValue("dataProject", {
                projectName:projectDetail.projectName,
                projectCategory:projectDetail.projectCategory,
                description:projectDetail.description,
                alias:projectDetail.alias
            })
            // setValue("projectCategory", projectDetail.projectCategory, {
            //     shouldValidate: true,
            //     shouldDirty: true
            // })
            // setValue("description", projectDetail.description, {
            //     shouldValidate: true,
            //     shouldDirty: true
            // })
            // setValue("alias", projectDetail.alias, {
            //     shouldValidate: true,
            //     shouldDirty: true
            // })
        }
    }, [projectDetail,setValue])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async () => {
        await projectApi.fetchProjectDetailApi(id).then(async function (res) {
            setprojectDetail(res.data.content)
            setidProjectCategory(res.data.content.projectCategory.id)
        }).catch(function (err) {
        })
        setOpen(true)
    };
    
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSumitUpdate = (data) => {
       const formData = {
            projectName:data.dataProject.projectName,
           description:data.dataProject.description,
           categoryId:data.dataProject.categoryId
       }
        dispatch(updateProjectAction(formData,id))
    }

    if(idProjectCategory){
        return (
            <Fragment>
                <Tooltip title="Update Project" placement="bottom">
                <ButtonSetting onClick={handleClickOpen}>
                    <BrightnessLowIcon />
                </ButtonSetting>
                </Tooltip>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <form onSubmit={handleSubmit(handleSumitUpdate)}>
                        <DialogTitle>{"Update Project"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
    
                                <TextField {...register("dataProject.projectName")} InputLabelProps={{
                                    shrink: true,
                                }}
                                    error={errors.projectName ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 20px 0" }} id="outlined-search-small" color="primary" label="Project Name" type="search" helperText={errors?.projectName ? errors.projectName.message : null} size="small" />
                                <TextField {...register("dataProject.categoryId")}
                                    error={errors.categoryId ? true : false}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    id="outlined-select-currency"
                                    select
                                    defaultValue={idProjectCategory}
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
                                <TextField  {...register("dataProject.description")} InputLabelProps={{
                                    shrink: true,
                                }} error={errors.description ? true : false} style={{ width: "100%", height: "20px", margin: "30px 0 40px 0" }} id="outlined-search-small" color="primary" label="Description" helperText={errors?.description ? errors.description.message : null} multiline
                                    rows={4} size="small" />
    
                                <TextField {...register("dataProject.alias")}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.alias ? true : false}
                                    helperText={errors?.alias ? errors.alias.message : null}
                                    style={{ width: "100%", height: "20px", margin: "80px 0 50px 0" }}
                                    id="outlined-search-small" color="primary" label="Alias" type="text" size="small" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button type="submit">Agree</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }else{
        return <Tooltip title="Update Project" placement="bottom">
        <ButtonSetting onClick={handleClickOpen}>
            <BrightnessLowIcon />
        </ButtonSetting>
        </Tooltip>
    }
   
}
