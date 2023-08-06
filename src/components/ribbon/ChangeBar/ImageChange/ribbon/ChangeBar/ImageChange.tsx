import React, { FC } from 'react';

import styles from './ribbon/ChangeBar/ImageChange.module.css';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';

interface RibbonChangeBarImageChangeProps {
  images: any;
  text: any;
  currentObject:any;
}

function RibbonChangeBarImageChange(props: RibbonChangeBarImageChangeProps) {
  const sorted = props.images.Images.sort((a: any, b: any) => {
    if (a.Group < b.Group) {
      return -1;
    }
    if (a.Group > b.Group) {
      return 1;
    }
    return 0;
  })
  let value
  console.log(props.currentObject)
  if(props.currentObject.imageName != undefined){
    value = props.currentObject.imageName
  }
  else if(props.currentObject.img != undefined){
    value =props.currentObject.img
  }
  else{
    value=""
  }
  console.log(value)
  let group = "";
  return (<div style={{display:"inline-block"}} >
    <FormControl sx={{ m: 1 , minWidth:200}}>
      <InputLabel htmlFor="grouped-select">{props.text}</InputLabel>
      <Select  value={value} id="grouped-select" label="Grouping"
      onChange={(e)=>{
        console.log(e);
      }}
      >
        {sorted.map((a: any) => {
        
          if (group != a.Group) {
            group = a.Group;
            return (
              <div>
                <ListSubheader>{a.Group}</ListSubheader>
                <MenuItem  value={a.Location}>{a.Name}</MenuItem>
              </div>
            )
          }
          return (
            <div>
              <MenuItem  value={a.Location}>{a.Name}</MenuItem>
            </div>
          )
        })}
      </Select>
    </FormControl>
  </div>)
};

export default RibbonChangeBarImageChange;
