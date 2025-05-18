import React from 'react';
import { Arrow, Group, Rect } from 'react-konva';
import { Actors } from '../../../Classes/Actors';
import { CJMLAction } from '../../../Classes/CJMLAction';
import { CJMLArrow } from '../../../Classes/CJMLArrow';
import TextMessages from '../../TextMessages/TextMessages';
import _ from 'lodash';

interface SwimlaneActionProps {
  setActions: any;
  actions: CJMLAction[];
  setClickFunction: any;
  ClickFunction: any;
  drawingArrow: any;
  setCurrentObjectID: any;
  currentObject: any;
  actors: any;
  Arrows: CJMLArrow[];
  setArrows: any;
  addNewArrow: any;
  touchpoints: any;
  setTouchpoints: any;

}

function SwimlaneAction(props: SwimlaneActionProps) {
  return (
    <div>
      {props.actions.map((x: CJMLAction) => {
        return (
          <div>

              <Rect x={x.x}
                y={x.y}
                id={x.id.toString()}
                stroke={'black'}
                cornerRadius={10}
                height={60}
                width={90}
                fill={x.external == 0 ? "White" : "LightGray"}
                strokeWidth={3}
                onClick={(e) => {
                  checkClickFunction(x, e);
                }}


              />
                <Rect
            draggable
            x={x.x}
            y={x.y}
            id={x.id.toString()}
            height={60}
            width={90}
             onDragStart={() => x.Capacity = false}
             onDragMove={(e) => {
               moveElements(e, x, false);

             }}
             onDragEnd={
               (e) => {
                 moveElements(e, x, true);
              
                 }
               }
             
            />
              <TextMessages x={x.x + 10} y={x.y + 10} height={40} width={70} ChangeFunction={ChangeObject} modifyObject={x} value={x.text} fontSize={12} isEditing={x.isEditing} changeEditable={(x: any) => {
                const circles = props.actions.map((action: CJMLAction) => {
                  if (action.id == x.id) {
                    return { ...action, isEditing: true };
                  }
                  return action;
                })
                props.setActions(circles);
              }}
                ChangeBack={(x: any) => {
                  const circles = props.actions.map((action: CJMLAction) => {
                    if (action.id == x.id) {
                      return { ...action, isEditing: false };
                    }
                    return action;
                  })
                  props.setActions(circles);
                }}
                default={"Enter text"}
              ></TextMessages>
  
          
          </div>
        );
      })}

    </div>
  );

  function moveElements(e: any, x: any, end:boolean = false) {
  

    var positionOfActions =  e.target.getPosition().x;
    var positionYOfAction =  e.target.getPosition().y;
    var deviationY = 400;
    var currentX = 0;
    var currentY = 0;
    var isBelow = positionYOfAction > deviationY;
    var position = 0;
    var action = props.actions.map((element: any, index:number) => {
      if (x.id == element.id ) {
        element.x  = positionOfActions;
        element.y = positionYOfAction;
        position = index;
      }
      return element;
    });
    var elements = _.cloneDeep(props.touchpoints);
    elements = elements.concat(_.cloneDeep(action)).sort( (a:any,b:any) => a.x -b.x);

     if( !isBelow){ elements.map((element: any) => {
        if (x.id != element.id || (!isBelow && end  == true) ) {
          if(element.y < deviationY)
          element.x = 400 + currentX * 180;
        } 
        if(element.y > deviationY){
           currentX--;
        }
        currentX++;
      })
      
      console.log(isBelow)}

      if(isBelow){
        var chain = elements.filter( (element:any)  => element.x - 90 <= positionOfActions && element.x +90 >= positionOfActions ) ;
        if(chain.length == 0 ){
          if(positionOfActions < 400){
            chain = elements[0]
          }
          else{
            chain = elements[elements.length - 1]
          }
        }
        // fix this part 
        console.log(chain);
        console.log("Grandine ");
        chain.map((element:any) => {
          if (x.id != element.id && element.y> positionYOfAction || (end  == true  && element.y>= positionYOfAction) ) {
            element.y = 400 + currentY * 150;
          }
          if(element.y > deviationY){
            currentY--;
         }
         currentY++;
        })
      
      }

    
    sortOutTouchpoints(elements, position, x);
  }

  function sortOutTouchpoints(points:any, position: number, x:any){
    var circles, actions;
    var currentPosition;


    var circles = points.filter((x:any) => x.receiver != null);
    var actions = points.filter((x:any) => x.receiver == null);

    currentPosition = actions.findIndex((a:any) => a.id == x.id);
    actions = swapArray(actions, currentPosition, position);

    props.setActions(actions); 
    props.setTouchpoints(circles);

  }

  function swapArray(Array:any,Swap1:number,Swap2:number) : any
  {
      var temp = Array[Swap1];
      Array[Swap1] = Array[Swap2]
      Array[Swap2] = temp
      return Array;
  }

  function ChangeObject(e: any, obj: any) {
    const circles = props.actions.map((action: CJMLAction) => {
      if (action.id == obj.id) {
        return { ...action, text: e };
      }
      return action;
    })
    props.setActions(circles);
  }

  function checkClickFunction(clickedObject: CJMLAction, e: any) {
    switch (props.ClickFunction) {

      case '': {

        const circles = props.actions.map((action: any) => {
          if (action.id == clickedObject.id) {
            props.setCurrentObjectID(action);
            return { ...action, Capacity: true };
          }
          return action;
        });
        props.setActions(circles);
      }

    }

  }


  function collision(e: any) {
    var snapOnIt;
    var elementPos = e.target.getClientRect();
    props.actors.forEach((element: Actors) => {
      if (!(element.x > elementPos.x ||
        element.x + element.width < elementPos.x ||
        element.y > elementPos.y ||
        element.y + element.height < elementPos.y
      )) { snapOnIt = element; }
    });
    return snapOnIt;
  }
}

export default SwimlaneAction;
