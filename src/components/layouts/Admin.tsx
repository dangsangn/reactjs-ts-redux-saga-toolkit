
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Header } from 'components/common/Header';
import { Sidebar } from 'components/common/Sidebar';
import Dashbord from 'features/dashbord';
import { Student } from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router';

 const useStyles = makeStyles (()=>({
  root: {
    display: 'grid',
    gridTemplateAreas:`"header header" "sidebar  main "`,
    gridTemplateColumns: '200px 1fr',
    gridTemplateRows:'auto 1fr',
    minHeight: '100vh'
  },
  header: {
    gridArea:'header'

  },
  sidebar: {
    gridArea:'sidebar',
    borderRight: '1px solid #888'
  },
  main:{
    gridArea:'main',
    padding:'16px 32px'
  }

}));

export const Admin = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}><Header/></Box>
      <Box className={classes.sidebar}><Sidebar/></Box>
      <Box className={classes.main}>
        <Switch>
          <Route path='/admin/dashbord'>
            <Dashbord/>
          </Route>
          <Route path='/admin/students'>
            <Student/>
          </Route>
        </Switch>
      </Box>
    </Box>
  )
}
