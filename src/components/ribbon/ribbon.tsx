import React, { FC } from 'react';
import styles from './ribbon.module.css';

interface RibbonProps { }

function Ribbon(props: any) {


  return (<div >
    <div style={{ display: "inline-block", minWidth: '100%', background: "#fcfcfd", borderWidth: "thin", borderColor:"black", borderStyle: "solid" }}>
      <div className={props.currentJourney == -1 ? 'BarElementSelected' : 'BarElement'} style={{float: "left"}}>
        <span className='BarText'  >File</span></div>
      <div className={props.currentJourney == -1 ? 'BarElementSelected' : 'BarElement'} style={{float: "left"}}>
        <span className='BarText'> Home</span></div>
        <div className={props.currentJourney == -1 ? 'BarElementSelected' : 'BarElement'} style={{float: "left"}}>
        <span className='BarText'> Help</span></div>
      <div className={props.currentJourney == -1 ? 'BarElementSelected' : 'BarElement'} style={{float: "right"}}>
        <span className='BarText'> Switch diagram type</span></div>
    </div>
  </div>)
}



export default Ribbon;
