import React, { FC } from 'react';
import styles from './leftMeniu/ColorPicker.module.css';
import { Html } from 'react-konva-utils';
import { Circle } from '@uiw/react-color';
import { Group, Rect } from 'react-konva';
import { Actors } from '../../../Classes/Actors';
interface LeftMeniuColorPickerProps {
  x:any,
  y:any,
  currentObject:any,
  setActors:any,
  Actors:any,
  updateCirlces:any
}

function LeftMeniuColorPicker(props:LeftMeniuColorPickerProps){ 
  
  return(   <Group x={props.x} y= {props.y} width={100}>
    <Rect x={props.x} y={props.y} height={200} width={200} ></Rect>
  <Html  >
<Circle style={{width:"200px"}} color= {props.currentObject.color} 
colors={["#E46C0A", "#3BA0BB", '#77933C', '#B3A2C7',
 '#31859C', '#B7DEE8' ]}
 onChange={(color) => {
  let actorsToReplaceWith;
  const update = props.Actors.map((act:Actors) => {
    if (act.id == props.currentObject.id) {
      actorsToReplaceWith = act;
      actorsToReplaceWith.color = color.hex;
      act.color = color.hex;
    }
    return act;
  });
  props.setActors(update);
  props.updateCirlces(actorsToReplaceWith);
}}
 />

    </Html>
    </Group>) 
};

export default LeftMeniuColorPicker;
