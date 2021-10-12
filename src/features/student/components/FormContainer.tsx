import React,{useState} from 'react'
import { Alert, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { InputField, RadioField, SelectField } from 'components/FormFields';
import { SubmitHandler, useForm } from "react-hook-form";
import { Student } from 'models';
import { useAppSelector } from 'app/hooks';
import { cityOptions } from 'features/city/sitySlide';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormContainerProp {
  initialValues?: Student;
  handleSubmitStudent: (formValues: Student)=>void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name.')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number.')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer.')
    .required('Please enter age.')
    .typeError('Please enter a valid number.'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark.')
    .typeError('Please enter a valid number.'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female.')
    .required('Please select gender.'),
  city: yup.string().required('Please select city.'),
});

const FormContainer = ({initialValues,handleSubmitStudent}: FormContainerProp) => {
  const cityListOptions = useAppSelector(cityOptions);
  const { handleSubmit, control,formState: { isSubmitting }, } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState<string>();
  const onSubmit: SubmitHandler<Student> = data =>{
    try {
      handleSubmitStudent(data);
      setError("")
    } catch (err:any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <InputField type="text" control={control} name="name" label="Name" />
        <InputField type="number" control={control} name="age" label="Age" />
        <InputField type="number" control={control} name="mark" label="Mark"/>
        <RadioField control={control} name="gender" label="Gender" 
          options={[
            {label:'Male', value:"male"},
            {label:'FeMale', value:"female"}
          ]}/>
        <SelectField control={control} name="city" label="City" 
        options={cityListOptions}/>
         {error && <Alert severity="error">{error}</Alert>}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
  )
}

export default FormContainer
