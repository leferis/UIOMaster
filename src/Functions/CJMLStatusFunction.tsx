import { Circle, Line, Rect, Text } from "react-konva";
import { TouchPointStatus } from "../enumerator/TouchPointStatus";
import { CJMLCircle } from "../Classes/CJMLCircle";
import React from 'react';
import ReactDOM from 'react-dom';

export function getStatusJSX(currentObject :any,initialBoxX:any, initialBoxY:any, circles:any, setCurrentObjectID: any, setCircles:any){
    var Options: any[] = [];
    Object.values(TouchPointStatus).forEach((x) => {
        if (typeof (x) == "string" ) {
    
          Options.push(<div><Rect x={initialBoxX}
            y={initialBoxY}
            stroke={'black'}
            strokeWidth={1}
            height={30}
            width={220}
            fill={x != TouchPointStatus[currentObject.Status]?"White": "#e8eaed"}
            onClick={() => {
              if (currentObject != null ||currentObject != undefined) {
                const circless = circles.map((circle: CJMLCircle) => {
                  if (circle.id == currentObject.id) {
                    return { ...circle, Status: Object.values(TouchPointStatus).indexOf(x) };
                  }
                  return circle;
                })
                var edited = currentObject;
                edited.Status = Object.values(TouchPointStatus).indexOf(x);
                setCurrentObjectID(edited);
                setCircles(circless);
              }
            }}
            cornerRadius={Options.length == 3 ? [0, 0, 3, 3] : 0}
          />
            <Line points={[initialBoxX +5 , initialBoxY + 4, initialBoxX + 25, initialBoxY + 23]} stroke={'black'}
              strokeWidth={1} opacity={x == "Failing" ? 1 : 0}></Line>
            <Line points={[initialBoxX +5 , initialBoxY + 24, initialBoxX + 25, initialBoxY + 3]} stroke={'black'}
              strokeWidth={1} opacity={x == "Failing" ? 1 : 0}></Line>
            <Circle
              x={20}
              y={initialBoxY + 14}
              radius={10}
              dash={x == "Missing" ? [5] : [0]}
              stroke={'black'}
              strokeWidth={1}
            ></Circle>
            <Text x={35}
              y={initialBoxY + 10} text={x.toString()} ></Text>
          </div>
          )
          initialBoxY += 30;
        }
    
      });
      return Options
}