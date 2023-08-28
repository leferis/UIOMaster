import React, { FC, useRef, useState } from 'react';
import styles from './Legend.module.css';
import { Group, Layer, Line, Rect, Text } from 'react-konva';
import LegendActorRepresentation from './ActorRepresentation/Legend/ActorRepresentation';
import _ from 'lodash';

interface LegendProps {
  actors:any;
  setActors:any;
 }

function Legend(props: LegendProps) {
  const [isOpened, SetOpened] = useState(false);
  let height = window.innerHeight - 210;
  let width = window.innerWidth - 300;
  const layerEl: any = useRef();
  console.log(layerEl.current)
  if (!isOpened) {
    return (<Layer>
      <Group onClick={() => SetOpened(true)}>
        <Rect x={width} y={height} height={40} width={300} stroke={"black"}></Rect>
        <Text x={width + 20} y={height + 10} text='Legend' fontSize={26} />
        <Line points={[width + 250, height + 25, width + 260, height + 15, width + 270, height + 25]} stroke={"black"} />
      </Group>
    </Layer>)
  }
  else {
    return (
      <>
      <Layer>
        <Group onClick={() => SetOpened(false)}>
          <Rect x={width} y={height - props.actors.length * 62} height={props.actors.length * 80 +50} width={300} stroke={"black"} fill='white'></Rect>
          <Rect x={width} y={height - props.actors.length * 62 -40} height={40} width={300} stroke={"black"}></Rect>
          <Text x={width + 20} y={height - props.actors.length * 62 - 30} text='Legend' fontSize={26} />

          <Line points={[width + 250, height - props.actors.length * 62 - 25, width + 260, height - props.actors.length * 62 - 15, width + 270,height - props.actors.length * 62 - 25]} stroke={"black"} />
        </Group>
      </Layer>
      <Layer ref={layerEl}>
      {props.actors.map((x:any, index:any)=>{
        return(<LegendActorRepresentation x={width} y={height - props.actors.length * 62} actors={x} index={index} setAcotrsName={(e:any)=>{
          let actorsCopy = _.cloneDeep(props.actors);
          actorsCopy = actorsCopy.map((y:any)=>{
            if(y.id == x.id){
              y.Title = e;
            }
            return y;
          });
          props.setActors(actorsCopy);
        }}/>)
      })}
      </Layer>
</>
   )
  }
}


export default Legend;
