import React, { FC, useState } from 'react';
import styles from './JourneyBar/tab.module.css';

interface JourneyBarTabProps {
  journeyChange:any,
  index:any,
  currentJourney:any;
  changeJourney:any;
  ChangeOpenHome:any;
  setJourneyChange:any;
  element:any;
  Journey:any;
  setJourney:any;
}

function JourneyBarTab(props:JourneyBarTabProps) {
  const [onHower, setOnHower] = useState(false)
  if (props.index != props.journeyChange) {
    return (<div className={props.index == props.currentJourney || onHower ? 'BarElementSelected' : 'BarElement'} 
    style={{cursor:"pointer"}}
    onClick={() => {
      props.changeJourney(props.index);
      props.ChangeOpenHome(false);
    }}
    onMouseEnter={(e)=>{
      setOnHower(true)
    }}
    onMouseLeave={(e)=>{
      setOnHower(false);
    }}
    ><span className='BarText' onDoubleClick={() => props.setJourneyChange(props.index)}>{props.element.JourneyName}</span></div>)
  }
  else {
    return (<div className={props.index == props.currentJourney ? 'BarElementSelected' : 'BarElement'} style={{cursor:"pointer"}}
    ><textarea className='BarText' maxLength={30} onChange={(x) => {
      let newJourney = props.Journey.map((xSub:any, id:any) => {
        if (id == props.index) {
          xSub.JourneyName = props.element.target.value;
          xSub.JourneyID = props.element.target.value;
          return xSub;
        }
        return xSub;
      })
      props.setJourney(newJourney);
    }} onBlur={() => props.setJourneyChange(-1)}>{props.element.JourneyName}</textarea></div>)
  }
}

export default JourneyBarTab;
