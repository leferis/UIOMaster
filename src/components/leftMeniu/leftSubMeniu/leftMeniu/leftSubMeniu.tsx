import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu.module.css';
import { Arrow, Circle, Group, Image as Images, Rect } from 'react-konva';

interface LeftMeniuLeftSubMeniuProps {
  option: string;
  setOption: any;
}
function representation(type:string, x:any, y:any, path:any = ""){
  if(type == "Image"){
    return (<Images x={x+ 2.5} y={y} image={getImageObject(path)} height={30} width={30} />)
  }
  else if(type == "Rect"){
    return (<Rect x={x+2.5} y={y+4} width={30} height={27} cornerRadius={3} stroke={"black"} strokeWidth={1} />)
  }
  else if (type == "Circle"){
    return (<Circle x={x+17.5} y={y+17} radius={15} stroke={"black"} strokeWidth={1} />)
  }
  else if (type == "Arrow"){
    return ( <Arrow points={[x+4, y+30, x+30, y+5]} fill='black' stroke={"black"} strokeWidth={1} />)
  }
}

function backgroundAndElement(x:any, y:any, height:any, width:any, option:string, currentOption:string, represenation:string, img:string = ""){
  const [hower, onHower] = useState(false)
  let selected= option == currentOption
  return(
    <Group onMouseEnter={() => onHower(true)} onMouseLeave={() => onHower(false)}>
      <Rect x={x} y={y} height={height} width={width} cornerRadius={4}  fill={selected || hower? '#cad2de':""} />
      {representation(represenation, x, y, img)}
    </Group>
  )
}

function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  return (<Group>

    <Rect x={0} y={0} width={45} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5}
    ></Rect>
    <Group onClick={() => { props.setOption("Actor") }}>
      {backgroundAndElement(6,10,36,36,"Actor", props.option,"Image","\\HelpingImages\\actor.png")} 
    </Group>

    <Group onClick={() => { props.setOption("Touchpoint") }}>
      {backgroundAndElement(6,51,35,35,"Touchpoint", props.option,"Circle")} 
    </Group>

    <Group onClick={() => { props.setOption("Action") }}>
      {backgroundAndElement(6,92,35,35,"Action", props.option,"Rect")} 
    </Group>

    <Group onClick={() => { props.setOption("Arrow") }}>
      {backgroundAndElement(6,133,35,35,"Arrow", props.option,"Arrow")} 
    </Group>

    <Group onClick={() => { props.setOption("Statistics") }}>
      {backgroundAndElement(6,174,35,35,"Statistics", props.option,"Image","\\HelpingImages\\statistics.png")} 
    </Group>
  </Group>)
}
function getImageObject(imgName: any) {
  const image = new Image();
  image.src = imgName;
  return image;
}
export default LeftMeniuLeftSubMeniu;
