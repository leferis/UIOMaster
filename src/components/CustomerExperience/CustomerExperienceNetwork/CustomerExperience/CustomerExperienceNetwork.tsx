import React, { FC } from 'react';
import { Circle, Rect, Text, Image as Images } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';


interface CustomerExperienceCustomerExperienceNetworkProps {}

function CustomerExperienceCustomerExperienceNetwork(props:CustomerExperienceCustomerExperienceNetworkProps){
   return(<>
      <Rect x={200} y={400} height={200} width={500} cornerRadius={5} fill='gray' strokeWidth={2} stroke={"darkgray"}/>
      <Circle x={210} y={410} radius={15} fill='gray' stroke={"gray"} />
      
      <TextMessages x={0} y={0} width={0} height={0} ChangeFunction={undefined} value={undefined} fontSize={undefined} modifyObject={undefined} isEditing={undefined} changeEditable={undefined} ChangeBack={undefined} default={undefined} />
   </>)
}

export default CustomerExperienceCustomerExperienceNetwork;
