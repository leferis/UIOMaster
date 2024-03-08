import React, { FC } from 'react';
import { Group, Label, Tag, Text, Shape } from 'react-konva';
import TextMessages from '../TextMessages/TextMessages';
import TouchpointPhasePhaseDrawing from './PhaseDrawing/TouchpointPhase/PhaseDrawing';


interface TouchpointPhaseProps {
   touchpoints: any[],
   actions: any[],
   updateActions:any,
   updateCircles:any,
   showPhase:any;
}


function TouchpointPhase(props: TouchpointPhaseProps) {
   let mergedPoints = props.touchpoints.concat(...props.actions);
   mergedPoints.sort((x: any, y: any) => {
      return x.x - y.x
   });
   let phaseObjects = [], currentPhase = "", currentPhaseStart = 0;
   mergedPoints.forEach((element: any) => {
      if (currentPhase == "") {
         currentPhase = element.phase
         currentPhaseStart = element.swimlaneX
      }
      else if (currentPhase != element.phase) {
         phaseObjects.push({ phaseName: currentPhase, start: currentPhaseStart , end: element.swimlaneX})
         currentPhase = element.phase
         currentPhaseStart = element.swimlaneX
      }
  

   });
   if ((currentPhase != "" || currentPhase != undefined ) && mergedPoints.length > 0) {
      phaseObjects.push({ phaseName: mergedPoints[mergedPoints.length - 1].phase, start: currentPhaseStart, end: mergedPoints[mergedPoints.length - 1].swimlaneX +200})
   }
   if(phaseObjects.length == 0){
      return (<></>);
   }
   else if((phaseObjects.length == 1 && (phaseObjects[0].phaseName == ""  || phaseObjects[0].phaseName == null || phaseObjects[0].phaseName == undefined ))|| !props.showPhase){
      return (<></>);
   }
   return (<Group>
      
     {phaseObjects.map((x: any) => {
      return( 
       <TouchpointPhasePhaseDrawing actions={props.actions} phase={x} touchPoints={props.touchpoints} updateActions={props.updateActions} updateCircles={props.updateCircles} />
      )
     })}

   </Group>)

}

export default TouchpointPhase;
