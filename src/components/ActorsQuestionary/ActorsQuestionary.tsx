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
            background: index %2 == 0?"#fff":"#f1f2f4"
          }
          }>
            <Grid container spacing={2}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}> <Button variant="outlined" onClick={() => props.removeActor(index)} startIcon={<DeleteIcon />}>
                Delete
              </Button></Grid>
              <Grid item xs={6}><TextField fullWidth label="Actors Name" defaultValue={x.Title} onInput={(e) => { changeName(e, index); }} />
              </Grid>
              <Grid item xs={6}>
                {!OpenColor[index] && <><div
                  className="swatch"
                  onClick={() => {

                    const temp = OpenColor.map((x, indexX) => {
                      if (indexX == index) {
                        return true;
                      }
                      return false;
                    })

                    ChangeOpenColorStatus(temp);
                  }}
                  style={{
                    background: x.color ? x.color : "#fff",
                    width: "18px",
                    height: "18px",
                    borderRadius: "8px",
                    border: "3px solid #fff",
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    display: "inline-block"
                  }} />
                  <TextField style={{
                    width: '70%', left: "10px",
                    bottom: "7px",
                    position: "relative"
                  }} 
                  label={"Color"}
                  helperText={"Color which will be used to distinguish Actors"}
                  value={x.color} onInput={(e: any) => {
                    var temp = props.tempActors;
                    temp[index].color = e.target.value;
                    props.setTempActors(temp);
                  }}></TextField></>
                }{OpenColor[index] == true && <HexColorPicker
                  color={x.color ? x.color : "#fff"}
                  onChange={(e) => {
                    console.log(x.color);
                    var temp = props.tempActors;
                    temp[index].color = e;
                    props.setTempActors(temp);
                    console.log(temp);
                  }}
                  onDoubleClick={(e) => {
                    const temp = OpenColor.map((x, indexX) => {
                      if (indexX == index) {
                        return false;
                      }
                      return false;
                    })
                    ChangeOpenColorStatus(temp);
                  }}></HexColorPicker>}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Actor type</InputLabel>
                  <Select
                    label="Actor type"
                    value={""}
                  >   {props.CJMLImageList.Images[1].Images.map((y: CJMLImage) => {
                    return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)
                  })}
                  </Select>
                </FormControl>
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

