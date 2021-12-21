import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";


const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white"
  },

});


const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: "",
    stuname: "",
    email: "",
    occupation: "",
  })



  useEffect(() => {
    getSingleData()
  }, [id])


  async function getSingleData() {
    try {
      const student = await axios.get(`http://localhost:3333/student/${id}`)
      setStudent(student.data)
    } catch (error) {
      console.log("................................")
    }
  }


  function changebuttons() {
    navigate("/")
  }

  function changeTeaxtHandler(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
    console.log(student);
  }

  async function addData(e) {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3333/student/${id}`, student)
      // console.log(setStudent)
    } catch (error) {
      console.log("........................")
    }
    navigate("/")
  }

  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={student.id} onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname"
                  label="name    " value={student.stuname} onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email"
                  label="Email Address" value={student.email} onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="occupation" name="occupation" variant="outlined" required fullWidth id="occupation"
                  label="occupation text" value={student.occupation} onChange={(e) => changeTeaxtHandler(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="button" variant="contained" color="primary" fullWidth onClick={(e) => addData(e)}> Update </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={changebuttons} >Back to Home</Button>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default Edit