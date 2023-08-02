import React, { FC, useState } from 'react';
import styles from './ribbon/dropDownButton.module.css';

interface RibbonDropDownButtonProps {
  onhower: any;
  onClickCommand: any;
  text: any;
}



const RibbonDropDownButton: FC<RibbonDropDownButtonProps> = (props) => {
  const [hower, setHower] = useState(false)
  return (<div className={hower ? 'BarElementSelected' : 'BarElement'} style={{ display: props.onhower ? "inline" : "none", float: "left", paddingBottom: "5px", minWidth: "50%" }} onMouseEnter={() => { setHower(true) }} onMouseLeave={() => { setHower(false) }}
    onClick={() => props.onClickCommand()}>
    <span className='BarText' style={{ display: "inline-block", background: "#fcfcfd", minWidth: "100%", minHeight: "100%", marginTop: "-15px", top: "10px", textAlign: "justify", userSelect:"none", cursor: "pointer" }}>{props.text}</span><br></br></div>
  )
};

export default RibbonDropDownButton;
