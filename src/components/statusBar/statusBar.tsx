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
      return "Diagram Type: Journey Diagram"
    }
    return "Diagram Type: Network diagram"
  }

  function getJourneyType() {
    if (props.journey[props.currenJourneyId] != undefined && props.journey[props.currenJourneyId].isPlanned) {
      return "Journey Type: Planned"
    }
    return "Journey Type: Actual"
  }

  return (
    <div style={{display:"inline-block",textAlign:"left", fontSize:"14pt", fontWeight:"500", paddingTop:"10px", paddingLeft:"10px" , float:"left", userSelect:"none"}}>
      {getStatusString()}
      <br></br>
      {getJourneyType()}
    </div>
  )
}

export default StatusBar;
