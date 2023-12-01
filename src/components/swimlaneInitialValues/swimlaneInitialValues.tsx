import React, { FC } from 'react';
import styles from './swimlaneInitialValues.module.css';
import { Actors } from '../../Classes/Actors';
import { Arrow, Circle } from 'react-konva';
import { CJMLAction } from '../../Classes/CJMLAction';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import { Connectable } from '../../Interface/Connectable';
import _, { values } from 'lodash';

interface SwimlaneInitialValuesProps {
  circles: CJMLCircle[];
  actions: CJMLAction[];
  actors: Actors[];
  setArrows: any;
  arrowID: any;
  setArrowID: any;
}

function getPositions(objects: any) {
  let xPositionFirst, yPositionFirst, yPostionLast
  if (objects[0].receiver == undefined) {
    xPositionFirst = objects[0].x - 3
    yPositionFirst = objects[0].y + objects[0].height / 2 - 3;
  }
  else {
    xPositionFirst = objects[0].x - objects[0].width - 3
    yPositionFirst = objects[0].y

  }
  if (objects[objects.length - 1].reciever == undefined) {
    yPostionLast = objects[objects.length - 1].y + objects[objects.length - 1].height / 2
  }
  else {
    yPostionLast = objects[objects.length - 1].y;
  }

  return { xPositionFirst, yPositionFirst, yPostionLast }
}


function SwimlaneInitialValues(props: SwimlaneInitialValuesProps) {
  let objects = _.cloneDeepWith<any>(props.circles)
  let objectsAction = _.cloneDeep<any>(props.actions)
  objects = objects.concat(objectsAction).sort((x: any, y: any) => {
    return x.x - y.x
  });

  const endUser = props.actors.filter((x: Actors) => {
    return x.isEndUser;
  })[0];

  if (objects.length > 0) {
    var { xPositionFirst = 0, yPositionFirst = 0, yPostionLast = 0 } = getPositions(objects)
  }
  if (objects.length > 0) {
    return (

      objects.map((x: any, index: any) => {

        return (<>

          {index == 0 && <><Circle x={endUser.x + 102} y={endUser.y + endUser.height / 2} radius={6} stroke={"#7F7F7F"} />
            <Arrow pointerWidth={7}
              pointerLength={7} points={[endUser.x + 109, endUser.y + endUser.height / 2, xPositionFirst, yPositionFirst]} fill='#7F7F7F' stroke={"#7F7F7F"} /></>}
          {index == objects.length - 1 && <><Circle x={objects.length > 0 && objects[objects.length - 1].x != undefined ? objects[objects.length - 1].x + 152 : endUser.x + 152} y={endUser.y + endUser.height / 2} radius={7} fill={"#7F7F7F"} />
            <Arrow pointerWidth={7}
              pointerLength={7} points={[x.x + x.width, yPostionLast, objects.length > 0 && objects[objects.length - 1].x != undefined ? objects[objects.length - 1].x + 145 : endUser.x + 150, endUser.y + endUser.height / 2]} fill='#7F7F7F' stroke={"#7F7F7F"} /></>
          }
        </>
        )
      }
      ))
  }
  else {

    return (<>

      <>
        <Circle x={320} y={endUser.y + endUser.height / 2} radius={6} stroke={"#7F7F7F"} />

        <Circle x={452} y={endUser.y + endUser.height / 2} radius={7} fill={"#7F7F7F"} />
      </>

    </>
    )
  }
}

export default SwimlaneInitialValues;

