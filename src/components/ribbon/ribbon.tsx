import React, { FC, useState } from 'react';
import styles from './ribbon.module.css';
import { switchBetweenDiagrams } from '../../Functions/Switching';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLAction } from '../../Classes/CJMLAction';
import XMLCreator from '../../XMLParsing/V2/v2.XMLCreator';
import RibbonRibbonButton from './ribbonButton/ribbon/ribbonButton';
import RibbonDropDownButton from './dropDownButton/ribbon/dropDownButton';
import ChangeBar from './ChangeBar/ribbon/ChangeBar';

interface RibbonProps {
  SwimlineMode: any,
  setSwimlineMode: any,
  circles: any,
  setActions: any,
  setCircles: any,
  actions: any,
  initialArrowId: any,
  setInitialArrowID: any,
  setArrows: any,
  makeBiggerActors: any,
  showQuestionary: any,
  layerHeight: any,
  actors: any,
  getImages: any,
  Journeys: any,
  updateCurrentJourney: any,
  showModal: any;
  images:any;
  currentObject:any;
  setAcotrs:any;
  currentJourney:any;
  setCurrentObject:any;
}



function Ribbon(props: RibbonProps) {
  function changeType(){
    props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)
  }
  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#fcfcfd", height:"70px" }}>
    <ChangeBar images={props.images} currentObj={props.currentObject} TouchPoints={props.circles} updateTouhcPoints={props.setCircles} currentJourney={props.Journeys[props.currentJourney]} actors={props.actors} setActors={props.setAcotrs}
    setCurrentObj={props.setCurrentObject} SwimlaneMode={props.SwimlineMode} changeType={changeType}></ChangeBar>
    {props.currentObject == -1 &&  <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "right", paddingBottom: "5px", paddingTop:"10px" }}>
     
        <span className='BarText' style={{ background: "rgb(57, 85, 163)", color: "white", borderRadius: "5px", paddingBottom: "5px",userSelect:"none", cursor:"pointer" }} onClick={changeType}> Switch diagram type</span></div>}
    </div>

  </div>)
}



export default Ribbon;
