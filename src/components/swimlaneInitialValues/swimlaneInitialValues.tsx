import React, { FC } from 'react';
import styles from './swimlaneInitialValues.module.css';
import { Actors } from '../../Classes/Actors';
import { Arrow, Circle } from 'react-konva';
import { CJMLAction } from '../../Classes/CJMLAction';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import { Connectable } from '../../Interface/Connectable';

interface SwimlaneInitialValuesProps {
  circles: CJMLCircle[];
  actions: CJMLAction[];
  actors: Actors[];
  setArrows: any;
  arrowID: any;
  setArrowID: any;
}


function SwimlaneInitialValues(props: SwimlaneInitialValuesProps) {
  let objects = JSON.parse(JSON.stringify(props.circles)).concat(JSON.parse(JSON.stringify(props.actions))).sort((x:any, y:any) => { 
    return x.x - y.x
  });
  const endUser = props.actors.filter((x: Actors) => {
    return x.isEndUser;
  })[0];
  return (

    objects.map((x: any, index:any) => {
      
      return (<>
      
      {index == 0 && <><Circle x={endUser.x + 100} y={endUser.y + endUser.height / 2} radius={9} stroke={"black"} /> 
       <Arrow points={[endUser.x+ 109, endUser.y + endUser.height/2, x.x - x.width -3, x.y ]} fill='black' stroke={"black"} /></>}
      { index == objects.length - 1 && <><Circle x={objects.length > 0 && objects[objects.length - 1].x != undefined ? objects[objects.length - 1].x + 50 : endUser.x + 150} y={endUser.y + endUser.height / 2} radius={9} fill={"black"} /> 
      <Arrow points={[x.x + x.width +3, x.y,objects.length > 0 && objects[objects.length - 1].x != undefined ? objects[objects.length - 1].x + 40 : endUser.x + 150, endUser.y + endUser.height / 2]} fill='black' stroke={"black"} /></>
      }
      </>
      )}
    
  ))
}

export default SwimlaneInitialValues;
