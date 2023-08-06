import React, { FC } from 'react';
import styles from './ribbon/ChangeBar/TypeChange.module.css';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';
import { TouchPointStatus } from '../../../../../../enumerator/TouchPointStatus';

interface RibbonChangeBarTypeChangeProps {
  currenctObj:any;
  updateTouhcPoints:any;
  TouchPoints:any;
}

function RibbonChangeBarTypeChange(props:RibbonChangeBarTypeChangeProps){
  return(<div style={{display:"inline-block"}}>
  <FormControl sx={{ m: 1, minWidth:120}}>
        <InputLabel htmlFor="grouped-select">Status</InputLabel>
        <Select  value={props.currenctObj.Status} 
        id="grouped-select" label="Grouping"
        onChange={(e: any) => {
          let tempt = props.TouchPoints;
          let index = tempt.findIndex((x:any)=> {return x.id == props.currenctObj.id })
          console.log(tempt)
          tempt[index].Status = e.target.value;
          props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
        }}
        >
        <MenuItem value={TouchPointStatus.Completed}>Completed</MenuItem>
        <MenuItem value={TouchPointStatus.Missing}>Missing</MenuItem>
        <MenuItem value={TouchPointStatus.Failing}>Failing</MenuItem>
        <MenuItem value={TouchPointStatus.AdHoc}>AdHoc</MenuItem>
        </Select>
      </FormControl>
  </div>)
};

export default RibbonChangeBarTypeChange;
