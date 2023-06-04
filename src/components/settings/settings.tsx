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
  ChangeOpenStatus: any;
  openActor: any;
  ChangeOpenActorStatus: any;
  openSymbol: any;
  ChangeOpenSymbolStatus: any;
  openColor: any;
  ChangeOpenColorStatus: any;
  openExternal: any;
  ChangeOpenExternalStatus: any;
  GetImageFullName: any;
  getImageObject: any;
  Layer:any;
  setSwimlineMode:any;
  SwimlineMode:any;
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
          props.ChangeOpenStatus(!props.open);
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
          props.ChangeOpenColorStatus(false);
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
    <div>
      <Group>
        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={70}
          stroke={'black'}
          fill={"#e8eaed"}
          strokeWidth={1}>
        </Rect>
        <Group>
          <Text x={360} y={10} text={"Status"} />
          <Rect onClick={() => { props.ChangeOpenStatus(!props.open); }} strokeWidth={3}
            cornerRadius={10}
            stroke={'black'}
            x={330}
            y={25}
            fill={TouchPointStatus[props.currentObject.Status] ? 'white' : ''}
            width={130}
            height={props.open ? 90 : 30} ></Rect>
          {getCurrentStatus(props.currentObject)}
          <Line points={props.open ? [430, 43, 440, 38, 450, 43] : [430, 38, 440, 43, 450, 38]}
            stroke={"black"}
            strokeWidth={1} ></Line>
          {props.open ? Options : ""}
        </Group>
      </Group>
      <Group>
        <Group>
          <Text x={530} y={10} text={"Actor"} />
          <Rect onClick={() => { props.ChangeOpenActorStatus(!props.openActor); }} strokeWidth={3}
            cornerRadius={10}
            stroke={'black'}
            x={500}
            y={25}
            width={130}
            height={props.openActor ? 120 : 30} ></Rect>
          {props.openActor && <ActorSelect actors={props.Actors} touchPoints={props.circles} currentObject={props.currentObject} changeTouchPoints={props.setCircles} />}
          <Line points={props.openActor ? [600, 43, 610, 38, 620, 43] : [600, 38, 610, 43, 620, 38]}
            stroke={"black"}
            strokeWidth={1} ></Line>
        </Group>

        <Group>
          <Image image={change}
          x={width-70}
          y={10}
          onClick={() => { props.setSwimlineMode(!props.SwimlineMode) }}
          width={50}
          height={50}
          ></Image>
          <Text x={width-80}  y={55} text={"Diagram type"}></Text>
        </Group>
      </Group>

    </div>
  );
}
export default Settings;
