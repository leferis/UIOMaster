import React, { FC } from 'react';
import styles from './ribbon/ChangeBar.module.css';
import ImageChange from '../ImageChange/ribbon/ChangeBar/ImageChange';
import ColorChange from '../ColorChange/ribbon/ChangeBar/ColorChange';
import TypeChange from '../TypeChange/ribbon/ChangeBar/TypeChange';
import RibbonChangeBarCheckBoxChange from '../CheckBoxChange/ribbon/ChangeBar/CheckBoxChange';
import { Actors } from '../../../../Classes/Actors';
import _ from "lodash"
import RibbonChangeBarActorChange from '../ActorChange/ribbon/ChangeBar/ActorChange';

interface RibbonChangeBarProps {
  images: any;
  currentObj: any
  setCurrentObj:any;
  TouchPoints: any;
  updateTouhcPoints: any;
  currentJourney: any;
  actors:Actors[];
  setActors:any;
  SwimlaneMode:any
  changeType:any;
}

function RibbonChangeBar(props: RibbonChangeBarProps) {
  

  let render = false;
  if (props.currentJourney != undefined) {
    render = !props.currentJourney.isPlanned;
  }
  console.log(render);
  console.log(props.currentJourney)
  return (<></>)
  // return (<div>
  //   {props.currentObj != -1 && <div >
  //     {props.currentObj.img != undefined && <div >
  //       {props.images != undefined && <ImageChange images={props.images.Images[0]} text={"Actor's Symbol"} currentObject={props.currentObj} 
  //       changeImage={setActorsImage}
  //       />}
  //       {/*<ColorChange/> */}
  //       <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "right", paddingBottom: "5px", paddingTop:"10px" }}>
     
  //       <span className='BarText' style={{ background: "rgb(57, 85, 163)", color: "white", borderRadius: "5px", paddingBottom: "5px",userSelect:"none", cursor:"pointer" }} onClick={props.changeType}> Switch diagram type</span></div>
  //     </div>
  //     }
  //     {props.currentObj.imageName != undefined &&
  //     <div>
  //       <div style={{ display: "inline-block", float:"left"}}>
  //         {props.images != undefined &&
  //           <div >
  //             {! props.SwimlaneMode && <ImageChange images={props.images.Images[1]} text="Initiator's Symbol" currentObject={props.currentObj} changeImage={setTouchpointImage}/>}
  //             {! props.SwimlaneMode &&<ImageChange images={props.images.Images[1]} text="Receivers's Symbol" currentObject={props.currentObj} changeImage={()=>{}}/>}
  //             { props.SwimlaneMode && <RibbonChangeBarActorChange text={"Initiator"} actors={props.actors} currentId={props.currentObj.initiator.id} changeActor={(e:any)=>{changeActor(e,"Initiator")}}/>}
  //             { props.SwimlaneMode && <RibbonChangeBarActorChange text={"Receiver"} actors={props.actors} currentId={props.currentObj.receiver.id} changeActor={(e:any)=>{changeActor(e,"Receiver")}}/>}
  //             {(render) &&
  //               <TypeChange currenctObj={props.currentObj} TouchPoints={props.TouchPoints} updateTouhcPoints={props.updateTouhcPoints} updateCurentObj={props.setCurrentObj} />}
  //             {(render) && <RibbonChangeBarCheckBoxChange text={"Deviation"} value={props.currentObj.devation} />}
              
  //           </div>}


  //       </div>
  //       <div className={false ? 'BarElementSelected' : 'BarElement'} style={{ float: "right", paddingBottom: "5px", paddingTop:"10px" }}>
     
  //    <span className='BarText' style={{ background: "rgb(57, 85, 163)", color: "white", borderRadius: "5px", paddingBottom: "5px",userSelect:"none", cursor:"pointer" }} onClick={props.changeType}> Switch diagram type</span></div>
  //    </div>
  //     }
  //   </div>}
  // </div>
  // )

  function changeActor(e:any, type:any){
    let touchpointData = _.cloneDeep(props.TouchPoints);
    let indexTouchpoint = touchpointData.findIndex((x:any) => {
      return x.id ==props.currentObj.id
    });
    let newActor = props.actors.findIndex((x)=> {
      return x.id == e
    })
    if(type == "Initiator"){
      if(props.currentObj.initiator.id != props.actors[newActor].id){
        if(props.currentObj.receiver.isEndUser && props.currentObj.receiver.id != props.actors[newActor].id){
          touchpointData[indexTouchpoint].initiator = props.actors[newActor]
        }
        else{
          touchpointData[indexTouchpoint].receiver = _.cloneDeep(touchpointData[indexTouchpoint].initiator);
          touchpointData[indexTouchpoint].initiator = props.actors[newActor];
          touchpointData[indexTouchpoint].initiatorColor = props.actors[newActor].color;
        }
      }
    }
    else if(type == "Receiver"){
      if(props.currentObj.receiver.id != props.actors[newActor].id){
        if(props.currentObj.initiator.isEndUser && props.currentObj.initiator.id != props.actors[newActor].id){
          touchpointData[indexTouchpoint].receiver = props.actors[newActor]
        }
        else{
          touchpointData[indexTouchpoint].initiator = _.cloneDeep(touchpointData[indexTouchpoint].receiver);
          touchpointData[indexTouchpoint].receiver = props.actors[newActor];
          touchpointData[indexTouchpoint].initiatorColor = touchpointData[indexTouchpoint].initiator.color;
        }
      }
    }
    console.log(touchpointData)
    props.setCurrentObj( _.cloneDeep(touchpointData[indexTouchpoint]))
    props.updateTouhcPoints(touchpointData)
  }

  function setActorsImage(path:string){
    let actors = _.cloneDeep(props.actors);
    let index = actors.findIndex((x) =>{
      return x.id == props.currentObj.id;
    })
    let current = _.cloneDeep(props.currentObj);
    current.img = path;
    props.setCurrentObj(current); 
    actors[index].img = path;
    props.setActors(actors);
  }

  
  function setTouchpointImage(path:string){
    let touchpoint = _.cloneDeep(props.TouchPoints);
    let index = touchpoint.findIndex((x:any) =>{
      return x.id == props.currentObj.id;
    })
    let current = _.cloneDeep(props.currentObj);
    current.imageName = path;
    props.setCurrentObj(current); 
    touchpoint[index].imageName = path;
    props.updateTouhcPoints(touchpoint);
  }
};

export default RibbonChangeBar;
