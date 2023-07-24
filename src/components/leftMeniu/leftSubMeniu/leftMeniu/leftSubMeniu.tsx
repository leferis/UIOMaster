import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu.module.css';
import { Arrow, Circle, Group, Image as Images, Rect } from 'react-konva';
import LeftMeniuLeftSubMeniuBackgroundAndElement from '../backgroundAndElement/leftMeniu/leftSubMeniu/backgroundAndElement';

interface LeftMeniuLeftSubMeniuProps {
  option: string;
  setOption: any;
  layer:any;
}




function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  return (<Group>

    <Rect x={0} y={0} width={45} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5}
    ></Rect>
    <Group onClick={() => { props.setOption("Actor"); props.layer.current.y(0)}}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={6} y={10} height={36} width={36} option={"Actor"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\actor.png"} />
    </Group>

    <Group onClick={() => { props.setOption("Touchpoint"); props.layer.current.y(0)}}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={6} y={51} height={35} width={35} option={"Touchpoint"} currentOption={props.option} represenation='Circle'  />
    </Group>

    <Group onClick={() => { props.setOption("Action");props.layer.current.y(0)}}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={6} y={92} height={35} width={35} option={"Action"} currentOption={props.option} represenation='Rect'  />

    </Group>

    <Group onClick={() => { props.setOption("Arrow"); props.layer.current.y(0)}}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={6} y={133} height={35} width={35} option={"Arrow"} currentOption={props.option} represenation='Arrow'  />
    </Group>

    <Group onClick={() => { props.setOption("Statistics");props.layer.current.y(0) }}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={6} y={174} height={35} width={35} option={"Statistics"} currentOption={props.option} represenation='Image'  img={"\\HelpingImages\\statistics.png"}/>
    </Group>
  </Group>)
}

export default LeftMeniuLeftSubMeniu;
