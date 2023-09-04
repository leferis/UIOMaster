import React, { FC, Fragment } from 'react';

import styles from './ribbon/ChangeBar/ImageChange.module.css';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Html } from 'react-konva-utils';

interface RibbonChangeBarImageChangeProps {
  images: any;
  text: any;
  currentObject: any;
  changeImage: any;
  x:any;
  y:any;
  alternative?:any;
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
  if (props.alternative){
    value = props.currentObject.imageNameReceiver;
  }
  else if (props.currentObject.imageName != undefined) {
    value = props.currentObject.imageName;
  }
  else if (props.currentObject.img != undefined) {
    value = props.currentObject.img;
  }
  else {
    value = ""
  }

  let group = "";
  return (
    <Html  groupProps={{ x: props.x, y: props.y }} >
      <div style={{ display: "inline-block", float: "left" }} >
        <FormControl sx={{ m: 1, minWidth: 130, maxWidth:130 }} size="small">
          <InputLabel htmlFor="grouped-select">{props.text}</InputLabel>
          <Select value={value} id="grouped-select" label="Grouping"
            onChange={(e) => {
              props.changeImage(e.target.value)
            }}
            style={{ maxHeight:40}}
          >
            {sorted.map((a: any) => {
              if (group != a.Group) {
                group = a.Group;
                let value = []
                value.push(<ListSubheader>{a.Group}</ListSubheader>)
                value.push(<MenuItem value={a.Location}><ListItemIcon><img style={{width:"20px", height:"20px"}} src={a.Location}/></ListItemIcon> <ListItemText primary={a.Name} /> 
                </MenuItem>)
                return (
                  value.map((val: any) => {
                    return val
                  })
                )
              }
              return (
                <MenuItem value={a.Location} >  <ListItemIcon>
                  <img style={{width:"20px", height:"20px"}} src={a.Location}/>
                </ListItemIcon>
                <ListItemText primary={a.Name} /></MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    </Html>)
};

export default RibbonChangeBarImageChange;
