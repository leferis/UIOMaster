import React, { FC, useState } from 'react';
import styles from './leftMeniu\\CircleSelect.module.css';
import { Group, Circle } from 'react-konva';

interface LeftMeniuCircleSelectProps {
  onMouseDown:any;
  onMouseUp:any;
  index:any;
  x:any;
}

function LeftMeniuCircleSelect(props: LeftMeniuCircleSelectProps) {
  const [hower, onHower] = useState(false);
  return (<Group onMouseEnter={() =>onHower(true)}  onMouseLeave={()=> onHower(false)} onMouseDown={props.onMouseDown}
          onMouseUp={props.onMouseUp}>
          { hower && <Circle x={110 + ( 40 *(props.index %3) )} y={110 + ( 40* (Math.floor((props.index + 1) /4)) )}  radius={20} fill={"#cad2de"}/> }      
          <Circle x={110 + ( 40 *(props.index %3) )} y={110 + ( 40* (Math.floor((props.index + 1) /4)) )}  radius={15} stroke={props.x.color}/>
  </Group>)
}


export default LeftMeniuCircleSelect;
