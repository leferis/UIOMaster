import React, { FC } from 'react';
import { Arrow, Group, Rect } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import { CJMLDescisionPoint } from '../../Classes/CJMLDescisionPoint';
import { Connectable } from '../../Interface/Connectable';
import styles from './DescisionPoint.module.css';

interface DescisionPointProps {
  decisionPoints:CJMLDescisionPoint[];
  actors:any;
  setCJMLDescitionPoint:any;
  ClickFunction:any;
  setDrawingArrowMode:any;
  setClickFunction:any;
  drawingArrow:any;
  currentObject: any;
  arrowId: any;
  setArrowId: any;
  setCurrentObjectID:any;
  setDrawingObject:any;
  Arrows:CJMLArrow[];
  setArrows:any;
  finishArrow:any;
  addNewArrow:any;
  changeArrow:any;
}

function DescisionPoint(props:DescisionPointProps){

  function collision(e:any){
    console.log(e.target.getClientRect());
    var snapOnIt;
    var elementPos = e.target.getClientRect();
    props.actors.forEach((element: Actors) => {
      if(!(element.x > elementPos.x  ||
        element.x + element.width < elementPos.x ||
        element.y > elementPos.y ||
        element.y + element.height < elementPos.y
        )){snapOnIt = element;}
    });
    return snapOnIt;
  }


  function checkClickFunction(clickedObject: CJMLDescisionPoint, e: any) {
    console.log(e)
    console.log(props.ClickFunction)
    switch (props.ClickFunction) {
     
      case 'DrawArrow': {
        console.log(props.drawingArrow)
        if (props.drawingArrow == false) {
       
          props.setDrawingArrowMode(true);
          props.addNewArrow(clickedObject,e);
          props.setCurrentObjectID(clickedObject);
          props.setDrawingObject("Descision");
        }
        else {
          props.setDrawingArrowMode(false);
          props.finishArrow(clickedObject);
          props.setClickFunction('');
        }
        break;
      }
      case '': {
       
        const circles = props.decisionPoints.map(decisionPoint => {
          if (decisionPoint.id == clickedObject.id) {
            props.setCurrentObjectID(decisionPoint);
            return { ...decisionPoint };
          }
          return decisionPoint;
        });
        console.log(circles, "update");
        console.log(props.decisionPoints);

        props.setCJMLDescitionPoint(circles);
      }

    }

  }

return(<div>{props.decisionPoints.map((point) =>{
  return( 
  <div>
  <Group  onClick={(e)=> checkClickFunction(point, e)}>

    <Rect
    x={point.x}
    y={point.y}
    rotation={45}
    height={20}
    width={20}
    stroke={"black"}
    strokeWidth={2}
    draggable
    onDragMove = {(e) => {
      props.changeArrow(e, point.id, point);
    }}
    onDragEnd={ (e) => {
      var actorIn: Actors |undefined = collision(e);
      props.changeArrow(e, point.id, point);
      if(actorIn != undefined){
      const circles = props.decisionPoints.map((decisionPoint: CJMLDescisionPoint) => {
        console.log(e.target.getPosition().y );
        if (decisionPoint.id == point.id ) {
          return { ...decisionPoint, x: e.target.getPosition().x, y: actorIn?actorIn.y + actorIn.height/2 - 15 :e.target.getPosition().y };
        }
        return decisionPoint;
      })
      props.setCJMLDescitionPoint(circles);
      props.changeArrow(e, point.id, point);
    }
  }
  }
    />
    </Group>
    </div>);
})}</div>)

}

export default DescisionPoint;
