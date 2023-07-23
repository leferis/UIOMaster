import React, { FC, useState } from 'react';
import styles from './ribbon.module.css';
import { switchBetweenDiagrams } from '../../Functions/Switching';

interface RibbonProps { SwimlineMode: any, setSwimlineMode: any, circles:any, setActions:any, setCircles:any, actions:any, initialArrowId:any, setInitialArrowID:any, setArrows:any, makeBiggerActors:any }

function Ribbon(props: RibbonProps) {
  const [hower, setHower] = useState(false)

  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#fcfcfd", borderWidth: "thin", borderColor: "black", borderStyle: "solid" }}>
      <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px", maxWidth: "70px" }} onMouseEnter={() => {
        setHower(true)
      }} onMouseLeave={() => { setHower(false) }}
      >
        <span className='BarText'>File</span>
        {hower && <div className="dropdown-submeniu" style={{ left: 0, position: "absolute", zIndex: "10" }}>
          <span className='BarText' style={{ display: "inline-block", background: "#fcfcfd", minWidth: "100%", minHeight: "100%" }} >Import</span> <br></br>
          <span className='BarText' style={{ display: "inline-block", background: "#fcfcfd", minWidth: "100%", minHeight: "100%" }}>Export</span><br></br>
          <span className='BarText' style={{ display: "inline-block", background: "#fcfcfd", minWidth: "100%", minHeight: "100%" }}>Export as PNG</span>
        </div>}
      </div>
        <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px" }}>
        <span className='BarText'> Form</span></div>
      <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px" }}>
        <span className='BarText'> Help</span></div>
      <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "right", paddingBottom: "5px" }}>
        <span className='BarText' style={{ background: "rgb(57, 85, 163)", color: "white", borderRadius: "5px", paddingBottom: "5px" }} onClick={() => {
          props.setSwimlineMode(!props.SwimlineMode); switchBetweenDiagrams(!props.SwimlineMode, props.circles, props.actions, props.setActions, props.setCircles, props.initialArrowId, props.setInitialArrowID, props.setArrows, props.makeBiggerActors)
        }}> Switch diagram type</span></div>
    </div>
  </div>)
}



export default Ribbon;
