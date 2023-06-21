import React, { FC } from 'react';
import { Arrow, Circle, Group, Rect } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLAction } from '../../Classes/CJMLAction';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { Connectable } from '../../Interface/Connectable';
import TextMessages from '../TextMessages/TextMessages';
import styles from './ActionPoints.module.css';
import { collisionSwim, moveElement } from '../../Functions/Movement';

interface ActionPointsProps {
  setActions: any;
  actions: CJMLAction[];
  setClickFunction: any;
  ClickFunction: any;
  drawingArrow: any;
  setDrawingArrowMode: any;
  setCurrentObjectID: any;
  currentObject: any;
  arrowId: any;
  setArrowId: any;
  actors: any;
  setDrawingObject: any;
  Arrows: CJMLArrow[];
  setArrows: any;
  finishArrow: any;
  addNewArrow: any;
  changeArrow: any;
  swimlaneMode: any;
  updateCircles: any;
  circles: any
}

function ActionPoints(props: ActionPointsProps) {
  return (
    <div>
      {props.actions.map((x: CJMLAction, index: number) => {
        return (
          <div>
            {props.swimlaneMode && <div>
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
                points={[x.x + 45, x.y + 30, x.x + 140, x.y + 30]}
                stroke={'black'}
                radius={2}
                strokeWidth={1}

                fill={'Black'}
                opacity={x.Capacity ? 1 : 0}
                onClick={(e) => {
                  helpingArrow(x, e);
                }}
              ></Arrow>
              <Arrow
                points={[x.x + 45, x.y + 30, x.x + 45, x.y + 90]}
                stroke={'black'}
                radius={2}
                strokeWidth={1}
                fill={'Black'}
                opacity={x.Capacity ? 1 : 0}
                onClick={(e) => {
                  helpingArrow(x, e);
                }}
              ></Arrow>
              <Arrow
                points={[x.x + 45, x.y + 30, x.x - 40, x.y + 30]}
                stroke={'black'}
                radius={2}
                strokeWidth={1}
                fill={'Black'}
                opacity={x.Capacity ? 1 : 0}
                onClick={(e) => {
                  helpingArrow(x, e);
                }}
              ></Arrow>
              <Arrow
                points={[x.x + 45, x.y + 30, x.x + 45, x.y - 30]}
                stroke={'black'}
                radius={2}
                strokeWidth={1}
                fill={'Black'}
                opacity={x.Capacity ? 1 : 0}
                onClick={(e) => {
                  helpingArrow(x, e);
                }}
              ></Arrow>
            </div>}
            <Rect x={props.swimlaneMode ? x.x : x.swimlaneX}
              y={x.y}
              id={x.id.toString()}
              draggable
              stroke={'black'}
              cornerRadius={10}
              height={props.swimlaneMode ? 60 : 120}
              width={props.swimlaneMode ? 90 : 180}
              fill={x.external == 0 ? "White" : "LightGray"}
              strokeWidth={3}
              onClick={(e) => {
                checkClickFunction(x, e);
              }}
              onDragStart={() => x.Capacity = false}
              onDragMove={(e) => {
                const circles = props.actions.map((action: CJMLAction) => {
                  if (action.id == x.id) {
                    return { ...action, x: e.target.getPosition().x, y: e.target.getPosition().y, swimlaneX: e.target.getPosition().x };
                  }
                  return action;
                })
                props.setActions(circles);
                var actorIn: Actors | undefined = collisionSwim(e.target.getPosition().y, x, props.actors);
                if (actorIn != undefined) {
                  const circles = props.actions.map((action: CJMLAction) => {
                    if (action.id == x.id) {
                      if (props.swimlaneMode && actorIn != undefined && actorIn.isEndUser) {
                        return { ...action,  y: actorIn ? actorIn.y + actorIn.height / 2 - 30 : e.target.getPosition().y };
                      } else {
                        return { ...action,  y: actorIn ? actorIn.y + actorIn.height / 2 - 30 : e.target.getPosition().y };
                      }
                    }
                    return action;
                  })
                  props.setActions(circles)
                  moveElement(props.circles,index,e.target.attrs.x,circles, props.updateCircles, props.setActions)
                  props.changeArrow(e, x.id, circles.filter(y => y.id == x.id)[0]);
                }
                props.setActions(circles)
                moveElement(props.circles,index,e.target.attrs.x,circles, props.updateCircles, props.setActions)
                props.changeArrow(e, x.id, circles.filter(y => y.id == x.id)[0]);
              }}
              onDragEnd={
                (e) => {
                  var actorIn: Actors | undefined = collisionSwim(e.target.getPosition().y, x, props.actors);
                  if (actorIn != undefined) {
                    const circles = props.actions.map((action: CJMLAction) => {
                      if (action.id == x.id) {
                        if (props.swimlaneMode && actorIn != undefined && actorIn.isEndUser) {
                          return { ...action, x: e.target.getPosition().x, y: actorIn ? actorIn.y + actorIn.height / 2 - 30 : e.target.getPosition().y };
                        } else if (!props.swimlaneMode && actorIn != undefined) {
                          return { ...action, swimlaneX: e.target.getPosition().x, y: actorIn ? actorIn.y + actorIn.height / 2 - 30 : e.target.getPosition().y };
                        }
                      }
                      return action;
                    })
                    console.log(circles);
                    props.setActions(JSON.parse(JSON.stringify(circles)));
                    props.changeArrow(e, x.id, circles.filter(y => y.id == x.id)[0]);
                    moveElement(props.circles,index,e.target.attrs.x,circles, props.updateCircles, props.setActions)
                  }

                }
              }

            />
            <TextMessages x={props.swimlaneMode ? x.x + 10 : x.swimlaneX + 10} y={x.y + 10} height={props.swimlaneMode ? 60 : 100} width={props.swimlaneMode ? 90 : 160} ChangeFunction={ChangeObject} modifyObject={x} value={x.text} fontSize={12} isEditing={x.isEditing} changeEditable={(x: any) => {
              const circles = props.actions.map((action: CJMLAction) => {
                if (action.id == x.id) {
                  return { ...action, isEditing: true };
                }
                return action;
              })
              props.setActions(circles);
            }}
              ChangeBack={(x: any) => {
                const circles = props.actions.map((action: CJMLAction) => {
                  if (action.id == x.id) {
                    return { ...action, isEditing: true };
                  }
                  return action;
                })
                props.setActions(circles);
              }}
            ></TextMessages>
          </div>
        );
      })}

    </div>
  );


  function ChangeObject(e: any, obj: any) {
    const circles = props.actions.map((action: CJMLAction) => {
      if (action.id == obj.id) {
        return { ...action, text: e };
      }
      return action;
    })
    props.setActions(circles);
  }

  function checkClickFunction(clickedObject: CJMLAction, e: any) {
    switch (props.ClickFunction) {
      case 'DrawArrow': {
        if (props.drawingArrow == false) {
          props.setDrawingArrowMode(true);
          props.addNewArrow(clickedObject, e);
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

        const circles = props.actions.map((action: any) => {
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

  function helpingArrow(clickedObject: CJMLAction, e: any) {
    props.setClickFunction('DrawArrow');
    checkClickFunction(clickedObject, e);
  }


}


export default ActionPoints;
