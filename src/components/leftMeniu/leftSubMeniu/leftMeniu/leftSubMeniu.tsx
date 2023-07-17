import React, { FC } from 'react';
import styles from './leftMeniu/leftSubMeniu.module.css';
import { Arrow, Circle, Group, Image as Images, Rect } from 'react-konva';

interface LeftMeniuLeftSubMeniuProps {}

function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  return (<Group>

  <Rect x={0} y={0} width={40} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5} ></Rect>
  <Images x={5} y={10}  image={getImageObject("\\HelpingImages\\actor.png")}  height={30} width={30}></Images>
  <Circle x={20} y={70} radius={15}  stroke={"black"} strokeWidth={1}/>
  <Rect  x={8} y={100} width={25}  height={20} cornerRadius={3} stroke={"black"} strokeWidth={1}></Rect>
  <Arrow points={[8,160,32,135] } fill='black' stroke={"black"} strokeWidth={1} ></Arrow>
  <Images x={8} y={175} image={getImageObject("\\HelpingImages\\statistics.png")}  height={25} width={25}></Images>

    </Group>)
}
function getImageObject(imgName: any) {
  const image = new Image();
  image.src = imgName;
  return image;
}
export default LeftMeniuLeftSubMeniu;
