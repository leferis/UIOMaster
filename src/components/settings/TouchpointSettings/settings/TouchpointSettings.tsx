import React, { FC } from 'react';
import styles from './TouchpointSettings.module.css';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Actors } from '../../../../Classes/Actors';
import { CJMLImage } from '../../../../Classes/CJMLImage';
import { CJMLCircle } from '../../../../Classes/CJMLCircle';

interface SettingsTouchpointSettingsProps {
  Images:any;
  circles:any;
  updateCircles:any;
}

function SettingsTouchpointSettings(props:SettingsTouchpointSettingsProps){
  return (<>
    {props.circles.map((x: CJMLCircle, index: number) => {
      return (<Grid container style={{background:"#f1f2f4",paddingBottom:"30px",borderRadius:"20px"}} spacing={2}   justifyContent="center"
      alignItems="center" rowSpacing={2}>
        <Grid item xs={2}> <h3>{"Touchpoint " + index}</h3></Grid>
        <Grid item xs={9}/>
        
        <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">{"Touchpoint visualization"}</InputLabel>
                  <Select
                    label={"Touchpoint visualization"}
                    defaultValue={x.imageName}
                    onChange={(e: any) => {
                      let tempt = props.circles;
                      tempt[index].imageName = e.target.value;
                      props.updateCircles(JSON.parse(JSON.stringify(tempt)));
                    }}
                  >   {props.Images.Images[1].Images.map((y: CJMLImage) => {
                    return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)
                  })}
                  </Select>
                  <FormHelperText>Image that will be visualized for initiator's touchpoint</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">{"Touchpoint visualization"}</InputLabel>
                  <Select
                    label={"Touchpoint visualization"}
                    defaultValue={x.imageNameReceiver}
                    onChange={(e: any) => {
                      let tempt = props.circles;
                      tempt[index].imageNameReceiver = e.target.value;
                      props.updateCircles(JSON.parse(JSON.stringify(tempt)));
                    }}
                  >   {props.Images.Images[1].Images.map((y: CJMLImage) => {
                    return (<MenuItem value={y.Location}>{y.Name}</MenuItem>)
                  })}
                  </Select>
                  <FormHelperText>Image that will be visualized for receiver's touchpoint</FormHelperText>
                </FormControl>
              </Grid>
      </Grid>)
    }
    )
    }
  </>)}

export default SettingsTouchpointSettings;
