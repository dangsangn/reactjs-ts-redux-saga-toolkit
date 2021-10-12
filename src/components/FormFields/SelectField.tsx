import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, useController } from "react-hook-form";
export interface SelectOptions {
  label: string;
  value: string | number;
}

export interface SelectFieldProps  {
  name: string;
  control: Control<any>;
  label?: string;
  options: SelectOptions[];
  disabled?:boolean;
}

export const SelectField = ({ name, control, label, options, disabled,...radioProps }: SelectFieldProps) => {
   const {  field: {onChange, value}, 
            fieldState: {invalid, error} 
          } = useController({name, control});
  return (
    <FormControl size="small"  fullWidth disabled={disabled} error={invalid}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(item=>(<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>))}
        
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}
