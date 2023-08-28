import React, { FC } from 'react';
import styles from './ribbon/ChangeBar/TypeChange.module.css';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';
import { TouchPointStatus } from '../../../../../../enumerator/TouchPointStatus';
import _ from 'lodash';
import { Html } from 'react-konva-utils';

interface RibbonChangeBarTypeChangeProps {
  x:any;
  y:any;
  currenctObj:any;
  updateTouhcPoints:any;
  TouchPoints:any;
  updateCurentObj:any;
}

function RibbonChangeBarTypeChange(props:RibbonChangeBarTypeChangeProps){
  return(<Html groupProps={{x:props.x, y:props.y}}>
  <FormControl sx={{ m: 1, minWidth:120}}  size="small"> 
        <InputLabel htmlFor="grouped-select">Status</InputLabel>
        <Select  value={props.currenctObj.Status} 
        id="grouped-select" label="Grouping"
        onChange={(e: any) => {
          let tempt = props.TouchPoints;
          let index = tempt.findIndex((x:any)=> {return x.id == props.currenctObj.id })
          let curentObj = _.cloneDeep(props.currenctObj)
          curentObj.Status= e.target.value;
          props.updateCurentObj(curentObj);
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
  </Html>)
};

export default RibbonChangeBarTypeChange;
