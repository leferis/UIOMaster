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
      if (maxXPlanned < journey.Toucpoint.length * 180) { maxXPlanned = journey.Toucpoint.length * 180; }
      return (<JourneyVisualization  CloseHomeWindow ={ props.CloseHomeWindow}setJourney={props.setJourney} journeyID={getJourneyIndex(journey)} IncludeActor={false} ActorImage={getMainActor(journey.Actors)} Toucpoint={journey.Toucpoint} journeyIndex={index} getImageObject={props.getImageObject} XINITIALPOSITION={300}></JourneyVisualization>)
    })}
    {props.journeys.filter((x) => {
      return !x.isPlanned
    }).map((journey, index) => {
      return (<JourneyVisualization CloseHomeWindow={props.CloseHomeWindow} setJourney={props.setJourney} journeyID={getJourneyIndex(journey)} IncludeActor={true} ActorImage={getMainActor(journey.Actors)} Toucpoint={journey.Toucpoint} journeyIndex={index} getImageObject={props.getImageObject} XINITIALPOSITION={maxXPlanned }></JourneyVisualization>)
    })}
  </Group>)
}
export default Home;
