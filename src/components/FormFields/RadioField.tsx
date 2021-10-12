import Radio from '@mui/material/Radio';
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import React from 'react';
import { Control, useController } from "react-hook-form";
import { FormHelperText } from '@mui/material';
export interface RadioOptions {
  label: string;
  value: string | number;
}

export interface RadioFieldProps  {
  name: string;
  control: Control<any>;
  label?: string;
  options: RadioOptions[];
  disabled?:boolean;
}

export const RadioField = ({ name, control, label, options, disabled,...radioProps }: RadioFieldProps) => {
   const {  field: {onChange, value}, 
            fieldState: {invalid, error} 
          } = useController({name, control});
  return (
    <FormControl disabled={disabled} error={invalid} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue={value}
        name="radio-buttons-group"
        onChange={onChange}
        value={value}
      >
        {options.map(item=>(<FormControlLabel value={item.value} control={<Radio />} label={item.label} />))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}
