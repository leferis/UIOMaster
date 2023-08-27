import React, { FC, useState } from 'react';
import { Arrow, Circle, Group, Rect, Image, Line } from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { useStrictMode } from 'react-konva';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import useImage from 'use-image';
import { Connectable } from '../../Interface/Connectable';
import { Actors } from '../../Classes/Actors';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';
import { CJMLAction } from '../../Classes/CJMLAction';
import TextMessages from '../TextMessages/TextMessages';
import { Html } from 'react-konva-utils';
import styles from './TouchPoint.module.css'
import TouchPointSwimlane from './TouchpointSwimlane/TouchPoint/TouchPointSwimlane';
import TouchPointNetwork from './TouchpointNetwork/TouchPoint/TouchPointNetwork';
import ElementChangeBar from '../elementChangeBar/elementChangeBar';
import ImageSelection from '../ImageSelection/ImageSelection';
import RibbonChangeBarImageChange from '../ribbon/ChangeBar/ImageChange/ribbon/ChangeBar/ImageChange';
import RibbonChangeBarTypeChange from '../ribbon/ChangeBar/TypeChange/ribbon/ChangeBar/TypeChange';

interface TouchPointProps {
  Circle: CJMLCircle[];
  updateCircles: any;
  arrowId: any;
  setArrowId: any;
  ClickFunction: any;
  drawingArrow: any;
  setDrawingArrowMode: any;
  setCurrentObjectID: any;
  currentObject: any;
  setClickFunction: any;
  Images: any;
  setActions: any;
  actions: CJMLAction[];
  actors: any;
  setDrawingObject: any;
  DrawingObject: any;
  Arrows: CJMLArrow[];
  setArrows: any;
  changeArrow: any;
  finishArrow: any;
  addNewArrow: any;
  elementCheckCloseToBorder: any;
  elementsAreFarFromBorder: any;
  SwimlineMode: any;
  resetTouchpoints: any;
  devationMode: any;
  getImageObject: any;
  isPlanned:any;
  makeBiggerActors:any;
  remove:any;
}

function TouchPoint(props: TouchPointProps) {
  const endUser = props.actors.filter((x:Actors) => {return x.isEndUser})[0];
  return (
    <div>
      {props.Circle.map((x, index) => {
        if (props.SwimlineMode) {
          return (
          <>
          <TouchPointSwimlane remove={props.remove} SwimlaneMode={props.SwimlineMode} actors={props.actors} changeArrow={props.changeArrow} checkClickFunction={checkClickFunction} deviationMode={props.devationMode} elementCheckCloseToBorder={props.elementCheckCloseToBorder}
            elementsAreFarFromBorder={props.elementsAreFarFromBorder}
            getImage={getImage}
            resetTouchpoints={props.resetTouchpoints}
            setClickFunction={props.setClickFunction}
            touchPoint={x}
            touchPoints={props.Circle}
            updateCircles={props.updateCircles}
            SwimlineMode={props.SwimlineMode} 
            actions={props.actions} 
            setActions={props.setActions} 
            index={index}
            isPlanned={props.isPlanned}
            makeBiggerActors = {props.makeBiggerActors}
            setCurrentObject= {props.setCurrentObjectID}
            Images={props.Images}
            currentObject={props.currentObject}
          ></TouchPointSwimlane>
          </>)
        }
        else {
          return (
            <TouchPointNetwork remove={props.remove} Circle={props.Circle} SwimlineMode={props.SwimlineMode} actions={props.actions} actors={props.actors} arrowId={props.arrowId} changeArrow={props.changeArrow} checkClickFunction={checkClickFunction}
              elementCheckCloseToBorder={props.elementCheckCloseToBorder} elementsAreFarFromBorder={props.elementsAreFarFromBorder} getImage={getImage} getImageReceiver={getImageReceiver} index={index}
              resetTouchpoints={props.resetTouchpoints} setActions={props.setActions} setArrowId={props.setArrowId} setArrows={props.setArrows} touchPoint={x} updateCircles={props.updateCircles} isPlanned={props.isPlanned}
              makeBiggerActors = {props.makeBiggerActors} setCurrentObject={props.setCurrentObjectID} Images={props.Images} currentObject={props.currentObject}
              />
          )
        }
      })}

    </div>
  );



  function checkClickFunction(clickedObject: CJMLCircle, e: any) {
    switch (props.ClickFunction) {

      case 'DrawArrow': {
        if (props.drawingArrow == false) {
          props.setDrawingArrowMode(true);
          props.addNewArrow(clickedObject, e);
          props.setCurrentObjectID(clickedObject);
          props.setDrawingObject("Circle");
        }
        else {
          props.finishArrow(clickedObject);
          props.setClickFunction('');
        }
        break;
      }
      case '': {

        const circles = props.Circle.map(circle => {
          if (circle.id == clickedObject.id) {
            props.setCurrentObjectID(circle);
            return { ...circle, Capacity: true };
          }
          return circle;
        });


        props.updateCircles(circles);
      }

    }

  }

  function getImage(x: any, index: any) {
    let img = props.getImageObject(x.imageName)
    return (<Image onClick={(e) => {
      checkClickFunction(x, e);
    }} x={props.SwimlineMode ? x.x -10 : x.swimlaneX + 15} y={props.SwimlineMode ? x.y - 15 : x.swimlaneY + 20} image={img} scale={props.SwimlineMode ?   {x:0.75, y:0.75}: {x:1, y:1}} />)
  }

  function getImageReceiver(x: any, index: any) {
    let img = props.getImageObject(x.imageNameReceiver)
    return (<Image x={props.SwimlineMode ? x.x - 15 : x.swimlaneX + 15} y={props.SwimlineMode ? x.y - 15 : x.swimlaneReceiverY + 20} image={img} />)
  }
}


export default TouchPoint;


