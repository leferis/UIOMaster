import React, { FC } from 'react';
import styles from './Journey.module.css';
import { Journey } from '../../../Classes/Journey';
import { CJMLCircle } from '../../../Classes/CJMLCircle';
import { Arrow, Circle, Group, Image, Line, Rect } from 'react-konva';
import { TouchPointStatus } from '../../../enumerator/TouchPointStatus';

interface JourneyVisualizationProps {
  Toucpoint: CJMLCircle[];
  journeyIndex: number;
  getImageObject: any;
  XINITIALPOSITION: any;
  IncludeActor: boolean;
  ActorImage: any;
  setJourney:any;
  journeyID:any;
  CloseHomeWindow:any;
}

function JourneyVisualization(props: JourneyVisualizationProps) {
  var XPOSITION = props.XINITIALPOSITION;
  var XPOSITIONINITIAL = props.XINITIALPOSITION;
  var YINITIALPOSITION = 200;
  var XMOVEMENTGAP = 100;
  var RADIUS = 20;
  var RECTHEIGHT = 100;

  function getImage(imageName: any, xPosition: number, yPosition: number) {
    let img = props.getImageObject(imageName);
    return (<Image x={xPosition - (img.width/3 +1)} y={yPosition -(img.height /2 -2)} scale={{x:0.75, y:0.75}} image={img} />);
  }

  function getActorsImage() {
    let result = getImage(props.ActorImage, XPOSITION, YINITIALPOSITION * props.journeyIndex+100)
    XPOSITION += XMOVEMENTGAP;
    return result;
  }
  return (
    <Group onClick={() =>{
      props.setJourney(props.journeyID);
      props.CloseHomeWindow(false);
    }}>
      {props.IncludeActor &&
        getActorsImage()
    }
      <Circle x={XPOSITION} y={YINITIALPOSITION * props.journeyIndex+100} stroke={"black"} radius={6}></Circle>
      <Line points={[XPOSITION + 6, YINITIALPOSITION * props.journeyIndex+100, XPOSITION + XMOVEMENTGAP - RADIUS, YINITIALPOSITION * props.journeyIndex+100]} stroke={"black"} strokeWidth={3}  ></Line>
      {props.Toucpoint.sort((x, y) => {
        return x.x - y.x;
      }).map(((circle: CJMLCircle, index:any) => {
        let previousPoint = XPOSITION;
        XPOSITION += XMOVEMENTGAP;
        return (<Group>
          <Circle x={XPOSITION}
            y={YINITIALPOSITION * props.journeyIndex+100}
            radius={RADIUS}
            stroke={circle.initiator.color}
            dash={TouchPointStatus[circle.Status] == "Missing" ? [5] : [0]}
            strokeWidth={3}
          />
          {TouchPointStatus[circle.Status] == "Failing" && 
          <Group>
          
          <Line points={[XPOSITION+ RADIUS* Math.cos(Math.PI /4), YINITIALPOSITION * props.journeyIndex - RADIUS* Math.sin(Math.PI /4)+100, XPOSITION + RADIUS* Math.cos((Math.PI * 5) /4), YINITIALPOSITION * props.journeyIndex - RADIUS* Math.sin(Math.PI * 5 /4)+100]} stroke={"black"} strokeWidth={2} />
          <Line points={[XPOSITION+ RADIUS* Math.cos(Math.PI * 3 /4), YINITIALPOSITION * props.journeyIndex - RADIUS* Math.sin(Math.PI *3 /4)+100, XPOSITION + RADIUS* Math.cos((Math.PI * 7) /4), YINITIALPOSITION * props.journeyIndex - RADIUS* Math.sin(Math.PI * 7 /4)+100]} stroke={"black"} strokeWidth={2} />
          </Group>
          }
          {getImage(circle.imageName, XPOSITION, YINITIALPOSITION * props.journeyIndex+100)}
          { index> 0 && <Arrow        pointerWidth={7}
          pointerLength={7} points={[previousPoint + RADIUS, YINITIALPOSITION * props.journeyIndex+100, XPOSITION - RADIUS - 3, YINITIALPOSITION * props.journeyIndex+100]} stroke={"black"} strokeWidth={3} fill='black'></Arrow>}
        </Group>)
      }))}
      <Line points={[XPOSITION + RADIUS, YINITIALPOSITION * props.journeyIndex+100, XPOSITION + XMOVEMENTGAP, YINITIALPOSITION * props.journeyIndex+100]} stroke={"black"} strokeWidth={3}  ></Line>
      <Circle x={XPOSITION + XMOVEMENTGAP} y={YINITIALPOSITION * props.journeyIndex+100} fill={"black"} stroke={"black"} radius={6}></Circle>
      <Rect x={XPOSITIONINITIAL - 30} y={YINITIALPOSITION * props.journeyIndex - RECTHEIGHT / 2+100} width={XPOSITION - XPOSITIONINITIAL + XMOVEMENTGAP * 2} height={RECTHEIGHT} stroke={"black"} strokeWidth={2} />
    </Group>
  )
}
export default JourneyVisualization;
