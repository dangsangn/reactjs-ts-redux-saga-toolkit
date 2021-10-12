import { Box, Button, Grid, LinearProgress, Pagination, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Student } from 'models';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import history from 'utils/history';
import { studentApi } from '../../../apis/studientApi';
import { SelectCity } from '../components/SelectCity';
import StudentTable from '../components/StudentTable';
import { studentActions } from '../studentSlice';
interface Props {
  
}
const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: '-12x',
    left: 0,
    zIndex: 10,
    width: '100%',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export const ListPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const match = useRouteMatch();
  const {loading,listStudent, pagination, filters} = useAppSelector(state=>state.student)
  const classes = useStyles();
  const [keySearch, setKeySearch] = useState("")
  const handleEditStudent = (student: Student)=>{
    history.push('/admin/students/'+student.id)
  };

  const handleRemoveStudent = async (value: Student)=>{
    try {
      await studentApi.remove(value.id as string);
      dispatch(studentActions.fetchListStudent({...filters}));
    } catch (error) {
      console.log(error);
    }
  }
  const handleChangePagination = (e:any, value:number)=>{
    dispatch(studentActions.setFilter({...filters, _page: value}))
  }

  const handleFiler = (value:string|undefined)=> {
    dispatch(studentActions.setFilter({...filters,_page:1, city: value}))
  }

  const handleSearchFiled = (event: any)=> {
    dispatch(studentActions.setKeySearchDebouce({...filters,_page:1, name_like: event.target.value}))
    setKeySearch(event.target.value)
  }

  const handleClearFilter = ()=> {
    dispatch(studentActions.setFilter({_page:1, _limit:10}));
    setKeySearch("");
  }
  console.log()
  return (
    <Box className={classes.root}>
      <Box className={classes.loading}>
        {loading && <LinearProgress />}
      </Box>

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box  sx={{marginBottom: '32px'}} >
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid  item lg={3}>
            <TextField value={keySearch}  id="searchField" label="Key search" variant="outlined" onChange={handleSearchFiled}/>
          </Grid>
          <Grid item lg={3} >
            <SelectCity selectCity={filters.city} onHandleFiler={handleFiler}/>
          </Grid>
          <Grid item lg={3}>
            <Button onClick={handleClearFilter} variant="contained">Clear</Button>
          </Grid>
        </Grid>
      </Box>

      <StudentTable
        studentList={listStudent}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />
      <Box mt={2} className={classes.pagination}>
        <Pagination color="primary" count={Math.ceil(pagination._totalRows/ pagination._limit)} page={pagination._page} onChange={handleChangePagination} />
      </Box>
      
    </Box>
  )
}
