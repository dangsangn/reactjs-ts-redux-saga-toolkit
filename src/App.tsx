import { NotFoundPage, PrivateRoute } from 'components/common';
import { Admin } from 'components/layouts';
import { LoginPage } from 'features/auth/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch,useLocation } from 'react-router-dom';
import history from 'utils/history';
import './App.css';

function App() {
  let location = useLocation();
  useEffect(()=>{
    const isLogin = sessionStorage.getItem('access_token')
    if(location.pathname ==='/' && !isLogin) history.push('/login');
    if(location.pathname === '/' && isLogin) history.push('/admin/dashbord');
   
  },[location.pathname]);

  return (
    <Switch>
      <Route path='/login'>
        <LoginPage/>
      </Route>
      <PrivateRoute path='/admin'>
        <Admin ></Admin>
      </PrivateRoute>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch> 
  );
}

export default App;
