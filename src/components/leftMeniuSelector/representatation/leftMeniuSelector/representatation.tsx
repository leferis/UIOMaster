import React, { FC, useState } from 'react';
import styles from './leftMeniuSelector/representatation.module.css';
import { Group, Rect, Image as Images, Text } from 'react-konva';

interface LeftMeniuSelectorRepresentatationProps { 
  onMouseUp:any; 
  onMouseDown:any;
  initialPosX:any;
  name:any;
  initialPosY:any;
  image:any;
  mousetype:any
  width:any;
}



const LeftMeniuSelectorRepresentatation: FC<LeftMeniuSelectorRepresentatationProps> = (props) =>{
  const [onHower, setOnHower] = useState(false);
  
  const changeMouse= (e:any, style:any) =>{
    const container = e.target.getStage().container();
    container.style.cursor = style;
  }

  return(
  <Group onMouseUp={() => {props.onMouseUp();}} onMouseDown={() => props.onMouseDown()} onMouseEnter={(e) => { setOnHower(true); changeMouse(e,props.mousetype) }} onMouseLeave={(e) => { changeMouse(e,"default");setOnHower(false);  }}>
    {onHower && <Rect x={props.initialPosX - 6} y={props.initialPosY - 3} height={90} width={45} fill='#cad2de' cornerRadius={3}></Rect>}
    <Images x={props.initialPosX} y={props.initialPosY} image={props.image} height={30} width={props.width} />
    <Text x={props.initialPosX - 2} y={props.initialPosY + 40} text={props.name} fontSize={12} wrap="char" width={40} />

  </Group>)
};

export default LeftMeniuSelectorRepresentatation;
