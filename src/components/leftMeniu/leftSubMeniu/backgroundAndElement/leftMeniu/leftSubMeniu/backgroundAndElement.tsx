import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu/backgroundAndElement.module.css';
import { Rect, Circle, Arrow, Image as Images, Group } from 'react-konva';

interface LeftMeniuLeftSubMeniuBackgroundAndElementProps {
  x:any, 
  y:any, 
  height:any, 
  width:any, 
  option:string, 
  currentOption:string, 
  represenation:string, 
  img?:string;
}

function getImageObject(imgName: any) {
  const image = new Image();
  image.src = imgName;
  return image;
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

const LeftMeniuLeftSubMeniuBackgroundAndElement: FC<LeftMeniuLeftSubMeniuBackgroundAndElementProps> = (props) => {
  const [hower, onHower] = useState(false)
  let selected= props.option == props.currentOption
  return(
    <Group onMouseEnter={() => onHower(true)} onMouseLeave={() => onHower(false)}>
      <Rect x={props.x} y={props.y} height={props.height} width={props.width} cornerRadius={4}  fill={selected || hower? '#cad2de':""} />
    {representation(props.represenation, props.x, props.y, props.img)}
    </Group>
  )
};

export default LeftMeniuLeftSubMeniuBackgroundAndElement;
