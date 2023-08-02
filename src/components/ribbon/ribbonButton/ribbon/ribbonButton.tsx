import React, { FC, useState } from 'react';

interface RibbonRibbonButtonProps {
  text:any,
  onClickCommand:any
}


const RibbonRibbonButton: FC<RibbonRibbonButtonProps> = (props) => {
  const [hower, setHower] = useState(false)
return(
<div className={hower ? 'BarElementSelected' : 'BarElement'} style={{ float: "left", paddingBottom: "5px", left:"5px", cursor:"pointer" }} onMouseEnter={() => { setHower(true) }} onMouseLeave={() => { setHower(false) }} onClick={() => props.onClickCommand()}>
    <span className='BarText' style={{marginRight:"-13%", userSelect:"none"}}>{props.text}</span></div>
)};

export default RibbonRibbonButton;
