import React, { FC } from 'react';
import { Html } from 'react-konva-utils';
import { Text  } from "react-konva";
import styles from './TextMessages.module.css';

interface TextMessagesProps {
  x:number;
  y:number;
  width:number;
  height:number;
  ChangeFunction:any;
  value:any;
  fontSize:any;
  modifyObject:any;
  isEditing:any;
  changeEditable:any;
  ChangeBack:any;
}
function getStyle(width:number, height:number, fontSize:number) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "black",
    fontSize: `${fontSize}px`,
    fontFamily: "sans-serif"
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px"
  };
}
const changeMouse= (e:any, style:any) =>{
  const container = e.target.getStage().container();
  container.style.cursor = style;
}

function TextMessages(props: TextMessagesProps){
  const style:any = getStyle(props.width,props.height+30, props.fontSize);
  if(props.isEditing){
  return(
    <Html groupProps={{ x: props.x, y: props.y }} divProps={{ style: { opacity: 1} } }>
    <textarea 
          value={props.value}
          onChange={(e)=>props.ChangeFunction(e.target.value,props.modifyObject)}
          style={style}
          onBlur={()=>{props.ChangeBack(props.modifyObject)}}
        />
    </Html>
  )}
  else{
    return (<>
    <Text
        x={props.x}
        y={props.y}
        text={props.value}
        fill="black"
        fontFamily="sans-serif"
        fontSize={props.fontSize}
        perfectDrawEnabled={false}
        width={props.width}
        height={props.height * 2}
        onClick={(e)=>{
          props.changeEditable(props.modifyObject);
        }}
        onMouseEnter={(e)=>changeMouse(e,"pointer")}
        onMouseLeave={(e)=>changeMouse(e,"default")}
      /></>)
  }
}

export default TextMessages;
