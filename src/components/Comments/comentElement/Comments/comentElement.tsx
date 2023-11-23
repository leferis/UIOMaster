import React, { FC, useState } from 'react';
import styles from './Comments/comentElement.module.css';
import { Group, Line, Rect } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';

interface CommentsComentElementProps {
  touchpoint: any;
  yPostion: any;
  setTouchpoint: any;
}

function CommentsComentElement(props: CommentsComentElementProps) {

  function createComments() {
    let element = props.touchpoint;
    element.Comment = ""
    props.setTouchpoint(element);
  }
  function changeComments(value: any) {
    let element = props.touchpoint;
    element.Comment = "test"
    props.setTouchpoint(element);
  }
  function setCommentsEditing(value: boolean) {
    let element = props.touchpoint;
    element.CommentEdit = value
    props.setTouchpoint(element);
  }
  return (<>
    {(props.touchpoint.Comment == null) &&
      <Group onClick={() => {
        createComments();
      }}>
        <Rect x={props.touchpoint.x} y={props.yPostion} cornerRadius={10} dash={[15, 5]} stroke={"black"} height={80} width={180} />
        <Line points={[props.touchpoint.x + 100, props.yPostion + 40, props.touchpoint.x + 80, props.yPostion + 40]} fill='black' stroke={"black"} strokeWidth={4} />
        <Line points={[props.touchpoint.x + 90, props.yPostion + 30, props.touchpoint.x + 90, props.yPostion + 50]} fill='black' stroke={"black"} strokeWidth={4} />
      </Group>}
    {props.touchpoint.Comment != "" || props.touchpoint.Comment != null &&
      <Group>
        <Rect x={props.touchpoint.x} y={props.yPostion} stroke={"black"} height={80} width={180}  fill='white'/>
        <TextMessages x={props.touchpoint.x} y={props.yPostion} width={180} height={50} ChangeFunction={(value: any) => { changeComments(value) }} value={props.touchpoint.Comment}
          fontSize={14} modifyObject={props.touchpoint} isEditing={props.touchpoint.CommentEdit}
          changeEditable={() => { setCommentsEditing(true) }} ChangeBack={() => { setCommentsEditing(false) }} default={""}></TextMessages>
      </Group>
    }
  </>)
}


export default CommentsComentElement;
