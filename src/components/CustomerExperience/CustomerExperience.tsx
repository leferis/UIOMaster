import React, { FC } from 'react';
import CustomerExperienceCustomerExperienceNetwork from './CustomerExperienceNetwork/CustomerExperience/CustomerExperienceNetwork';
import { Rect, Text, Image as Images, Group} from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import CommentsComentElement from '../Comments/comentElement/Comments/comentElement';
import CommentsCommentElementNetwork from '../Comments/commentElementNetwork/Comments/commentElementNetwork';
import CustomerExperienceCustomerExperienceJourney from './CustomerExperienceJourney/CustomerExperience/CustomerExperienceJourney';
import { Actors } from '../../Classes/Actors';


interface CustomerExperienceProps {
   actors:any;
   diagramType:any;
   circles:any;
   setTouchpoints:any;
   actions:any;
   touchpoints:any;
   setActions:any;
}



function CustomerExperience(props:CustomerExperienceProps){
   function getImageObject(imgName: any) {
      const image = new Image();
      image.src = imgName;
      return image;
    }
    function updateTouchpoint(element: any) {
      let elements = props.touchpoints.map((x: any) => {
        if (x.id == element.id) {
          return element
        }
        return x
      })
      props.setTouchpoints(elements);
    }
   
    function updateActions(element: any) {
      let elements = props.actions.map((x: any) => {
        if (x.id == element.id) {
          return element
        }
        return x
      })
      props.setActions(elements);
    }

   let referenceNode = props.actors[props.actors.length - 1];
   
   let endUserNode = props.actors.filter((x:Actors) =>{
      return  x.isEndUser; 
   })
   console.log(endUserNode)
   return (<>
      {!props.diagramType && <><Rect x={referenceNode.x} y={referenceNode.y + 400} height={120} width={referenceNode.width} stroke='#d9d9d9'
        cornerRadius={10}
        fill='white'
        strokeWidth={3} />
      <Text x={referenceNode.x + 25} y={referenceNode.y + 465} text={ endUserNode[0].Title + ' Experience'} fontSize={14} width={75} />
      <Images x={referenceNode.x + 45} y={referenceNode.y + 430} image={getImageObject(endUserNode[0].img)} height={30} width={25} /></>}
      <Group>
        {props.touchpoints.map((x: CJMLCircle, index: any) => {
          if (!props.diagramType) {
            return (<CustomerExperienceCustomerExperienceJourney touchpoint={x} yPostion={referenceNode.y + 420} setTouchpoint={(element: any) => { updateTouchpoint(element) }} index={index} />)
          }
          else if(props.diagramType && x.Experience != null)  {
            return(<CustomerExperienceCustomerExperienceNetwork setTouchpoint={(element: any) => { updateTouchpoint(element) }} touchpoint={x}/>)
          }
        })}
        {props.actions.map((x: CJMLCircle, index: any) => {
          if (!props.diagramType) {
            return (<CustomerExperienceCustomerExperienceJourney touchpoint={x} yPostion={referenceNode.y + 420} setTouchpoint={(element: any) => { updateActions(element) }} index={index} />)
          }
          else if(props.diagramType  && x.Experience != null) {
            return(<CustomerExperienceCustomerExperienceNetwork setTouchpoint={(element: any) => { updateTouchpoint(element) }} touchpoint={x}/>)
          }
        })}
      </Group>
    </>)

   
}

export default CustomerExperience;
