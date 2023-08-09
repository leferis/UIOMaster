import React, { FC } from 'react';
import styles from './ribbon/ChangeBar/CheckBoxChange.module.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

interface RibbonChangeBarCheckBoxChangeProps {
  text: any;
  value: any;
}

function RibbonChangeBarCheckBoxChange(props: RibbonChangeBarCheckBoxChangeProps) {
  return (<div style={{ display:"inline-block"}}>
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox checked={props.value} />}
          label={props.text}
          labelPlacement="bottom"
        />
      </FormGroup>
    </FormControl>
  </div>)
};

export default RibbonChangeBarCheckBoxChange;
