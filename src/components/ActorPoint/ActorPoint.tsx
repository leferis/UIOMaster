import React, { FC, useState } from 'react';
import { Group, Rect, Text, Image as Images, Layer, Circle } from 'react-konva';
import { Html } from 'react-konva-utils';
import useImage from 'use-image';
import { Actors } from '../../Classes/Actors';
import TextMessages from '../TextMessages/TextMessages';
import styles from './ActorPoint.module.css';
import PlusImg from '../../../public/HelpingImages/plus.png'
import { updateByActors } from '../../Functions/Switching';
import _ from 'lodash';
import ElementChangeBar from '../elementChangeBar/elementChangeBar';
import RibbonChangeBarImageChange from '../ribbon/ChangeBar/ImageChange/ribbon/ChangeBar/ImageChange';

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
  currentObject: any;
  circles:any;
  actions:any;
  setActions:any;
  updateCircles:any;
}


function ActorPoint(props: ActorPointProps) {
  const [onHower, setHower] = useState(false);
  const [onHowerDown, setHowerDown] = useState(false);
  const width = 1;
  function getImage(x: any) {
    let img = props.getImageObject(x.img);
    return (<Images x={x.x + 45} y={x.y + 55} image={img} />)
  }
  const changeMouse = (e: any, style: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = style;
  }

  function changeActors(index:any, ToMoveUp:boolean) {
   
      let copyOfActors = _.cloneDeep(props.actors)
      var element = copyOfActors[index];
      let insertArea= ToMoveUp?-1:1;
      copyOfActors.splice(index, 1);
      copyOfActors.splice(index + insertArea , 0, element);
      copyOfActors.map((x:Actors, index:number) => { 
        x.y = 200*(index + 1)
      })
      props.setActors(copyOfActors)
      updateByActors(props.circles, props.actions, props.setActions, props.updateCircles, copyOfActors)
    
  }
  return (<div>
    {props.actors.map((act: Actors, index: number) => {
      if (props.SwimlineMode && !act.isEndUser) {
        return (<div></div>);
      }
      return (<div>

          {act == props.currentObject && <ElementChangeBar x={act.x+30 } y={act.y-70}>
            <RibbonChangeBarImageChange x={act.x+30} y={act.y-68} images={props.Images.Images[0]} text={"Type"} currentObject={props.currentObject} changeImage={(e:any)=>{
               let copyOfActors = _.cloneDeep(props.actors);
               let copyOfCurrentObject;
               copyOfActors = copyOfActors.map(x => {
                 if (x.id == act.id) {
                   x.img = e;
                   copyOfCurrentObject = x;
                 }
                 return x;
               })
               props.setActors(copyOfActors);
               props.setCurrentObjectID(copyOfCurrentObject);

            }} ></RibbonChangeBarImageChange>
          </ElementChangeBar>}
        {!props.SwimlineMode && <Rect
          x={act.x}
          y={act.y}
          height={act.height}
          width={act.width}
          stroke={props.currentObject == act ? "#F49D6E" : '#d9d9d9'}
          cornerRadius={10}
          fill='#f1f1f1'
          strokeWidth={3}
        />}
        {getImage(act)}
        <Rect
          onClick={(evt) => {
            props.setCurrentObjectID(act);
          }}
          onMouseEnter={(e) => changeMouse(e, "pointer")}
          onMouseLeave={(e) => changeMouse(e, "default")}
          x={act.x}
          height={100}
          width={100}
          y={act.y}
        />

        <TextMessages x={act.x + 35} y={act.y + 100} height={40} width={60} fontSize={12} value={act.Title} modifyObject={act} isEditing={act.isEditing}
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
        {!props.SwimlineMode && props.currentObject.id == act.id && index != 0 && <Group onMouseEnter={(e) => {changeMouse(e, "pointer"); setHower(true)}} onMouseLeave={(e) => {changeMouse(e, "default");setHower(false)}}
        onClick={()=>{changeActors(index, true);setHower(false)}}
        >
          <Rect x={act.x + 20} y={act.y + 155} width={60} height={20} stroke={"black"} cornerRadius={4} fill={onHower?'#dbdddf':'#f4f6f8'} />
          <Text text='Move Up' x={act.x + 25} y={act.y + 160} />
        </Group>}
        {!props.SwimlineMode && props.currentObject.id == act.id && index != props.actors.length - 1 &&
          <Group onMouseEnter={(e) => {changeMouse(e, "pointer"); setHowerDown(true)}} onMouseLeave={(e) => {changeMouse(e, "default"); setHowerDown(false)}}
           onClick={()=>{changeActors(index, false); setHowerDown(false)}} >
            <Rect x={index == 0 ? act.x + 20 : act.x + 86} y={act.y + 155} width={72} height={20} stroke={"black"} cornerRadius={4} fill={onHowerDown?'#dbdddf':'#f4f6f8'} />
            <Text text='Move Down' x={index == 0 ? act.x + 23 : act.x + 90} y={act.y + 160} />
          </Group>
        }
      </div>);
    })

    }
  </div>
  )

};
export default ActorPoint;

