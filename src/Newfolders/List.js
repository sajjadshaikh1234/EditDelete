import React, { useEffect , useState } from "react";
import {
    Typography, Box, makeStyles, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow,
    Paper, IconButton, Tooltip
  } from "@material-ui/core"
  import { deepPurple, green, orange } from '@material-ui/core/colors';
  import VisibilityIcon from "@material-ui/icons/Visibility";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import { Link } from "react-router-dom";  
  import axios from 'axios' 
//   import { useState } from "react";


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
      fontWeight:"bold",
      fontSize:16
    }
  })


const List = () => {
    const classes = useStyles();
const [students,setStudents] = useState([])


useEffect(()=> {
 getAllData();
},[])


async function  getAllData () {
    try{
        const students  = await axios.get("http://localhost:3333/student")
        setStudents(students.data)
    } catch (error) {
        console.log("something wrong")
    }
}


const handleDelete = async (id) => {
  await axios.delete(`http://localhost:3333/student/${id}`);
  // console.log(students)
  const NewStudent = students.filter((item) => {
return item.id != id;
  })
// console.log(NewStudent)
  setStudents(NewStudent)
}

    return(
        <div>
            
             <Box textAlign="center" p={2} className={classes.stuListColour} mb={2}>
            <Typography variant="h4">Student List</Typography>
          </Box>
            <TableContainer component={Paper}>
<Table>
  <TableHead>
    <TableRow style={{ backgroundColor: "#616161" }}>
      <TableCell align="center" className={classes.tableHeadCell}>Num</TableCell>
      <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
      <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
      <TableCell align="center" className={classes.tableHeadCell}>Occupation</TableCell>
      <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
      {
          students.map((i,j) => {
              return(
                <TableRow key={j}>
                <TableCell align="center">{j+1}</TableCell>
                <TableCell align="center">{i.stuname}</TableCell>
                <TableCell align="center">{i.email}</TableCell>
                <TableCell align="center">{i.occupation}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton><Link  to={`/view/${i.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton><Link  to={`/edit/${i.id}`}> <EditIcon /></Link></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={()=> handleDelete(i.id)}><DeleteIcon color="secondary"   /></IconButton>
                  </Tooltip>
                  </TableCell>
              </TableRow>
              )
          })
      }
   
  </TableBody>

</Table>
</TableContainer>
        </div>
    )
}

export default List;