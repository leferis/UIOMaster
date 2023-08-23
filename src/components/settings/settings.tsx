import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Circle, Group, Image, Layer, Line, Rect, Text } from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';
import { Html, useImage } from "react-konva-utils";
import styles from './settings.module.css';
import { ExternalEnumerator } from '../../enumerator/ExternalEnumerator';
import ImageSelection from '../ImageSelection/ImageSelection';
import { Actors } from '../../Classes/Actors';
import ActorSelect from '../ActorSelect/ActorSelect';
import { switchBetweenDiagrams } from '../../Functions/Switching';
import { IconButton, Tabs, Tab, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsJourneySettings from './JourneySettings/settings/JourneySettings';
import _ from 'lodash';
import { Journey } from '../../Classes/Journey';
import SettingsActorSettings from './ActorSettings/settings/ActorSettings';
import SettingsTouchpointSettings from './TouchpointSettings/settings/TouchpointSettings';

interface SettingsProps {
  Images: any;
  currentObject: any;
  setCircles: any;
  circles: any;
  setCurrentObjectID: any;
  changeStatus: any;
  setImage: any;
  setActors: any;
  Actors: Actors[];
  GetImageFullName: any;
  getImageObject: any;
  Layer:any;
  setSwimlineMode:any;
  SwimlineMode:any;
  actions:any;
  setActions:any;
  initialArrowId:any; 
  setInitialArrowID:any;
  setArrows:any;
  makeBiggerActors:any;
  showSettings:any;
  journeys:any;
  currentJurney:any;
  setShowSettings:any;
  setJourneys:any;
}



function Settings(props: SettingsProps) {
  const showHideClassName = props.showSettings ? "modal display-block" : "modal display-none";
  const [activeTab, setActiveTab] = React.useState(0);
  const [JourneyPart, setJourneyPart] = React.useState(true);
  const [TouchpointPart, setToucpointpart] = React.useState(false);
  const [ActorPart, setActorPart] = React.useState(false);
  const [journeyClone, setJourneyClone] = React.useState(_.cloneDeep(props.journeys[props.currentJurney]));
  const [actorClone, setActorClone] = React.useState(_.cloneDeep(props.Actors));
  const [touchpointClone, setTouchpointClone] = React.useState(_.cloneDeep(props.circles));

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
        style={{
          position: 'fixed',
          background: 'white',
          width: '50%',
          height: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          paddingBottom: '  30px',
          maxHeight: "100%",
          overflowY: "auto"
        }}>
          <div style={{float:"right"}}>
           <IconButton aria-label="Up" size="large" onClick={() => { props.setShowSettings(false) }} ><CloseIcon /></IconButton>
           </div>
        <Tabs
          value={activeTab}
          onChange={(event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
        >
          <Tab onClick={() => { setJourneyPart(true); setActorPart(false); setToucpointpart(false) }} label="Journey"></Tab>
          <Tab onClick={() => { setJourneyPart(false); setActorPart(true); setToucpointpart(false)  }} label="Actor"></Tab>
          <Tab onClick={() => { setJourneyPart(false); setActorPart(false); setToucpointpart(true) }} label="Toucpoints"></Tab>
        </Tabs>
        {JourneyPart && <SettingsJourneySettings currentJourney={journeyClone} journeys={props.journeys} setTempJourney={setJourneyClone}/>}
        {ActorPart && <SettingsActorSettings actors={actorClone} setTempActors={setActorClone} Images={props.Images}/>}
        {TouchpointPart &&  <SettingsTouchpointSettings updateCircles={setTouchpointClone} Images={props.Images} circles={touchpointClone} />}
        <Button  style={{top:"15px"}} variant="contained" color="success" onClick={()=>{
          props.setShowSettings(false);
          let tempJourneys = _.cloneDeep(props.journeys);
          tempJourneys[props.currentJurney] = journeyClone;
          if(journeyClone.isPlanned == false && props.journeys[props.currentJurney].isPanned == true){
            tempJourneys = tempJourneys.map((x:Journey) => { 
              if(x.Reference == props.journeys[props.currentJurney].JourneyName){
                x.Reference = null;
              }
              return x;
            })
          }
          props.setJourneys(tempJourneys);
          props.setCircles(touchpointClone);
          props.setActors(actorClone);

        }}>Save</Button>
  
      </section>
  
    </div>
  );
}
export default Settings;
