import React, { FC } from 'react';
import styles from './Comments.module.css';
import { Group, Rect, Text } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import CommentsComentElement from './comentElement/Comments/comentElement';

interface CommentsProps {
  actors: Actors[];
  touchpoints: any;
  actions: any;
  setActions: any;
  setTouchpoints: any;
}

function Comments(props: CommentsProps) {

  function updateTouchpoint(element:any){
    let elements = props.touchpoints.map((x:any)=>{
      if(x.id == element.id){
        return element
      }
      return x
    })
    props.setTouchpoints(elements);
  }

  function updateActions(element:any){
    let elements = props.actions.map((x:any)=>{
      if(x.id == element.id){
        return element
      }
      return x
    })
    props.setActions(elements);
  }
  if (props.actors.length > 0) {
    let referenceNode = props.actors[props.actors.length - 1];
    return (<>
      <Rect x={referenceNode.x} y={referenceNode.y + 200} height={120} width={referenceNode.width} stroke='#d9d9d9'
        cornerRadius={10}
        fill='white'
        strokeWidth={3} />
      <Text x={referenceNode.x + 20} y={referenceNode.y + 280} text='Comments'fontSize={14} />
      <Group>
        {props.touchpoints.map((x:CJMLCircle)=>{
          return(<CommentsComentElement touchpoint={x} yPostion={referenceNode.y + 220} setTouchpoint={(element:any)=>{updateTouchpoint(element)}} ></CommentsComentElement>)
        })}
        {props.actions.map((x:CJMLCircle)=>{
          return(<CommentsComentElement touchpoint={x} yPostion={referenceNode.y + 220} setTouchpoint={(element:any)=>{updateActions(element)}} ></CommentsComentElement>)
        })}
      </Group>
    </>)
  }
  else {
    return (<></>)
  }
}

export default Comments;
