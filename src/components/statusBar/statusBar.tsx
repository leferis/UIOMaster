import React, { FC } from 'react';
import styles from './statusBar.module.css';
import { Group, Rect, Text } from 'react-konva';

interface StatusBarProps {
  layer: any;
  type: any;
  journey: any;
  currenJourneyId: any;
}

function StatusBar(props: StatusBarProps) {

  function getStatusString() {
    if (props.type) {
      return "Type: Network Diagram"
    }
    return "Type: Journey diagram"
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
      <Rect x={270} y={getCanvasHeight() - 30} height={100} width={330} fill='black' opacity={0.04}></Rect>
      <Text text={getStatusString()} x={285} y={getCanvasHeight() - 20} fontSize={16}></Text>
      <Text text={getJourneyType()} x={465} y={getCanvasHeight() - 20} fontSize={16}></Text>
    </Group>
  )
}

export default StatusBar;
