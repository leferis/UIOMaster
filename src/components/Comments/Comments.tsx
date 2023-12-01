import React, { FC } from 'react';
import styles from './Comments.module.css';
import { Group, Rect, Text, Image as Images } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import CommentsComentElement from './comentElement/Comments/comentElement';
import CommentsCommentElementNetwork from './commentElementNetwork/Comments/commentElementNetwork';

interface CommentsProps {
  actors: Actors[];
  touchpoints: any;
  actions: any;
  setActions: any;
  setTouchpoints: any;
  diagramType: any;
}

function Comments(props: CommentsProps) {

  function updateTouchpoint(element: any) {
    let elements = props.touchpoints.map((x: any) => {
      if (x.id == element.id) {
        return element
      }
      return x
    })
    props.setTouchpoints(elements);
  }

  function updateActions(element: any) {
    let elements = props.actions.map((x: any) => {
      if (x.id == element.id) {
        return element
      }
      return x
    })
    props.setActions(elements);
  }

  function getImageObject(imgName: any) {
    const image = new Image();
    image.src = imgName;
    return image;
  }

  if (props.actors.length > 0) {
    let referenceNode = props.actors[props.actors.length - 1];
    return (<>
      {!props.diagramType && <><Rect x={referenceNode.x} y={referenceNode.y + 200} height={120} width={referenceNode.width} stroke='#d9d9d9'
        cornerRadius={10}
        fill='white'
        strokeWidth={3} />
      <Text x={referenceNode.x + 25} y={referenceNode.y + 280} text='Comments' fontSize={14} />
      <Images x={referenceNode.x + 40} y={referenceNode.y + 230} image={getImageObject("\\HelpingImages\\help.png")} height={40} width={40} /></>}
      <Group>
        {props.touchpoints.map((x: CJMLCircle, index: any) => {
          if (!props.diagramType) {
            return (<CommentsComentElement touchpoint={x} yPostion={referenceNode.y + 220} setTouchpoint={(element: any) => { updateTouchpoint(element) }} index={index} ></CommentsComentElement>)
          }
          else if(props.diagramType)  {
            return(<CommentsCommentElementNetwork setTouchpoint={(element: any) => { updateTouchpoint(element) }} touchpoint={x}/>)
          }
        })}
        {props.actions.map((x: CJMLCircle, index: any) => {
          if (!props.diagramType) {
            return (<CommentsComentElement touchpoint={x} yPostion={referenceNode.y + 220} setTouchpoint={(element: any) => { updateActions(element) }} index={index} ></CommentsComentElement>)
          }
          else if(props.diagramType) {
            
            return(<CommentsCommentElementNetwork setTouchpoint={(element: any) => { updateTouchpoint(element) }} touchpoint={x}/>)
          }
        })}
      </Group>
    </>)
  }
  else {
    return (<></>)
  }
}

export default Comments;
