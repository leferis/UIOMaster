import React, { FC, Fragment } from 'react';

import styles from './ribbon/ChangeBar/ImageChange.module.css';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader, ListItem } from '@mui/material';

interface RibbonChangeBarImageChangeProps {
  images: any;
  text: any;
  currentObject: any;
  changeImage:any;
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
  let value: string
  console.log(props.currentObject)
  if (props.currentObject.imageName != undefined) {
    value = props.currentObject.imageName
  }
  else if (props.currentObject.img != undefined) {
    value = props.currentObject.img
  }
  else {
    value = ""
  }

  let group = "";
  return (<div style={{ display: "inline-block", float:"left" }} >
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel htmlFor="grouped-select">{props.text}</InputLabel>
      <Select value={value} id="grouped-select" label="Grouping"
        onChange={(e) => {
          props.changeImage(e.target.value)
        }}
      >
        {sorted.map((a: any) => {
          if (group != a.Group) {
            group = a.Group;
            let value = []
            value.push(<ListSubheader>{a.Group}</ListSubheader>)
            value.push(<MenuItem value={a.Location}>{a.Name}</MenuItem>)
            return (
                value.map((val:any) =>{
                  return val
                })
            )
          }
          return (
            <MenuItem value={a.Location}>{a.Name}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
  </div>)
};

export default RibbonChangeBarImageChange;
