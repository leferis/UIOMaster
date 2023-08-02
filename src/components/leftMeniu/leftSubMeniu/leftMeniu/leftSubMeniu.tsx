import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu.module.css';
import { Arrow, Circle, Group, Image as Images, Rect, Tag, Text } from 'react-konva';
import LeftMeniuLeftSubMeniuBackgroundAndElement from '../backgroundAndElement/leftMeniu/leftSubMeniu/backgroundAndElement';

interface LeftMeniuLeftSubMeniuProps {
  option: string;
  setOption: any;
  layer: any;
  openForm:any;
}
function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  const [onHower, setOnHower] = useState(false)

  function getImageObject(imgName: any) {
    const image = new Image();
    image.src = imgName;
    return image;
  }

  return (<Group>
   
      <Rect x={0} y={0} width={90} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5}
      ></Rect>
       <Group onClick={()=> props.openForm(true)} onMouseEnter={()=>{setOnHower(true)}} onMouseLeave={()=>{setOnHower(false)}}>
      <Rect x={6} y={5} fill={onHower?'#4f9dea':'#1976d2'} cornerRadius={6} height={40} width={80}></Rect>
      <Text x={45} y={20} text='Form' fontVariant='bold' fontSize={12} fill='white'></Text>
      <Images x={10} y={10} image={getImageObject("\\HelpingImages\\form.png")} height={30} width={30} />
    </Group>
    <Group onClick={() => { props.setOption("Actor"); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={65} height={45} width={45} option={"Actor"} text='Actors'
        currentOption={props.option} represenation='Image' img={"\\HelpingImages\\actor.png"}
      />
      <Text x={24} y={99} text='Actor' fontVariant='bold' fontSize={14}></Text>
    </Group>

    <Group onClick={() => { props.setOption("Touchpoint"); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={121} height={45} width={45} option={"Touchpoint"} currentOption={props.option} represenation='Circle' text='Communication points' />
      <Text x={6} y={158} text='Touchpoint' fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => { props.setOption("Action"); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={182} height={45} width={45} option={"Action"} currentOption={props.option} represenation='Rect' text='Actions' />
      <Text x={22} y={220} text='Action' fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => { props.setOption("Arrow"); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={250} height={45} width={45} option={"Arrow"} currentOption={props.option} represenation='Arrow' text='Arrows' />
      <Text x={18} y={285} text='Arrows' fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => { props.setOption("Statistics"); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={314} height={45} width={45} option={"Statistics"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\statistics.png"} text='Statistics' />
      <Text x={10} y={345} text='Statistics' fontSize={14} fontVariant='bold'></Text>
    </Group>
  </Group>)
}

export default LeftMeniuLeftSubMeniu;
