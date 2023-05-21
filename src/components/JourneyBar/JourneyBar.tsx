import React, { FC } from 'react';
import styles from './JourneyBar.module.css';
import { IconButton, Tooltip } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import { Journey } from '../../Classes/Journey';

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
  return (       <div >
    <div style={{ display: "inline-block", minWidth: '96%' }}>
    <div className={ props.currentJourney == -1 ? 'BarElementSelected' : 'BarElement'} onClick={()=>{
    props.ChangeOpenHome(true);
    if(props.currentJourney != -1){
      props.changeJourney(props.currentJourney);
      props.setCurrentJourney(-1);
    }
  }}> <span  className='BarText'>Overview</span></div>
      {props.Journey.map((x, index) => {
        if (index != props.journeyChange) {
          return (<div className={index == props.currentJourney ? 'BarElementSelected' : 'BarElement'} onClick={() => {
            props.changeJourney(index);
            props.ChangeOpenHome(false);
          }}><span className='BarText' onDoubleClick={() => props.setJourneyChange(index)}>{x.JourneyName}</span></div>)
        }
        else {
          return (<div className={index == props.currentJourney ? 'BarElementSelected' : 'BarElement'}
          ><textarea className='BarText' maxLength={30} onChange={(x) => {
            let newJourney = props.Journey.map((xSub, id) => {
              if (id == index) {
                xSub.JourneyName = x.target.value;
                xSub.JourneyID = x.target.value;
                return xSub;
              }
              return xSub;
            })
            props.setJourney(newJourney);
          }} onBlur={() => props.setJourneyChange(-1)}>{x.JourneyName}</textarea></div>)
        }
      }

      )}
    </div>
    <Tooltip title="Add journey">
      <IconButton aria-label="plus" size="medium" onClick={() => props.setShowAddJourney(true)} >
        <AddCircle />
      </IconButton>
    </Tooltip>
  </div>)
}

export default JourneyBar;
