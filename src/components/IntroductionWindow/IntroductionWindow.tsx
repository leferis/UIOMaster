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
           

           <h2>CJML Analyzer</h2>
           <h3> Video to check how to use</h3>
           <iframe width="560" height="315" src="https://www.youtube.com/embed/f2Mrq8v2X0s?controls=0&amp;controls=0" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
          <br></br>
           <Button variant="contained" onClick={() => {
            {props.closeIntro(false);
            props.showSelection(true);}
           }}>Close</Button>
    </section>

  </div>)
  }

export default IntroductionWindow;
