import React, { FC } from 'react';
import styles from './leftMeniu/ActorPicker.module.css';
import { Html } from 'react-konva-utils';
import { Group, Text } from 'react-konva';
import { DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { Actors } from '../../../../Classes/Actors';
import { Checkbox } from '@mui/material';
import {updateByActors} from '../../../../Functions/Switching'

interface LeftMeniuActorPickerProps {
  Actors: Actors[];
  swimLaneMode: boolean;
  currentObject: any;
  setActors: any; 
  setCurrentObject:any;
  addNewActor:any;
  circles:any;
  actions:any;
  setActions:any;
  updateCircles:any;
}

function LeftMeniuActorPicker(props: LeftMeniuActorPickerProps) {

  function changeActors(result: any) {
    if (result.reason != "CANCEL" && result.destination != null && result.destination.index != props.Actors.length) {
      let copyOfActors = JSON.parse(JSON.stringify(props.Actors))
      var element = copyOfActors[result.source.index];
      copyOfActors.splice(result.source.index, 1);
      copyOfActors.splice(result.destination.index , 0, element);
      copyOfActors.map((x:Actors, index:number) => { 
        x.y = 200*(index + 1)
      })
      props.setActors(copyOfActors)
      updateByActors(props.circles, props.actions, props.setActions, props.updateCircles, copyOfActors)
    }
  }
  const grid = 8;

  const getItemStyle = (isDragging: any, draggableStyle: any, item:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    height: 14,
    display: "inline-flex",
    minWidth: "150px",
    maxWidth:"150px",
    maxHeight:"140px",
    // change background colour if dragging
    background: props.currentObject == item ? "darkgray" : "lightgrey",
    borderRadius: 5,
    
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: grid,
    width: 210,
    maxHeight: 150,
    overflow: "auto"
  });

  return (
    <Group>
      <Html groupProps={{ x: 3, y: 60 }} divProps={{ style: { opacity: 1 } }}>
        <Group>
          Actors' list
          <DragDropContext onDragEnd={(result) => changeActors(result)} >
            <Droppable droppableId='"Actors"' >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {props.Actors.sort((x,y) =>{
                    return x.y - y.y
                  }).map((item, index) => (
                    <Draggable key={item.id} draggableId={"Actor" + item.id} index={index}>
                      {(provided, snapshot) => (
                        <div 
                        onClick={()=> { 
                          props.setCurrentObject(item)
                        }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item
                          )}
                        >
                          <div style={{ borderRadius: "50%", border: "2px solid " + item.color, width: 24, height: 24, paddingLeft: 2, position: "relative", right:"7px", bottom:"5px" }}>
                            <img style={{ width: 20, height: 20 }} src={item.img} />
                          </div>
                          <div style={{  width:140, lineHeight: "16px", wordWrap: 'break-word',maxHeight:"50px", maxLines:5, display:"-webkit-box", overflow:"hidden",
                           WebkitBoxOrient:"vertical", WebkitLineClamp:"5", height:"18px" }}>{item.Title}</div>

                        </div>
                      )}
                    </Draggable>

                  ))}
                  <Draggable key={9999999999} draggableId={"Insert"} index={props.Actors.length} isDragDisabled={true} >
                    {(provided, snapshot) => (
                      <div onClick={() => { props.addNewActor(props.Actors[props.Actors.length-1]) }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          null
                        )}
                      >
                        <div style={{paddingLeft:"35%"}}> Insert</div>
                      </div>
                    )}
                  </Draggable>
                </div>
              )}

            </Droppable>
          </DragDropContext>
          {!props.swimLaneMode &&
            // Check if user is selected and then if it is end user
            <div>Is End User <Checkbox checked={props.currentObject.isEndUser != undefined ? props.currentObject.isEndUser : false} /></div>
          }
          {props.swimLaneMode &&
            // Check if checkpoint is used and check who is initiator
            <div>Initiator <Checkbox /></div>
          }
        </Group>
      </Html>
    </Group>)
};

export default LeftMeniuActorPicker;
