import React, { FC, useState } from 'react';
import styles from './Increase.module.css';
import {  Rect, Image as KonvaImage, Label, Text, Group } from 'react-konva';

interface IncreaseProps {
  layer: any;
  procentage:number;
  setProcentage:any;
}


const Increase: FC<IncreaseProps> = ({layer, procentage, setProcentage}) => {

  return(<>
    <Group onClick={(e) => {
      if (layer.current.attrs.scaleX > 0.4) {
        setProcentage(procentage - 10);
        layer.current.setScaleX(layer.current.attrs.scaleX - 0.1);
        layer.current.setScaleY(layer.current.attrs.scaleY - 0.1);

      }
    }}>
      <Rect x={window.innerWidth - 100} y={window.innerHeight - 202} height={20} width={20} fill='#4b4a70 ' cornerRadius={100} />
      <Text x={window.innerWidth - 95} y={window.innerHeight - 208} text='-' fontSize={32} />
    </Group><Text x={window.innerWidth - 75} y={window.innerHeight - 200} text={((procentage).toFixed(0)).toString() + "%"} align='center' fontSize={18} width={50} /><Group onClick={(e) => {
      if (layer.current.attrs.scaleX < 2) {
        setProcentage(procentage + 10);
        layer.current.setScaleX(layer.current.attrs.scaleX + 0.1);
        layer.current.setScaleY(layer.current.attrs.scaleY + 0.1);
      }
    }}>
      <Rect x={window.innerWidth - 22} y={window.innerHeight - 202} height={20} width={20} cornerRadius={100} fill='#4b4a70' />
      <Text x={window.innerWidth - 20} y={window.innerHeight - 204} text='+' fontSize={30} /></Group>
  </>)
};

export default Increase;
