import { Button, IconButton, Tab, Tabs } from '@mui/material';
import React, { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Actors } from '../../Classes/Actors';
import { Connectable } from '../../Interface/Connectable';
import ActorsQuestionary from '../ActorsQuestionary/ActorsQuestionary';
import TouchpointQuestionary from '../TouchpointQuestionary/TouchpointQuestionary';
import styles from './Questionary.module.css';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { toast } from 'react-toastify';
import { createArrows } from '../../Functions/Switching';


interface QuestionaryProps {
  showQuestionary: any,
  handleClose: any,
  actors: any,
  CJMLImageList: any,
  actions: any,
  circles: any;
  isPlanned: any;
  setCircles: any;
  setActions: any;
  setActors: any;
  GetImage: any;
  setArrows: any;
  swimlaneMode: any;
  arrowsId: any;
  setInitialArrowID: any;
}

function Questionary(props: QuestionaryProps) {

  const [ActorSelect, setActorSelect] = useState<boolean>(true);
  const [ToucpointSelect, setTouchpointSelect] = useState<boolean>(false);
  const [TouchPointsTemp, setTouchPointTemp] = useState<any>(JSON.parse(JSON.stringify(props.circles)).concat(JSON.parse(JSON.stringify(props.actions))).sort((a: Connectable, b: Connectable) => { return a.x - b.x }));
  const [tempActors, setTempActors] = useState(JSON.parse(JSON.stringify(props.actors)));
  const [activeTab, setActiveTab] = React.useState(0);
  const showHideClassName = props.showQuestionary ? "modal display-block" : "modal display-none";

  function ClosingValidation() {

    if (checkTouchPoints()) {
      reassignActors();
      assignIdAndLocation();
      props.handleClose(false);
    }

  }
  function reassignActors() {
    const updatetActors = tempActors.map((actor: Actors, index: number) => {
      actor.y = (index + 1) * 200;
      actor.width = TouchPointsTemp.length * 270;
      return actor;
    });
    props.setActors(updatetActors);

    let touch = TouchPointsTemp;
    for (let i = 0; i < touch.length; i++) {
      for (let j = 0; j < updatetActors.length; j++) {
        if (touch[i].initiator.id == updatetActors[j].id) {
          touch[i].initiator = updatetActors[j];
        }
        if (touch[i].receiver != undefined) {
          if (touch[i].receiver.id == updatetActors[j].id) {
            touch[i].receiver = updatetActors[j];
          }
        }
      }
    }
    setTouchPointTemp(touch);
  }

  function assignIdAndLocation() {
    var touchPoints: any[] = [];
    var actions: any[] = [];
    let id = 0;
    let x = 400;
    let devationY = 500
    let swimLaneX = 400;
    TouchPointsTemp.forEach((element: any) => {
      let elementCopy = element;
      elementCopy.id = id;
      id++;
      if (element.receiver == undefined) {
        elementCopy.x = x;
        elementCopy.swimlaneX = swimLaneX;
        swimLaneX += 225;
        elementCopy.swimlaneY = elementCopy.initiator.y + elementCopy.initiator.height / 2;
        x += 150;
        if (!props.swimlaneMode) {
          elementCopy.y = elementCopy.initiator.y + 20;
        }
        else {
          elementCopy.y = elementCopy.initiator.y + 36;
        }
        actions.push(elementCopy);
      }
      else {
        if (elementCopy.devation) {
          elementCopy.x = x;
          elementCopy.y = devationY;
          elementCopy.swimlaneX = swimLaneX;
          elementCopy.swimlaneY = elementCopy.initiator.y + 20;
          elementCopy.swimlaneReceiverY = elementCopy.receiver.y + 20;
          swimLaneX += 225;
          devationY += 100;
        } else {
          elementCopy.x = x;
          x += 150;
          elementCopy.swimlaneX = swimLaneX;
          elementCopy.swimlaneY = elementCopy.initiator.y + 20;
          elementCopy.swimlaneReceiverY = elementCopy.receiver.y + 20;
          swimLaneX += 225;
          devationY = 500;
          elementCopy.y = elementCopy.initiator.isEndUser ? elementCopy.initiator.y + elementCopy.initiator.height / 2 : elementCopy.receiver.y + elementCopy.receiver.height / 2; // Choose endUser 
        }
        touchPoints.push(elementCopy);
      }
    });
    props.setActions(actions);
    props.setCircles(touchPoints);
    props.setArrows([]);
    let objects = JSON.parse(JSON.stringify(actions)).concat(JSON.parse(JSON.stringify(touchPoints)));
    objects.sort((a: CJMLCircle, b: CJMLCircle) => {
        return a.swimlaneX - b.swimlaneX
    });
    createArrows(objects, props.arrowsId, props.setInitialArrowID, props.setArrows)
  }

  function removeActors(index: number) {
    let left = tempActors.slice(0, index);
    let right = tempActors.slice(index + 1);
    setTempActors([...left, ...right]);
  }
  function removeTouncpoint(index: number) {
    let left = TouchPointsTemp.slice(0, index);
    let right = TouchPointsTemp.slice(index + 1);
    setTouchPointTemp([...left, ...right]);
  }


  function checkTouchPoints() {
    let continueProcess = true;
    let temp = TouchPointsTemp.map((element: any, index: number) => {
      const issueElements: { [key: string]: string } = {};
      element.issues = [];
      if (element.receiver != null) {
        if (element.imageName == "") {
          issueElements["channelError"] = ("Channel is missing")
        }
        let check = tempActors.find((x: Actors) => {
          return x.id == element.initiator.id;
        });
        if (check == undefined) {
          issueElements["initiatorError"] = ("Initiator is missing")
        }
        if (element.receiver != null) {
          check = tempActors.find((x: Actors) => {
            return x.id == element.receiver.id;
          });
        }
        if (check == undefined) {
          issueElements["receiverError"] = ("Receiver is missing")
        }
      }
      if (element.text.trim() == "") {
        issueElements["initiatortextError"] = ("Initiator's text is missing")
      }
      if (element.receiver != null) {
        if (element.receiverText.trim() == "") {
          issueElements["reciversTextError"] = ("Receiver's text is missing")
        }
      }
      if (Object.entries(issueElements).length > 0) {
        continueProcess = false;
      }
      element.issues = issueElements;
      console.log(element)
      return element
    });
    setTouchPointTemp(temp);
    if (!continueProcess) {
      toast.error("There are issues with communication points", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    }
    return continueProcess;
  }

  function removeTouchpoint(index: number) {
    let left = TouchPointsTemp.slice(0, index);
    let right = TouchPointsTemp.slice(index + 1);
    setTouchPointTemp([...left, ...right]);
  }
  function swapTouchpoints(index: any, side: any) {
    let swapIndex = index;
    if (side == 'up') {
      swapIndex -= 1;

      const newItems = [...TouchPointsTemp];
      [newItems[swapIndex], newItems[index]] = [newItems[index], newItems[swapIndex]];
      setTouchPointTemp(newItems.map((x) => { return x }));
    } else {
      ;
      swapIndex += 1;

      const newItems = [...TouchPointsTemp];
      [newItems[swapIndex], newItems[index]] = [newItems[index], newItems[swapIndex]];
      setTouchPointTemp(newItems.map((x) => { return x }));
    }

  }

  return (<div className={showHideClassName} style={{
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
      <div style={{ float: "right" }}>
        <IconButton aria-label="Up" size="large" onClick={() => { props.handleClose(false); }} ><CloseIcon /></IconButton>
      </div>
      <Tabs
        value={activeTab}
        onChange={(event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
      >
        <Tab onClick={() => { setActorSelect(true); setTouchpointSelect(false); }} label="Actors"></Tab>
        <Tab onClick={() => { setTouchpointSelect(true); setActorSelect(false); }} label="Toucpoints / Actions"></Tab>
      </Tabs>
      {ActorSelect && <ActorsQuestionary tempActors={tempActors} setTempActors={setTempActors} CJMLImageList={props.CJMLImageList} GetImage={props.GetImage} removeActor={removeActors}></ActorsQuestionary>}
      {ToucpointSelect && <TouchpointQuestionary GetImage={props.GetImage} actors={tempActors} CJMLImageList={props.CJMLImageList} TouchPoints={TouchPointsTemp} updateTouhcPoints={setTouchPointTemp} actions={JSON.stringify(props.actions)}
        isPanned={props.isPlanned} removeTouchpoint={removeTouchpoint} swapTouchpoints={swapTouchpoints} removeTouncpoint={removeTouncpoint}></TouchpointQuestionary>}

      <Button variant="contained" color="success" onClick={() => ClosingValidation()}>Save</Button>

    </section>

  </div>)
}

export default Questionary;
