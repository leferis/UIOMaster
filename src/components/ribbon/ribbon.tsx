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
import StatusBar from '../statusBar/statusBar';
import  { save } from '../../saving/localMemory';

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
  images: any;
  currentObject: any;
  setAcotrs: any;
  currentJourney: any;
  setCurrentObject: any;
  openHome: any;
  setSavesList:any;
}



function Ribbon(props: RibbonProps) {
  const [onHower, setHower]=useState(false);
  const [onHowerSecond, setHowerSecond]=useState(false);

  
  function changeType() {
    props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)
  }
  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#ededee", height: "70px" }}>
  
      {!props.openHome && <StatusBar currenJourneyId={props.currentJourney} journey={props.Journeys} type={props.SwimlineMode} layer={undefined} />}
      <div style={{float:'left',borderLeft:"1px solid black", height:"57px", marginLeft:"5px", marginTop:"10px"}}></div>
      {!props.openHome  &&
        <div className={false ? 'BarElementSelected' : 'BarElement'} style={{userSelect:"none",verticalAlign:"middle", cursor:"pointer", maxWidth:"100px",textAlign:"center",marginLeft:"20px", float: "left", paddingBottom: "5px", paddingTop: "10px", paddingLeft:"10px", height:"57px", background:onHower?"#e6e6e6":"#f5f5f5", borderRadius:"10px" }} onMouseEnter={()=>{
          setHower(true);
        }} 
        onMouseLeave={()=> {
          setHower(false);
        }}
        onClick={changeType}>
          <span style={{textAlign:"center", fontWeight:"500"}}> Switch diagram type</span>
          
          </div>
          
      }{
        !props.openHome &&  <div style={{float:'left',borderLeft:"1px solid black", height:"57px", marginLeft:"5px", marginTop:"10px"}}></div>
      }
            {!props.openHome  &&
        <div className={false ? 'BarElementSelected' : 'BarElement'} style={{userSelect:"none",cursor:"pointer", marginLeft:"10px", float: "left", paddingBottom: "5px", paddingTop: "10px", paddingLeft:"10px", height:"57px", background:onHowerSecond?"#e6e6e6":"#f5f5f5", borderRadius:"10px" }} 
        onMouseEnter={()=>{
          setHowerSecond(true);
        }} 
        onMouseLeave={()=> {
          setHowerSecond(false);
        }}
        onClick={() =>{props.showQuestionary(true); props.setCurrentObject(-1 )}}>
          <span style={{textAlign:"center", fontWeight:"500"}}> Edit in Form</span>
          </div>
          
      }
     {
        !props.openHome &&  <div style={{float:'left',borderLeft:"1px solid black", height:"57px", marginLeft:"5px", marginTop:"10px"}}></div>
      }
        <div className={false ? 'BarElementSelected' : 'BarElement'} style={{userSelect:"none",verticalAlign:"middle", cursor:"pointer", maxWidth:"100px",textAlign:"center",marginLeft:"20px", float: "left", paddingBottom: "5px", paddingTop: "10px", paddingLeft:"10px", height:"57px", background:onHower?"#e6e6e6":"#f5f5f5", borderRadius:"10px" }} onMouseEnter={()=>{
          setHower(true);
        }} 
        onMouseLeave={()=> {
          setHower(false);
        }}
        onClick={() => {
          props.updateCurrentJourney();

          save(props.Journeys)
        }}>
          <span style={{textAlign:"center", fontWeight:"500"}}> Save</span>
          
          </div>

          <div className={false ? 'BarElementSelected' : 'BarElement'} style={{userSelect:"none",verticalAlign:"middle", cursor:"pointer", maxWidth:"100px",textAlign:"center",marginLeft:"20px", float: "left", paddingBottom: "5px", paddingTop: "10px", paddingLeft:"10px", height:"57px", background:onHower?"#e6e6e6":"#f5f5f5", borderRadius:"10px" }} onMouseEnter={()=>{
          setHower(true);
        }} 
        onMouseLeave={()=> {
          setHower(false);
        }}
        onClick={() => {
         props.setSavesList(true);
        }}>
          <span style={{textAlign:"center", fontWeight:"500"}}> Load</span>
          
          </div>
    </div>

  </div>)
}



export default Ribbon;
