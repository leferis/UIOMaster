
import React, { FC, useState } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { Actors } from '../../Classes/Actors';
import styles from './ActorLegend.module.css';

interface ActorLegendProps {
  actors: Actors[];
  addActor: any;
  setCurrentObjectID: any;
  actorRemove: any;
}

var resultFinal: any[] = [];

function ActorLegend(props: ActorLegendProps) {
  const [open, ChangeOpenStatus] = useState(false);

  function handleOnEnter(e: any) {
    e.currentTarget.style.backgroundColor = "Silver";
  }
  function handleOnExit(e: any) {
    e.currentTarget.style.backgroundColor = "white";
  }
  // mark them somehow as in color
  // Allign them in center 

  function makeList() {
    resultFinal = [];
    props.actors.forEach((x: Actors) => {

      resultFinal.push(
        <div onPointerEnter={(e) => {
          handleOnEnter(e);
        }} onPointerLeave={(e) => {
          handleOnExit(e);
        }}>
          <div style={{ textAlign: "left", margin: "auto", paddingLeft: "10px", height: "25px", width: "130px", overflow: "hidden", display: "inline-block" }}
          >
            <span onClick={(message) => {
              console.log("Removed");
              props.setCurrentObjectID(x);
              props.actorRemove();
            }}> X </span>
            <a className={styles.unselectable}>{x.Title}</a>
          </div>
        </div>);

    })
    resultFinal.push(
      <div onPointerEnter={(e) => {
        handleOnEnter(e);
      }} onPointerLeave={(e) => {
        handleOnExit(e);
      }}>
        <div style={{ textAlign: "left", margin: "auto", paddingLeft: "10px", height: "25px", width: "130px", overflow: "hidden", display: "inline-block" }}
        >

          <a className={styles.unselectable} onClick={(e) => {
            props.addActor(props.actors[props.actors.length - 1]);
          }}>Add User</a>
        </div>
      </div>
    )
  };
  makeList();

  return (
    <Group >
      <Rect x={900} y={open ? 750 : 900} height={open ? 200 : 50}
        width={200}
        stroke={'black'}
        strokeWidth={3}></Rect>
      <Rect x={1070} y={920} height={10} width={20} onClick={() => {
        ChangeOpenStatus(!open)
      }} >
      </Rect>
      <Line points={open ? [1075, 930, 1085, 925, 1095, 930] : [1075, 925, 1085, 930, 1095, 925]}
        stroke={"black"}
        strokeWidth={1} ></Line>
      {open && <Group x={905} y={753} onMouseLeave={() => { ChangeOpenStatus(false) }}>
        <Html ><div id="ImageSelections" style={{ minHeight: 150, maxHeight: 150, width: 195, overflowY: "scroll", overflowX: "auto" }}>
          {resultFinal}
        </div>
        </Html>
      </Group>}
    </Group>
  );
}

export default ActorLegend;
