import React, { FC, useState } from 'react';
import styles from './Legend\\ActorRepresentation.module.css';
import { Html } from 'react-konva-utils';
import { Grid, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Actors } from '../../../../Classes/Actors';

interface LegendActorRepresentationProps {
  x:any;
  y:any;
  actors:Actors;
  index:any;
  setAcotrsName:any;
 }

function LegendActorRepresentation(props: LegendActorRepresentationProps) {
  const [editMode, setEdit] = useState(false);
  const [userName, setUserName] = useState(props.actors.Title)
  return (<Html groupProps={{ x: props.x , y: props.y+ props.index * 65, width: 400, height: 300 }} >
    <div style={{ display: "block" }}>
      <Grid container  >
        <Grid sm={2} item ><img src={props.actors.img} style={{height:20,width:20, paddingTop:20, paddingLeft:20, paddingRight:20}}></img></Grid>

        {!editMode && 
        <>
         <Grid sm={4} item minWidth={140} ><h4>{props.actors.Title}</h4></Grid>
         <Grid xs={1} item></Grid>
        <Grid sm={1} item alignSelf={"center"}><IconButton onClick={() => { setEdit(true) }} color="secondary" aria-label="Edit">
          <EditIcon />
        </IconButton></Grid></>}
        {editMode &&
          <>
          <Grid sm={4} item ><TextField  id="outlined-basic" label="Actor's name" variant="outlined" defaultValue={props.actors.Title}   onChange={(e: any) => {
                    setUserName(e.target.value);
                  }}/></Grid>
            <Grid xs={1} item alignSelf={"center"}> <IconButton onClick={() => { setEdit(false); props.setAcotrsName(userName)}} color="secondary" aria-label="Save">
              <SaveIcon />
            </IconButton></Grid>
            <Grid xs={1} item alignSelf={"center"}> <IconButton onClick={() => { setEdit(false); setUserName(props.actors.Title)}} color="secondary" aria-label="Cancel">
              <CloseIcon />
            </IconButton></Grid>
          </>}
      </Grid>
    </div>
  </Html>)
}

export default LegendActorRepresentation;
