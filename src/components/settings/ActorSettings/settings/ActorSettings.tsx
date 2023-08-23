import React, { FC, useState } from 'react';
import styles from './ActorSettings.module.css';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { Actors } from '../../../../Classes/Actors';
import { CJMLImage } from '../../../../Classes/CJMLImage';
import _ from 'lodash';

interface SettingsActorSettingsProps {
  actors: any;
  setTempActors:any;
  Images:any;
}

function SettingsActorSettings(props: SettingsActorSettingsProps) {

  const [OpenColor, ChangeOpenColorStatus] = useState<boolean[]>(Array(props.actors.length).fill(false));

  return (<>
    {props.actors.map((x: Actors, index: number) => {
      return (<Grid container style={{background:"#f1f2f4",paddingBottom:"30px",borderRadius:"20px"}} spacing={2}   justifyContent="center"
      alignItems="center" rowSpacing={2}>
        <Grid item xs={2}> <h3>{x.Title}</h3></Grid>
        <Grid item xs={9}/>
        <Grid item xs={5}>
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
              position: "relative"
            }}
              label={"Color"}
              helperText={"Color which will be used to distinguish actor"}
              defaultValue={x.color} onInput={(e: any) => {
                var temp = props.actors;
                temp[index].color = e.target.value;
                props.setTempActors(temp);
              }}></TextField></>
          }{OpenColor[index] == true && <HexColorPicker
            color={x.color ? x.color : "#fff"}
            onChange={(e) => {
              console.log(x.color);
              var temp = props.actors;
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
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">{x.isEndUser?"Actor type":"Actor role"}</InputLabel>
                  <Select
                    label={x.isEndUser?"Actor type":"Actor role"}
                    defaultValue={x.img}
                    onChange={(e: any) => {
                      let tempt = _.cloneDeep(props.actors);
                      tempt[index].img = e.target.value;
                      props.setTempActors(tempt);
                    }}
                  >   {props.Images.Images[0].Images.map((y: CJMLImage) => {
                    return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)
                  })}
                  </Select>
                  <FormHelperText>Image that will be visualized for actor</FormHelperText>
                </FormControl>
              </Grid>
      </Grid>)
    }
    )
    }
  </>)
}

export default SettingsActorSettings;
