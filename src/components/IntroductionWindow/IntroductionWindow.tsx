import { Button } from '@mui/material';
import React, { FC } from 'react';
import styles from './IntroductionWindow.module.css';

interface IntroductionWindowProps {
  showIntro:any;
  closeIntro:any;
  showSelection:any;
}

function IntroductionWindow(props: IntroductionWindowProps){
  const showHideClassName = props.showIntro ? "modal display-block" : "modal display-none";
return(<div className={showHideClassName} style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)'
  }}>
  
    <section className="modal-main" 
    style={{ position:'fixed',
      background: 'white',
      width: '30%',
      height: 'auto',
      top:'50%',
      left:'50%',
      transform: 'translate(-50%,-50%)',
      paddingBottom:'30px',
      maxHeight:"100%",
      overflowY:"auto"
      }}>
           

           <h2>CJML Drawing tool</h2>
           <h3>This tool allows you to create, edit and export CJML diagrams</h3>
           <h3> To read more about CJML: cjml.no</h3>
           <Button variant="contained" onClick={() => {
            {props.closeIntro(false);
            props.showSelection(true);}
           }}>Close</Button>
    </section>

  </div>)
  }

export default IntroductionWindow;
