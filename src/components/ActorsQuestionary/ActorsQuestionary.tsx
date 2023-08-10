import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import DeleteIcon from '@mui/icons-material/Delete';
import { Actors } from '../../Classes/Actors';
import { CJMLImage } from '../../Classes/CJMLImage';
import styles from './ActorsQuestionary.module.css';

interface ActorsQuestionaryProps {
  tempActors: any;
  CJMLImageList: any;
  setTempActors: any;
  GetImage: any;
  removeActor: any;
}



function ActorsQuestionary(props: ActorsQuestionaryProps) {

  const [OpenColor, ChangeOpenColorStatus] = useState<boolean[]>(Array(props.tempActors.length).fill(false));

  const options =
    props.CJMLImageList.Images[0].Images.map((y: CJMLImage) => {
      return {
        label: y.Name,
        value: y.Location
      }
    })


  function changeName(e: any, id: any) {
    var temp = props.tempActors;
    temp[id].Title = e.target.value;
    props.setTempActors(temp);
  }

  return (<div className={styles.ActorsQuestionary}>
    <form>
      {props.tempActors.map((x: Actors, index: number) => {

        return (
          <div style={{
            paddingTop:"20px"
          }
          }>
            <Grid container style={{background:"#f1f2f4",paddingBottom:"20px",borderRadius:"20px"}} spacing={2}>
            <Grid item xs={2}><h4>{x.isEndUser?"End User " + (index +1):"Actor " + (index + 1)}</h4></Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={2}> {!props.tempActors[index].isEndUser && <Button variant="outlined" onClick={() => props.removeActor(index)} startIcon={<DeleteIcon />}>
                Delete
              </Button>}</Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{x.isEndUser?"Actor type":"Actor role"}</InputLabel>
                  <Select
                    label={x.isEndUser?"Actor type":"Actor role"}
                    value={""}
                  >   {props.CJMLImageList.Images[0].Images.map((y: CJMLImage) => {
                    if(y.Default){
                    return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)}
                  })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}><TextField fullWidth label="Actors Name" defaultValue={x.Title} onInput={(e) => { changeName(e, index); }} />
              </Grid>

            </Grid>
            <hr></hr>
          </div>
        );
      })}

    </form>
    <Button onClick={() => {
      props.setTempActors([...props.tempActors, { Title: "Enter User Name", img: "", x: 200, y: 300, id: props.tempActors.length + 1, height: 150, width: 700, color: "#fff" }]);
      ChangeOpenColorStatus([...OpenColor, false]);
    }} >Add new Actor</Button>

  </div>);
}

export default ActorsQuestionary;

