import React from 'react';
import { Arrow, Group, Rect } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLAction } from '../../Classes/CJMLAction';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import TextMessages from '../TextMessages/TextMessages';

interface SwimlaneActionProps {
  setActions:any;
  actions:CJMLAction[];
  setClickFunction: any;
  ClickFunction: any;
  drawingArrow: any;
  setDrawingArrowMode: any;
  setCurrentObjectID: any;
  currentObject: any;
  arrowId: any;
  setArrowId: any;
  actors:any;
  setDrawingObject:any;
  Arrows:CJMLArrow[];
  setArrows:any;
  finishArrow:any;
  addNewArrow:any;
  changeArrow:any;
}

function SwimlaneAction(props: SwimlaneActionProps){
  return (
    <div>
      {props.actions.map((x:CJMLAction) => {
        return (
          <div>
            <Group draggable>
              <Rect x={x.x - 15}
                      y={x.y - 15}
                      height={90}
                      width={120}
                      stroke={'black'}
                      strokeWidth={1}
                      opacity={x.Capacity ? 1 : 0}
                    >
                    </Rect>
                    <Arrow
                      points={[x.x +45, x.y +30, x.x + 140, x.y + 30]}
                      stroke={'black'}
                      radius={2}
                      strokeWidth={1}
                      
                      fill={'Black'}
                      opacity={x.Capacity ? 1 : 0}
                      onClick={(e) => {
                        helpingArrow(x,e);
                      }}
                    ></Arrow>
                    <Arrow
                      points={[x.x +45, x.y +30, x.x +45, x.y + 90]}
                      stroke={'black'}
                      radius={2}
                      strokeWidth={1}
                      fill={'Black'}
                      opacity={x.Capacity ? 1 : 0}
                      onClick={(e) => {
                        helpingArrow(x,e);
                      }}
                    ></Arrow>
                    <Arrow
                      points={[x.x +45, x.y +30, x.x - 40, x.y +30]}
                      stroke={'black'}
                      radius={2}
                      strokeWidth={1}
                      fill={'Black'}
                      opacity={x.Capacity ? 1 : 0}
                      onClick={(e) => {
                        helpingArrow(x,e);
                      }}
                    ></Arrow>
                    <Arrow
                      points={[x.x +45, x.y +30, x.x +45, x.y - 30]}
                      stroke={'black'}
                      radius={2}
                      strokeWidth={1}
                      fill={'Black'}
                      opacity={x.Capacity ? 1 : 0}
                      onClick={(e) => {
                        helpingArrow(x,e);
                      }}
                    ></Arrow>
              <Rect x={x.x}
                y={x.y}
                id={x.id.toString()}
                draggable
                stroke={'black'}
                cornerRadius={10}
                height={60}
                width= {90}
                fill={x.external == 0? "White":"LightGray"}
                strokeWidth={3}
                onClick={(e) => {
                  checkClickFunction(x, e);
                }}
                onDragStart={() => x.Capacity = false}
                onDragMove={(e) => { 
                  const circles = props.actions.map((action : CJMLAction) => {
                    if (action.id == x.id ) {
                      return { ...action, x: e.target.getPosition().x, y: e.target.getPosition().y };
                    }
                    return action;
                  })
                  props.setActions(circles);
                  props.changeArrow(e, x.id,circles.filter(y=> y.id == x.id)[0]);
                }}
                onDragEnd={
                  (e) => {
                    var actorIn: Actors |undefined = collision(e);
                    if(actorIn != undefined){
                    const circles = props.actions.map((action : CJMLAction) => {
                      if (action.id == x.id ) {
                        return { ...action, x: e.target.getPosition().x, y: actorIn?actorIn.y + actorIn.height/2 - 30 :e.target.getPosition().y };
                      }
                      return action;
                    })
                    props.setActions(circles);
                    props.changeArrow(e, x.id,circles.filter(y=> y.id == x.id)[0]);
                  }
                  }
                }

              />
              <TextMessages x={x.x + 10} y={x.y + 10} height={40}  width={70} ChangeFunction={ChangeObject} modifyObject={x} value={x.text} fontSize={12} isEditing={x.isEditing}                 changeEditable={(x:any)=>{
                  const circles = props.actions.map( (action:CJMLAction) =>{
                    if(action.id == x.id){
                       return {...action, isEditing: true};
                    }
                     return action;
                   })
                  props.setActions(circles);
                }}
                ChangeBack={(x:any)=>{
                  const circles = props.actions.map( (action:CJMLAction) =>{
                    if(action.id == x.id){
                       return {...action, isEditing: false};
                    }
                     return action;
                   })
                  props.setActions(circles);
                }}
                default={"Enter text"}
                ></TextMessages>
            </Group>
          </div>
        );
      })}

    </div>
  );

  function ChangeObject(e:any,obj:any){
    const circles = props.actions.map( (action:CJMLAction) =>{
     if(action.id == obj.id){
        return {...action, text: e};
     }
      return action;
    })
    props.setActions(circles);
  }

function checkClickFunction(clickedObject: CJMLAction, e: any) {
//Rethink
switch (props.ClickFunction) {
  case 'DrawArrow': {
    if (props.drawingArrow == false) {
      props.setDrawingArrowMode(true);//rework
      props.addNewArrow(clickedObject,e);
      props.setCurrentObjectID(clickedObject);
      props.setDrawingObject("Action");
    }
    else {
      props.setDrawingArrowMode(false);
      props.finishArrow(clickedObject);
      props.setClickFunction('');
    }
    break;
  }
  case '': {
    
    const circles = props.actions.map((action :any) => {
      if (action.id == clickedObject.id) {
        props.setCurrentObjectID(action);
        return { ...action, Capacity: true };
      }
      return action;
    });
    props.setActions(circles);
  }

}

}

function helpingArrow(clickedObject: CJMLAction, e: any){
props.setClickFunction('DrawArrow');
checkClickFunction(clickedObject, e);
}

function collision(e:any){
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
}

export default SwimlaneAction;
