import React, { FC } from 'react';
import { Group, Rect, Line, Circle, Image as Images } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';
import { Experience } from '../../../../Classes/Experience';

interface CustomerExperienceCustomerExperienceJourneyProps {
   touchpoint: any;
   yPostion: any;
   setTouchpoint: any;
   index: any;
}

function CustomerExperienceCustomerExperienceJourney(props: CustomerExperienceCustomerExperienceJourneyProps) {
   let push = props.index == 0 ? 0 : 75 * props.index;

   function createExperience() {
      let element = props.touchpoint;
      element.Experience = new Experience("Enter experience");
      props.setTouchpoint(element);
   }
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

   return (
      <Group>
         {
            (props.touchpoint.Experience == null) &&
            <Group onClick={() => {
               createExperience();
            }}>
               <Rect x={props.touchpoint.swimlaneX} y={props.yPostion} cornerRadius={10} dash={[11]} stroke={"black"} height={80} width={180} />
               <Line points={[props.touchpoint.swimlaneX + 100, props.yPostion + 40, props.touchpoint.swimlaneX + 80, props.yPostion + 40]} fill='black' stroke={"black"} strokeWidth={4} />
               <Line points={[props.touchpoint.swimlaneX + 90, props.yPostion + 30, props.touchpoint.swimlaneX + 90, props.yPostion + 50]} fill='black' stroke={"black"} strokeWidth={4} />
            </Group>
         }
         {
            props.touchpoint.Experience != null &&
            <Group>
               <Rect x={props.touchpoint.swimlaneX} y={props.yPostion} stroke={"black"} height={80} width={180} fill='white' />
               <TextMessages x={props.touchpoint.swimlaneX + 84} y={props.yPostion + 3} width={95} height={50} ChangeFunction={(value: any) => { changeComments(value) }} value={props.touchpoint.Experience.experienceDescription}
                  fontSize={14} modifyObject={props.touchpoint} isEditing={props.touchpoint.Experience.isEditing}
                  changeEditable={() => { setCommentsEditing(true) }} ChangeBack={() => { setCommentsEditing(false) }} default={"Enter comment"}></TextMessages>
               {props.touchpoint.Experience.experienceImage ==undefined && <Circle x={props.touchpoint.swimlaneX + 40} y={props.yPostion + 40} radius={20} dash={[3]} stroke={'black'} />}
               {props.touchpoint.Experience.experienceImage !=undefined && <Images x={props.touchpoint.swimlaneX + 20} y={props.yPostion + 20} height={40} width={40} image={getImageObject(props.touchpoint.Experience.experienceImage)} />}
            </Group>
         }
      </Group>
   )
}

export default CustomerExperienceCustomerExperienceJourney;