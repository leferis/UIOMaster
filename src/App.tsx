import React, { useRef, useState } from 'react';
import './App.css';
import { Stage, Layer, Star, Text, Circle, Image as KonvaImage, Arrow, Rect } from 'react-konva';
import LeftMeniu from './components/leftMeniu/leftMeniu';
import { CJMLCircle } from './Classes/CJMLCircle';
import TouchPoint from './components/TouchPoint/TouchPoint';
import { CJMLArrow } from './Classes/CJMLArrow';
import { Actors } from './Classes/Actors';
import ActorPoint from './components/ActorPoint/ActorPoint';
import Settings from './components/settings/settings';
import CJMLImages from './assets/CJMLImages.json'
import { TouchPointStatus } from './enumerator/TouchPointStatus';
import { CJMLAction } from './Classes/CJMLAction';
import ActionPoints from './components/ActionPoints/ActionPoints';
import { Connectable } from './Interface/Connectable';
import ArrowComponent from './components/ArrowComponent/ArrowComponent';
import { ExternalEnumerator } from './enumerator/ExternalEnumerator';
import Deviation from './components/deviation/deviation';
import ModaWindow from './components/ModaWindow/ModaWindow';
import { Journey } from './Classes/Journey';
import Questionary from './components/Questionary/Questionary';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { randomColor } from 'accessible-colors';
import IntroductionWindow from './components/IntroductionWindow/IntroductionWindow';
import JourneySelection from './components/JourneySelection/JourneySelection';
import Statistics from './components/Statistics/Statistics';
import Home from './components/Home/Home';
import JourneyBar from './components/JourneyBar/JourneyBar';
import { onDragEnd, onDragMove } from './Functions/Movement';
import { setCirlceAtEnd } from './Functions/creation';
import { onActionDragEnd, onActionDragMove } from './Functions/actionMovement';
import SwimlaneInitialValues from './components/swimlaneInitialValues/swimlaneInitialValues';
import _, { values } from 'lodash';
import Ribbon from './components/ribbon/ribbon';
import StatusBar from './components/statusBar/statusBar';
import { ImageChange } from './Classes/ImageChange';
import Legend from './components/Legend/Legend';
import { Rnd } from "react-rnd";
import zIndex from '@mui/material/styles/zIndex';
import { Button } from '@mui/material';
import {

  GlassMagnifier

} from "@igorgraziano/react-image-magnifier";
import Confetti from 'react-confetti'
import ColorCoding from './components/colorCoding/colorCoding';

function App() {
  const [Journey, setJouney] = useState<Journey[]>([]);
  const [circles, setCircles] = useState<CJMLCircle[]>([]);
  const [actions, setActions] = useState<CJMLAction[]>([]);
  const [ClickFunction, setClickFunction] = useState<any>('');
  const [Arrows, setArrows] = useState<CJMLArrow[]>([]);
  const [ActorsCJML, setActors] = useState<Actors[]>([{ Title: "Enter actor's name", img: "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\user-3.svg", x: 200, y: 200, id: "1", height: 130, width: 700, color: "#e46c0a", isEndUser: true, isEditing: false }, { Title: "Enter actor's name", img: "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\service-provider-1.svg", x: 200, y: 400, id: "2", height: 130, width: 700, color: "#3b9fbb", isEndUser: false, isEditing: false }]);
  const [initialActorPosY, setPosY] = useState<any>(600);
  const [initialId, setNewID] = useState<any>(3);
  const [initialArrowId, setNewArrowId] = useState<any>(-9999999);
  const [drawingArrow, setDrawingArrowMode] = useState<boolean>(false);
  const [currentObject, setCurrentObjectID] = useState<any>(-1);
  const [CJMLImageList, setCJMLImageList] = useState<any>();
  const [DrawingObject, setDrawingObject] = useState<any>("");
  const [DevationMode, setDevationMode] = useState<boolean>(false);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showIntroduction, setshowIntroduction] = useState<boolean>(true);
  const [showAddJourney, setshowAddJourney] = useState<boolean>(false);
  const [currentJourney, setCurrentJourney] = useState<number>(0);
  const [showQuestionary, setshowQuestionary] = useState<boolean>(false);
  const [dragBoxLocation, setLocation] = useState<any[]>([0, 0]);
  const [SwimlineMode, setSwimlineMode] = useState<any>(false);
  const [swimlaneXInitial, setSwimlaneX] = useState<any>(400);
  const [journeyChange, setJourneyChange] = useState<any>(-1);
  const [openHome, ChangeOpenHome] = useState(false);
  const [mouseDownFunction, setMouseDownFunction] = useState("");
  const [journeyIndex, setJourneyIndex] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [ImageChange, setImageChange] = useState<ImageChange| undefined>(undefined);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [TaskId, setTaskID]= useState(0);

  const layerEl: any = useRef();
  const CurrentObjectReference = React.useRef(currentObject);
  const setCurrentObjectReference = (data: any) => {
    CurrentObjectReference.current = data;
    setCurrentObjectID(data);
  };



  React.useEffect(() => {
    setCJMLImageList(CJMLImages);
    if (ActorsCJML.length <= 1) {
      setActors((actorss) => [...actorss,]);
      setNewID(initialId + 2);
      console.log(ActorsCJML);
      setPosY(initialActorPosY + 300);
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener("keyup", deleteElement);
    
    return () => {
      
      document.removeEventListener('keyup', deleteElement)
    }
  }, [circles, actions, Arrows, ActorsCJML])

  return (
    <div>
      <div className="App" >
        <div style={{ height: "40px", backgroundColor: '#3955A3', display: "flex", alignItems: "center" }}>
          <h2 style={{ color: "white", textAlign: "left", paddingLeft: "15px" }}>CJML Analyzer</h2>

        </div>
{ TaskId>0 &&       <Rnd
  initial={{
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 80,
    width: 400,
    height: 160,
  }}
style={{zIndex:"9999", background:"	#BEBEBE"}}
  minWidth={700}
  minHeight={500}
  maxWidth={1200}
  maxHeight={600}
  bounds={'parent'}
>
  <div style={{background:"	#BEBEBE", maxHeight:"600px"}}>
    { TaskId==1 && <div style={{textAlign:"left"}}>
      <h2>Welcome to the study</h2>
      <h4>The test consists of three tasks.</h4>
      <h4>1. Draw a journey using the canvas, add 3 touchpoints</h4>
      <h4>2. Add an actor and 3 more touchpoints, but this time using form</h4>
      <h4>3. Add 2 more touchpoints, but this times as devations and change one touchpoint status to failing</h4>

      </div>}
      { TaskId==2 && <div style={{textAlign:"left"}}>
      <h2>Task 1 context</h2>
      <h4>The journey will include two actors: "Customer" and "Mobile provider".</h4>
      <img src="Actors.png" ></img>
      <h4>The customer notices that he has ran out of mobile data. To ask how much costs additional data, he calls his mobile provider. </h4>

      <h4>After company picks up the call, they provide prices for additional data. </h4>
      <h4>The customer does not choose the plan and thinks about other options.</h4>
      </div>}
      { TaskId==3 && <div style={{textAlign:"left"}}>
      <h2>Task 1</h2>
      <h4>You have to recreate the first three touchpoints from the story using the canvas.</h4>
      <h3>Click next to see image of what you need to recreate.</h3>
      </div>}
    { TaskId==4 &&   <GlassMagnifier style={{maxHeight:"100%", maxWidth:"100%", }}
   imageSrc="Task 1.png"
   imageAlt="Example"
 />
 }
 { TaskId==5 &&
  <div style={{textAlign:"left"}}>
     <h2>Task 2 context</h2>
      <h4>After thinking about his options, the customer decides to visit other provider. So he goes to "Mobile provider 2" physical store and talks with service desk to find out their pricing.</h4>
      <img src="actors_task2.png" ></img>
      <h4> After the hearing the competing service provider pricing, customer decides that current provider has better prices.</h4>
      <h4> So, he calls again the "Mobile provider" to accept their offer. </h4>
      <h4>After the call "Mobile provider" send out an email to the customer with new contract details. The customer reviews the email for mistakes.
      </h4>
    </div>

 }
    { TaskId==6 && <div style={{textAlign:"left"}}>
      <h2>Task 2</h2>
      <h4>You have to add 3 additional touchpoints and an actor.</h4>
      <h3> But this time you have to use form. Click next to see image of what you need to recreate.</h3>
      </div>}
    { TaskId==7 &&   <GlassMagnifier style={{maxHeight:"100%", maxWidth:"100%", }}
   imageSrc="Task 2.png"
   imageAlt="Example"
 />}
  { TaskId== 8 &&
  <div style={{textAlign:"left"}}>
     <h2>Task 3 context</h2>
      <h4>Turns out there was a mistake in the touchpoint and the offer is considered failing due to that. </h4>
      <h4>It was soon noticed by the "Mobile provider", which soon after called the customer.</h4> 
      <h4> In the call, the "Mobile provider" apologized for 
        the mistake to which customer asked to send correct confirmation.</h4>
        <h4> After the call finished, the "Mobile provider" sent out an email with the correct details, which user checked and confirmed to be correct.
      </h4>
    </div>

 }
    { TaskId== 9 && <div style={{textAlign:"left"}}>
      <h2>Task 3</h2>
      <h4>Modify current journey. Add two new touchpoints and change touchpoint status. 
      </h4> 
      <h3>Click next to see what you need to recreate.</h3>
      </div>}
    { TaskId==10 &&  <GlassMagnifier style={{maxHeight:"100%", maxWidth:"100%", }}
   imageSrc="Task 3.png"
   imageAlt="Example"
 />}
    { TaskId==11 && <h1>Thank you for completing the tasks and participating!</h1>}
   { TaskId>1 && <Button style={{position:"absolute", left:0, bottom:0, display:'flex', justifyContent:"center", right:0, padding:"10px",maxWidth:"50%"}} variant="contained" onClick={()=>setTaskID(TaskId-1)}>Previous</Button>}
    { TaskId<11 && <Button  style={{position:"absolute", left:"50%", bottom:0, display:'flex', justifyContent:"center", right:0, padding:"10px",maxWidth:"50%"}}variant="contained" onClick={()=>setTaskID(TaskId+1)}>Next</Button>}
  </div>
</Rnd>}
{TaskId==11 && <Confetti
      width={ window.innerWidth}
      height={ window.innerHeight}
      numberOfPieces={500}

    />}
        <ToastContainer />
        <Ribbon SwimlineMode={SwimlineMode} actions={actions} setActions={setActions}
          initialArrowId={initialArrowId} setInitialArrowID={setNewArrowId} setArrows={setArrows} makeBiggerActors={makeBiggerActors} circles={circles}
          setCircles={setCircles} setSwimlineMode={setSwimlineMode} showQuestionary={setshowQuestionary}
          actors={ActorsCJML} layerHeight={layerEl} Journeys={Journey} getImages={GetImage} updateCurrentJourney={updateCurrentJourney}
          showModal={setShowModal} images={CJMLImageList} currentObject={currentObject} currentJourney={currentJourney}
          setAcotrs={setActors} setCurrentObject={setCurrentObjectID} openHome={openHome} 
        />

        <Stage width={window.innerWidth} height={(window.innerHeight - 175)}
          onMouseUp={(e) => {
            if (ClickFunction != "")
              onClickDoes(e);
            else if (mouseDownFunction != "") {

              onReleaseDoes(e);
            }
            else {
              setCurrentObjectID(-1)
            }
          }}
          onTouchEnd={(e) => {
            if (ClickFunction != "")
              onClickDoes(e);
            else if (mouseDownFunction != "") {

              onReleaseDoes(e);
            }
            else {
              setCurrentObjectID(-1)
            }
          }}
          onDragEnd={(e) => {
            if (ClickFunction != "")
              onClickDoes(e);
            else if (mouseDownFunction != "") {

              onReleaseDoes(e);
            }
            else {
              setCurrentObjectID(-1)
            }
          }}
          onMouseMove={(e) => {
            onMouseMovement(e);
          }}
          onTouchMove={(e) => {
            onMouseMovement(e);
          }}
          onDragMove={(e) => {
            onMouseMovement(e);
          }}
        >
          {!openHome && <Layer id='test' ref={layerEl} draggable x={100} y={-100}
            onDragEnd={(e) => {
              setLocation([layerEl.current.attrs.x != undefined ? -layerEl.current.attrs.x : 0, layerEl.current.attrs.y != undefined ? -layerEl.current.attrs.y : 0]);
            }}
          >
               {SwimlineMode && <SwimlaneInitialValues actions={actions} actors={ActorsCJML} arrowID={initialArrowId} circles={circles} setArrowID={setNewArrowId} setArrows={setArrows} />}
           <ArrowComponent currentObject={currentObject} setCurrentObject={setCurrentObjectReference} Arrows={Arrows} setArrows={setArrows} SwimlineMode={SwimlineMode} />
            {Journey.length > 0 && <Rect x={dragBoxLocation[0]} y={dragBoxLocation[1]} height={window.innerHeight} width={window.innerWidth} onClick={() => { resetTouchpoints(); }}></Rect>}
            {Journey.length > 0 && Journey[currentJourney].isPlanned != true && SwimlineMode && <Deviation Actors={ActorsCJML} />}
            {Journey.length > 0 && (!SwimlineMode || !Journey[currentJourney].isPlanned)  && 
            <ActorPoint 
            currentObject={currentObject} getImageObject={getImageObject} Images={CJMLImageList} remove={remove} 
            setActors={setActors} actors={ActorsCJML} setPosY={setPosY} posY={initialActorPosY} setCurrentObjectID={setCurrentObjectReference} addNewActor={addNewActor} SwimlineMode={SwimlineMode}
              actions={actions} circles={circles} setActions={setActions} updateCircles={setCircles}
            />}
               
            {Journey.length > 0 && <TouchPoint remove={remove} Circle={circles} Arrows={Arrows} setArrows={setArrows} updateCircles={setCircles} arrowId={initialArrowId} setArrowId={setNewArrowId} ClickFunction={ClickFunction} setDrawingArrowMode={setDrawingArrowMode}
              drawingArrow={drawingArrow} currentObject={currentObject} setCurrentObjectID={setCurrentObjectReference} setClickFunction={setClickFunction} Images={CJMLImageList} actions={actions}
              setActions={setActions} actors={ActorsCJML} setDrawingObject={setDrawingObject} DrawingObject={DrawingObject} changeArrow={changeArrow}
              addNewArrow={addNewArrow} finishArrow={finishArrow} elementCheckCloseToBorder={elementCheckCloseToBorder} elementsAreFarFromBorder={elementsAreFarFromBorder}
              SwimlineMode={SwimlineMode} resetTouchpoints={resetTouchpoints} devationMode={Journey[currentJourney].isPlanned} getImageObject={getImageObject}
              isPlanned={Journey[currentJourney].isPlanned}
              makeBiggerActors={makeBiggerActors} 
              findFurthestPoint={findFurthestPoint}
            ></TouchPoint>}
            <ActionPoints swimlaneMode={SwimlineMode} setActions={setActions}
              remove={remove}
              actions={actions}
              setClickFunction={setClickFunction}
              ClickFunction={ClickFunction}
              drawingArrow={drawingArrow}
              setDrawingArrowMode={setDrawingArrowMode}
              setCurrentObjectID={setCurrentObjectReference}
              currentObject={currentObject}
              arrowId={initialArrowId}
              Arrows={Arrows} setArrows={setArrows}
              setArrowId={setNewArrowId} actors={ActorsCJML} setDrawingObject={setDrawingObject}
              addNewArrow={addNewArrow} finishArrow={finishArrow} changeArrow={changeArrow}
              updateCircles={setCircles}
              circles={circles}
              findFurthestPoint={findFurthestPoint}
              checkIfCloseToActorsBorder={makeBiggerActors}
            ></ActionPoints>
         
         
            {Journey.length > 0 && ImageChange!= undefined && !openHome && <KonvaImage x={ImageChange?.x-15} y={ImageChange?.y-15} height={30} width={30} image={getImageObject(ImageChange.Image)}></KonvaImage>}
            {ActorsCJML.length > 0 && SwimlineMode && <ColorCoding actors={ActorsCJML}/>}
          </Layer>}
          {openHome &&
            <Layer ref={layerEl} draggable onDragEnd={(e) => {
              setLocation([layerEl.current.attrs.x != undefined ? - layerEl.current.attrs.x : 0, layerEl.current.attrs.y != undefined ? -layerEl.current.attrs.y : 0]);
            }}>
              {Journey.length > 0 && <Rect x={dragBoxLocation[0]} y={dragBoxLocation[1]} height={window.innerHeight} width={window.innerWidth} onClick={() => { resetTouchpoints(); }}></Rect>}
              <Home CloseHomeWindow={ChangeOpenHome} setJourney={changeJourney} journeys={Journey} getImageObject={getImageObject}></Home>
            </Layer>
          }
        
          <LeftMeniu  mainLayer={layerEl} setActors={setActors} setCurrentObject={setCurrentObjectID} GetImageFullName={GetImageFullName} Images={CJMLImageList} setImage={setImage} currentObject={currentObject}
            updateCurrentJourney={updateCurrentJourney} addNewAction={addNewAction} setCirlceAtEnd={setCirlceAtEnd} addNewCircle={addNewCircle} setCircles={setCircles}
            mouseDownFunction={mouseDownFunction} setMouseDownFunction={setMouseDownFunction} circles={circles} actions={actions} actors={ActorsCJML}
            SwimlineMode={SwimlineMode} setClickFunction={setClickFunction} layerHeight={layerEl} enableDevationMode={setDevationMode}
            showModal={setShowModal} showQuestionary={setshowQuestionary} Journeys={Journey} getImages={GetImage} getImageObject={getImageObject}
            updateCirlces={updateTouchPointsForChange} currentJourney={currentJourney} addNewActor={addNewActorinTheEnd}
            setActions={setActions} openModal={setShowModal} setShowSettings={setShowSettings} setImageChange={setImageChange}
            addNewActorDragAndDrop = {addNewActorDragAndDrop} setOpenStatistics={setOpenStatistics}
          />
            {SwimlineMode && <Legend actors={ActorsCJML} setActors={setActors}/>}
        </Stage>
        {ShowModal && <ModaWindow handleClose={setShowModal} show={ShowModal} setJourneys={setJouney} getImage={getImageByName} updateCurrentJourney={changeJourneyCurrent} Journeys={Journey} ShowSelectionWindow={setshowAddJourney}/>}
        {showQuestionary && <Questionary swimlaneMode={SwimlineMode} setArrows={setArrows} GetImage={GetImageFullName} handleClose={setshowQuestionary} 
        showQuestionary={setshowQuestionary} actors={ActorsCJML} CJMLImageList={CJMLImageList} actions={actions} circles={circles} 
        isPlanned={Journey[currentJourney].isPlanned} setActions={setActions} setCircles={setCircles} setActors={setActors}
        arrowsId={initialArrowId} setInitialArrowID={setNewArrowId} 
        />}
        {showIntroduction && <IntroductionWindow showIntro={showIntroduction} closeIntro={setshowIntroduction} showSelection={setshowAddJourney} />}
        {showAddJourney && <JourneySelection showJourney={showAddJourney} closeJourney={setshowAddJourney} addJourney={addJourney} JourneyList={Journey} showModal={setShowModal} />}
        {showSettings && <Settings getImageObject={getImageObject} Images={CJMLImageList} currentObject={currentObject} circles={circles} setCircles={setCircles} setCurrentObjectID={setCurrentObjectReference} changeStatus={changeExternal} setImage={setImage} Actors={ActorsCJML}
          setActors={setActors} GetImageFullName={GetImage} Layer={layerEl} setSwimlineMode={setSwimlineMode} SwimlineMode={SwimlineMode} actions={actions} setActions={setActions}
          initialArrowId={initialArrowId} setInitialArrowID={setNewArrowId} setArrows={setArrows} makeBiggerActors={makeBiggerActors} showSettings={showSettings} journeys={Journey} setShowSettings={setShowSettings}
          currentJurney={currentJourney} setJourneys={setJouney}
        ></Settings>}
       
        {openStatistics && <Statistics Journeys={Journey} actions={actions} circles={circles} currentJourney={currentJourney}  handleClose={setOpenStatistics} show={openStatistics}/>}
      </div>
      <div className='JourneyBar'>
        <JourneyBar ChangeOpenHome={ChangeOpenHome} Journey={Journey} changeJourney={changeJourney} currentJourney={currentJourney} journeyChange={journeyChange}
          setCurrentJourney={setCurrentJourney} setJourney={setJouney} setJourneyChange={setJourneyChange} setShowAddJourney={setshowAddJourney} ></JourneyBar>
      </div>

    </div>
  );

  function updateCurrentJourney() {
    var journeys = Journey;
    journeys[currentJourney] = { Toucpoint: circles, JourneyName: journeys[currentJourney].JourneyName, Actions: actions, Actors: ActorsCJML, isPlanned: journeys[currentJourney].isPlanned, Arrow: Arrows, Comment: '', complianceContent: true, ComplianceSequence: true, JourneyAnalysis: '', JourneyDescription: "", JourneyID: journeys[currentJourney].JourneyID, Reference: journeys[currentJourney].Reference };
    setJouney(journeys);
  }

  function addJourney(isPlanned: boolean, addId: any) { 

    if (Journey.length == 0) {
    }
    if (Journey.length == 1) {
      updateCurrentJourney();
    }
    if (((addId != undefined || addId != null )&& addId != -1)) {
        updateCurrentJourney();
        setJouney((Journey) => [...Journey, { Toucpoint: JSON.parse(JSON.stringify(Journey[addId].Toucpoint)), Actions: JSON.parse(JSON.stringify(Journey[addId].Actions)), Actors: JSON.parse(JSON.stringify(Journey[addId].Actors)), JourneyName: isPlanned ? "Planned Journey " + journeyIndex : "Actual Journey " + journeyIndex, isPlanned: isPlanned, Arrow: [], Comment: '', complianceContent: true, ComplianceSequence: true, JourneyAnalysis: '', JourneyDescription: "", JourneyID: '1', Reference: Journey[addId].JourneyName }])
        setJourneyIndex(journeyIndex + 1);
    }
    else {
      setJouney((Journey) => [...Journey, { Toucpoint: [], Actions: [], Actors: [{ Title: "Enter actor's name", img: "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\user-3.svg", x: 200, y: 200, id: "1", height: 130, width: 700, color: "#e46c0a", isEndUser: true, isEditing: false }, { Title: "Enter actor's name", img: "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\service-provider-1.svg", x: 200, y: 400, id: "2", height: 130, width: 700, color: "#3b9fbb", isEndUser: false, isEditing: false }], JourneyName: isPlanned ? "Planned Journey " + journeyIndex : "Actual Journey " + journeyIndex, isPlanned: isPlanned, Arrow: [], Comment: '', complianceContent: true, ComplianceSequence: true, JourneyAnalysis: '', JourneyDescription: "", JourneyID: '1', Reference: null }])
      setJourneyIndex(journeyIndex + 1);
    }
    setTaskID(TaskId+1)
  }


  function addNewActor(actorAfterInsert: Actors) {
    var actor = ActorsCJML;
    var maxWidth = 900;
    var index = actor.findIndex(x => x.id == actorAfterInsert.id);
    actor.forEach((x) => {
      if (x.y > actorAfterInsert.y) {
        updateNodesAndConnections(x);
        x.y += x.height + 50;
      }
      maxWidth = x.width;
    });
    actor.splice(index, 0, { Title: "Enter actor's name", img: "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\service-provider-1.svg", x: 200, y: actorAfterInsert.y + actorAfterInsert.height + 50, id: initialId, height: 130, width: maxWidth, color: randomColor(), isEndUser: false, isEditing: false });
    setActors(actor);
    setNewID(initialId + 1);
  }

  function addNewActorinTheEnd(pathImage: string) {
    console.log(pathImage)
    var actor = ActorsCJML;
    var actorAfterInsert = ActorsCJML.sort((x, y) => {
      return x.y - y.y;
    })[ActorsCJML.length - 1];
    console.log(actorAfterInsert)
    var maxWidth = 900;
    var index = actor.findIndex(x => x.id == actorAfterInsert.id);
    actor.forEach((x) => {
      if (x.y > actorAfterInsert.y) {
        updateNodesAndConnections(x);
        x.y += x.height + 50;
      }
      maxWidth = x.width;
    });

    actor.splice(index, 0, { Title: "Enter actor's name", img: pathImage, x: 200, y: actorAfterInsert.y + actorAfterInsert.height + 50, id: initialId, height: 130, width: maxWidth, color: randomColor(), isEndUser: false, isEditing: false });
    setActors(actor);
    setNewID(initialId + 1);
    toast.success('Actor has been added', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }

  function addNewActorDragAndDrop(pathImage:any){
    console.log(pathImage)
    var actor = ActorsCJML;
    var actorAfterInsert = ActorsCJML.sort((x, y) => {
      return x.y - y.y;
    })[ActorsCJML.length - 1];
    var maxWidth = 900;
    var index = actor.findIndex(x => x.id == actorAfterInsert.id);
    actor.forEach((x) => {
      if (x.y > actorAfterInsert.y) {
        updateNodesAndConnections(x);
        x.y += x.height + 50;
      }
      maxWidth = x.width;
    });

    actor.splice(index, 0, { Title: "Enter actor's name", img: pathImage, x: 9999, y: 9999, id: initialId, height: 130, width: maxWidth, color: randomColor(), isEndUser: false, isEditing: false });
    setActors(actor);
    setNewID(initialId + 1);
  }

  function deleteCJMLObject(element: any) {
    const index = circles.findIndex((x: CJMLCircle) => { return element.id == x.id });
    if (index > -1) {
      const tempCircle = circles;
      tempCircle.splice(index, 1);
      setCircles(tempCircle);
      removeArrows(currentObject);
    }
    const actionIndex = actions.findIndex((x: CJMLAction) => { return element.id == x.id });
    if (actionIndex > -1) {
      const tempCircle = actions;
      tempCircle.splice(actionIndex, 1);
      setActions(tempCircle);
      removeArrows(currentObject);
    }

  }

  function deleteElement(e: any) {
    if (e.code == 'Delete' /*|| e.code == 'Backspace'*/) {
      remove();
    }
  }


  function addNewAction() {
    let newAction = new CJMLAction(initialId, -9999, -9999, false, "Enter text", DevationMode, ActorsCJML[0], -99999, Date.now());
    setActions((prevActions) => [...prevActions, newAction]);
  }

  function addNewCircle(image: string = "", upsideDown: boolean = false, initiator?:Actors) {
    if (image == "") {
      image = "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - communication point\\unknown-channel.svg"
    }
    let newCircle:CJMLCircle;

    if(upsideDown){
      newCircle= new CJMLCircle(initialId, -9999, -10999, false, false, ActorsCJML[0], ActorsCJML[1], image, "Enter text", "Enter text", swimlaneXInitial, -9999, -9999, Date.now(), TouchPointStatus.Completed);
    }
    else{
    newCircle= new CJMLCircle(initialId, -9999, -9999, false, false, initiator != undefined? ActorsCJML[0]:ActorsCJML[1], initiator != undefined? initiator: ActorsCJML[0], image, "Enter text", "Enter text", swimlaneXInitial, -9999, -10999, Date.now(), TouchPointStatus.Completed);
    }
    setCircles((prevCircles) => [
      ...prevCircles,
      newCircle
    ]);
  }

  function remove() {
    const index = circles.findIndex((x: CJMLCircle) => { return CurrentObjectReference.current.id == x.id });
    if (index > -1) {
      Swal.fire({
        title: 'Do you want to delete touchoint?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        
          if (result.isConfirmed) {
            const tempCircle = circles;
            tempCircle.splice(index, 1);
            setCircles(tempCircle);
            removeArrows(CurrentObjectReference);
            toast.success('Touchpoint has been removed', {
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
          else if (result.isDenied) {
            Swal.fire('Communication point was not removed', '', 'info')
          }
        
      })
    }


    const actionIndex = actions.findIndex((x: CJMLAction) => { return CurrentObjectReference.current.id == x.id });
    if (actionIndex > -1) {
      Swal.fire({
        title: 'Do you want to delete action?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
       if(result.isConfirmed)
        { const tempCircle = actions;
        tempCircle.splice(actionIndex, 1);
        setActions(tempCircle);
        removeArrows(CurrentObjectReference);
        toast.success('Action has been removed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });}
        else if (result.isDenied) {
          Swal.fire('Action was not removed', '', 'info')
        }
      })
    }

    const arrowId = Arrows.findIndex((x: CJMLArrow) => {
      return x.id == CurrentObjectReference.current.id;
    })
    if (arrowId > -1) {
      Swal.fire({
        title: 'Do you want to delete action?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
       if(result.isConfirmed){ const tempArrows = Arrows;
        tempArrows.splice(arrowId, 1);
        setArrows(tempArrows);
        toast.success('Arrow has been removed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });}
        else if (result.isDenied) {
          Swal.fire('Arrow was not removed', '', 'info')
        }
      })
    }

    const ActorId = ActorsCJML.findIndex((x: Actors) => {
      return x.id == CurrentObjectReference.current.id && !x.isEndUser;
    });
    if (ActorId > -1) {
      const tempCircle = ActorsCJML;
      Swal.fire({
        title: 'Do you want to delete Actor:' + ActorsCJML[ActorId].Title.toString(),
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          circles.forEach((cirlce) => {
            if ((SwimlineMode && cirlce.y >= ActorsCJML[ActorId].y && cirlce.y <= ActorsCJML[ActorId].y + ActorsCJML[ActorId].height) ||
              (!SwimlineMode && ((cirlce.swimlaneY >= ActorsCJML[ActorId].y && cirlce.swimlaneY <= ActorsCJML[ActorId].y + ActorsCJML[ActorId].height)
                || (cirlce.swimlaneReceiverY >= ActorsCJML[ActorId].y && cirlce.swimlaneReceiverY <= ActorsCJML[ActorId].y + ActorsCJML[ActorId].height))
              )) {
              deleteCJMLObject(cirlce);
            }
          }

          )
          actions.forEach((action) => {
            if ((SwimlineMode && action.y >= ActorsCJML[ActorId].y && action.y <= ActorsCJML[ActorId].y + ActorsCJML[ActorId].height) &&
              (SwimlineMode && action.swimlaneX >= ActorsCJML[ActorId].y && action.swimlaneX <= ActorsCJML[ActorId].y + ActorsCJML[ActorId].height)) {
              deleteCJMLObject(action);
            }
          }
          )
          for (let i = ActorId + 1; i < ActorsCJML.length; i++) {
            tempCircle[i].y = tempCircle[i - 1].y
          }
          tempCircle.splice(ActorId, 1);
          let tempCirc = JSON.parse(JSON.stringify(tempCircle));
          setActors(tempCirc);
          toast.success('Actor has been removed', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        } else if (result.isDenied) {
          Swal.fire('Actor was not removed', '', 'info')
        }
      })
    }
  }

  function removeArrows(removedObject: any) {

    const result = Arrows.filter((x: CJMLArrow) => {
      let element = removedObject
      if (removedObject.current.id != undefined) {
        element = removedObject.current;
      }
      if (x.fromPoint.id != element.id || x.toPoint.id != element.id) {
        return false;
      }
      return true;
    });
    setArrows(result);
  }

  function updateNodesAndConnections(actor: Actors) {
    var tempCirlce = circles;
    tempCirlce.forEach(x => {
      if (x.initiator.id == actor.id) {
        x.swimlaneY += actor.height;
        changeArrow(null, x.id, x);
      } else if (x.receiver.id == actor.id) {
        x.swimlaneReceiverY += actor.height + 30;
        changeArrow(null, x.id, x);
      }
    });
    setCircles(tempCirlce);
    var tempActions = actions;
    tempActions.forEach(x => {
      if (x.initiator.id == actor.id) {
        x.y += actor.height;
        changeArrow(null, x.id, x);
      }
    });
    setActions(tempActions);
  }

  function changeJourneyCurrent(journey: Journey[]) {
    if (currentJourney > -1) {
      setActions(journey[currentJourney].Actions);
      setActors(journey[currentJourney].Actors);
      setCircles(journey[currentJourney].Toucpoint);
      setArrows(journey[currentJourney].Arrow);
      setPosY(200 + 150 * journey[currentJourney].Actors.length);
      setCurrentJourney(currentJourney);
      setCurrentObjectReference(-1);
      if (journey[currentJourney].isPlanned) {
        setDevationMode(false);
      } else {
        setDevationMode(true);
      }
    }
  }
  function changeJourney(id: number) {
    if (currentJourney != -1)
      updateCurrentJourney();
    setActions(Journey[id].Actions);
    setActors(Journey[id].Actors);
    setCircles(Journey[id].Toucpoint);
    setArrows(Journey[id].Arrow);
    setPosY(200 + 150 * Journey[id].Actors.length);
    setCurrentJourney(id);
    setCurrentObjectReference(-1);
    if (Journey[id].isPlanned) {
      setDevationMode(false);
    } else {
      setDevationMode(true);
    }
  }

  function onMouseMovement(e: any) {
    if (drawingArrow == true) {
      changeArrowOnDraw(e);
      findFurthestPoint()
    }
    if (mouseDownFunction == "DrawCircle") {
      changeCircle(e);
      findFurthestPoint(e)
    }
    else if(mouseDownFunction == "ImageChange"){
      ChangeImage(e);
      findFurthestPoint()
    }
    else if (mouseDownFunction == "DrawAction") {
      changeAction(e);
      findFurthestPoint(e)
    }
    else if( mouseDownFunction == "DragActor"){
      changeActor(e);
    }

  }

  function changeActor(e:any){
    let workingActor = initialId-1;
    let acotrsCopy = _.cloneDeep(ActorsCJML);
    
    let touchpoints = _.cloneDeep(circles);
    let actionscopy = _.cloneDeep(actions);

    acotrsCopy = acotrsCopy.sort((x:Actors,y:Actors)=>{
      return x.y-y.y;
    }).map((value:Actors, index:number)=>{
      if(value.id != workingActor.toString()){
        value.y = (index+1) *200
      }
      else{
        value.x = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
        value.y = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0);
      }
      touchpoints = touchpoints.map((x)=>{
        if(x.initiator.id == value.id){
          x.swimlaneY = value.y +20
        }
        else if(x.receiver.id == value.id){
          x.swimlaneReceiverY = value.y +20
        }
        return x;
      })
      actionscopy = actionscopy.map((x)=>{
        if(x.initiator.id == value.id){
          x.y = value.y +20; 
        }
        return x
      })
      return value;
    })
    setActors(acotrsCopy);
    setActions(actionscopy);
    setCircles(touchpoints)
  }

  function setActorLocations(){
    let acotrsCopy = _.cloneDeep(ActorsCJML);
    acotrsCopy = acotrsCopy.sort((x:Actors,y:Actors)=>{
      return x.y-y.y;
    }).map((value:Actors, index:number)=>{
        value.y = (index+1) *200
        value.x = 150;
      return value;
    })
    setActors(acotrsCopy);
  }

  function changeAction(e: any) {
    const actionToWork = actions.filter((x) => {
      return x.id == initialId
    })
    const index = actions.indexOf(actionToWork[0]);
    onActionDragMove(e, circles, actionToWork[0], setCircles, changeArrow, elementsAreFarFromBorder, index, elementCheckCloseToBorder, actions, setActions, ActorsCJML, SwimlineMode, Journey[currentJourney].isPlanned, initialArrowId, setNewArrowId, setArrows)
    const newCircle = actions.map(x => {
      if (x.id == initialId) {
        const arrowNew = x;
        x.x = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
        x.y = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0);
        x.swimlaneX = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
        return arrowNew
      }
      else {
        return x;
      }
    });

    setActions(JSON.parse(JSON.stringify(newCircle)));
  }

  function changeCircle(e: any) {
    const circleToWork = circles.filter((x) => {
      return x.id == initialId
    })
    const index = circles.indexOf(circleToWork[0]);
    onDragMove(e, circles, circleToWork[0], setCircles, changeArrow, index, elementCheckCloseToBorder, actions, setActions, ActorsCJML, SwimlineMode, Journey[currentJourney].isPlanned, initialArrowId, setNewArrowId, setArrows, makeBiggerActors)
    const newCircle = circles.map(x => {
      if (x.id == initialId) {
        const arrowNew = x;
        x.x = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
        x.y = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0);
        x.swimlaneX = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
        if(x.receiver.y < x.initiator.y){
          x.swimlaneY = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0) +200;
          x.swimlaneReceiverY = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0) ;
        }
        else{
          x.swimlaneY = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0);
          x.swimlaneReceiverY = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0) + 200;
        }

        return arrowNew
      }
      else {
        return x;
      }
    });
    setCircles(JSON.parse(JSON.stringify(newCircle)));
  }

  function ChangeImage(e:any){
    let x = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0);
    let y = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0);
    let copy = _.cloneDeep(ImageChange);
    if(copy !== undefined){
    copy!.x = x;
    copy!.y = y
  }
    setImageChange(copy);
  }

  function changeArrowOnDraw(e: any) {
    console.log(e)
    const newArrows = Arrows.map(x => {
      if (x.id == initialArrowId) {
        const arrowNew = x;
        x.toPoint.x = e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0) - 5;
        x.toPoint.y = e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0) - 5;
        return arrowNew
      }
      else {
        return x;
      }
    });
    setArrows(newArrows);
    findFurthestPoint()
  }

  function setImage(name: string) {
    const newValues = circles.map(x => {
      if (x.id == currentObject.id) {
        x.imageName = name;
        setCurrentObjectID(x);
        return x;
      }
      return x;
    })
    setCircles(newValues);
    const newActor = ActorsCJML.map(x => {
      if (x.id == currentObject.id) {
        x.img = name;
        setCurrentObjectID(x);
        return x;
      }
      return x;
    })
    setActors(newActor);
  }

  function changeArrow(e: any, obj: any, changingObj: any) {
    let copyobject = _.cloneDeep(changingObj);
    const newArrows = Arrows.map(x => {
      if (x.fromPoint.id == obj || x.toPoint.id == obj) {
        if(changingObj.receiver == undefined){
          copyobject.y = copyobject.y -14
        }
        x.redraw(copyobject);
        return x;
      }
      else {
        return x;
      }
    });
    setArrows(newArrows);
  }

  function addNewArrow(obj: any, e: any) {
    console.log(e) // cia taisyti
    const arrowRes = Arrows;
    arrowRes.push(new CJMLArrow(initialArrowId, (JSON.parse(JSON.stringify(obj))), new Connectable('-1', e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0), e.evt.layerY - (layerEl.current.attrs.y != undefined ? layerEl.current.attrs.y : 0), 0, 0,false)));
    setArrows(arrowRes);
  }

  function finishArrow(obj: any) {

    const arrowRes = _.cloneDeep(Arrows)
    arrowRes.map((x: CJMLArrow) => {
      if (x.id == initialArrowId) {
        const rest: CJMLArrow = x as CJMLArrow;
        let objCopy= _.cloneDeep(obj);
        if(obj.receiver == undefined){
          objCopy.y = objCopy.y-12;
        }
        rest.toPoint = (JSON.parse(JSON.stringify(objCopy)));
        rest.redraw(JSON.parse(JSON.stringify(objCopy)))
        return rest;
      }
      else {
        return x;
      }
    })
    let res = arrowRes.filter((x: CJMLArrow) => {
      return x.id == initialArrowId
    })
    if (res[0].fromPoint.id != res[0].toPoint.id) {

      setDrawingArrowMode(false);
      setArrows(arrowRes);
      setNewArrowId(initialArrowId + 1)
    }
  }

  function changeExternal(ExternalStatus: any) {
    const newValues = circles.map(x => {
      if (x.id == currentObject.id) {
        x.external = Object.values(ExternalEnumerator).indexOf(ExternalStatus);
        return x;
      }
      return x;
    })
    setCircles(newValues);
    const act = actions.map(x => {
      if (x.id == currentObject.id) {
        x.external = Object.values(ExternalEnumerator).indexOf(ExternalStatus);
        return x;
      }
      return x;
    })
    setActions(act);
    let temp = currentObject;
    temp.external = Object.values(ExternalEnumerator).indexOf(ExternalStatus);
    setCurrentObjectReference(temp);
  }

  function elementCheckCloseToBorder(position: any) {
    makeActorsBigger(position);
  }

  function elementsAreFarFromBorder() {
    const counter = circles.filter(x => {
      return x.x < ActorsCJML[0].x + ActorsCJML[0].width - 100;
    }).length;
    const counterActions = actions.filter(x => {
      return x.x < ActorsCJML[0].x + ActorsCJML[0].width - 100;
    }).length;
    if (counter == circles.length && counterActions == actions.length) {
      const maxValue = circles.sort((x, y) => {
        return x.x < y.x ? 0 : 1;
      });
      const maxValueAction = actions.sort((x, y) => {
        return x.x < y.x ? 0 : 1;
      });
      const maxXCircles = maxValue.length > 0 ? maxValue[0].x : 0;
      const maxXAction = maxValueAction.length > 0 ? maxValueAction[0].x : 0;
      const actorsTemp = ActorsCJML;
      const overalMax = maxXAction > maxXCircles ? maxXAction : maxXCircles;
      actorsTemp.forEach(x => {
        let temp = (overalMax) - (x.x + x.width) + 200;
        if (x.width + temp > 700) {
          x.width += temp;
        }
      })
      setActors(actorsTemp);
    }
  }

  function makeBiggerActors(position: any) {
    makeActorsBigger(position);
  }

  function checkIfCloseToActorsBorder(position: any, actor: Actors) {
    if (position >= actor.x + actor.width - 100) {
      return true;
    }
    return false;
  }

  function makeActorsBigger(position: number) {
    let maxValue = -999;
    circles.forEach(x => {
      if (x.x > maxValue)
        maxValue = x.x;
    })
    actions.forEach(x => {
      if (x.x > maxValue) {
        maxValue = x.x;
      }
    })
    if (maxValue < position) {
      maxValue = position;
    }
    const actorsTemp = ActorsCJML;
    actorsTemp.forEach(x => {
      x.width = maxValue + 200;
    })
    setActors(actorsTemp);
  }

  function includeInLine(e: any, currentId: any, element: any) {

    const id = Arrows.findIndex((x) => {
      if (x.fromPoint.x <= e.evt.layerX - layerEl.current.attrs.x && x.toPoint.x >= e.evt.layerX - layerEl.current.attrs.x && (x.fromPoint.id != currentId && x.toPoint.id != currentId)) {
        return true;
      }
      return false;
    });
    if (id != -1) {
      const copy = Arrows[id];
      let results = Arrows;
      results.splice(id, 1);
      let newArrow = new CJMLArrow(initialArrowId, copy.fromPoint, element);
      let newArrow2 = new CJMLArrow(initialArrowId + 1, element, copy.toPoint)
      newArrow.Draw();
      newArrow2.Draw();
      results.push(newArrow);
      results.push(newArrow2);
      setNewArrowId(initialArrowId + 2);
      setArrows(results);
    }
    else if (circles.length + actions.length > 0) {
      let connectTo, connectToAction;
      if (circles.length > 0) {
        connectTo = circles.reduce((current, prev) => {
          return Math.abs(current.x - e.evt.layerX - layerEl.current.attrs.x) > Math.abs(prev.x - e.evt.layerX - layerEl.current.attrs.x) ? prev : current;
        })
      }
      if (actions.length > 0) {
        connectToAction = actions.reduce((current, prev) => {
          return Math.abs(current.x - e.evt.layerX - layerEl.current.attrs.x) > Math.abs(prev.x - e.evt.layerX - layerEl.current.attrs.x) ? prev : current;
        })
      }

      if (connectToAction != undefined && connectTo != undefined) {
        if (Math.abs(connectToAction.x - e.evt.layerX - layerEl.current.attrs.x) < Math.abs(connectTo.x - e.evt.layerX - layerEl.current.attrs.x)) {
          connectTo = connectToAction;
        }
      }
      else if (connectTo == undefined) {
        connectTo = connectToAction;
      }
      connectTo = connectTo == undefined ? { x: 0, y: 0, id: 0 } : connectTo;
      const results = Arrows;
      let newArrow = new CJMLArrow(initialArrowId, connectTo.x < e.evt.layerX - layerEl.current.attrs.x ? connectTo : element, connectTo.x > e.evt.layerX - layerEl.current.attrs.x ? connectTo : element);
      newArrow.Draw();
      results.push(newArrow);
      setNewArrowId(initialArrowId + 1);
      setArrows(results);
    }
  }

  function findActor(e: any) {
    return ActorsCJML.find(x => {
      if (e.evt.layerY - (layerEl.current.attrs.y) >= x.y && x.y + x.height >= e.evt.layerY - (layerEl.current.attrs.y)) {

        return true;
      }
      return false;
    });

  }

  function onReleaseDoes(e: any) {
    let isOnActor = findActor(e);
    switch (mouseDownFunction) {
      case 'DrawCircle': {
        const circleToWork = circles.filter((x) => {
          return x.id == initialId
        })
        const index = circles.indexOf(circleToWork[0]);
        onDragEnd(e, circleToWork[0], ActorsCJML, circles, SwimlineMode, setCircles, changeArrow, actions, setActions, index, Journey[currentJourney].isPlanned, initialArrowId, setNewArrowId, setArrows);
        setNewID(initialId + 1)
        findFurthestPoint(e)

      }
      
        break;
      case "DrawAction": {
        const actionToWork = actions.filter((x) => {
          return x.id == initialId
        })
        const index = actions.indexOf(actionToWork[0]);
        onActionDragEnd(e, actionToWork[0], ActorsCJML, actions, SwimlineMode, setCircles, changeArrow, elementsAreFarFromBorder, circles, setActions, index, Journey[currentJourney].isPlanned, initialArrowId, setNewArrowId, setArrows);
        setNewID(initialId + 1)
        findFurthestPoint(e)
      }
      break;
      case "ImageChange":{
        setImageToTouchpoint(e);
        setImageChange(undefined);
      }
      break;
      case "DragActor":{
        setActorLocations();
      }
    }

    setMouseDownFunction("")
  }

  function findFurthestPoint(e?:any){
    let furhterPoint:number =200;
    if (e != undefined) {
    if(e.target.attrs.x > furhterPoint){
      furhterPoint = e.target.attrs.x+200;
    }
    }
     circles.forEach((value) => {
      if(furhterPoint < value.swimlaneX){
        furhterPoint = value.swimlaneX;
      }
    });
    actions.forEach((value)=>{
      if(furhterPoint < value.swimlaneX){
        furhterPoint = value.swimlaneX}
    });
    if(furhterPoint%200 != 0){
      
      furhterPoint = 200 *( (furhterPoint/200)+1)
    }
    let actors = _.cloneDeep(ActorsCJML);
    actors = actors.map((x)=>{
      if(furhterPoint - x.x > x.width){
        x.width =furhterPoint - x.x +280;
      }
      return x;
    })
    console.log(furhterPoint);
    console.log(circles);
    setActors(actors);
  }
  

  function setImageToTouchpoint(e:any){
    let yPosOfMouse:number;
    let xPosOfMouse:number;
    if (e.target.attrs.y != null) {
      yPosOfMouse = e.target.attrs.y;
      xPosOfMouse = e.target.attrs.x;
    }
    else {
      yPosOfMouse = e.target.getStage().getPointerPosition().y;
      xPosOfMouse = e.target.getStage().getPointerPosition().x;
    }
   
    let copyOfCirlces = _.cloneDeep(circles);
    copyOfCirlces = copyOfCirlces.map((x:CJMLCircle)=>{
      if(!SwimlineMode){
        if(x.swimlaneX-15 <= xPosOfMouse && x.swimlaneX + 175 >= xPosOfMouse ){
          if(x.swimlaneY-15 <= yPosOfMouse && x.swimlaneY +195 >= yPosOfMouse){
            x.imageName = ImageChange?.Image;
          }
          else if(x.swimlaneReceiverY-15  <= yPosOfMouse && x.swimlaneReceiverY +195 >= yPosOfMouse){
            x.imageNameReceiver = ImageChange?.Image;
          }
        }
      }
      else{
        if(x.x-35 <= xPosOfMouse && x.x + 35 >= xPosOfMouse ){
          if(x.y-35 <= yPosOfMouse && x.y +35 >= yPosOfMouse){
            x.imageName = ImageChange?.Image;
            x.imageNameReceiver = ImageChange?.Image;
          }
        }
      }
      return x;
    });
    setCircles(copyOfCirlces);
  }
  function onClickDoes(e: any) {
    let isOnActor = findActor(e);

    switch (ClickFunction) {
      case 'DrawCircle': {
        let positionX = 400;
        if (!SwimlineMode) {
          if (circles.length > 0 || actions.length > 0) {
            let maxLengthAction = Math.max.apply(Math, actions.map(x => x.x));
            let maxLengthCircles = Math.max.apply(Math, circles.map(x => x.x));
            positionX = maxLengthAction > maxLengthCircles ? maxLengthAction + 200 : maxLengthCircles + 200;
          }
        }
        let newCircle = new CJMLCircle(initialId, SwimlineMode ? e.evt.layerX - (layerEl.current.attrs.x) : positionX, isOnActor != undefined ? isOnActor.y + isOnActor.height / 2 : e.evt.layerY - (layerEl.current.attrs.y), false, DevationMode, ActorsCJML[1], ActorsCJML[0], "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - communication point\\unknown-channel.svg", "Enter text", "Enter text", swimlaneXInitial, isOnActor != undefined ? isOnActor.y : e.evt.layerY - (layerEl.current.attrs.y), ActorsCJML[1].y, Date.now(), TouchPointStatus.Completed);
        setCircles((prevCircles) => [
          ...prevCircles,
          newCircle
        ]);
        if (checkIfCloseToActorsBorder(SwimlineMode ? e.evt.layerX - layerEl.current.attrs.x : positionX, ActorsCJML[0])) {
          makeActorsBigger(SwimlineMode ? e.evt.layerX - (layerEl.current.attrs.x != undefined ? layerEl.current.attrs.x : 0) : positionX);
        }

        setSwimlaneX(swimlaneXInitial + 225);
        setNewID(initialId + 1);
        setClickFunction('');

        if (SwimlineMode && Journey[currentJourney].isPlanned) {
          includeInLine(e, initialId, newCircle);
        }
        break;
      }
      case 'DrawAction': {
        let positionX = 400;
        if (!SwimlineMode) {
          if (circles.length > 0 || actions.length > 0) {
            let maxLengthAction = Math.max.apply(Math, actions.map(x => x.x));
            let maxLengthCircles = Math.max.apply(Math, circles.map(x => x.x));
            positionX = maxLengthAction > maxLengthCircles ? maxLengthAction + 200 : maxLengthCircles + 200;
          }
        }
        let newAction = new CJMLAction(initialId, SwimlineMode ? e.evt.layerX - layerEl.current.attrs.x : positionX, isOnActor != undefined ? isOnActor.y : e.evt.layerY - (layerEl.current.attrs.y), false, "User's action", DevationMode, isOnActor, swimlaneXInitial, Date.now());
        setActions((actions) => [
          ...actions,
          newAction
        ]);
        if (checkIfCloseToActorsBorder(SwimlineMode ? e.evt.layerX - layerEl.current.attrs.x : positionX, ActorsCJML[0])) {
          makeActorsBigger(SwimlineMode ? e.evt.layerX - layerEl.current.attrs.x : positionX);
        }
        if (SwimlineMode) {
          includeInLine(e, initialId, newAction);
        }
        setSwimlaneX(swimlaneXInitial + 225);
        setNewID(initialId + 1);
        setClickFunction('');
        break;
      }
      case 'Dump': {
        setClickFunction('');
        break;
      }
      case '': {

      }
    }
  }

  function resetTouchpoints() {
    var reset = circles.map((x: CJMLCircle) => {
      x.Capacity = 0;
      return x
    })
    setCircles(reset);
  }

  function GetImageFullName(name: string, type: string) {
    if (type == "Actor") {
      let img = CJMLImageList.Images[0].Images.find((x: any) => { if (x.Location.replaceAll(' ', '').toLowerCase() == name.replaceAll(' ', '').toLowerCase()) return x })
      let finalName = img == undefined ? "" : img.Name;
      return finalName;
    }
    if (type == "Other") {
      let img = CJMLImageList.Images[1].Images.find((x: any) => { if (x.Location.replaceAll(' ', '').toLowerCase() == name.replaceAll(' ', '').toLowerCase()) return x })
      let finalName = img == undefined ? "" : img.Name;
      return finalName;
    }
  }
  function GetImage(name: string, type: string) {
    if (type == "Actor") {
      let img = CJMLImageList.Images[0].Images.find((x: any) => { return x.Location.replaceAll(' ', '').toLowerCase() == name.replaceAll(' ', '').toLowerCase() })
      let finalName = img == undefined ? "" : img.Name;

      return finalName.replace(/[0-9]/g, '').replaceAll(' ', '');
    }
    if (type == "Other") {
      let img = CJMLImageList.Images[1].Images.find((x: any) => { return x.Location.replaceAll(' ', '').toLowerCase() == name.replaceAll(' ', '').toLowerCase() })
      let finalName = img == undefined ? "" : img.Name;
      return finalName.replace(/[0-9]/g, '').replaceAll(' ', '');
    }
  }

  function getImageByName(Name: string, type: string) {
    if (type == "Actor") {
      if (Name != null) {
        let img = CJMLImageList.Images[0].Images.find((x: any) => { return x.Name == Name })
        if (img == undefined) {
          img = CJMLImageList.Images[0].Images.find((x: any) => { return x.Name.toLowerCase().replaceAll(' ', '') == Name.toLowerCase() + '1' })
        }
        return img == undefined ? "" : img.Location;
      }
    }
    if (type == "Other") {
      if (Name != null) {
        let img = CJMLImageList.Images[1].Images.find((x: any) => { return x.Name.replaceAll(' ', '').toLowerCase() == Name.replaceAll(' ', '').toLowerCase() })
        if (img == undefined) {
          img = CJMLImageList.Images[1].Images.find((x: any) => { return x.Name.toLowerCase().replaceAll(' ', '') == Name.toLowerCase() + '1' })
        }
        return img == undefined ? "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - communication point\\unknown-channel.svg" : img.Location;
      }
    }
  }

  function getImageObject(imgName: any) {
    const image = new Image();
    image.src = imgName;
    return image;
  }

  function updateTouchPointsForChange(actor: any) {
    const circleNew = circles.map(circle => {
      if (circle.initiator.id == actor.id) {
        circle.initiator = actor;
        return circle;
      }
      else if (circle.receiver.id == actor.id) {
        circle.receiver = actor;
        return circle;
      }
      return circle;
    })
    setCircles(circleNew);
  }


}


export default App;
