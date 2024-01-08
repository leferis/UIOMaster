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
import { onActionDragEnd, onActionDragMove } from '../../Functions/actionMovement';
import { Button } from '@mui/material';
import _ from 'lodash';
import { Html } from 'react-konva-utils';
import ElementChangeBar from '../elementChangeBar/elementChangeBar';
import RibbonChangeBarImageChange from '../ribbon/ChangeBar/ImageChange/ribbon/ChangeBar/ImageChange';
import DeleteIcon from '@mui/icons-material/Delete';


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
  checkIfCloseToActorsBorder: any;
  remove: any;
  findFurthestPoint: any;
  setActors:any;
}

function ActionPoints(props: ActionPointsProps) {
  return (
    <div>
      {props.actions.map((x: CJMLAction, index: number) => {
        return (
          <div>
            {x.id == props.currentObject.id && <ElementChangeBar x={x.swimlaneX + 30} y={x.y - 90}>
              <Html groupProps={{ x: x.swimlaneX + 50, y: x.y - 78 }}>
                <Button color="error" variant="outlined" onClick={() => (props.remove())} startIcon={<DeleteIcon />} />
              </Html>
            </ElementChangeBar>}
            {props.swimlaneMode && props.currentObject.id == x.id && <div>
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

              stroke={'black'}
              cornerRadius={10}
              height={props.swimlaneMode ? 60 : 80}
              width={props.swimlaneMode ? 90 : 180}
              fill={x.external == 0 ? "White" : "LightGray"}
              strokeWidth={3}

            />
            <TextMessages x={props.swimlaneMode ? x.x + 3 : x.swimlaneX + 10} y={x.y + 10}
              height={props.swimlaneMode ? 20 : 40}
              width={props.swimlaneMode ? 80 : 160} ChangeFunction={ChangeObject} modifyObject={x} value={x.text} fontSize={14} isEditing={x.isEditing} changeEditable={(x: any) => {
              }}
              ChangeBack={(x: any) => {
                const circles = props.actions.map((action: CJMLAction) => {
                  if (action.id == x.id) {
                    return { ...action, isEditing: false };
                  }
                  return action;
                })
                props.setActions(circles);
              }}
              default={"Enter text"}
            ></TextMessages>
            {!x.isEditing && <Rect x={props.swimlaneMode ? x.x : x.swimlaneX}
              y={x.y}
              height={props.swimlaneMode ? 60 : 80}
              width={props.swimlaneMode ? 90 : 180}
              id={x.id.toString()}
              draggable
              onClick={(e) => {
                checkClickFunction(x, e);
              }}
              onDblClick={() => {
                const circles = props.actions.map((action: CJMLAction) => {
                  props.setCurrentObjectID(-1);
                  if (action.id == x.id) {
                    return { ...action, isEditing: true };
                  }
                  return action;
                })
                props.setActions(circles);
              }}
              onDragStart={() => x.Capacity = false}
              onDragMove={(e) => {
                onActionDragMove(e, props.circles, x, props.updateCircles, props.changeArrow, props.checkIfCloseToActorsBorder, index, props.checkIfCloseToActorsBorder, props.actions, props.setActions, props.actors, props.swimlaneMode, true, props.arrowId, props.setArrowId, props.setArrows)
                props.findFurthestPoint(props.circles, props.actions, props.actors, props.setActors)
              }}
              onDragEnd={
                (e) => {
                  onActionDragEnd(e, x, props.actors, props.actions, props.swimlaneMode, props.updateCircles, props.changeArrow, props.checkIfCloseToActorsBorder, props.circles, props.setActions, index, true, props.arrowId, props.setArrowId, props.setArrows);
                  props.findFurthestPoint(props.circles, props.actions, props.actors, props.setActors)
                }
              }
            />
            }

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
