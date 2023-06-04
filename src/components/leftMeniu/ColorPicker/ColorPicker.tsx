import React, { FC } from 'react';
import styles from './leftMeniu/ColorPicker.module.css';
import { Html } from 'react-konva-utils';
import { Circle } from '@uiw/react-color';
import { Group, Rect } from 'react-konva';
interface LeftMeniuColorPickerProps {
  x:any,
  y:any
}

function LeftMeniuColorPicker(props:LeftMeniuColorPickerProps){ 
  
  return(   <Group x={props.x} y= {props.y} width={100}>
    <Rect x={props.x} y={props.y} height={200} width={200} ></Rect>
  <Html  >
<Circle style={{width:"200px"}} color= {"#fff"} 
colors={["#E46C0A", "#3BA0BB", '#77933C', '#B3A2C7',
 '#31859C', '#B7DEE8' ]} />

    </Html>
    </Group>) 
};

export default LeftMeniuColorPicker;
