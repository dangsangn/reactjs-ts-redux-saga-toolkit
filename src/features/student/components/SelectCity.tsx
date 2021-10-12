import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from 'app/hooks';
import React from 'react';
interface Props {
  onHandleFiler: (value: string|undefined) => void;
  selectCity: string|undefined;
}

export const SelectCity = (props: Props) => {
  const {onHandleFiler,selectCity} = props;
  const cityList = useAppSelector(state=>state.city.cityList);

  const handleChange = (event: SelectChangeEvent) => {
    let value :string|undefined= event.target.value;
    if(value === 'All') value = undefined;
   
    onHandleFiler(value)
  };
  return (
    <Box sx={{ minWidth: 120, width:'100%' }}>
      <FormControl fullWidth>
        <InputLabel id="select=city">City</InputLabel>
        <Select
          labelId="select=city"
          id="select=city-select"
          value={selectCity===undefined ? 'All': selectCity}
          label="City"
          onChange={handleChange}
        >
          <MenuItem  value={"All"}>All</MenuItem>
          {cityList.map((item, index)=>(<MenuItem key={index} value={item.code}>{item.name}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
};
