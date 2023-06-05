import React, { FC } from 'react';
import styles from './Home.module.css';
import { Group } from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import JourneyVisualization from './Journey/JourneyVisualization';
import { Journey } from '../../Classes/Journey';
import { Actors } from '../../Classes/Actors';

interface HomeProps {
  journeys: Journey[];
  getImageObject: any;
  setJourney:any;
  CloseHomeWindow:any;
}

function getMainActor(Actors: Actors[]) {
  return Actors.filter((x) => {
    return x.isEndUser;
  })[0].img;
}

function Home(props: HomeProps) {
  function getJourneyIndex(journey:any){

    return props.journeys.indexOf(journey);
  }
  
  let maxXPlanned = 250;
  return (<Group>
    {props.journeys.filter((x) => {
      return x.isPlanned
    }).map((journey, index) => {
      if (maxXPlanned < journey.Toucpoint.length * 250) { maxXPlanned = journey.Toucpoint.length * 250; }
      return (<JourneyVisualization  CloseHomeWindow ={ props.CloseHomeWindow}setJourney={props.setJourney} journeyID={getJourneyIndex(journey)} IncludeActor={false} ActorImage={getMainActor(journey.Actors)} Toucpoint={journey.Toucpoint} journeyIndex={index} getImageObject={props.getImageObject} XINITIALPOSITION={200}></JourneyVisualization>)
    })}
    {props.journeys.filter((x) => {
      return !x.isPlanned
    }).map((journey, index) => {
      return (<JourneyVisualization CloseHomeWindow={props.CloseHomeWindow} setJourney={props.setJourney} journeyID={getJourneyIndex(journey)} IncludeActor={true} ActorImage={getMainActor(journey.Actors)} Toucpoint={journey.Toucpoint} journeyIndex={index} getImageObject={props.getImageObject} XINITIALPOSITION={maxXPlanned + 400}></JourneyVisualization>)
    })}
  </Group>)
}
export default Home;
