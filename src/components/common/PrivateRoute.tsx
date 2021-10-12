import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

export const PrivateRoute = (props: RouteProps) => {
  const isLogin = Boolean(sessionStorage.getItem('access_token'));
  if(!isLogin) return <Redirect to='/login'/>
  return (
    <Route {...props}/>
  )
}
