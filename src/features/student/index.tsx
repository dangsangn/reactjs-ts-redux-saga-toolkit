import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, {useEffect} from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { AddEditPage } from './pages/AddEditPage'
import { ListPage } from './pages/ListPage'
import { studentActions } from './studentSlice'

interface Props {
  
}

export const Student = (props: Props) => {
  const {filters} = useAppSelector(state=>state.student)
  const dispatch = useAppDispatch()
  const match = useRouteMatch()

  useEffect(()=>{
    dispatch(studentActions.fetchListStudent(filters))
  },[dispatch, filters])
  
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  )
}
