import React, { FC } from 'react';
import styles from './Statistics.module.css';
import { Rect } from 'react-konva';
import { Journey } from '../../Classes/Journey';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';
import { Button } from '@mui/material';

interface StatisticsProps {

  currentJourney: any;
  Journeys: any;
  circles: CJMLCircle[];
  actions: any;
  show:any;
  handleClose:any;
}

function Statistics(props: StatisticsProps) {


  function getText() {
    let text = "";
   
    try {
      text += "Count:\n"
      text += "Touchpoints: " + props.circles.length + '\n';
      text += "Actions: " + props.actions.length + '\n';
      if (props.Journeys[props.currentJourney].isPlanned) {
        let deviationCount = 0;
        let touchpointCount = 0;
        let countOfJourneys = 0;
        let MatchCount =0;
        props.Journeys.map((x: Journey) => {

          if (!x.isPlanned && x.Reference == props.Journeys[props.currentJourney].JourneyName) {
            let cnt = x.Toucpoint.filter((x:CJMLCircle) => {
              return x.devation;
            }).length;
            deviationCount += cnt
            touchpointCount += x.Toucpoint.length + x.Actions.length;
            countOfJourneys++;
            if(cnt == 0){
              MatchCount++;
            }
          }
        })
        text += "Actual journey match: ";
        text += MatchCount+ '\n';
        text += "\nAverage:\n"
        text += "Deviation: ";
        text += (Math.round(deviationCount / countOfJourneys  * 100) / 100).toFixed(2)+ '\n';
        text += "Actual touchpoint count: " + (Math.round(touchpointCount / countOfJourneys * 100) / 100).toFixed(2) + '\n';
      }
      else {
    
        let count = 0;
        let deviationCount = 0;
        props.circles.map((x: CJMLCircle) => {
          if (x.Status == TouchPointStatus.Completed) {
            count++;
          }
          if (x.devation) {
            deviationCount++;
          }
        });
        if(props.Journeys[props.currentJourney].Reference != undefined){
          text += "\nMatches:\n"
          text += "Touchpoints reference: ";
          text += count + '\n';
      
        text += "Journey reference: " + (deviationCount > 0 || count != props.circles.length? "False" : "True") + "\n";

        }
      }
    }
    catch (ex) {
    }
    return text;
  }
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";


  return (
    <div className={showHideClassName} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)'
    }}>
      <section className="modal-main" 
      style={{ position:'fixed',
        background: 'white',
        width: '40%',
        height: 'auto',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)',
        paddingBottom:'30px'
        }}>
           <h3>Statistics</h3>
           <div style={{whiteSpace:"pre-line"}}>{getText()}</div>
           <br/>

        <Button variant="contained"  onClick={() => {props.handleClose(false)}}>Close</Button>
      </section>

    </div>);
;
}
export default Statistics;
