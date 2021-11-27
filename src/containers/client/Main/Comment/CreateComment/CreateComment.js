import { Alert, AlertTitle, Button, TextField,Avatar } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {  InsertCommentAction,deleteCommentAction } from 'store/action/commentAction';
import { fetchDetailTaskAction } from 'store/action/taskAction';
const InputComment = styled(TextField)`
    width:90%;
    margin-top:20px;
`

const AreaCreateComment = styled.div`
    width:100%;
`
const ButtonSend = styled(Button)`
margin-top:24px;
`
const schema = yup.object({
    contentComment: yup.string().required("Please enter commment"),
    
}).required();

export default function CreateComment(props) {

    const { detailTask } = useSelector(state => state.taskReducer)
    const { lstComment } = detailTask
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDetailTaskAction(props.taskId))
    }, [dispatch])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema)});
    const onSubmitComment = (data) => {
        const formData = {
            taskId: props.taskId,
            ...data
        }
        dispatch(InsertCommentAction(formData))
    }
    const handleUpdateComment = (data) => {
        setValue("contentComment", data)
    }
    const handleDeleteComment = (id)=>{
        dispatch(deleteCommentAction(id))
    }

    return (
        <Fragment>
            <div>
                {lstComment?.map((commentItem) => {
                    return <div style={{display:"flex", marginBottom: "10px" }}>
                        <Alert style={{ width: "100%",display:"flex" }} >
                            <AlertTitle><Avatar style={{height:"28px",width:"28px"}} src={commentItem.avatar}></Avatar></AlertTitle>
                            {commentItem.commentContent}
                        </Alert>
                        <Button color="success" onClick={() => handleUpdateComment(commentItem.commentContent)} size="small"><ArrowDownwardIcon /></Button>
                            <Button color="error" onClick={()=>handleDeleteComment(commentItem.id)} size="small"><CloseIcon /></Button>
                    </div>
                })}
            </div>
            <AreaCreateComment style={{marginBottom:"50px"}}>
                <form onSubmit={handleSubmit(onSubmitComment)} >
                    <InputComment {...register('contentComment')}
                    error={errors.contentComment ? true : false}
                    helperText={errors?.contentComment ? errors.contentComment.message : null}
                        id="standard-multiline-static"
                        placeholder="Comment"
                        multiline
                        variant="standard"
                    >
                    </InputComment>
                    <ButtonSend type="submit" variant="contained"><SendIcon style={{ height: "16px", width: "16px" }} /></ButtonSend>
                </form>
            </AreaCreateComment>
        </Fragment>
    )
}
