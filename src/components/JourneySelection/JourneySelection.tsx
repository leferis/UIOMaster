import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { Journey } from '../../Classes/Journey';
import styles from './JourneySelection.module.css';
import { Actors } from '../../Classes/Actors';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface JourneySelectionProps {
  showJourney: any;
  closeJourney: any;
  addJourney: any;
  JourneyList: any;
  showModal: any;
}

function JourneySelection(props: JourneySelectionProps) {

  const [showSelection, setShowSelection] = useState<boolean>(false);
  const [selectedJourney, setSelectedJourney] = useState<any>(null);
  const [isPlannedJourney, setIsPlannedJourney] = useState(false);
  // Code window for dropdown of journey. Can select none Planned journey i guess? 
  function getSelectionWindow() {
    return (<>
      <h4>Please select reference Journey:</h4>
      <Grid container spacing={2} >
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
  return (<div style={{
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
        paddingBottom: '30px',
        maxHeight: "100%",
        overflowY: "auto"
      }}>
      {!showSelection &&
        <>    

    <Container>
    {    props.JourneyList.length<1 && <>  <Row>
        <Col xs={12} lg={8} style={{ textAlign: 'left' }}> <h2>Welcome to the beta version of the CJML tool</h2></Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} style={{ textAlign: 'left' }}> <h5>Version: 2025-05-18</h5></Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} style={{ textAlign: 'left' }}>  <h4>To get started, please select one of the option below.</h4></Col>
      </Row>
      </>}
      <br></br> 
      <Row>
        <Col xs={12} sm ={12} lg={5} md = {6} style={{ textAlign: 'left' }}> <Button style={{width: "170px"}} onClick={() => {
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

            }} variant="contained">Draw journey</Button>
            <FormHelperText>Opens a blank canvas</FormHelperText>
             </Col>
            <Col xs={12} lg={4} sm ={5}  md = {4}  style={{ textAlign: 'left' }}><FormControlLabel control={<Checkbox onChange={() => { setIsPlannedJourney(!isPlannedJourney) }} checked={isPlannedJourney} />} label="Planned journey" /><br></br>
            <FormControlLabel control={<Checkbox onChange={() => { setIsPlannedJourney(!isPlannedJourney) }} checked={!isPlannedJourney} />} label="Actual journey" /></Col>
            <Col xs={12} sm ={4}  md = {4}  lg={4}  style={{ textAlign: 'left' }}> <FormHelperText>Use the graphical editor to draw your model. Actual journey is a good choice for new users</FormHelperText></Col>
      </Row>
      <br></br>
      {    props.JourneyList.length<1 && <> 
      <Row>
        <Col xs={6} lg={4} sm ={12}  md = {6}  style={{ textAlign: 'left' }}><Button style={{width: "170px"}}  onClick={() => { props.showModal(true); props.closeJourney(false) }} variant="contained">Import journey</Button>
        <FormHelperText>Upload an xCJML file</FormHelperText></Col>
        <Col xs= {3} sm ={4} lg={4}  md = {4} ><FormHelperText>The xCJML format is the standard file format for CJML models. It builds on XML and is used to save and load models</FormHelperText></Col>
      </Row> </>}
    </Container>
    

        </>}
      {showSelection && getSelectionWindow()}
    </section>

  </div>
  )
};

export default JourneySelection;
