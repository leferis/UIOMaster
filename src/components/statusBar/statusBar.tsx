import React, { FC } from 'react';
import styles from './statusBar.module.css';
import { Group, Rect, Text } from 'react-konva';

interface StatusBarProps {
  layer: any;
  type: any;
  journey: any;
  currenJourneyId: any;
  moveStatistics:any;
}

function StatusBar(props: StatusBarProps) {

  function getStatusString() {
    if (props.type) {
      return "Diagram Type: Journey Diagram"
    }
    return "Diagram Type: Network diagram"
  }

  function getJourneyType() {
    if (props.journey[props.currenJourneyId] != undefined && props.journey[props.currenJourneyId].isPlanned) {
      return "Journey: Planned"
    }
    return "Journey: Actual"
  }

  function getCanvasHeight() {
    if (props.layer.current == undefined) {
      return 0
    }
    return props.layer.current.canvas.height
  }

  return (
    <Group>
      <Rect x={props.moveStatistics?275:92} y={0} height={40} width={250} fill='black' opacity={0.04}></Rect>
      <Text text={getStatusString()} x={props.moveStatistics?280:93} y={3} fontSize={16}></Text>
      <Text text={getJourneyType()} x={props.moveStatistics?280:93} y={23} fontSize={16}></Text>
    </Group>
  )
}

export default StatusBar;
