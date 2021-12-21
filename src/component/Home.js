import {
  Typography, Box, makeStyles, Grid,
  TextField, Button
} from "@material-ui/core"
import { deepPurple, green, orange } from '@material-ui/core/colors';
import React from 'react'
import List from '../Newfolders/List'
import { useState } from "react";
import axios from "axios";



const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white"
  },
  stuListColour: {
    backgroundColor: orange[400],
    color: "white"
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
})


const Home = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState();
  const [student, setStudent] = useState({
    id: "",
    stuname: "",
    email: "",
    occupation: ""
  })


  const changeTeaxtHandler = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
    console.log(student);
  }

  async function addData(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3333/student", student)
      // console.log(setStudent)
      setStatus(true)
    } catch (error) {
      console.log("........................")
    }
  }

  if (status) {
    <Home />
  }


  return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={4}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="stuname" name="stuname"
                  variant="outlined" required fullWidth id="stuname"
                  label="Name"
                  onChange={(e) => changeTeaxtHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email"
                  variant="outlined" required fullWidth id="email"
                  label="Email Address"
                  onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="occupation" name="occupation"
                  variant="outlined" required fullWidth id="occupation"
                  label="occupation"
                  onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth onClick={(e) => addData(e)}>Add Button</Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12}>


          <List />

        </Grid>
      </Grid>
    </div>
  )
}

export default Home;