import { Button } from '@mui/material';
import React, { FC } from 'react';


interface HelpProps {
   showHelp:any;
   closeHelp:any;
}

function Help(props:HelpProps){
   const showHideClassName = props.showHelp ? "modal display-block" : "modal display-none";
   return (<div className={showHideClassName} style={{
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
            <br></br>
            <h4><a href='https://cjml.no/cjml-guiding-principles/'>Here you can read more about principles of CJML</a></h4>
            <h4><a href='https://cjml.no/diagram-types/'>Here you can read more about diagram types</a></h4>
            <h4><a href='https://cjml.no/cjml/'>Here you can read more about CJML 2.0</a></h4>
             <Button variant="contained" onClick={() => {
              {props.closeHelp(false);}
             }}>Close</Button>
      </section>
  
    </div>)
}

export default Help;
