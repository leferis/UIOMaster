import React, { FC } from 'react';
import { Circle, Rect, Text, Image as Images, Group, Wedge } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';


interface CustomerExperienceCustomerExperienceNetworkProps {
   touchpoint: any;
   setTouchpoint: any;
   downLine : boolean;
}

function CustomerExperienceCustomerExperienceNetwork(props: CustomerExperienceCustomerExperienceNetworkProps) {
   function changeComments(value: any) {
      let element = props.touchpoint;
      element.Experience.experienceDescription = value;
      props.setTouchpoint(element);
   }
   function setCommentsEditing(value: boolean) {
      let element = props.touchpoint;
      element.Experience.isEditing = value;
      props.setTouchpoint(element);
   }
   function getImageObject(imgName: any) {
      const image = new Image();
      image.src = imgName;
      return image;
   }

   return (<>
      <Group>
         <Wedge x={props.touchpoint.x + 10} y={props.downLine?props.touchpoint.y + 62:props.touchpoint.y + 22} angle={40} radius={40} fill='lightgray' rotation={50} stroke={"gray"} />
         <Rect x={props.touchpoint.x} y={props.downLine?props.touchpoint.y + 80:props.touchpoint.y + 40} height={90} width={100} stroke={"gray"} fill='lightgray' />
         <TextMessages x={props.touchpoint.x + 5} y={props.downLine? props.touchpoint.y +85 :props.touchpoint.y + 45} width={90} height={30} ChangeFunction={(value: any) => { changeComments(value) }} value={props.touchpoint.Experience.experienceDescription}
            fontSize={14} modifyObject={props.touchpoint} isEditing={props.touchpoint.Experience.isEditing}
            changeEditable={() => { setCommentsEditing(true) }} ChangeBack={() => { setCommentsEditing(false) }} default={"Enter experience"}></TextMessages>
         {props.touchpoint.Experience.experienceImage != null && <Images x={props.touchpoint.x + 5} y={props.downLine? props.touchpoint.y + 140 : props.touchpoint.y + 100 } height={25} width={25} image={getImageObject(props.touchpoint.Experience.experienceImage)}/>}
      </Group>
   </>)
}

export default CustomerExperienceCustomerExperienceNetwork;
