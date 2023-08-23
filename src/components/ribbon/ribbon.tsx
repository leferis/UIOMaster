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
}



function Ribbon(props: RibbonProps) {
  const [onHower, setHower]=useState(false);
  const [onHowerSecond, setHowerSecond]=useState(false);

  
  function changeType() {
    props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)
  }
  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#fcfcfd", height: "70px" }}>
  
      {!props.openHome && <StatusBar currenJourneyId={props.currentJourney} journey={props.Journeys} type={props.SwimlineMode} layer={undefined} />}
      {!props.openHome  &&
        <div className={false ? 'BarElementSelected' : 'BarElement'} style={{userSelect:"none", cursor:"pointer",marginLeft:"20px", float: "left", paddingBottom: "5px", paddingTop: "10px", paddingLeft:"10px", height:"57px", background:onHower?"#e6e6e6":"#f5f5f5", borderRadius:"10px" }} onMouseEnter={()=>{
          setHower(true);
        }} 
        onMouseLeave={()=> {
          setHower(false);
        }}
        onClick={changeType}>
          <img  style={{display:"block", margin:"0 auto"}} height={40} width={40} src='/HelpingImages/change.png'/>
          <span style={{textAlign:"center", fontWeight:"500"}}> Diagram type</span>
          
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
        onClick={() =>props.showQuestionary(true)}>
          <img  style={{display:"block", margin:"0 auto"}} height={40} width={40} src='/HelpingImages/form.png'/>
          <span style={{textAlign:"center", fontWeight:"500"}}> Open Form</span>
          </div>
          
      }
     {
        !props.openHome &&  <div style={{float:'left',borderLeft:"1px solid black", height:"57px", marginLeft:"5px", marginTop:"10px"}}></div>
      }
    </div>

  </div>)
}



export default Ribbon;
