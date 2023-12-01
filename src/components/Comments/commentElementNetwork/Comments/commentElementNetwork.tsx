import React, { FC } from 'react';
import { Group, Rect, Wedge } from 'react-konva';
import TextMessages from '../../../TextMessages/TextMessages';

interface CommentsCommentElementNetworkProps {
   touchpoint:any;
   setTouchpoint: any;
}

function CommentsCommentElementNetwork(props:CommentsCommentElementNetworkProps){
   function changeComments(value: any) {
      let element = props.touchpoint;
      element.Comment = value
      props.setTouchpoint(element);
    }
    function setCommentsEditing(value: boolean) {
      let element = props.touchpoint;
      element.CommentEdit = value
      props.setTouchpoint(element);
    }


   return(<>
   <Group>
   <Wedge x={props.touchpoint.x+10} y={props.touchpoint.y+22} angle={40} radius={40} fill='lightgray' rotation={50} stroke={"gray"}/>
   <Rect x={props.touchpoint.x} y={props.touchpoint.y + 40} height={90} width={150} stroke={"gray"}  fill='lightgray'/>
        <TextMessages x={props.touchpoint.x + 5} y={props.touchpoint.y+ 45} width={138} height={20} ChangeFunction={(value: any) => { changeComments(value) }} value={props.touchpoint.Comment}
          fontSize={14} modifyObject={props.touchpoint} isEditing={props.touchpoint.CommentEdit}
          changeEditable={() => { setCommentsEditing(true) }} ChangeBack={() => { setCommentsEditing(false) }} default={"Enter comment"}></TextMessages>
      </Group>
   </>)
}

export default CommentsCommentElementNetwork;
