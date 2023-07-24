import React, { FC } from 'react';
import { Group, Rect, Text, Image as Images, Layer, Circle } from 'react-konva';
import { Html } from 'react-konva-utils';
import useImage from 'use-image';
import { Actors } from '../../Classes/Actors';
import TextMessages from '../TextMessages/TextMessages';
import styles from './ActorPoint.module.css';
import PlusImg from '../../../public/HelpingImages/plus.png'

interface ActorPointProps {
  setActors: any;
  actors: Actors[];
  setPosY: any;
  posY: any;
  Images: any;
  setCurrentObjectID: any;
  addNewActor: any;
  SwimlineMode: any;
  getImageObject: any;
}


function ActorPoint(props: ActorPointProps) {
  const width = 1;
  function getImage(x: any) {
    let img = props.getImageObject(x.img);
    return (<Images x={x.x + 45} y={x.y + 55} image={img} />)
  }

  return (<div>
    {props.actors.map((act: Actors, index: number) => {
      if (props.SwimlineMode && !act.isEndUser) {
          return (<div></div>);
      }
      return (<div>
        {!props.SwimlineMode && <Rect
          x={act.x}
          y={act.y}
          height={act.height}
          width={act.width}
          stroke={'#d9d9d9'}
          cornerRadius={10}
          fill='#f1f1f1'
          strokeWidth={3}
        />}
      {getImage(act)}
        <Rect
          onClick={(evt) => {
            props.setCurrentObjectID(act);
          }}
          x={act.x}
          height={100}
          width={100}
          y={act.y}
        />
  
        <TextMessages x={act.x + 35} y={act.y + 100} height={40} width={60} fontSize={12} value={act.Title} modifyObject={act} isEditing={act.isEditing}
          ChangeFunction={((val: any, x: any) => {
            const circles = props.actors.map(act => {
              if (act.id == x.id) {
                return { ...act, Title: val };
              }
              return act;
            })
            props.setActors(circles);
          })}
          ChangeBack={(x: any) => {
            const circles = props.actors.map((action: any) => {
              if (action.id == x.id) {
                return { ...action, isEditing: false };
              }
              return action;
            })
            props.setActors(circles);
          }}
          changeEditable={(x: any) => {
            const circles = props.actors.map((action: any) => {
              if (action.id == x.id) {
                return { ...action, isEditing: true };
              }
              return action;
            })
            props.setActors(circles);
          }}
        ></TextMessages>
        {/* {!props.SwimlineMode && <Group onClick={() => { props.addNewActor(act) }}>
          <Circle x={act.x + act.width +27}
            y={act.y + act.height +25}
            radius={15}
            stroke={'black'}

            strokeWidth={1}>
          </Circle>
          <Text text='+' fontStyle='bold' fontSize={27} x={act.x + act.width  +20 } y={act.y + act.height +15}></Text>

        </Group>} */}
      </div>);
    })

    }
  </div>
  )

};
export default ActorPoint;

