import React, { FC, useState } from 'react';
import styles from './JourneyBar.module.css';
import { IconButton, Tooltip } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import { Journey } from '../../Classes/Journey';
import JourneyBarTab from './tab/JourneyBar/tab';

interface JourneyBarProps {
  ChangeOpenHome:any;
  setCurrentJourney:any;
  currentJourney:any;
  changeJourney:any;
  Journey:Journey[];
  setJourney:any;
  setJourneyChange:any;
  journeyChange:any;
  setShowAddJourney:any;
}

function JourneyBar(props:JourneyBarProps){
  const [onHower,setOnHower] = useState(false);
  return (       <div >
    <div style={{ display: "inline-block", minWidth: '96%', maxWidth: '100%' }} >
    <div className={ props.currentJourney == -1 || onHower ? 'BarElementSelected' : 'BarElement'} onMouseEnter={()=>setOnHower(true)} onMouseLeave={()=>setOnHower(false)} onClick={()=>{
    props.ChangeOpenHome(true);
    if(props.currentJourney != -1){
      props.changeJourney(props.currentJourney);
      props.setCurrentJourney(-1);
    }
  }} style={{cursor:"pointer", userSelect:"none" }}> <span  className='BarText'>All Journeys</span></div>
      {props.Journey.map((x, index) => {
        return(<JourneyBarTab  ChangeOpenHome={props.ChangeOpenHome} Journey={props.Journey} changeJourney={props.changeJourney} currentJourney={props.currentJourney}
        element={x} index={index} journeyChange={props.journeyChange} setJourney={props.setJourney} setJourneyChange={props.setJourneyChange}></JourneyBarTab>)
      }
      )}   <Tooltip title="Add journey" style={{bottom:"10px"}}>
      <IconButton aria-label="plus" size="medium" color='primary' onClick={() => props.setShowAddJourney(true)} >
        <AddCircle />
      </IconButton>
    </Tooltip>
    </div>
 
  </div>)
}

export default JourneyBar;
