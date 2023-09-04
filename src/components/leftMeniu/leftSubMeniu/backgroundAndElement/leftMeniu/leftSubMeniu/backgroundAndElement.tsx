import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu/backgroundAndElement.module.css';
import { Rect, Circle, Arrow, Image as Images, Group, Text } from 'react-konva';
import { debounce } from 'lodash';

interface LeftMeniuLeftSubMeniuBackgroundAndElementProps {
  x:any, 
  y:any, 
  height:any, 
  width:any, 
  option:string, 
  currentOption:string, 
  represenation:string, 
  img?:string;
  text:string;
  swimLaneMode?:any;
}

function getImageObject(imgName: any) {
  const image = new Image();
  image.src = imgName;
  return image;
}


const LeftMeniuLeftSubMeniuBackgroundAndElement: FC<LeftMeniuLeftSubMeniuBackgroundAndElementProps> = (props) => {
  const [hower, onHower] = useState(false)
  const [popUp, onPopup] = useState(false)
  const [delayHandler, setDelayHandler] = useState<any>(null)
  
  function representation(type:string, x:any, y:any, path:any = ""){
    if(type == "Image"){
      return (<Images x={x+ 2.5} y={y} image={getImageObject(path)} height={30} width={30} />)
    }
    else if(type == "Rect"){
      return (<Rect x={x+2.5} y={y+4} width={30} height={27} cornerRadius={3} stroke={"black"} strokeWidth={1} />)
    }
    else if (type == "Circle"){
      if(props.swimLaneMode){
      return (<Circle x={x+17.5} y={y+17} radius={15} stroke={"black"} strokeWidth={1} />)}
      else{
        return (<Group>
          <Rect x={x+11} y={y+4} width={14} height={10} cornerRadius={3} stroke={"black"} strokeWidth={1} />
          <Arrow points={[x+18,y+14,x+18,y+22]} fill='black' stroke={"black"} dash={[3]} pointerWidth={3}  pointerLength={3} />
          <Rect x={x+11} y={y+23} width={14} height={10} cornerRadius={3} stroke={"black"} strokeWidth={1} />
        </Group>)
      }
    }
    else if (type == "Arrow"){
      return ( <Arrow points={[x+4, y+30, x+30, y+5]} fill='black' stroke={"black"} strokeWidth={1} />)
    }
  }
  

  const handleMouseEnter = (event:any) => {
    console.log(props.text.length)
    console.log(props.text.length*6.5)
    setDelayHandler(setTimeout(() => {
        onPopup(true)
    }, 500))
}
const handleMouseLeave = () => {
  onPopup(false)
  clearTimeout(delayHandler)
}

const changeMouse= (e:any, style:any) =>{
  const container = e.target.getStage().container();
  container.style.cursor = style;
}

  let selected= props.option == props.currentOption
  return(<div style={{cursor:"pointer"}}>
    <Group  onMouseEnter={(e) => {onHower(true);handleMouseEnter("test");changeMouse(e,"pointer")}} onMouseLeave={(e) => {onHower(false);handleMouseLeave();changeMouse(e,"default")}}>
    {popUp && !selected && <><Rect x={props.x + props.width} y={props.y + props.height / 2} width={props.text.length*6.5 +3} height={20} fill='black' stroke={"white"} opacity={0.7} ></Rect>
    <Text  x={props.x + props.width+ 3} y={props.y + props.height / 2 + 5} text={props.text}  fill='white'/></>}
    <Rect x={5} y={props.y} height={props.height+6} width={props.width+35} cornerRadius={4}  fill={selected || hower? '#cad2de':"#d9dfe7"} />
    {representation(props.represenation, props.x, props.y, props.img)}
    </Group>
    </div>
  )
};

export default LeftMeniuLeftSubMeniuBackgroundAndElement;
