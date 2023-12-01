import React, { FC } from 'react';
import { Arrow, Circle, Group, Line, Rect } from 'react-konva';
import styles from './TouchPoint/TouchPointNetwork.module.css';
import { CJMLCircle } from '../../../../Classes/CJMLCircle';
import { Actors } from '../../../../Classes/Actors';
import { TouchPointStatus } from '../../../../enumerator/TouchPointStatus';
import TextMessages from '../../../TextMessages/TextMessages';
import { CJMLArrow } from '../../../../Classes/CJMLArrow';
import { CJMLAction } from '../../../../Classes/CJMLAction';
import { collisionSwim, moveElement, onDragEnd, onDragMove, remakeArrows } from '../../../../Functions/Movement';
import ElementChangeBar from '../../../elementChangeBar/elementChangeBar';
import RibbonChangeBarImageChange from '../../../ribbon/ChangeBar/ImageChange/ribbon/ChangeBar/ImageChange';
import _ from 'lodash';
import { Html } from 'react-konva-utils';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RibbonChangeBarTypeChange from '../../../ribbon/ChangeBar/TypeChange/ribbon/ChangeBar/TypeChange';

interface TouchPointNetworkProps {
  touchPoint: CJMLCircle;
  resetTouchpoints: any;
  checkClickFunction: any;
  Circle: CJMLCircle[];
  updateCircles: any;
  changeArrow: any;
  elementsAreFarFromBorder: any;
  index: any;
  elementCheckCloseToBorder: any;
  SwimlineMode: any;
  getImageReceiver: any;
  setArrows: any;
  arrowId: any;
  actions: CJMLAction[];
  setArrowId: any;
  actors: Actors[];
  setActions: any;
  getImage: any;
  isPlanned: boolean
  makeBiggerActors: any;
  setCurrentObject: any;
  Images: any;
  currentObject: any;
  remove: any;
  findFurthestPoint: any;
  ChangeDevation: any;
}

function TouchPointNetwork(props: TouchPointNetworkProps) {
  const images = props.Images.Images[1].Images.filter((x: any) => {
    return x.Default;
  })
  return (
    <div>

      <Rect x={props.touchPoint.swimlaneX}
        y={props.touchPoint.swimlaneY}

        height={80}
        width={180}
        stroke={props.touchPoint.id == props.currentObject.id ? '#F49D6E' : '#2B8299'}
        shadowEnabled={props.touchPoint.devation}
        shadowBlur={5}
        shadowOffsetX={3}
        shadowOffsetY={3}
        shadowOpacity={20}

        fill={"#DBEEF4"}
        cornerRadius={10}
        strokeWidth={4}
        opacity={1}
        dash={TouchPointStatus[props.touchPoint.Status] == "Missing" ? [5] : [0]}
      >
      </Rect>

      <TextMessages x={props.touchPoint.swimlaneX + 55}
        y={props.touchPoint.swimlaneY + 10}
        height={30}
        fontSize={14}
        value={props.touchPoint.text}
        width={110}
        default={"Enter text"}
        isEditing={props.touchPoint.isEditingReceiver}
        ChangeFunction={((val: any, x: any) => {
          props.setCurrentObject(-1)
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, text: val };
            }
            return circle;
          })
          props.updateCircles(circles);
        })}
        changeEditable={(x: any) => {
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, isEditingReceiver: true };
            }
            return circle;
          })
          props.updateCircles(circles);
        }}
        ChangeBack={(x: any) => {
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, isEditingReceiver: false };
            }
            return circle;
          })
          props.updateCircles(circles);
        }}
        modifyObject={props.touchPoint}
      ></TextMessages>

      {props.getImage(props.touchPoint, props.index)}
      <Line points={[props.touchPoint.swimlaneX, props.touchPoint.swimlaneY, props.touchPoint.swimlaneX + 180, props.touchPoint.swimlaneY + 80]} stroke={'black'}
        strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>
      <Line points={[props.touchPoint.swimlaneX, props.touchPoint.swimlaneY + 80, props.touchPoint.swimlaneX + 180, props.touchPoint.swimlaneY]} stroke={'black'}
        strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>

      {!props.touchPoint.isEditing && <Rect x={props.touchPoint.swimlaneX}
        y={props.touchPoint.swimlaneY}
        draggable
        height={80}
        width={180}
        onClick={(e) => {
          props.resetTouchpoints();
          props.checkClickFunction(props.touchPoint, e);
        }}
        onDblClick={() => {
          let results = props.Circle.map((x: CJMLCircle) => {
            if (x.id == props.touchPoint.id) {
              x.isEditingReceiver = true;
              x.Capacity = true
            }
            return x;
          });
          props.updateCircles(results);
        }}
        onDragStart={() => props.touchPoint.Capacity = false}
        onDragMove={(e) => {
          onDragMove(e, props.Circle, props.touchPoint, props.updateCircles, props.changeArrow, props.index, props.elementCheckCloseToBorder, props.actions, props.setActions, props.actors, props.SwimlineMode,
            props.isPlanned, props.arrowId, props.setArrowId, props.setArrows, props.makeBiggerActors)
            props.findFurthestPoint();
        }}
        onDragEnd={

          (e) => {
            onDragEnd(e, props.touchPoint, props.actors, props.Circle, props.SwimlineMode, props.updateCircles, props.changeArrow, props.actions, props.setActions, props.index, props.isPlanned, props.arrowId, props.setArrowId, props.setArrows)
            props.findFurthestPoint();
          }

        }
        opacity={0}

      />}
      <Arrow points={[props.touchPoint.swimlaneX + 90, props.touchPoint.swimlaneY > props.touchPoint.swimlaneReceiverY ? props.touchPoint.swimlaneY : props.touchPoint.swimlaneY + 80, props.touchPoint.swimlaneX + 90, props.touchPoint.swimlaneY > props.touchPoint.swimlaneReceiverY ? props.touchPoint.swimlaneReceiverY + 83 : props.touchPoint.swimlaneReceiverY - 3]}
        fill={"black"}
        stroke={"black"}
        strokeWidth={3}
        dash={[5]}
      ></Arrow>

      <Rect x={props.touchPoint.swimlaneX}
        y={props.touchPoint.swimlaneReceiverY}

        height={80}
        width={180}
        fill='white'
        shadowEnabled={props.touchPoint.devation}
        shadowBlur={5}
        shadowOffsetX={3}
        shadowOffsetY={3}
        shadowOpacity={20}
        onClick={(e) => {
          props.resetTouchpoints();
          props.checkClickFunction(props.touchPoint, e);
        }}
        stroke={props.touchPoint.id == props.currentObject.id ? '#F49D6E' : '#2B8299'}

        cornerRadius={10}
        strokeWidth={4}
        opacity={1}
        dash={TouchPointStatus[props.touchPoint.Status] == "Missing" ? [5] : [0]}
      >
      </Rect>

      <TextMessages x={props.touchPoint.swimlaneX + 55}
        y={props.touchPoint.swimlaneReceiverY + 10}
        height={30}
        fontSize={14}
        value={props.touchPoint.receiverText}
        width={110}
        isEditing={props.touchPoint.isEditing}
        ChangeFunction={((val: any, x: any) => {
          props.setCurrentObject(-1)
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, receiverText: val };
            }
            return circle;
          })
          props.updateCircles(circles);
        })}
        changeEditable={(x: any) => {
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, isEditing: true };
            }
            return circle;
          })
          props.updateCircles(circles);
        }}
        ChangeBack={(x: any) => {
          const circles = props.Circle.map(circle => {
            if (circle.id == x.id) {
              return { ...circle, isEditing: false };
            }
            return circle;
          })
          props.updateCircles(circles);
        }}
        modifyObject={props.touchPoint}
        default={"Enter text"}
      ></TextMessages>
      {props.getImageReceiver(props.touchPoint, props.index)}
      <Line points={[props.touchPoint.swimlaneX, props.touchPoint.swimlaneReceiverY, props.touchPoint.swimlaneX + 180, props.touchPoint.swimlaneReceiverY + 80]} stroke={'black'}
        strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>
      <Line points={[props.touchPoint.swimlaneX, props.touchPoint.swimlaneReceiverY + 80, props.touchPoint.swimlaneX + 180, props.touchPoint.swimlaneReceiverY]} stroke={'black'}
        strokeWidth={2} opacity={TouchPointStatus[props.touchPoint.Status] == "Failing" ? 1 : 0}></Line>

      {!props.touchPoint.isEditing && <Rect x={props.touchPoint.swimlaneX}
        y={props.touchPoint.swimlaneReceiverY}
        draggable
        height={80}
        width={180}
        onClick={(e) => {
          props.resetTouchpoints();
          props.checkClickFunction(props.touchPoint, e);
        }}
        onDblClick={() => {
          let results = props.Circle.map((x: CJMLCircle) => {
            if (x.id == props.touchPoint.id) {
              x.isEditing = true;
              x.Capacity = true
            }
            return x;
          });
          props.updateCircles(results);
        }}
        onDragStart={() => props.touchPoint.Capacity = false}
        onDragMove={(e) => {
          const circles = props.Circle.map(circle => {
            if (circle.id == props.touchPoint.id) {
              return { ...circle, swimlaneX: e.target.getPosition().x, swimlaneReceiverY: e.target.getPosition().y };
            }
            return circle;
          })
          var actorIn: Actors | undefined = collisionSwim(e.target.attrs.y, props.touchPoint, props.actors); // fix colision
          if (actorIn != undefined) {
            const circles = props.Circle.map(circle => {
              if (circle.id == props.touchPoint.id) {
                return { ...circle, receiver: actorIn, swimlaneReceiverY: actorIn != undefined ? actorIn.y - actorIn.height / 2 : 200 };
              }
              return circle;
            })
            props.updateCircles(circles);

            props.changeArrow(e, props.touchPoint.id, circles.filter(y => y.id == props.touchPoint.id)[0]);
          }
          moveElement(props.Circle, props.index, e.target.attrs.x, props.actions, props.updateCircles, props.setActions, props.arrowId, props.setArrowId, props.setArrows);
          props.updateCircles(circles);

          props.elementCheckCloseToBorder(e.target.getPosition().x);
          props.findFurthestPoint()
        }}
        onDragEnd={

          (e) => {
            var actorIn: Actors | undefined = collisionSwim(e.target.attrs.y, props.touchPoint, props.actors); // fix colision


            if (actorIn != undefined) {

              const circles = props.Circle.map(circle => {
                let tempActor, tempy;
                let swap = true;
                if((circle.swimlaneY > circle.swimlaneReceiverY -100 && circle.swimlaneY < circle.swimlaneReceiverY+ 100) ||  circle.swimlaneY == circle.swimlaneReceiverY ){
                  swap = false;
                }
                if (circle.id == props.touchPoint.id) {
                  if (!props.SwimlineMode && circle.initiator == actorIn) {
                    console.log(circle)
                    tempActor = JSON.parse(JSON.stringify(circle.receiver));
                    tempy = circle.receiver.y + 20;
                    return { ...circle, receiver: actorIn, swimlaneReceiverY: actorIn != undefined ? actorIn.y + 20 : 200, initiator: tempActor, swimlaneY: tempActor != undefined ? tempy : 200, initiatorColor: tempActor != undefined ? tempActor.color : "#fff" };
                  }
                  if(!swap){
                    tempActor = JSON.parse(JSON.stringify(circle.receiver));
                    tempy = circle.receiver.y + 20;
                    return { ...circle, initiator: tempActor, swimlaneY: tempActor != undefined ? tempy : 200 , initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver:actorIn , swimlaneReceiverY:actorIn != undefined ? actorIn.y + 20 : 200 };
                  }
                  else{
                    tempActor = JSON.parse(JSON.stringify(circle.initiator));
                    tempy = tempActor.y + 20;
                  return { ...circle, initiator: tempActor, swimlaneY:tempActor != undefined ? tempy : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver: actorIn, swimlaneReceiverY:  actorIn != undefined ? actorIn.y + 20 : 200};
                  }
                }
               return circle
              })

              props.updateCircles(circles);
              props.changeArrow(e, props.touchPoint.id, circles.filter(y => y.id == props.touchPoint.id)[0]);
              props.findFurthestPoint();
              moveElement(circles, props.index, e.target.attrs.x, props.actions, props.updateCircles, props.setActions, props.arrowId, props.setArrowId, props.setArrows);
            } else {
              moveElement(props.Circle, props.index, e.target.attrs.x, props.actions, props.updateCircles, props.setActions, props.arrowId, props.setArrowId, props.setArrows);
            }

            props.findFurthestPoint();
          }

        }
        opacity={0}

      />}
      {props.touchPoint.id == props.currentObject.id && <ElementChangeBar x={props.touchPoint.swimlaneX + 30} y={(props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) - 90}>
        <RibbonChangeBarImageChange x={props.touchPoint.swimlaneX + 30} y={(props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) - 88} images={{ Name: "Touchpoint", Images: images }} text={"Initator's channel"} currentObject={props.currentObject} changeImage={(e: any) => {
          let copyOfCircles = _.cloneDeep(props.Circle);
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

        }} ></RibbonChangeBarImageChange>
        <RibbonChangeBarImageChange x={props.touchPoint.swimlaneX + 170} y={(props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) -88} alternative={true} images={{ Name: "Touchpoint", Images: images }} text={"Receiver's channel"} currentObject={props.currentObject} changeImage={(e: any) => {
          let copyOfCircles = _.cloneDeep(props.Circle);
          let copyOfCurrentObject;
          copyOfCircles = copyOfCircles.map(x => {
            if (x.id == props.touchPoint.id) {
              x.imageNameReceiver = e;
              copyOfCurrentObject = x;
            }
            return x;
          })
          props.updateCircles(copyOfCircles);
          props.setCurrentObject(copyOfCurrentObject);
        }} ></RibbonChangeBarImageChange>
        {!props.isPlanned && <RibbonChangeBarTypeChange x={props.touchPoint.swimlaneX + 420} y={(props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) - 88} TouchPoints={props.Circle} currenctObj={props.currentObject} updateCurentObj={props.setCurrentObject} updateTouhcPoints={props.updateCircles}></RibbonChangeBarTypeChange>}
        {!props.isPlanned && <Html groupProps={{ x: (props.touchPoint.swimlaneX + 320), y:(props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) - 80 }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={() => (props.ChangeDevation(props.touchPoint))} defaultChecked={props.touchPoint.devation} />} label="Deviation" />
          </FormGroup>
        </Html>
        }
        <Html groupProps={{ x: (props.isPlanned ? props.touchPoint.swimlaneX + 330 : props.touchPoint.swimlaneX + 580), y: (props.touchPoint.swimlaneY < props.touchPoint.swimlaneReceiverY?props.touchPoint.swimlaneY: props.touchPoint.swimlaneReceiverY) - 75 }}>
          <Button color="error" variant="outlined" onClick={() => (props.remove())} startIcon={<DeleteIcon />} />

        </Html>
        {/* <RibbonChangeBarTypeChange  x={x.x + 310} y={x.y-88} images={props.Images.Images[0]} text={"Type"} currentObject={props.currentObject} changeImage={()=>{console.log("Test")}} ></RibbonChangeBarTypeChange> */}
      </ElementChangeBar>}
    </div>
  )

}

export default TouchPointNetwork;
