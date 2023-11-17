import React, { FC } from 'react';
import styles from './comments.module.css';
import { Actors } from '../../Classes/Actors';
import { CJMLAction } from '../../Classes/CJMLAction';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { Rect } from 'react-konva';

interface CommentsProps {actors:Actors[],
Actions:CJMLAction[],
Touchpoint:CJMLCircle[]}

function Comments(props:CommentsProps){
  function getWidth(){
    let width = 0;
    return width;
  }
  function getHeight(){
    let height = 0;
    
    return height;
  }
  
  return(<>
  <Rect></Rect>
  </>)
}

export default Comments;
