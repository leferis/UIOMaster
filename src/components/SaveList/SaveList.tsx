import React, { FC, useState } from 'react';
import styles from './SaveList.module.css';
import { Button, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getSaves, load } from '../../saving/localMemory';

interface SaveListProps {
  showSaveList: any
  closeSaveList: any
  setJourneys:any;
  switchJourneys:any;
  setNewID:any;
}
function SaveList(props: SaveListProps) {
  const showHideClassName = props.showSaveList ? "modal display-block" : "modal display-none";
  const [selected, setSelected] = useState("");
  let saves = getSaves();
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
        style={{
          position: 'fixed',
          background: 'white',
          width: '50%',
          height: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          paddingBottom: '  30px',
          maxHeight: "100%",
          overflowY: "auto"
        }}>
        <List  style={{maxWidth:"360px"}}>
          {saves.map((xss: any) => {
            return (<><ListItemButton onClick={() => setSelected(xss)}>
              <ListItemText 
                primary={xss}
              />
            </ListItemButton>
</>
          )
          })}
        </List>
        <Button variant="contained" color="success" onClick={() => { load(props.setJourneys,props.switchJourneys, selected, props.setNewID) }}>Load</Button>
        <Button variant="contained" color="success" onClick={() => { props.closeSaveList(false) }}>Close</Button>
      </section>
    </div>
  )
}
export default SaveList;