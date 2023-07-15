import React, { FC } from 'react';
import { Arrow, Group, Rect } from 'react-konva';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import styles from './ArrowComponent.module.css';

interface ArrowComponentProps {
  Arrows: CJMLArrow[];
  currentObject: any;
  setArrows: any;
  setCurrentObject: any;
  SwimlineMode: any;
}

function ArrowComponent(props: ArrowComponentProps) {

  function getPoints(arrow: CJMLArrow) {
    if ((arrow.fromPoint.x < arrow.toPoint.x - arrow.toPoint.width /2 || arrow.fromPoint.x > arrow.toPoint.x+ arrow.toPoint.width /2 ) && arrow.fromPoint.x  != arrow.toPoint.x ) {
      return [arrow.fromPoint.x + arrow.fromPoint.width, arrow.fromPoint.y + arrow.fromPoint.height / 2].concat(arrow.intermidiate).concat([arrow.toPoint.height == 0? arrow.toPoint.x-arrow.toPoint.width:arrow.toPoint.x , arrow.toPoint.y + arrow.toPoint.height / 2]);
    }
    else {
      return [arrow.toPoint.height == 0?arrow.fromPoint.x: arrow.fromPoint.x+ arrow.fromPoint.width/2 , arrow.fromPoint.y + arrow.fromPoint.height / 2].concat(arrow.intermidiate).concat([arrow.toPoint.height == 0?arrow.toPoint.x:arrow.toPoint.x+arrow.toPoint.width/2, arrow.toPoint.height == 0?arrow.toPoint.y-arrow.toPoint.width:arrow.toPoint.y]);
    }
  }

  return (<div>
    {props.SwimlineMode && props.Arrows.map(arrow => {
      return (
        <Arrow points={getPoints(arrow)}
          stroke={props.currentObject.id == arrow.id ? 'Red' : 'Black'}
          radius={2}
          onClick={() => {
            props.setCurrentObject(arrow);
          }}
          hitStrokeWidth = {2}
          strokeWidth={1}
          fill={props.currentObject.id == arrow.id ? 'Red' : 'Black'}>

        </Arrow>
)
    })}
  </div>);
}
export default ArrowComponent;
