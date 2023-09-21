import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { Journey } from '../../Classes/Journey';
import styles from './JourneySelection.module.css';
import { Actors } from '../../Classes/Actors';

interface JourneySelectionProps {
  showJourney: any;
  closeJourney: any;
  addJourney: any;
  JourneyList: any;
  showModal: any;
}

function JourneySelection(props: JourneySelectionProps) {
  const showHideClassName = props.showJourney ? "modal display-block" : "modal display-none";
  const [showSelection, setShowSelection] = useState<boolean>(false);
  const [selectedJourney, setSelectedJourney] = useState<any>(null);
  const [isPlannedJourney, setIsPlannedJourney] = useState(false);
  // Code window for dropdown of journey. Can select none Planned journey i guess? 
  function getSelectionWindow() {
    return (<>
      <h4>Please select reference Journey:</h4>
      <Grid container spacing={2}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="Reference journey">Reference journey</InputLabel>
            <Select labelId="Reference journey"
              id="simpleSelect"
              value={undefined}
              label="Reference journey"
              onChange={(e) => {
                setSelectedJourney(e.target.value);
              }}>

              <MenuItem value={-1}>None</MenuItem>
              {props.JourneyList.map((x: Journey, index: number) => {
                if (x.isPlanned) {
                  return (
                    <MenuItem value={index}>{x.JourneyName}</MenuItem>
                  )
                }
                else {
                  return;
                }
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Button onClick={() => {
            { props.addJourney(false, selectedJourney); props.closeJourney(false); }
          }} variant="contained">Create</Button></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>)
  }
  return (<div className={showHideClassName} style={{
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
        width: '30%',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        paddingBottom: '30px',
        maxHeight: "100%",
        overflowY: "auto"
      }}>
      {!showSelection &&
        <>
          <h2> Do you want to add Planned Journey or Actual Journey</h2>
          <Grid container spacing={2}   alignItems="center"   justifyContent="flex-start">
            <Grid item xs={1}></Grid>
            <Grid item xs={4} > <Button  onClick={() => {
              if (isPlannedJourney) {
                props.addJourney(true, null);
                props.closeJourney(false)
              }
              else {

                const filteredCount = props.JourneyList.filter((x: Journey) => x.isPlanned).length;
                if (filteredCount > 0) {
                  setShowSelection(true);
                }
                else {
                  props.addJourney(false, selectedJourney);
                  props.closeJourney(false)
                }
              }

            }} variant="contained">Add Journey</Button>  <FormHelperText style={{    paddingLeft: "30%"}}>Draw your journey from scratch</FormHelperText></Grid>
            <Grid item xs={3} >   <FormControlLabel control={<Checkbox onChange={() => { setIsPlannedJourney(!isPlannedJourney) }} checked={isPlannedJourney} />} label="Planned" /><br></br>
            <FormControlLabel control={<Checkbox onChange={() => { setIsPlannedJourney(!isPlannedJourney) }} checked={!isPlannedJourney} />} label="Actual" /></Grid>
            <Grid item xs={4}></Grid>
            {/* <Grid item xs={5} style={{paddingRight:"50px"}}><Button variant="contained" disabled >Open example journey</Button>
            <FormHelperText style={{    paddingLeft: "20px"}}>Load an example journey that you can edit</FormHelperText></Grid> */}
            <Grid item xs={1}></Grid>
            {    props.JourneyList.length<1 && <>    
            
            <Grid item xs={4} ><Button onClick={() => { props.showModal(true); props.closeJourney(false) }} variant="contained">Import XCJML file</Button>
            <FormHelperText  style={{    paddingLeft: "30%"}}>Open xCJML file</FormHelperText></Grid>
            <Grid item xs={3}></Grid></> }
          </Grid>

        </>}
      {/* Add logic to not give any selection if there is no Planned journey */}
      {showSelection && getSelectionWindow()}
    </section>

  </div>
  )
};

export default JourneySelection;
