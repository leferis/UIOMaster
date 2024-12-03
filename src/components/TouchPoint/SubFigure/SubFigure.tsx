import React, { FC } from 'react';
import { Arrow, Circle, Group, Line, Rect, Text, Image } from 'react-konva';

interface SubFigureProps {
   Icons: any;
   InitialXPosition: any;
   InitialYPosition: any;
   getImageObject: any;
   height: number;
   width: number;
}


function SubFigure(props: SubFigureProps) {
   var shift = 0;
   return (
      <div>
         {props.Icons.map((element: any) => {

            let img = props.getImageObject(element)
          
            let result = <Image x={props.InitialXPosition + props.width - shift} y={props.InitialYPosition + props.height } image={img} height={20} width={20} />;
            shift += 25;
            return (result)
       
         })}

      </div>
   );
}


export default SubFigure;
