import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styledd from 'styled-components';
import ChatIcon from '@mui/icons-material/Chat';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material/styles';
import { TextareaAutosize, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import styled2 from 'styled-components'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import selectBox from 'apis/selectBoxApi';
import userApi from 'apis/userApi'
import { useParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import {useDispatch} from 'react-redux'
import {CreateTaskAction} from 'store/action/taskAction'
import taskApi from 'apis/taskApi';

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 970,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    height: 600,

};

const HeaderTask = styledd.div`
  height:45px;
  display:flex;
  align-items:center;
  padding-left:12px;
  padding-right:12px;
  justify-content:space-between;
`

const TaskRight = styledd.div`
  height:45px;
  display:flex;
  align-items:center;
  padding-left:12px;
`
const OpenPage = styledd.a`
  background-color:transparent;
  text-decoration:none;
  cursor:pointer;
  padding:0px 6px;
  height:28px;
  line-height:1.2;
  display:inline-flex;
  align-items:center;
  border-radius:3px;
  color:rgba(55, 53, 47, 0.6);
  font-size:14px;
  margin-right:3px;
  &:hover{
      background-color:#D3D1CB;
      text-decoration:none;
      color:rgba(55, 53, 47, 0.6);
  }
`
const Icon = styledd.div`
  width:20px;
  height:20px;
  display:block;
  fill:rgba(55, 53, 47, 0.8);
  flex-shrink:0;
  backface-visibility:hidden;
`
const BodyTask = styledd.div`
  margin-top:35px;
  overflow: auto;
  padding:0px 150px;
  width:100%;
  maxHeight:100%;
  display:flex;
  flex-direction:column;
`

const NameTask = styled(TextField)`
    max-width:100%;
    width:100%;
  white-space:pre-wrap;
  word-break:break-word;
  caret-color:rgb(55, 53, 47);
  font-weight:700;
  line-height:1.2;
  font-size:40px;
  border:none;
`
const SelectInputTask = styledd.div`
  width:100%;
  margin-top:25px;
`

const AreaTask = styledd.div`
  display:flex;
  flex-direction:row;
  width:100%;
  margin-bottom:10px;
`

const LabelAssign = styledd.div`
  display:flex;
  color:rgba(55, 53, 47, 0.6);
  height:34px;
  align-items:center;
  width:25%;
`
const TextTasks = styledd.p`
  margin-bottom:0px;
  font-size:14px;
  margin-top:0px;
`

const SelectInput = styled(Select)`
  width:75%;
  border-width:0px
  &:focus{
  border:1px solid black;
  }
`
const ButtonNew = styled2.button`
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
    height:24px;
    &:hover{
        background: rgb(6, 156, 205);
    }
`

const DecristionTask = styled(TextareaAutosize)`
  width:75%;
  border:none;
`
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

const schema = yup.object({
    taskName: yup.string().required(),
}).required();

export default function NewTask() {
    const theme = useTheme();
    const { id } = useParams()
    const dispatch = useDispatch()
    const [personName, setPersonName] = React.useState([]);
    const [status, setstatus] = React.useState('');
    const [taskType, settaskType] = React.useState('');
    const [priority, setpriority] = React.useState('');
    const classes = useStyles();

    const handleChangeStatus = (e) => {
        setstatus(e.target.value)
    }
    const handleChangeTaskType = (e) => {
        settaskType(e.target.value)
    }
    const handleChangePriority = (e) => {
        setpriority(e.target.value)
    }

    const handleChange = (event) => {
        console.log(event);
        const {
            target: { value },
        } = event;

        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    };

    const [openNewTask, setopenNewTask] = React.useState(false);
    const [dataStatus, setdataStatus] = React.useState([]);
    const [dataPriority, setdataPriority] = React.useState([]);
    const [dataTaskType, setdataTaskType] = React.useState([]);
    const [dataMember, setdataMember] = React.useState([]);
    const handleOpenNewTask = () => {
        setopenNewTask(true)
        console.log(id);
        userApi.fetchUserProjectId(id).then(function (res) {

            console.log("member", res.data.content);
            setdataMember(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })

        selectBox.fetchAllStatus().then(function (res) {
            console.log("status", res.data.content);
            setdataStatus(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })

        selectBox.fetchAllPriority().then(function (res) {
            console.log("priority", res.data.content);
            setdataPriority(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })

        selectBox.fetchAllTaskType().then(function (res) {
            console.log("taskktype", res.data.content);
            setdataTaskType(res.data.content)
        }).catch(function (err) {
            console.log(err);
        })
    };
    const handleCloseNewTask = () => setopenNewTask(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmitTask = (data) => {
        const formData = {
            projectId:id,
            ...data
        }
        dispatch(CreateTaskAction(formData))
    }

    return (
        <div>
            <ButtonNew onClick={handleOpenNewTask}>New</ButtonNew>
            <Modal
                open={openNewTask}
                onClose={handleCloseNewTask}npm 
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ maxHeight: '100%', overflow: 'auto' }}>
                    <HeaderTask>
                        <OpenPage href="/huygiale">Open as Page</OpenPage>
                        <TaskRight>
                            <OpenPage href="/huygiale">Share</OpenPage>
                            <OpenPage href="/huygiale"><Icon><ChatIcon style={{ width: '100%', height: '100%' }} /></Icon></OpenPage>
                            <OpenPage href="/huygiale"><Icon><QueryBuilderIcon style={{ width: '100%', height: '100%' }} /></Icon></OpenPage>
                            <OpenPage href="/huygiale"><Icon><StarBorderIcon style={{ width: '100%', height: '100%' }} /></Icon></OpenPage>
                            <OpenPage style={{ marginRight: '0px !important' }} href="/huygiale"><Icon><MoreHorizIcon style={{ width: '100%', height: '100%' }} /></Icon></OpenPage>
                        </TaskRight>
                    </HeaderTask>
                    <BodyTask>
                        <form onSubmit={handleSubmit(onSubmitTask)}>
                            <NameTask
                                {...register("taskName")}
                                id="standard-multiline-static"
                                placeholder="Task Name"
                                multiline

                                variant="standard"
                            />
                            <SelectInputTask>
                                <AreaTask>
                                    <LabelAssign>
                                        <GroupIcon style={{ marginRight: '10px' }} />
                                        <TextTasks>Assign</TextTasks>
                                    </LabelAssign>
                                    {/* Assign Member */}
                                    <SelectInput {...register("listUserAsign")}
                                        size="small"
                                        variant="empty"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box style={{ border: 'none' }} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip style={{ height: "27px" }} key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    // MenuProps={MenuProps}
                                    >
                                        {dataMember.map((member) => (
                                            <MenuItem
                                                key={member.userId}
                                                value={member.userId}
                                                style={getStyles(member.name, personName, theme)}
                                            >
                                                {member.name}
                                            </MenuItem>
                                        ))}
                                    </SelectInput>
                                </AreaTask>
                                <AreaTask>
                                    <LabelAssign>
                                        <ArrowDropDownCircleIcon style={{ marginRight: '10px' }} />
                                        <TextTasks>Status</TextTasks>
                                    </LabelAssign>
                                    {/* Status */}
                                    <SelectInput {...register("statusId")}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        size="small"
                                        onChange={handleChangeStatus}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        label="Status"
                                    >
                                        {/* <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}></MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem> */}
                                        {dataStatus?.map((status) => (
                                            <MenuItem value={status.statusId}>{status.statusName}</MenuItem>
                                        ))}
                                    </SelectInput>
                                </AreaTask>
                                <AreaTask>
                                    <LabelAssign>
                                        <ArrowDropDownCircleIcon style={{ marginRight: '10px' }} />
                                        <TextTasks>Priority</TextTasks>
                                    </LabelAssign>
                                    <SelectInput {...register("priorityId")}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        placeholder="Empty"
                                        value={priority}
                                        className={classes.noBorder}
                                        defaultValue={2}
                                        size="small"
                                        onChange={handleChangePriority}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        label="Status"
                                    >
                                        {/* <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}></MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem> */}
                                        {dataPriority?.map((priority) => (
                                            <MenuItem value={priority.priorityId}>{priority.priority}</MenuItem>
                                        ))}
                                    </SelectInput>
                                </AreaTask>
                                <AreaTask>
                                    <LabelAssign>
                                        <ArrowDropDownCircleIcon style={{ marginRight: '10px' }} />
                                        <TextTasks>Type Task</TextTasks>
                                    </LabelAssign>
                                    <SelectInput {...register("typeId")}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={taskType}
                                        size="small"
                                        onChange={handleChangeTaskType}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        label="Status"
                                    >
                                        {dataTaskType?.map((taskType) => (
                                            <MenuItem value={taskType.id}>{taskType.taskType}</MenuItem>
                                        ))}
                                    </SelectInput>
                                </AreaTask>
                                <AreaTask>
                                    <LabelAssign>
                                        <DescriptionIcon style={{ marginRight: '10px' }} />
                                        <TextTasks>Description</TextTasks>
                                    </LabelAssign>
                                    <DecristionTask {...register("description")}
                                        minRows={3}
                                        aria-label="empty textarea"
                                        placeholder="Description..."
                                    />
                                </AreaTask>
                                <Button type="submit">Taoj</Button>
                            </SelectInputTask>
                        </form>
                    </BodyTask>
                </Box>
            </Modal>
        </div>
    )
}
