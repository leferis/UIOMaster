import { Button, FormControl, FormHelperText, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import DeleteIcon from '@mui/icons-material/Delete';
import { Actors } from '../../Classes/Actors';
import { CJMLImage } from '../../Classes/CJMLImage';
import styles from './ActorsQuestionary.module.css';
import _ from 'lodash';

interface ActorsQuestionaryProps {
  tempActors: any;
  CJMLImageList: any;
  setTempActors: any;
  GetImage: any;
  removeActor: any;
}



function ActorsQuestionary(props: ActorsQuestionaryProps) {

  const [OpenColor, ChangeOpenColorStatus] = useState<boolean[]>(Array(props.tempActors.length).fill(false));


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
            paddingTop: "20px"
          }
          }>
            <Grid container style={{ background: "#f1f2f4", paddingBottom: "30px", borderRadius: "20px" }} spacing={2} justifyContent="center"
              alignItems="center" rowSpacing={2}>
              <Grid item xs={2}><h2>{x.isEndUser ? "End User " + (index + 1) : "Actor " + (index + 1)}</h2></Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={2}> {!props.tempActors[index].isEndUser && <Button  color="error" variant="outlined" onClick={() => props.removeActor(index)} startIcon={<DeleteIcon />}>
                Delete
              </Button>}</Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{x.isEndUser ? "End user type" : "Actor role"}</InputLabel>
                  <Select
                    label={!x.isEndUser ? "End user type" : "Actor role"}
                    defaultValue={x.img}
                    onChange={(e: any) => {
                      let tempt = _.cloneDeep(props.tempActors);
                      tempt[index].img = e.target.value;
                      props.setTempActors(tempt);
                    }}
                  >   {props.CJMLImageList.Images[0].Images.map((y: CJMLImage) => {
                    if (y.Default) {
                      return (<MenuItem value={y.Location}><ListItemIcon><img style={{width:"20px", height:"20px",paddingRight:"8px"}} src={y.Location}/><ListItemText primary={y.Name} style={{color:"black"}}/></ListItemIcon></MenuItem>)
                    }
                  })}
                  </Select>
                  <FormHelperText>User's role in journey</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}><TextField fullWidth label="Actors Name" defaultValue={x.Title} onInput={(e) => { changeName(e, index); }} />
              <FormHelperText>Name is used to identify user</FormHelperText>
              </Grid>
          
            </Grid>
            <hr></hr>
          </div>
        );
      })}

    </form>
   
    <br></br>

    <Button style={{position:"absolute", left:"50px"}} variant="outlined" onClick={() => {
      props.setTempActors([...props.tempActors, { Title: "Enter actor's name", img: "", x: 200, y: 300, id: props.tempActors.length + 1 + 2000, height: 130, width: 700, color: "#fff" }]);
      ChangeOpenColorStatus([...OpenColor, false]);
    }} >Add new Actor</Button>
        <br></br><h5 style={{position:"absolute", left:"60px"}}>Actors' colour representations can be changed in settings</h5>
    <br></br>
    <br></br>
    
  </div>);
}

export default ActorsQuestionary;

