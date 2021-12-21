import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Navigate
} from "react-router";


const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white"
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
});
const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getSingleData();
  }, [id])


  async function getSingleData() {
    try {
      const student = await axios.get(`http://localhost:3333/student/${id}`)
      // console.log(student)
      setData(student.data)
    } catch (error) {
      console.log(".....................")
    }
  }

  function changebuttons() {
    navigate("/")
  }

  return (

    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>occupation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{data.id}</TableCell>
              <TableCell align="center">{data.stuname}</TableCell>
              <TableCell align="center">{data.email}</TableCell>
              <TableCell align="center">{data.occupation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={changebuttons}>Back to home</Button>
      </Box>
    </>
  )
}

export default View