import { Button } from '@mui/material';
import React, { FC } from 'react';


interface HelpProps {
   showHelp:any;
   closeHelp:any;
}

function Help(props:HelpProps){

   return (<div style={{
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
             
  
             <h2>CJML Editor</h2>
             <h3>About the CJML Analyzer</h3>
             <p>The CJML Analyzer is used to create, edit, and analyze customer journey diagrams. To begin, users can either import an existing CJML file or create a new diagram. The interface allows users to add and organize actors and touchpoints that represent the different interactions within a customer journey. Touchpoints can be created by clicking or dragging elements into the diagram and can represent actions, communication points, or other interactions. Each touchpoint can then be edited by changing its description, initiator, receiver, communication channel, and other relevant details.</p>
             <p>The tool also allows users to define and manage different journeys within a diagram. Information can be entered directly into the visual diagram or through a form, providing a convenient alternative for adding and editing data. Users can mark deviations or issues in a journey and use the analysis features to review statistics and identify important patterns. Different diagram and journey views can be selected to examine the information from various perspectives. Once the work is complete, the diagram can be saved as a CJML file for future editing or exported as a PNG image for sharing and presentation purposes. Overall, the CJML Analyzer provides a structured way to build, modify, analyze, and document customer journeys.</p>
            <h6><a href='https://cjml.no'> You can find additional information, documentation, and updates on www.cjml.no, especially in the CJML Tools and Introduction modules.</a></h6>
             <Button variant="contained" onClick={() => {
              {props.closeHelp(false);}
             }}>Close</Button>
      </section>
  
    </div>)
}

export default Help;
