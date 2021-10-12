import { Box } from '@mui/system';
import { studentApi } from 'apis/studientApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityActions } from 'features/city/sitySlide';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import history from 'utils/history';
import FormContainer from '../components/FormContainer';
import { studentActions } from '../studentSlice';


export const AddEditPage = () => {
  const {filters} = useAppSelector(state=>state.student)
  const dispatch = useAppDispatch()
  const params = useParams<{studentId ?:string}>();
  const [student, setStudent] = useState<Student>();
  const [isGetStudent, setIsGetStudent] = useState(false);
  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  
  useEffect(()=>{
    params?.studentId && (async ()=> {
      dispatch(cityActions.fetchCityList());
      const res = await studentApi.getById(params?.studentId as string);
      setStudent(res);
      setIsGetStudent(true);
    })();
  },[dispatch, params?.studentId])

  const handleSubmitStudent = async (value:Student)=>{
    try {
      if(params?.studentId) {
        await studentApi.update(value);
      }else {
        await studentApi.add(value);
      }
      dispatch(studentActions.fetchListStudent({...filters}))
      history.push('/admin/students');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{width:'400px'}}>
      <Box>
        {!params?.studentId  ? 'Add new Student': 'Edit Student'}
      </Box>
      {(isGetStudent || !params?.studentId) && <Box>
        <FormContainer initialValues={initialValues} handleSubmitStudent={handleSubmitStudent}/>
      </Box>}
      
    </Box>
  )
}
