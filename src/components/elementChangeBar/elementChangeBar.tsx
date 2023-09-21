import React, { FC } from 'react';
import styles from './elementChangeBar.module.css';
import { Rect } from 'react-konva';

interface ElementChangeBarProps {
  x: any;
  y: any;
  children: any;
}

function ElementChangeBar(props: ElementChangeBarProps) {
  return (<><Rect cornerRadius={3} height={60} fill='white' zIndex={999} x={props.x} y={props.y} width={props.children.length == undefined ? 170 : props.children.length * 150}
    stroke={"black"} strokeWidth={2}>
  </Rect>
    {props.children}
  </>)
}

export default ElementChangeBar;
