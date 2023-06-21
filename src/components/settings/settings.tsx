import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Circle, Group, Image, Layer, Line, Rect, Text } from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';
import { Html, useImage } from "react-konva-utils";
import styles from './settings.module.css';
import { ExternalEnumerator } from '../../enumerator/ExternalEnumerator';
import ImageSelection from '../ImageSelection/ImageSelection';
import { Actors } from '../../Classes/Actors';
import ActorSelect from '../ActorSelect/ActorSelect';
import { switchBetweenDiagrams } from '../../Functions/Switching';

interface SettingsProps {
  Images: any;
  currentObject: any;
  setCircles: any;
  circles: any;
  setCurrentObjectID: any;
  changeStatus: any;
  setImage: any;
  setActors: any;
  Actors: Actors[];
  open: any;
  GetImageFullName: any;
  getImageObject: any;
  Layer:any;
  setSwimlineMode:any;
  SwimlineMode:any;
  actions:any;
  setActions:any;
  initialArrowId:any; 
  setInitialArrowID:any;
  setArrows:any;
  makeBiggerActors:any;
}



function Settings(props: SettingsProps) {

  var width = 0;
  try {
    width = props.Layer.current.canvas.width;
  }
  catch (ex) {
    width = 20;
  }
  var Options: any[] = [];
  var initialBoxX = 330;
  var initialBoxY = 55;
  let change = props.getImageObject("\\\HelpingImages\\change.png");
 

  Object.values(TouchPointStatus).forEach((x) => {
    if (typeof (x) == "string" && x != TouchPointStatus[props.currentObject.Status]) {

      Options.push(<div><Rect x={initialBoxX}
        y={initialBoxY}
        stroke={'black'}
        strokeWidth={1}
        height={30}
        width={130}
        fill={"White"}
        onClick={() => {
          if (props.currentObject != null || props.currentObject != undefined) {
            const circles = props.circles.map((circle: CJMLCircle) => {
              if (circle.id == props.currentObject.id) {
                return { ...circle, Status: Object.values(TouchPointStatus).indexOf(x) };
              }
              return circle;
            })
            var edited = props.currentObject;
            edited.Status = Object.values(TouchPointStatus).indexOf(x);
            props.setCurrentObjectID(edited);
            props.setCircles(circles);
          }
        }}
        cornerRadius={Options.length == 2 ? [0, 0, 10, 10] : 0}
      />
        <Line points={[345 - 11, initialBoxY + 4, 345 + 11, initialBoxY + 23]} stroke={'black'}
          strokeWidth={1} opacity={x == "Failing" ? 1 : 0}></Line>
        <Line points={[345 - 11, initialBoxY + 24, 345 + 11, initialBoxY + 3]} stroke={'black'}
          strokeWidth={1} opacity={x == "Failing" ? 1 : 0}></Line>
        <Circle
          x={345}
          y={initialBoxY + 14}
          radius={10}
          dash={x == "Missing" ? [5] : [0]}
          stroke={'black'}
          strokeWidth={1}
        ></Circle>
        <Text x={365}
          y={initialBoxY + 12} text={x.toString()} ></Text>
      </div>
      )
      initialBoxY += 30;
    }

  });


  const color = <Html groupProps={{ x: 880, y: 26 }} divProps={{
    style: {
      position: 'fixed',
      top: 300,
      left: 300,
    },
  }}> <div>
      <HexColorPicker
        color={props.currentObject.color ? props.currentObject.color : "#fff"}
        onChange={(e) => {
          const update = props.Actors.map(act => {
            if (act.id == props.currentObject.id) {
              act.color = e;
            }
            return act;
          });
          props.setActors(update);
        }}
        onDoubleClick={(e) => {
        }}></HexColorPicker>
    </div></Html>;

  const colorSquare = <Html groupProps={{ x: 894, y: 29 }} divProps={{
    style: {
      position: 'fixed',
      top: 300,
      left: 300,
    },
  }}>
    <div
      className="swatch"
      style={{
        background: props.currentObject.color ? props.currentObject.color : "#fff",
        width: "18px",
        height: "18px",
        borderRadius: "8px",
        border: "3px solid #fff",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
        cursor: "pointer"
      }}
    />
  </Html>

  function getCurrentStatus(x: any) {
    if (x != -1) {
      return (<div>
        <Group>
          <Line points={[345 - 11, 27 + 4, 345 + 11, 27 + 23]} stroke={'black'}
            strokeWidth={1} opacity={TouchPointStatus[x.Status] == "Failing" ? 1 : 0}></Line>
          <Line points={[345 - 11, 27 + 23, 345 + 11, 27 + 4]} stroke={'black'}
            strokeWidth={1} opacity={TouchPointStatus[x.Status] == "Failing" ? 1 : 0}></Line>
          <Circle
            x={345}
            y={40}
            radius={10}
            stroke={'black'}
            dash={TouchPointStatus[x.Status] == "Missing" ? [2] : [0]}
            strokeWidth={1}
          ></Circle>
          <Text x={365}
            y={35} text={TouchPointStatus[x.Status]} ></Text></Group>
      </div>);
    } else {
      return (<div></div>);
    }
  }


  return (

        <Group>
          <Image image={change}
          x={width-70}
          y={10}
          onClick={() => { props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)  }}
          width={50}
          height={50}
          ></Image>
          <Text x={width-80}  y={55} text={"Diagram type"}></Text>
        </Group>

  );
}
export default Settings;
