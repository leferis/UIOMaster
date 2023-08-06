import React, { FC } from 'react';
import styles from './ribbon/ChangeBar/ActorChange.module.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface RibbonChangeBarActorChangeProps {
  text:any;
}

function RibbonChangeBarActorChange(props:RibbonChangeBarActorChangeProps){
  <div >
  <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">{props.text}</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={2}>Missing</MenuItem>
          <MenuItem value={3}>Failing</MenuItem>
          <MenuItem value={4}>AdHoc</MenuItem>
        </Select>
      </FormControl>
  </div>
};


export default RibbonChangeBarActorChange;
