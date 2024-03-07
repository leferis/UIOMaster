import React, { FC } from 'react';
import { Group, Label, Tag, Text, Shape } from 'react-konva';


interface TouchpointPhaseProps {
   touchpoints: any[],
   actions: any[]
}


function TouchpointPhase(props: TouchpointPhaseProps) {
   console.log(props.touchpoints)
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
         console.log("test")
         phaseObjects.push({ phaseName: currentPhase, start: currentPhaseStart , end: element.swimlaneX})
         currentPhase = element.phase
         currentPhaseStart = element.swimlaneX
      }
  

   });
   if (currentPhase != "" || currentPhase != undefined) {
      phaseObjects.push({ phaseName: mergedPoints[mergedPoints.length - 1].phase, start: currentPhaseStart, end: mergedPoints[mergedPoints.length - 1].swimlaneX +200})
   }
   console.log(phaseObjects);
   return (<Group>
     {phaseObjects.map((x: any) => {
      return( 
         <Group>
      <Shape 
      sceneFunc={(context, shape)=>{
         context.beginPath();
         context.moveTo(x.start , 140);
         context.lineTo(x.start +20 , 155);
         context.lineTo(x.start , 170);
         context.lineTo(x.end-20, 170);
         context.lineTo(x.end , 155);
         context.lineTo(x.end -20, 140);
         context.closePath();
         // (!) Konva specific method, it is very important
         context.fillStrokeShape(shape);
      }}
      fill="#CCC1DA"
      stroke="black"
      strokeWidth={1}
    />
    <Text text={x.phaseName} fontSize={18}
    x={ x.start +(x.end-x.start)/2 - 35} y={146} />
</Group>
      )
     })}

   </Group>)

}

export default TouchpointPhase;
