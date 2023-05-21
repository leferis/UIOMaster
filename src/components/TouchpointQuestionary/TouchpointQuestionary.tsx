import React, { FC } from 'react';
import { Label } from 'react-konva';
import { Actors } from '../../Classes/Actors';
import { CJMLImage } from '../../Classes/CJMLImage';
import { ExternalEnumerator } from '../../enumerator/ExternalEnumerator';
import { TouchPointStatus } from '../../enumerator/TouchPointStatus';
import styles from './TouchpointQuestionary.module.css';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
interface TouchpointQuestionaryProps {
  CJMLImageList: any;
  TouchPoints: any;
  actions: any;
  actors: any;
  updateTouhcPoints: any;
  isPanned: any;
  GetImage: any;
  removeTouchpoint: any;
  swapTouchpoints: any;
  removeTouncpoint: any;
}

function TouchpointQuestionary(props: TouchpointQuestionaryProps) {

  function checkIfErrorous(x:any, key:string):boolean{
    if(x.issues != undefined){
    return x.issues[key] == "" || x.issues[key] == undefined? false: true;
    }else{
      return false;
    }
  }
  return (
    <div className={styles.TouchpointQuestionary}>
      {props.TouchPoints.map((x: any, index: number) => {
        return (
          <>
            <Grid style={{
              background: index % 2 == 0 ? "#fff" : "#f1f2f4"
            }} container spacing={2} >
              <Grid item xs={8}></Grid>
              <Grid item xs={1}> {index != 0 && <Tooltip title={"Up"}>
                <IconButton aria-label="Up" size="large" onClick={() => { props.swapTouchpoints(index, 'up') }} ><ArrowUpwardIcon /></IconButton>
              </Tooltip>}</Grid>
              <Grid item xs={1}> {index + 1 != props.TouchPoints.length && <Tooltip title={"Down"}>
                <IconButton aria-label="Down" size="large" onClick={() => { props.swapTouchpoints(index, 'down') }}><ArrowDownwardIcon /></IconButton>
              </Tooltip>}</Grid>
              <Grid item xs={2}> <Button variant="outlined" onClick={() => props.removeTouchpoint(index)} startIcon={<DeleteIcon />}>
                Delete
              </Button>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Initiator</InputLabel>
                  <Select
                    label="Initiator"
                    error= {checkIfErrorous(x,"initiatorError")}
                    value={x.initiator.id} // try feeding name instead of value 
                    onChange={(e: any) => {// Need to find it by ID
                      if (e.eventPhase == 0) {
                        let tempt = props.TouchPoints;
                        tempt[index].initiator = props.actors.find((x: Actors) => { return x.id == e.target.value });
                        console.log(tempt);
                        props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                      }
                    }}
                  >
                    {props.actors.map((y: Actors) => {
                      return (<MenuItem value={y.id}>{y.Title}</MenuItem>)
                    })}
                  </Select>
                  {checkIfErrorous(x,"initiatorError") && <FormHelperText error >{x.issues["initiatorError"]}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Initiator's label" value={x.text} 
                error= {checkIfErrorous(x,"initiatortextError")} 
                helperText={x.issues != undefined && x.issues["initiatortextError"] != undefined?x.issues["initiatortextError"] :""}
                onChange={(e: any) => {
                  let tempt = props.TouchPoints;
                  tempt[index].text = e.target.value;
                  props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                }} />
              </Grid>
              {x.receiver != undefined && <><Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Receiver</InputLabel>
                  <Select
                    label="Receiver"
                    error= {checkIfErrorous(x,"receiverError")}
                    value={x.receiver.id} // try feeding name instead of value 
                    onChange={(e: any) => {// Need to find it by ID

                      let tempt = JSON.parse(JSON.stringify(props.TouchPoints));
                      tempt[index].receiver = props.actors.find((x: Actors) => { return x.id == e.target.value });
                      console.log(tempt);
                      props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));

                    }}
                  >
                    {props.actors.map((y: Actors) => {
                      return (<MenuItem value={y.id}>{y.Title}</MenuItem>)
                    })}
                  </Select>
                  {checkIfErrorous(x,"receiverError") && <FormHelperText error >{x.issues["receiverError"]}</FormHelperText>}
                </FormControl>
              </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Receiver's label" value={x.receiverText}
                  error= {checkIfErrorous(x,"reciversTextError")} 
                  helperText={x.issues != undefined && x.issues["reciversTextError"] != undefined?x.issues["reciversTextError"] :""}
                  onChange={(e: any) => {
                    let tempt = props.TouchPoints;
                    tempt[index].receiverText = e.target.value;
                    props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                  }} />
                </Grid> </>}
                {x.receiver != undefined && <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Channel</InputLabel>
                  <Select
                    label="Channel"
                    error= {checkIfErrorous(x,"channelError")}
                    labelId="demo-simple-select-label"
                    value={x.imageName}
                    onChange={(e: any) => {
                      let tempt = props.TouchPoints;
                      tempt[index].imageName = e.target.value;
                      props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                    }}
                  >
                    {props.CJMLImageList.Images[1].Images.map((y: CJMLImage) => {
                      return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)
                    })}

                  </Select>
                  {checkIfErrorous(x,"channelError") && <FormHelperText error >{x.issues["channelError"]}</FormHelperText>}
                </FormControl>
              </Grid>}

              {x.receiver != undefined && <Grid item xs={6}><FormGroup>
                <FormControlLabel labelPlacement="top" control={<Checkbox
                  defaultChecked={x.devation}
                  onChange={(e: any) => {
                    console.log(e.target.checked);
                    let tempt = props.TouchPoints;
                    tempt[index].devation = e.target.checked;
                    props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                  }} />} label={"Devation"} /> </FormGroup></Grid>}
                     {x.receiver != undefined && <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    label="Status"
                    value={x.Status} // try feeding name instead of value
                    onChange={(e: any) => {
                      let tempt = props.TouchPoints;
                      tempt[index].Status = e.target.value;
                      props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                    }}
                  >
                    <MenuItem value={TouchPointStatus.Completed}>Completed</MenuItem>
                    <MenuItem value={TouchPointStatus.Missing}>Missing</MenuItem>
                    <MenuItem value={TouchPointStatus.Failing}>Failing</MenuItem>
                    <MenuItem value={TouchPointStatus.AdHoc}>AdHoc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>}  
              {x.receiver != undefined && <Grid item xs={6}> <FormGroup>
                <FormControlLabel labelPlacement="top" control={<Checkbox
                  //label="External"
                  defaultChecked={x.external}
                  onChange={(e: any) => {
                    let tempt = props.TouchPoints;
                    tempt[index].external = e.target.checked;
                    props.updateTouhcPoints(JSON.parse(JSON.stringify(tempt)));
                  }}
                />} label="External" />

              </FormGroup>
              </Grid>}
              
           
              <Grid item xs={12}>
                <TextField label="Time Consumed" type="datetime-local" value={x.timestamp} />
              </Grid>
            </Grid>
            <hr></hr>
          </>)

      })}

      <Grid>
        <Grid item xs={8}>
          <Button onClick={() => {
            props.updateTouhcPoints([...props.TouchPoints, { id: -1, x: 0, y: 0, Capacity: true, Status: TouchPointStatus.Completed, width: 20, height: 0, text: "Touchpoint", external: ExternalEnumerator.Internal, imageName: "", initiator: -1, initiatorColor: "#000", devation: false, receiver: -1, receiverText: "" }])
          }} >Add new Touchpoint</Button>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={() => {
            props.updateTouhcPoints([...props.TouchPoints, { id: -1, x: 0, y: 0, Capacity: true, Status: TouchPointStatus.Completed, width: 20, height: 0, text: "Touchpoint", external: ExternalEnumerator.Internal, imageName: "", initiator: -1, initiatorColor: "#000", devation: false, receiver: undefined, receiverText: "" }])
          }}>Add new Action</Button>
        </Grid>

      </Grid>
    </div>

  );
}

export default TouchpointQuestionary;