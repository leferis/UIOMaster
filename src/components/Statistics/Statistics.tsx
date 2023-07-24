import React, { FC } from 'react';
import styles from './Statistics.module.css';
import { Rect, Text } from 'react-konva';
import { Journey } from '../../Classes/Journey';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';

interface StatisticsProps {
  layer: any;
  currentJourney: any;
  Journeys: any;
  circles: CJMLCircle[];
  actions: any;
  diagramType:any;
}

function Statistics(props: StatisticsProps) {

   var heighth = 0;
  var width = 0;
   try {
     heighth = props.layer.current.canvas.height;
   }
   catch (ex) {
     heighth = 20;
   }
  try {
    width = props.layer.current.canvas.width;
  }
  catch (ex) {
    width = 20;
  }

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
          text += "Matches:\n"
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
  return (<>

    <Text text={getText()} x={47} fontSize={14} y={13}></Text>
  </>);
}
export default Statistics;
