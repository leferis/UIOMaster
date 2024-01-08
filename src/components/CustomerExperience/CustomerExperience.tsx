import React, { FC } from 'react';
import CustomerExperienceCustomerExperienceNetwork from './CustomerExperienceNetwork/CustomerExperience/CustomerExperienceNetwork';
import { Rect, Text, Image as Images} from 'react-konva';
import { CJMLCircle } from '../../Classes/CJMLCircle';


interface CustomerExperienceProps {
   DiagramType:any;
   circles:any;
}

function CustomerExperience(props:CustomerExperienceProps){
   if(props.DiagramType){
      // props.circles.map((referenceNode:CJMLCircle) => {      return(<><Rect /><Text x={referenceNode.x + 25} y={referenceNode.y + 280} text='Comments' fontSize={14} />
      // <Images x={referenceNode.x + 40} y={referenceNode.y + 230} image={getImageObject("\\HelpingImages\\help.png")} height={40} width={40} />
      // <CustomerExperienceCustomerExperienceNetwork /></>)})


   }
   else{
      return <>
   
      </>
   }
   
}

export default CustomerExperience;
