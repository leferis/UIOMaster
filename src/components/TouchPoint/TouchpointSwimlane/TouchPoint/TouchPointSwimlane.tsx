import React, { FC } from 'react';
import styles from './TouchPoint/TouchPointSwimlane.module.css';
import { Arrow, Circle, Group, Line, Rect } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';
import { CJMLCircle } from '../../../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../../../enumerator/TouchPointStatus';
import { Actors } from '../../../../Classes/Actors';
import { onDragEnd } from '../../../../Functions/Movement';

interface TouchPointSwimlaneProps {
  touchPoint: CJMLCircle
  touchPoints: CJMLCircle[];
  updateCircles: any;
  SwimlaneMode: any;
  deviationMode: any;
  resetTouchpoints: any;
  checkClickFunction: any;
  actors: Actors[];
  setClickFunction:any;
  getImage:any;
  elementsAreFarFromBorder:any;
  changeArrow:any;
  elementCheckCloseToBorder:any;
  SwimlineMode:any;
  actions:any;
  setActions:any;
  index:any;
  isPlanned:any;
  makeBiggerActors:any;
  setCurrentObject:any
}


function TouchPointSwimlane(props: TouchPointSwimlaneProps) {

  function helpingArrow(clickedObject: CJMLCircle, e: any) {
    props.setClickFunction('DrawArrow');
    props.checkClickFunction(clickedObject, e);
  }

  return (
    <div>
      <Group >
        {props.touchPoint.initiator.isEndUser && <TextMessages x={props.touchPoint.devation ? props.touchPoint.x - 80 : props.touchPoint.x - 25}
          y={props.touchPoint.devation ? props.touchPoint.y - 20 : props.touchPoint.y - 60}
          height={20}
          isEditing={props.touchPoint.isEditing}
          fontSize={10}
          value={props.touchPoint.text}
          width={60}
          ChangeFunction={((val: any, x: any) => {
            props.setCurrentObject(-1)
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, text: val };
              }
              return circle;
            })
            props.updateCircles(circles);
          })}
          changeEditable={(x: any) => {
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, isEditing: true };
              }
              return circle;
            })
            props.updateCircles(circles);
          }

          }
          ChangeBack={(x: any) => {
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, isEditing: false };
              }
              return circle;
            })
            props.updateCircles(circles);
          }}
          modifyObject={props.touchPoint}
        ></TextMessages>}
        {props.touchPoint.receiver.isEndUser && <TextMessages x={props.touchPoint.devation ? props.touchPoint.x - 80 : props.touchPoint.x - 25}
          y={props.touchPoint.devation ? props.touchPoint.y - 20 : props.touchPoint.y - 60}
          height={20}
          isEditing={props.touchPoint.isEditing}
          fontSize={10}
          value={props.touchPoint.receiverText}
          width={60}
          ChangeFunction={((val: any, x: any) => {
            props.setCurrentObject(-1)
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, receiverText: val };
              }
              return circle;
            })
            props.updateCircles(circles);
          })}
          changeEditable={(x: any) => {
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, isEditing: true };
              }
              return circle;
            })
            props.updateCircles(circles);
          }

          }
          ChangeBack={(x: any) => {
            const circles = props.touchPoints.map(circle => {
              if (circle.id == x.id) {
                return { ...circle, isEditing: false };
              }
              return circle;
            })
            props.updateCircles(circles);
          }}
          modifyObject={props.touchPoint}
        ></TextMessages>}
        {/* {Rewrite to proper component} */}
        <Rect x={props.touchPoint.x - 25}
          y={props.touchPoint.y - 25}
          height={50}
          width={50}
          stroke={'black'}
          strokeWidth={1}
          opacity={props.touchPoint.Capacity ? 1 : 0}
        >
        </Rect>
        {props.SwimlaneMode && !props.deviationMode && <><Arrow
          points={[props.touchPoint.x, props.touchPoint.y, props.touchPoint.x + 40, props.touchPoint.y]}
          stroke={'black'}
          radius={2}
          strokeWidth={1}

          fill={'Black'}
          opacity={props.touchPoint.Capacity ? 1 : 0}
          onClick={(e) => {
            helpingArrow(props.touchPoint, e);
          }}
        ></Arrow><Arrow
          points={[props.touchPoint.x, props.touchPoint.y, props.touchPoint.x, props.touchPoint.y + 40]}
          stroke={'black'}
          radius={2}
          strokeWidth={1}
          fill={'Black'}
          opacity={props.touchPoint.Capacity ? 1 : 0}
          onClick={(e) => {
            helpingArrow(props.touchPoint, e);
          }}
        ></Arrow><Arrow
          points={[props.touchPoint.x, props.touchPoint.y, props.touchPoint.x - 40, props.touchPoint.y]}
          stroke={'black'}
          radius={2}
          strokeWidth={1}
          fill={'Black'}
          opacity={props.touchPoint.Capacity ? 1 : 0}
          onClick={(e) => {
            helpingArrow(props.touchPoint, e);
          }}
        ></Arrow><Arrow
          points={[props.touchPoint.x, props.touchPoint.y, props.touchPoint.x, props.touchPoint.y - 40]}
          stroke={'black'}
          radius={2}
          strokeWidth={1}
          fill={'Black'}
          opacity={props.touchPoint.Capacity ? 1 : 0}
          onClick={(e) => {
            helpingArrow(props.touchPoint, e);
          }}
        ></Arrow></>}


        <Circle x={props.touchPoint.x}
          y={props.touchPoint.y}
          id={props.touchPoint.id.toString()}
          draggable
          stroke={props.touchPoint.initiator.color}
          radius={20}
          fill={props.touchPoint.external == 0 ? "White" : "LightGray"}
          strokeWidth={3}
          dash={TouchPointStatus[props.touchPoint.Status] == "Missing" ? [5] : [0]}
          
        />
        {props.getImage(props.touchPoint, 1)}
        <Line points={[props.touchPoint.x - 15, props.touchPoint.y - 15, props.touchPoint.x + 15, props.touchPoint.y + 15]} stroke={'black'}
          strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>
        <Line points={[props.touchPoint.x - 15, props.touchPoint.y + 15, props.touchPoint.x + 15, props.touchPoint.y - 15]} stroke={'black'}
          strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>
          <Circle x={props.touchPoint.x}
          y={props.touchPoint.y}
          id={props.touchPoint.id.toString()}
          draggable
      
          radius={20}
          opacity={0}
          onClick={(e) => {
            props.resetTouchpoints();
            props.checkClickFunction(props.touchPoint, e);
          }}
          onDragStart={() => props.touchPoint.Capacity = false}
          onDragMove={(e) => {
            var max = 0;
            props.actors.map(x=>{
             if(max<x.y +x.height && x.isEndUser){
               max = x.y +x.height ;
             }
           })
            const circles = props.touchPoints.map(circle => {
              if (circle.id == props.touchPoint.id) {
                return { ...circle, x: e.target.getPosition().x, y: e.target.getPosition().y, devation: e.target.getPosition().y>max?true:false };
              }
              return circle;
            })
            
            props.updateCircles(circles);
            props.changeArrow(e, props.touchPoint.id, circles.filter(y => y.id == props.touchPoint.id)[0]);
            props.elementCheckCloseToBorder(e.target.getPosition().x);
            props.makeBiggerActors(e.target.attrs.x);
          }}
          onDragEnd={
            (e) => {
              onDragEnd(e, props.touchPoint, props.actors.filter((x:Actors)=>{
                return x.isEndUser
              }), props.touchPoints, props.SwimlineMode, props.updateCircles, props.changeArrow, props.elementsAreFarFromBorder, props.actions, props.setActions, props.index, props.isPlanned)
              props.makeBiggerActors(e.target.attrs.x);
          }}
        />
      </Group>
    </div>
  )
}

export default TouchPointSwimlane;
