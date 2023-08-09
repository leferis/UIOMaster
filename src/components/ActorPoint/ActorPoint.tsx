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
  currentObject:any;
}


function ActorPoint(props: ActorPointProps) {
  const width = 1;
  function getImage(x: any) {
    let img = props.getImageObject(x.img);
    return (<Images x={x.x + 45} y={x.y + 55} image={img} />)
  }
  const changeMouse= (e:any, style:any) =>{
    const container = e.target.getStage().container();
    container.style.cursor = style;
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
          stroke={props.currentObject == act?"#F49D6E":'#d9d9d9'}
          cornerRadius={10}
          fill='#f1f1f1'
          strokeWidth={3}
        />}
      {getImage(act)}
        <Rect
          onClick={(evt) => {
            props.setCurrentObjectID(act);
          }}
          onMouseEnter={(e)=>changeMouse(e,"pointer")}
          onMouseLeave={(e)=>changeMouse(e,"default")}
          x={act.x}
          height={100}
          width={100}
          y={act.y}
        />
  
        <TextMessages   x={act.x + 35} y={act.y + 100} height={40} width={60} fontSize={12} value={act.Title} modifyObject={act} isEditing={act.isEditing}
          ChangeFunction={((val: any, x: any) => {
            props.setCurrentObjectID(-1);
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
       {!props.SwimlineMode && props.currentObject.id == act.id && <Text text='Move Up'x={act.x + 25}  y={act.y+160} />}
       {!props.SwimlineMode &&  props.currentObject.id == act.id && <Text text='Move Down' x={act.x + 90}  y={act.y+160}/> } 
      </div>);
    })

    }
  </div>
  )

};
export default ActorPoint;

