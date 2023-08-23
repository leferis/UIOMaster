import React, { FC } from 'react';
import styles from './JourneySettings.module.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Journey } from '../../../../Classes/Journey';
import _ from 'lodash';

interface SettingsJourneySettingsProps {
  journeys: any;
  currentJourney:Journey;
  setTempJourney:any;
}


function SettingsJourneySettings(props: SettingsJourneySettingsProps) {
  return (<div className={styles.TouchpointQuestionary} style={{ paddingTop: "20px" }}>
    <Grid style={{
      background: "#f1f2f4",
      borderRadius: "20px",
    }} container spacing={1}    justifyContent="center"
    alignItems="center" >
      <Grid item xs={"auto"}><h2>Journey metadata</h2></Grid>
      <Grid item xs={9} />
      <Grid item xs={3}><TextField fullWidth label="Journey's name" defaultValue={props.currentJourney.JourneyName} onInput={(e:any) => {
        let temp = _.cloneDeep(props.currentJourney);
        temp.JourneyName = e.target.value;  
        props.setTempJourney(temp);
       }} /></Grid>
      <Grid item xs={3}>
        <FormGroup>
          <FormControlLabel labelPlacement="top" control={<Checkbox
            defaultChecked={props.currentJourney.isPlanned}
            onChange={(e: any) => {
              let temp = _.cloneDeep(props.currentJourney);
              if(e.target.checked){
                temp.isPlanned = true;
                temp.Reference = undefined;
              }
              else{
                temp.isPlanned = false;
              }
              props.setTempJourney(temp);
            }} />} label={"Planned"} />
        </FormGroup>
      </Grid>
      <Grid item xs={4}>
        {!props.currentJourney.isPlanned && <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Related to</InputLabel>
          <Select
            label="Related to:"
            value={props.currentJourney.Reference}
            onChange={(e: any) => {// Need to find it by ID
              if (e.eventPhase == 0) {
                let temp = _.cloneDeep(props.currentJourney);
                temp.Reference = props.journeys.find((x: Journey) => { return x.JourneyName == e.target.value });
                if(temp.Reference != undefined){
                  temp.Reference=temp.Reference.JourneyName;
                }
                props.setTempJourney(temp);
              }
            }}
          >
            <MenuItem value={"asd"}>None</MenuItem>
            {props.journeys.filter((x:Journey)=>{return x.isPlanned}).map((y: Journey) => {
              return (<MenuItem value={y.JourneyName}>{y.JourneyName}</MenuItem>)
            })}
            
          </Select>
        </FormControl>}
      </Grid>
      <Grid item xs={1}/>
    </Grid>
  </div>)
};

export default SettingsJourneySettings;
