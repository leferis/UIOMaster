import React, { FC } from 'react';
import V2parse from '../../XMLParsing/V2/v2.parser';
import './ModaWindow.module.css'
import { FileUploader } from "react-drag-drop-files";
import { Button } from '@mui/material';


interface ModaWindow {
  show: boolean,
  handleClose: any,
  setJourneys: any,
  getImage: any,
  updateCurrentJourney: any,
  Journeys: any,
  ShowSelectionWindow: any;
}

const fileTypes = ["XCJML", "XML"];


function ModaWindow(props: ModaWindow) {

  function upload(e: any) {
    console.log(e);
  

      let reader = new FileReader();

      reader.onload = () => {
        var journey = V2parse(reader.result, props.getImage);
        props.setJourneys(journey);
        props.updateCurrentJourney(journey);
      };

      reader.readAsText(e);

      props.handleClose(false);
    
  }
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)'
    }}>
      <section className="modal-main"
        style={{
          position: 'fixed',
          background: 'white',
          width: '40%',
          height: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          paddingBottom: '30px'
        }}>

        <h4 style={{  display: "flex",
    justifyContent: "center",
    alignItems: "center" }}>Upload File</h4>
         
        <br></br>
        <div style={{   display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
         <FileUploader handleChange={upload} name="file" types={fileTypes} multiple={false} />
         </div>
        <div style={{paddingTop:"2%", display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
        <Button style={{width: "120px"}}  onClick={() => {
            props.handleClose(false);
            console.log(props.Journeys.length)
            if (props.Journeys.length == 0) {
              props.ShowSelectionWindow(true);
            }
          }} variant="contained">Close</Button>

        </div>
      </section>

    </div>);
}

export default ModaWindow;
