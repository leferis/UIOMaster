import React, { FC } from 'react';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import styles from './ActorSelect.module.css';

interface ActorSelectProps {
  actors: Actors[];
  touchPoints: CJMLCircle[];
  currentObject:any;
  changeTouchPoints:any;
}


function ActorSelect(props: ActorSelectProps) {

  var resultFinal: any[] = [];

  function handleOnEnter(e: any) {
    e.currentTarget.style.backgroundColor = "Silver";
  }
  function handleOnExit(e: any) {
    e.currentTarget.style.backgroundColor = "white";
  }

  function makeList() {
    return (props.actors.forEach((x: Actors) => {

      resultFinal.push(
        <div onPointerEnter={(e) => {
          handleOnEnter(e);
        }} onPointerLeave={(e) => {
          handleOnExit(e);
        }}>
          <div style={{ textAlign:"left",margin:"auto",paddingLeft:"10px", height: "25px", width: "30px", overflow: "hidden",display:"inline-block"}}  
       onClick={() =>{
        const changes = props.touchPoints.map(xCircle=>{
          if(xCircle.id == props.currentObject.id){
            xCircle.initiator = x;
          }
          return xCircle;
        });
        console.log(changes);
        props.changeTouchPoints(changes);
      }}
       ><img className={styles.unselectable} src={x.img} draggable="false" height={20} width={20} ></img>
          </div>
          <a className={styles.unselectable}>{x.Title}</a> <br />
        </div>);

    }))
  };
  makeList();
  return (
    <Group x={500} y={53}>
      <Html ><div id="ImageSelections" style={{ paddingLeft:"2px",textAlign:"left", maxHeight: 150, width: 126, overflowY: "scroll", overflowX: "auto", backgroundColor:"#fff"}}>
        {resultFinal}
      </div>
      </Html>
    </Group>)

}

export default ActorSelect;
