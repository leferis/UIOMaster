import React, { FC, useState } from 'react';
import { Group, Shape } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';

interface TouchpointPhasePhaseDrawingProps {
   phase: any
   updateCircles: any;
   touchPoints: any;
   actions: any;
   updateActions: any;
}

function TouchpointPhasePhaseDrawing(props: TouchpointPhasePhaseDrawingProps) {

   const [isEditing, setEditing] = useState(false)
   return (<Group>
      <Shape
         sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(props.phase.start, 140);
            context.lineTo(props.phase.start + 20, 155);
            context.lineTo(props.phase.start, 170);
            context.lineTo(props.phase.end - 20, 170);
            context.lineTo(props.phase.end, 155);
            context.lineTo(props.phase.end - 20, 140);
            context.closePath();
            context.fillStrokeShape(shape);
         }}
         fill="#CCC1DA"
         stroke="black"
         strokeWidth={1}
      />
      <TextMessages x={props.phase.start + (props.phase.end - props.phase.start) / 2 - 35} y={144}
         value={props.phase.phaseName}
         fontSize={16}
         default={""}
         width={props.phase.end - (props.phase.start + (props.phase.end - props.phase.start) / 2 - 35)}
         isEditing={isEditing}
         height={3}
         ChangeFunction={(val: any, x: any) => {
            const circles = props.touchPoints.map((circle: any) => {
               if (circle.swimlaneX  >= props.phase.start && circle.swimlaneX  < props.phase.end) {
                  return { ...circle, phase: val };
               }
               return circle;
            })
            props.updateCircles(circles);
            const actions = props.actions.map((action: any) => {
               if (action.swimlaneX  >= props.phase.start && action.swimlaneX  < props.phase.end) {
                  return { ...action, phase: val };
               }
               return action;
            })

            props.updateActions(actions);
         }}
         modifyObject={props.phase.phaseName}
         changeEditable={(val: any, x: any) => {
            const circles = props.touchPoints.map((circle: any) => {
               if (circle.swimlaneX  >= props.phase.start && circle.swimlaneX  < props.phase.end) {
                  console.log(circle)
                  return { ...circle, phase: val };
               }
               return circle;
            })
            props.updateCircles(circles);
            const actions = props.actions.map((action: any) => {
               if (action.swimlaneX  >= props.phase.start && action.swimlaneX  < props.phase.end) {
                  return { ...action, phase: val };
               }
               return action;
            })

            props.updateActions(actions);
            setEditing(true);
         }}
         ChangeBack={(val: any, x: any) => {
            const circles = props.touchPoints.map((circle: any) => {
               if (circle.swimlaneX >= props.phase.start && circle.swimlaneX  < props.phase.end) {
                  return { ...circle, phase: val };
               }
               return circle;
            })
            props.updateCircles(circles);
            const actions = props.actions.map((action: any) => {
               if (action.swimlaneX  >= props.phase.start && action.swimlaneX  < props.phase.end) {
                  return { ...action, phase: val };
               }
               return action;
            })

            props.updateActions(actions);
            setEditing(false);
         }} />

   </Group>)
}

export default TouchpointPhasePhaseDrawing;
