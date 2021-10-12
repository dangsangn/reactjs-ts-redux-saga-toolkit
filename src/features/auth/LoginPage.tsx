import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from './authSlice';
const theme = createTheme();

const useStyles = makeStyles(() =>({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  box: {
    padding: theme.spacing(3),
  },
  mb: {
    marginBottom: '16px !important'
  },
  form: {
    display: 'flex',
   flexDirection: 'column',
  }
}));

export interface FormData {
  username: string;
  password: string;
}
export const LoginPage = () => {
  const isLogging = useAppSelector(state => state.auth.logging);
  const dispatch = useAppDispatch()
  const classes = useStyles();

  const handleSubmit = (e: any)=> {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    dispatch(authActions.login({username: formData.username+'', password:formData.password+''}));
  }
   const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop:any) => (event:any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event:any) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.box} >
         <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField className={classes.mb} name="username"  id="username" label="Username" variant="outlined" />
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                className={classes.mb}
                id="password"
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" type='submit' >{isLogging && <CircularProgress size={32} color="secondary"/> } &nbsp; Login</Button>
          </form>
        
        </Box>
      </Paper>
    </div>
  )
}
