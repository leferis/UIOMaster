import React, { FC } from 'react';
import styles from './ribbon/ChangeBar/ActorChange.module.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Actors } from '../../../../../../Classes/Actors';
import { Html } from 'react-konva-utils';

interface RibbonChangeBarActorChangeProps {
  x: any;
  y: any;
  text: any;
  actors: Actors[];
  currentId: any;
  changeActor: any;
}

function RibbonChangeBarActorChange(props: RibbonChangeBarActorChangeProps) {

  return (
    <Html groupProps={{ x: props.x, y: props.y }}>
      <div style={{ display: "inline-block" }} >
        <FormControl sx={{ m: 1, minWidth: 120 , maxWidth:130}}  size="small">
          <InputLabel htmlFor="grouped-select">{props.text}</InputLabel>
          <Select defaultValue="" id="grouped-select" label="Grouping" value={props.currentId}
            onChange={(e) => {
              props.changeActor(e.target.value)
            }}>
            {props.actors.map((x) => {
              return (<MenuItem value={x.id}>{x.Title}</MenuItem>)
            })
            }
          </Select>
        </FormControl>
      </div>
    </Html>
  )
};


export default RibbonChangeBarActorChange;
