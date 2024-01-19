import { remove } from 'lodash';
import React, { FC, useState } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage, Label, Text, Group } from 'react-konva';
import { ImageChange } from '../../Classes/ImageChange';
import { setCirlceAtEnd } from '../../Functions/creation';
import ActionPoints from '../ActionPoints/ActionPoints';
import ActorPoint from '../ActorPoint/ActorPoint';
import ArrowComponent from '../ArrowComponent/ArrowComponent';
import Comments from '../Comments/Comments';
import Home from '../Home/Home';
import Legend from '../Legend/Legend';
import TouchPoint from '../TouchPoint/TouchPoint';
import ColorCoding from '../colorCoding/colorCoding';
import Deviation from '../deviation/deviation';
import LeftMeniu from '../leftMeniu/leftMeniu';
import SwimlaneInitialValues from '../swimlaneInitialValues/swimlaneInitialValues';
import { CJMLAction } from '../../Classes/CJMLAction';
import { Actors } from '../../Classes/Actors';
import { CJMLArrow } from '../../Classes/CJMLArrow';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import CustomerExperience from '../CustomerExperience/CustomerExperience';


interface CanvasProps {
   initialArrowId: any;
   circles: CJMLCircle[];
   setNewArrowId: any;
   setArrows: any;
   currentObject: any;
   setCurrentObjectReference: any;
   Arrows: CJMLArrow[];
   dragBoxLocation: any;
   resetTouchpoints(): unknown;
   currentJourney: any;
   getImageObject: any;
   CJMLImageList: any;
   remove: any;
   setActors: any;
   setPosY: any;
   initialActorPosY: any;
   addNewActor: any;
   setActions: any;
   setCircles: any;
   setDrawingArrowMode: any;
   drawingArrow: any;
   setClickFunction: any;
   setDrawingObject: any;
   DrawingObject: any;
   changeArrow: any;
   addNewArrow: any;
   finishArrow: any;
   elementCheckCloseToBorder: any;
   elementsAreFarFromBorder: any;
   makeBiggerActors: any;
   findFurthestPoint: any;
   ChangeOpenHome: any;
   changeJourney: any;
   GetImageFullName: any;
   setImage: any;
   updateCurrentJourney: any;
   addNewAction: any;
   setCirlceAtEnd: any;
   addNewCircle: any;
   setMouseDownFunction: any;
   setDevationMode: any;
   setShowModal: any;
   setshowQuestionary: any;
   GetImage: any;
   addNewActorinTheEnd: any;
   setShowSettings: any;
   setImageChange: any;
   addNewActorDragAndDrop: any;
   setOpenStatistics: any;
   actions: CJMLAction[];
   ActorsCJML: Actors[];
   layerEl: any;
   ClickFunction: any;
   onClickDoes: any;
   mouseDownFunction: any;
   onReleaseDoes: any;
   setCurrentObjectID: any;
   onMouseMovement: any;
   openHome: any;
   setLocation: any;
   SwimlineMode: any;
   Journey: any;
   ImageChange: any;
   showComments: any;
   showCustomerExperience:any;
   setOpenHelp:any;
}

function Canvas(props: CanvasProps) {

   const [procentage,setProcentage] = useState(100)

   return (<Stage width={window.innerWidth} height={(window.innerHeight - 175)}
      onMouseUp={(e) => {
         if (props.ClickFunction != "")
            props.onClickDoes(e);
         else if (props.mouseDownFunction != "") {

            props.onReleaseDoes(e);
         }
         else {
            props.setCurrentObjectID(-1)
         }
      }}
      onTouchEnd={(e) => {
         if (props.ClickFunction != "")
            props.onClickDoes(e);
         else if (props.mouseDownFunction != "") {

            props.onReleaseDoes(e);
         }
         else {
            props.setCurrentObjectID(-1)
         }
      }}
      onDragEnd={(e) => {
         if (props.ClickFunction != "")
            props.onClickDoes(e);
         else if (props.mouseDownFunction != "") {

            props.onReleaseDoes(e);
         }
         else {
            props.setCurrentObjectID(-1)
         }
      }}
      onMouseMove={(e) => {
         props.onMouseMovement(e);
      }}
      onTouchMove={(e) => {
         props.onMouseMovement(e);
      }}
      onDragMove={(e) => {
         props.onMouseMovement(e);
      }}

   >
      {!props.openHome && <Layer id='test' ref={props.layerEl} draggable x={100} y={-100} scaleX={procentage/100} scaleY={procentage/100}

         onWheel={(e) => {
            
            const deltax = -(e.evt.deltaX / props.layerEl.current.attrs.scaleX);
            const deltaY = -(e.evt.deltaY / props.layerEl.current.attrs.scaleY);
            console.log(props.layerEl.current.attrs.scaleX);
            const tempY = props.layerEl.current.attrs.y + deltaY
            props.layerEl.current.setX(props.layerEl.current.attrs.x + deltax);
            props.layerEl.current.setY(props.layerEl.current.attrs.y + deltaY);
            props.setLocation([props.layerEl.current.attrs.x != undefined ? -props.layerEl.current.attrs.x + deltax  : 0, props.layerEl.current.attrs.y != undefined ? -tempY: 0]);
         }}

         onDragEnd={(e) => {
            props.setLocation([props.layerEl.current.attrs.x != undefined ? - props.layerEl.current.attrs.x / props.layerEl.current.attrs.scaleX : 0, 
               props.layerEl.current.attrs.y != undefined ? -props.layerEl.current.attrs.y / props.layerEl.current.attrs.scaleY: 0]);
         }}
      >
         {props.SwimlineMode && <SwimlaneInitialValues actions={props.actions} actors={props.ActorsCJML} arrowID={props.initialArrowId} circles={props.circles} setArrowID={props.setNewArrowId} setArrows={props.setArrows} />}
         <ArrowComponent currentObject={props.currentObject} setCurrentObject={props.setCurrentObjectReference} Arrows={props.Arrows} setArrows={props.setArrows} SwimlineMode={props.SwimlineMode} />

         {/* This square is invisible hitbox to scroll and drag.*/}
         {props.Journey.length > 0 && <Rect x={props.dragBoxLocation[0]} y={props.dragBoxLocation[1]} height={window.innerHeight} width={window.innerWidth}  onClick={() => { props.resetTouchpoints(); }}></Rect>}

         {props.Journey.length > 0 && props.Journey[props.currentJourney].isPlanned != true && props.SwimlineMode && <Deviation Actors={props.ActorsCJML} />}
         {props.Journey.length > 0 && (!props.SwimlineMode || !props.Journey[props.currentJourney].isPlanned) &&
            <ActorPoint
               currentObject={props.currentObject} getImageObject={props.getImageObject} Images={props.CJMLImageList} remove={props.remove}
               setActors={props.setActors} actors={props.ActorsCJML} setPosY={props.setPosY} posY={props.initialActorPosY} setCurrentObjectID={props.setCurrentObjectReference} addNewActor={props.addNewActor} SwimlineMode={props.SwimlineMode}
               actions={props.actions} circles={props.circles} setActions={props.setActions} updateCircles={props.setCircles}
            />}

         {props.Journey.length > 0 && <TouchPoint remove={props.remove} Circle={props.circles} Arrows={props.Arrows} setArrows={props.setArrows} updateCircles={props.setCircles} arrowId={props.initialArrowId} setArrowId={props.setNewArrowId} ClickFunction={props.ClickFunction} setDrawingArrowMode={props.setDrawingArrowMode}
            drawingArrow={props.drawingArrow} currentObject={props.currentObject} setCurrentObjectID={props.setCurrentObjectReference} setClickFunction={props.setClickFunction} Images={props.CJMLImageList} actions={props.actions}
            setActions={props.setActions} actors={props.ActorsCJML} setDrawingObject={props.setDrawingObject} DrawingObject={props.DrawingObject} changeArrow={props.changeArrow}
            addNewArrow={props.addNewArrow} finishArrow={props.finishArrow} elementCheckCloseToBorder={props.elementCheckCloseToBorder} elementsAreFarFromBorder={props.elementsAreFarFromBorder}
            SwimlineMode={props.SwimlineMode} resetTouchpoints={props.resetTouchpoints} devationMode={props.Journey[props.currentJourney].isPlanned} getImageObject={props.getImageObject}
            isPlanned={props.Journey[props.currentJourney].isPlanned}
            makeBiggerActors={props.makeBiggerActors}
            findFurthestPoint={props.findFurthestPoint} setActors={props.setActors}
         ></TouchPoint>}
         <ActionPoints swimlaneMode={props.SwimlineMode} setActions={props.setActions}
            remove={props.remove}
            actions={props.actions}
            setClickFunction={props.setClickFunction}
            ClickFunction={props.ClickFunction}
            drawingArrow={props.drawingArrow}
            setDrawingArrowMode={props.setDrawingArrowMode}
            setCurrentObjectID={props.setCurrentObjectReference}
            currentObject={props.currentObject}
            arrowId={props.initialArrowId}
            Arrows={props.Arrows} setArrows={props.setArrows}
            setArrowId={props.setNewArrowId} actors={props.ActorsCJML} setDrawingObject={props.setDrawingObject}
            addNewArrow={props.addNewArrow} finishArrow={props.finishArrow} changeArrow={props.changeArrow}
            updateCircles={props.setCircles}
            circles={props.circles}
            findFurthestPoint={props.findFurthestPoint}
            checkIfCloseToActorsBorder={props.makeBiggerActors} setActors={props.setActors}
         ></ActionPoints>
         {props.showCustomerExperience && <CustomerExperience actions={props.actions} actors={props.ActorsCJML} circles={props.circles} diagramType={props.SwimlineMode} setActions={props.setActions} setTouchpoints={props.setCircles} touchpoints={props.circles} />}
         {props.showComments && <Comments actions={props.actions} actors={props.ActorsCJML} setActions={props.setActions} setTouchpoints={props.setCircles} touchpoints={props.circles} diagramType={props.SwimlineMode} />}
         {props.Journey.length > 0 && props.ImageChange != undefined && !props.openHome && <KonvaImage x={props.ImageChange?.x - 15} y={props.ImageChange?.y - 15} height={30} width={30} image={props.getImageObject(props.ImageChange.Image)}></KonvaImage>}
         {props.ActorsCJML.length > 0 && props.SwimlineMode && <ColorCoding actors={props.ActorsCJML} />}
      </Layer>}

            {/*Layer used to scale up and down the layer */}
      {props.layerEl.current != undefined && <Layer>
         <Group onClick={(e)=>{
             if(props.layerEl.current.attrs.scaleX>0.4){
               setProcentage(procentage-10)
            props.layerEl.current.setScaleX(props.layerEl.current.attrs.scaleX - 0.1)
            props.layerEl.current.setScaleY(props.layerEl.current.attrs.scaleY - 0.1)

             }
         }}>
         <Rect x={window.innerWidth-470} y={window.innerHeight-222} height={20} width={20} fill='gray' cornerRadius={100} 
         />
         <Text  x={window.innerWidth-465} y={window.innerHeight-228} text='-' fontSize={32}/>
         </Group>

         <Text x={window.innerWidth-450} y={window.innerHeight-220} text={((procentage).toFixed(0)).toString() + "%"} align='center' fontSize={18} width={50} />
         <Group onClick={(e)=>{
            if(props.layerEl.current.attrs.scaleX<2){
               setProcentage(procentage+10)
            props.layerEl.current.setScaleX(props.layerEl.current.attrs.scaleX + 0.1)
            props.layerEl.current.setScaleY(props.layerEl.current.attrs.scaleY + 0.1)
            }
         }}>
           <Rect x={window.innerWidth-400} y={window.innerHeight-222} height={20} width={20}  cornerRadius={100} fill='gray' />
         <Text  x={window.innerWidth-399} y={window.innerHeight-224} text='+' fontSize={30}/></Group>
         </Layer>}


      {props.openHome &&
         <Layer ref={props.layerEl} draggable onDragEnd={(e) => {
            props.setLocation([props.layerEl.current.attrs.x != undefined ? - props.layerEl.current.attrs.x : 0, props.layerEl.current.attrs.y != undefined ? -props.layerEl.current.attrs.y : 0]);
         }}>
            {props.Journey.length > 0 && <Rect x={props.dragBoxLocation[0]} y={props.dragBoxLocation[1]} height={window.innerHeight} width={window.innerWidth} onClick={() => { props.resetTouchpoints(); }}></Rect>}
            <Home CloseHomeWindow={props.ChangeOpenHome} setJourney={props.changeJourney} journeys={props.Journey} getImageObject={props.getImageObject}></Home>
         </Layer>
      }

      <LeftMeniu mainLayer={props.layerEl} setActors={props.setActors} setCurrentObject={props.setCurrentObjectID} GetImageFullName={props.GetImageFullName} Images={props.CJMLImageList} setImage={props.setImage} currentObject={props.currentObject}
         updateCurrentJourney={props.updateCurrentJourney} addNewAction={props.addNewAction} setCirlceAtEnd={props.setCirlceAtEnd} addNewCircle={props.addNewCircle} setCircles={props.setCircles}
         mouseDownFunction={props.mouseDownFunction} setMouseDownFunction={props.setMouseDownFunction} circles={props.circles} actions={props.actions} actors={props.ActorsCJML}
         SwimlineMode={props.SwimlineMode} setClickFunction={props.setClickFunction} layerHeight={props.layerEl} enableDevationMode={props.setDevationMode}
         showModal={props.setShowModal} showQuestionary={props.setshowQuestionary} Journeys={props.Journey} getImages={props.GetImage} getImageObject={props.getImageObject}
         currentJourney={props.currentJourney} addNewActor={props.addNewActorinTheEnd}
         setActions={props.setActions} openModal={props.setShowModal} setShowSettings={props.setShowSettings} setImageChange={props.setImageChange}
         addNewActorDragAndDrop={props.addNewActorDragAndDrop} setOpenStatistics={props.setOpenStatistics} setOpenHelp={props.setOpenHelp}
      />
      {props.SwimlineMode && <Legend actors={props.ActorsCJML} setActors={props.setActors} />}

   </Stage>)
}
export default Canvas;
