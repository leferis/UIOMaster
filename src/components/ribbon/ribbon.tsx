import React, { FC, useState } from 'react';
import styles from './ribbon.module.css';
import { switchBetweenDiagrams } from '../../Functions/Switching';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLAction } from '../../Classes/CJMLAction';
import XMLCreator from '../../XMLParsing/V2/v2.XMLCreator';

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
}
function SortActorsByY(actors: Actors[]) {
  let result = actors.sort((x, y) => {
    return x.y - y.y;
  })
  return result;
}
function findImagePoints(actors: Actors[], swimLaneMode: boolean, cirlces: CJMLCircle[], actions: CJMLAction[]) {
  let result = SortActorsByY(actors,);
  if (!swimLaneMode) {

    return { y: result[0].y, height: result[result.length - 1].y + result[result.length - 1].height, width: result[0].width + 200 };
  }
  else {
    let communicationOrderByY = cirlces.sort((x, y) => {
      return x.y - y.y;
    })
    let actionOrderByY = actions.sort((x, y) => {
      return x.y - y.y;
    })
    let communicationOrderByX = cirlces.sort((x, y) => {
      return x.x - y.x;
    })
    let actionOrderByX = actions.sort((x, y) => {
      return x.x - y.x;
    })

    let communicationMostY = communicationOrderByY.length > 0 ? communicationOrderByY[communicationOrderByY.length - 1] : { y: 0 };
    let actionmostY = actionOrderByY.length > 0 ? actionOrderByY[actionOrderByY.length - 1] : { y: 0 };
    let communicationMostX = communicationOrderByX.length > 0 ? communicationOrderByX[communicationOrderByY.length - 1] : { x: 0, width: 0 };
    let actionmostX = actionOrderByX.length > 0 ? actionOrderByX[actionOrderByY.length - 1] : { x: 0, width: 0 };
    if (communicationMostY.y > actionmostY.y) {
      let height = communicationOrderByY[communicationOrderByY.length - 1].y - result[0].y + 30;
      let actorHeight = result[result.length - 1].y + result[result.length - 1].height;
      return { y: result[0].y, height: height > actorHeight ? height : actorHeight, width: communicationMostX.x > actionmostX.x ? communicationMostX.x + communicationMostX.width + 50 : actionmostX.x + actionmostX.width + 50 };
    }
    else {
      let height = actionOrderByY[actionOrderByY.length - 1].y - result[0].y + 30;
      let actorHeight = result[result.length - 1].y + result[result.length - 1].height;
      return { y: result[0].y, height: height > actorHeight ? height : actorHeight, width: communicationMostX.x > actionmostX.x ? communicationMostX.x + communicationMostX.width + 50 : actionmostX.x + actionmostX.width + 50 };
    }
  }
}

function downloadImage(url: any) {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Journey.png`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function ribbonButton(text: string, onClickCommand: any) {
  const [hower, setHower] = useState(false)
  return (<div className={hower ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px", left:"5px" }} onMouseEnter={() => { setHower(true) }} onMouseLeave={() => { setHower(false) }} onClick={() => onClickCommand()}>
    <span className='BarText' style={{marginRight:"-13%"}}>{text}</span></div>)
}

function dropDownButton(text: string, onClickCommand: any, onhower: any) {
  const [hower, setHower] = useState(false)
  return (<div className={hower ? 'BarElementSelected' : 'BarElement'} style={{ display: onhower ? "inline" : "none", float: "left", paddingBottom: "5px", minWidth: "100%" }} onMouseEnter={() => { setHower(true) }} onMouseLeave={() => { setHower(false) }} onClick={() => onClickCommand()}>
    <span className='BarText' style={{ display: "inline-block", background: "#fcfcfd", minWidth: "100%", minHeight: "100%", marginTop: "-15px", top:"10px" }}>{text}</span><br></br></div>)
}

function Ribbon(props: RibbonProps) {
  const [hower, setHower] = useState(false)

  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#fcfcfd" }}>
      <div className={hower ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px", maxWidth: "70px" }} onMouseEnter={() => {
        setHower(true)
      }} onMouseLeave={() => { setHower(false) }}
      >
        <span className='BarText' style={{marginRight:"-13%"}}>File</span>
        <div className="dropdown-submeniu" style={{ left: 0, position: "absolute", zIndex: "10" }}>
          {dropDownButton("Import", () => {props.showModal(true); }, hower)}<br></br>
          {dropDownButton("Export", () => {
            props.updateCurrentJourney();
            XMLCreator(props.Journeys, props.getImages);
          }, hower)}<br></br>
          {dropDownButton("Export as PNG", () => {
            let exportInformation = findImagePoints(props.actors, props.SwimlineMode, props.circles, props.actions);
            var image = props.layerHeight.current.toDataURL({ x: props.layerHeight.current.attrs.x, y: props.layerHeight.current.attrs.x.y, width: exportInformation.width, height: exportInformation.height });
            downloadImage(image);
          }, hower)}
        </div>
      </div>
      {ribbonButton("Form", () => { props.showQuestionary(true) })}
      {ribbonButton("Help", () => { })}
      <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "right", paddingBottom: "5px" }}>
        <span className='BarText' style={{ background: "rgb(57, 85, 163)", color: "white", borderRadius: "5px", paddingBottom: "5px" }} onClick={() => {
          props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)
        }}> Switch diagram type</span></div>
    </div>
    {/* <div style={{ height: "35px", display: "inline-block", minWidth: '100%', background: "#fcfcfd", borderBottom: "2px", borderBottomStyle: "solid", borderBottomColor: "black" }}>

    </div> */}
  </div>)
}



export default Ribbon;
