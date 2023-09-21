import React, { FC } from 'react';
import styles from './colorCoding.module.css';
import { Line, Text } from 'react-konva';
import { Actors } from '../../Classes/Actors';

interface ColorCodingProps {actors:Actors[]}

function ColorCoding(props:ColorCodingProps){
  return ( <>
    {props.actors.map((actor,index) => {
      return ( <>
      <Text x={100} y={370} text='Initiators colors:' fontSize={16}/>
      <Line points={[100,400+(index *30),130,400+(index *30)]} stroke={actor.color} strokeWidth={5}  />
      <Text  text={actor.Title} fontSize={14} x={140} y={393+(index *30)}/>
      </>)
    })}
    
  </>)
}

export default ColorCoding;
