import React, { FC } from 'react';
import { Line } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import styles from './deviation.module.css';

interface DeviationProps {
  Actors:Actors[];
}

function Deviation(props: DeviationProps) {
   function getMaxX(){
    var max =0;
     props.Actors.map(x=>{
      if(max<x.x +x.width){
        max= x.x +x.width;
      }
    })
    return max;
   }
   function getMaxY(){
    var max = 0;
     props.Actors.map(x=>{
      if(max<x.y +x.height && x.isEndUser){
        max = x.y +x.height ;
      }
    })
    return max;
   }
  return (
    <div>
      <Line points={[-99999, getMaxY()+30 , getMaxX()+90000, getMaxY()+30]} stroke={'black'}
          strokeWidth={2} dash={[7]}></Line>
    </div>
    )
}


export default Deviation;
