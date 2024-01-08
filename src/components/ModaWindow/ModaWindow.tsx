import React, { FC } from 'react';
import V2parse from '../../XMLParsing/V2/v2.parser';
import './ModaWindow.module.css'

interface ModaWindow { show: boolean, 
  handleClose: any, 
  setJourneys:any, 
  getImage:any,
  updateCurrentJourney:any,
  Journeys:any,
  ShowSelectionWindow:any; }

function ModaWindow(props: ModaWindow) {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";


  function upload(e: any) {
    Array.from(e.target.files).forEach((file: any) => {

      let reader = new FileReader();

      reader.onload = () => {
        var journey = V2parse(reader.result, props.getImage);
        props.setJourneys(journey);
        props.updateCurrentJourney(journey);
      };
      
      reader.readAsText(file);
      
      props.handleClose(false);
    }
    
    );
  }
  return (
    <div className={showHideClassName} style={{
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
        width: '40%',
        height: 'auto',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)',
        paddingBottom:'30px'
        }}>
           <h4>Upload File</h4>
        <input type="file"
          id="file1"
          name="upload" onChange={upload}  accept=".xml, .xcjml"/>
        <br></br>
        <button type="button" onClick={() => {props.handleClose(false);
        console.log(props.Journeys.length)
        if(props.Journeys.length == 0 ){
          props.ShowSelectionWindow(true);
        }}}>
          Close
        </button>
      </section>

    </div>);
}

export default ModaWindow;
