import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { green, grey, indigo, red } from "@material-ui/core/colors";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "1140px",
    margin: "24px auto",
    padding: theme.spacing(2),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  heading: {
    textAlign: "center",
    color: red[500],
    marginBottom: theme.spacing(4),
  },
  secondColumn: {
    margin: theme.spacing(4, 0, 3, 0),
  },
  ListContainer: {
    background: "white",
    padding: theme.spacing(2),
    minHeight: "300px",
    height: "auto",
  },
  emptyMsg: {
    textAlign: "center",
    color: grey[400],
    marginTop: theme.spacing(3),
  },

  ListContainerTitle: {
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: indigo[500],
  },
  remainTaskAvatar: {
    backgroundColor: indigo["A400"],
    color: "white",
  },
  completeTaskAvatar: {
    backgroundColor: green[600],
    color: "white",
  },
}));

export default function FormComponent() {
    // use the styles defined in the useStyles hook
    const classes = useStyles();
  
    // set up state for the input field's data and error message
    const [inputData, setInputData] = useState("");
    const [inputError, setInputError] = useState("");
  
    // set up state for the remaining and completed task lists
    const [remainingTaskList, setRemainingTaskList] = useState([]);
    const [completedTaskList, setCompletedTaskList] = useState([]);
  
    // define a function to handle form submission
    const handleSubmit = (e) => {
      // prevent the default form submission behavior
      e.preventDefault();
  
      // do some basic input validation
      if (inputData.length > 0 && inputData !== "") {
        // create a new task object with a unique ID and the input data as the title
        const taskList = {
          id: Math.random(),
          title: inputData,
        };
  
        // create a copy of the remaining task list and add the new task to it
        const list = [...remainingTaskList];
        list.push(taskList);
  
        // update the state with the new task list
        setRemainingTaskList(list);
  
        // reset the input field
        setInputData("");
      }
    };
  

  // define a function to handle input changes in the form
  const handleOnChange = ({ target }) => {
    // if the input value has fewer than 5 characters, set an error message
    target.value.length <= 0
      ? setInputError("Task atleast have 1 character")
      : setInputError("");

    // update the input data state with the current input value
    setInputData(target.value);
  };


    // define a function to handle moving a task from the remaining list to the completed list
    const handleCheck = (id) => {
        // create copies of the remaining and completed task lists
        const intial = [...remainingTaskList];
        const intialCompleteTask = [...completedTaskList];
    
        // get the current time
        const currentTime = getCurrentTime(new Date());
    
        // find the index of the task with the specified ID in the remaining list
        const Index = intial.findIndex((item) => item.id === id);
    
        // add the current time to the task and add it to the completed list
        remainingTaskList[Index].currentTime = currentTime;
        intialCompleteTask.push(remainingTaskList[Index]);
    
        // remove the task from the remaining list
        const updatedRemainingTask = intial.filter((item) => item.id !== id);
    
        // update the state for the remaining and completed task lists
        setRemainingTaskList(updatedRemainingTask);
        setCompletedTaskList(intialCompleteTask);
      };
    

  // define a function to handle deleting a task from the remaining list
  const handleDelete = (id) => {
    // create a copy of the remaining task list
    const intial = [...remainingTaskList];

    // filter out the task with the specified ID from the list
    const updated = intial.filter((item) => item.id !== id);

    // update the state with the modified task list
    setRemainingTaskList(updated);
  };


  // define a function to get the current time in a formatted string
  const getCurrentTime = (date) => {
    // get the hour and minute from the date object
    let hour = date.getHours();
    let minutes = date.getMinutes();

    // determine whether it is AM or PM
    let amPm = hour >= 12 ? "pm" : "am";

    // convert the hour to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; 

    // add a leading zero to the minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // format the time string
    let currentTime = hour + ":" + minutes + amPm;
    return currentTime;
  };


  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <Typography variant='h4' className={classes.heading}>
                <b>CHECKLIFY</b>
              </Typography>
              <Grid container justify='center'>
                <Grid item xs={8}>
                  <TextField
                    id='inputTaskField'
                    label='What are you planning to do (Enter to submit)?'
                    variant='outlined'
                    fullWidth={true}
                    size='small'
                    value={inputData}
                    onChange={handleOnChange}
                    error={inputError ? true : false}
                    helperText={inputError}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* task grid comtainer */}
        <Grid item xs={12} className={classes.secondColumn}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              <List className={classes.ListContainer} dense={true}>
                <Typography className={classes.ListContainerTitle} variant='h5' >
                    <b>Tasks to do</b>
                </Typography>
                {/* //mapping remaining list task  */}
                {remainingTaskList.length > 0 ? (
                  remainingTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.remainTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          style={{ color: green[500] }}
                          onClick={() => handleCheck(item.id)}>
                          <DoneOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                          style={{ color: red[600] }}
                          onClick={() => handleDelete(item.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography className={classes.emptyMsg}>
                    No Task added yet !...
                  </Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <List className={classes.ListContainer} dense={true}>
                <Typography className={classes.ListContainerTitle} variant='h5'>
                  <b>Completed Task (Refresh to Clear All)</b>
                </Typography>
                {/* //mapping completeTaskAvatar list task  */}
                {completedTaskList.length > 0 ? (
                  completedTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.completeTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.currentTime}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography className={classes.emptyMsg}>
                    No Task added yet !...
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}