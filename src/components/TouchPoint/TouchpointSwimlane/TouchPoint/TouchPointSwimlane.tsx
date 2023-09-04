import React, { FC } from 'react';
import styles from './TouchPoint/TouchPointSwimlane.module.css';
import { Arrow, Circle, Group, Line, Rect } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';
import { CJMLCircle } from '../../../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../../../enumerator/TouchPointStatus';
import { Actors } from '../../../../Classes/Actors';
import { onDragEnd } from '../../../../Functions/Movement';
import ElementChangeBar from '../../../elementChangeBar/elementChangeBar';
import RibbonChangeBarImageChange from '../../../ribbon/ChangeBar/ImageChange/ribbon/ChangeBar/ImageChange';
import _ from 'lodash';
import RibbonChangeBarActorChange from '../../../ribbon/ChangeBar/ActorChange/ribbon/ChangeBar/ActorChange';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Html } from 'react-konva-utils';
import RibbonChangeBarTypeChange from '../../../ribbon/ChangeBar/TypeChange/ribbon/ChangeBar/TypeChange';

interface TouchPointSwimlaneProps {
  touchPoint: CJMLCircle
  touchPoints: CJMLCircle[];
  updateCircles: any;
  SwimlaneMode: any;
  deviationMode: any;
  resetTouchpoints: any;
  checkClickFunction: any;
  actors: Actors[];
  setClickFunction: any;
  getImage: any;
  elementsAreFarFromBorder: any;
  changeArrow: any;
  elementCheckCloseToBorder: any;
  SwimlineMode: any;
  actions: any;
  setActions: any;
  index: any;
  isPlanned: any;
  makeBiggerActors: any;
  setCurrentObject: any
  Images: any;
  currentObject: any;
  remove: any;
  setArrows: any;
  arrowId: any;
  setArrowId: any;
}


function TouchPointSwimlane(props: TouchPointSwimlaneProps) {

  function helpingArrow(clickedObject: CJMLCircle, e: any) {
    props.setClickFunction('DrawArrow');
    props.checkClickFunction(clickedObject, e);
  }


  function changeActor(e: any, type: any) {
    let touchpointData = _.cloneDeep(props.touchPoints);
    let indexTouchpoint = touchpointData.findIndex((x: any) => {
      return x.id == props.currentObject.id
    });
    let newActor = props.actors.findIndex((x) => {
      return x.id == e
    })
    if (type == "Initiator") {
      if (props.currentObject.initiator.id != props.actors[newActor].id) {
        if (props.currentObject.receiver.isEndUser && props.currentObject.receiver.id != props.actors[newActor].id) {
          touchpointData[indexTouchpoint].initiator = props.actors[newActor]
        }
        else {
          touchpointData[indexTouchpoint].receiver = _.cloneDeep(touchpointData[indexTouchpoint].initiator);
          touchpointData[indexTouchpoint].initiator = props.actors[newActor];
          touchpointData[indexTouchpoint].initiatorColor = props.actors[newActor].color;
        }
      }
    }
    else if (type == "Receiver") {
      if (props.currentObject.receiver.id != props.actors[newActor].id) {
        if (props.currentObject.initiator.isEndUser && props.currentObject.initiator.id != props.actors[newActor].id) {
          touchpointData[indexTouchpoint].receiver = props.actors[newActor]
        }
        else {
          touchpointData[indexTouchpoint].initiator = _.cloneDeep(touchpointData[indexTouchpoint].receiver);
          touchpointData[indexTouchpoint].receiver = props.actors[newActor];
          touchpointData[indexTouchpoint].initiatorColor = touchpointData[indexTouchpoint].initiator.color;
        }
      }
    }
    props.setCurrentObject(_.cloneDeep(touchpointData[indexTouchpoint]))
    props.updateCircles(touchpointData)
  }
  const images = props.Images.Images[1].Images.filter((x: any) => {
    return x.Default;
  })
  return (
    <div>
      <Group >

        {props.touchPoint.initiator.isEndUser && <TextMessages x={props.touchPoint.devation ? props.touchPoint.x - 120 : props.touchPoint.x - 25}
          y={props.touchPoint.devation ? props.touchPoint.y - 20 : props.touchPoint.y - 60}
          height={20}
          isEditing={props.touchPoint.isEditing}
          fontSize={10}
          value={props.touchPoint.text}
          width={100}
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
        {props.touchPoint.receiver.isEndUser && <TextMessages x={props.touchPoint.devation ? props.touchPoint.x - 120 : props.touchPoint.x - 25}
          y={props.touchPoint.devation ? props.touchPoint.y - 20 : props.touchPoint.y - 60}
          height={20}
          isEditing={props.touchPoint.isEditing}
          fontSize={10}
          value={props.touchPoint.receiverText}
          width={100}
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
        <Rect name='asd' x={props.touchPoint.x - 25}
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
            props.actors.map(x => {
              if (max < x.y + x.height && x.isEndUser) {
                max = x.y + x.height;
              }
            })
            const circles = props.touchPoints.map(circle => {
              if (circle.id == props.touchPoint.id) {
                return { ...circle, x: e.target.getPosition().x, y: e.target.getPosition().y, devation: e.target.getPosition().y > max ? true : false };
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
              onDragEnd(e, props.touchPoint, props.actors.filter((x: Actors) => {
                return x.isEndUser
              }), props.touchPoints, props.SwimlineMode, props.updateCircles, props.changeArrow, props.actions, props.setActions, props.index, props.isPlanned,props.arrowId, props.setArrowId, props.setArrows)
              props.makeBiggerActors(e.target.attrs.x);
            }}
        />
        {props.touchPoint.id == props.currentObject.id && <ElementChangeBar x={props.touchPoint.x + 30} y={props.touchPoint.y - 90}>
          <RibbonChangeBarActorChange x={props.touchPoint.x + 30} y={props.touchPoint.y - 88} text={"Receiver"} currentId={props.currentObject.receiver.id} changeActor={(e: any) => { changeActor(e, "Receiver") }} actors={props.actors}></RibbonChangeBarActorChange>
          <RibbonChangeBarActorChange x={props.touchPoint.x + 170} y={props.touchPoint.y - 88} text={"Initiator"} currentId={props.currentObject.initiator.id} changeActor={(e: any) => { changeActor(e, "Initiator") }} actors={props.actors}></RibbonChangeBarActorChange>
          <RibbonChangeBarImageChange x={props.touchPoint.x + 310} y={props.touchPoint.y - 88} images={{ Name: "Touchpoint", Images: images }} text={"Channel"} currentObject={props.currentObject} changeImage={(e: any) => {
            let copyOfCircles = _.cloneDeep(props.touchPoints);
            let copyOfCurrentObject;
            copyOfCircles = copyOfCircles.map(x => {
              if (x.id == props.touchPoint.id) {
                x.imageName = e;
                copyOfCurrentObject = x;
              }
              return x;
            })
            props.updateCircles(copyOfCircles);
            props.setCurrentObject(copyOfCurrentObject);
          }}  ></RibbonChangeBarImageChange>
           {!props.isPlanned && <RibbonChangeBarTypeChange  x={ props.touchPoint.x + 460} y={ props.touchPoint.y -88} TouchPoints={props.touchPoints} currenctObj={props.currentObject}  updateCurentObj={props.setCurrentObject} updateTouhcPoints={props.updateCircles}></RibbonChangeBarTypeChange>}  
          <Html groupProps={{ x: (props.isPlanned ?props.touchPoint.x + 470: props.touchPoint.x + 620), y: props.touchPoint.y - 75 }}>
            <Button color="error" variant="outlined" onClick={() => (props.remove())} startIcon={<DeleteIcon />} />
          </Html>
        </ElementChangeBar>}
      </Group>
    </div>
  )


}


export default TouchPointSwimlane;
