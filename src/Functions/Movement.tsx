import { Circle } from "react-konva";
import { Actors } from "../Classes/Actors";
import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLArrow } from "../Classes/CJMLArrow";
import { CJMLCircle } from "../Classes/CJMLCircle";

export function onDragMove(e: any, Circle: CJMLCircle[], touchPoint: any, updateCircles: any, changeArrow: any,  index: any, elementCheckCloseToBorder: any, actions: any, setActions: any, actors: any,SwimlineMode: boolean, 
  isPlanned:any,arrowId:any, setArrowId:any, setArrows:any, makeBiggerActors:any) {
  if (SwimlineMode) {
    onDragEndJourney(e, touchPoint, actors, Circle, SwimlineMode, updateCircles, changeArrow, actions, setActions, index, isPlanned, arrowId, setArrowId, setArrows)
  }
  else {
  const circles = Circle.map(circle => {
    if (circle.id == touchPoint.id) {
      return { ...circle, swimlaneX: e.target.getPosition().x, swimlaneY: e.target.getPosition().y };
    }
    return circle;
  })
  var actorIn: Actors | undefined = collisionSwim(e, touchPoint, actors); // fix colision
  if (actorIn != undefined) {
    const circles = Circle.map(circle => {
      if (circle.id == touchPoint.id) {
        return { ...circle, initiator: actorIn, swimlaneY: actorIn != undefined ? actorIn.y - actorIn.height / 2 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff" };
      }
      return circle;
    })
    updateCircles(circles);
    changeArrow(e, touchPoint.id, circles.filter(y => y.id == touchPoint.id)[0]);
  }
  moveElement(Circle, index, e.target.attrs.x, actions, updateCircles, setActions, arrowId, setArrowId, setArrows);
  makeBiggerActors(e.target.attrs.x);
  updateCircles(circles);
}
}

function onDragMoveJourney(e: any, Circle: CJMLCircle[], touchPoint: any, updateCircles: any, changeArrow: any, index: any, elementCheckCloseToBorder: any, actions: any, setActions: any, actors: any,SwimlineMode: boolean,arrowId:any, setArrowId:any, setArrows:any){
  const circles = Circle.map(circle => {
    if (circle.id == touchPoint.id) {
      return { ...circle, swimlaneX: e.target.getPosition().x, swimlaneY: e.target.getPosition().y };
    }
    return circle;
  })
  var actorIn: Actors | undefined = collisionSwim(e, touchPoint, actors); // fix colision
  if (actorIn != undefined) {
    const circles = Circle.map(circle => {
      if (circle.id == touchPoint.id) {
        return { ...circle, initiator: actorIn, swimlaneY: actorIn != undefined ? actorIn.y - actorIn.height / 2 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff" };
      }
      return circle;
    })
    updateCircles(circles);
    changeArrow(e, touchPoint.id, circles.filter(y => y.id == touchPoint.id)[0]);
  }
  moveElement(Circle, index, e.target.attrs.x, actions, updateCircles, setActions, arrowId, setArrowId, setArrows);
  updateCircles(circles);
  elementCheckCloseToBorder(e.target.getPosition().x);
}

function onDragEndJourney(e: any, touchPoint: any, actors: Actors[], Circle: CJMLCircle[], SwimlineMode: boolean, updateCircles: any, changeArrow: any,  actions: CJMLAction[], setActions: any, index: any, isPlanned: boolean,arrowId:any, setArrowId:any, setArrows:any, phase?:any) {
  let yPosOfMouse
  let xPosOfMouse
  var max = 0;
  actors.map(x=>{
    if(max<x.y +x.height && x.isEndUser){
      max = x.y +x.height ;
    }
  })
  if (e.target.attrs.y != null) {
    yPosOfMouse = e.target.attrs.y;
    xPosOfMouse = e.target.attrs.x;
  }
  else {
    yPosOfMouse = e.target.getStage().getPointerPosition().y;
    xPosOfMouse = e.target.getStage().getPointerPosition().x;
  }
  var actorIn: Actors | undefined = collisionSwim(yPosOfMouse, touchPoint, actors);
  if (actorIn != undefined && isPlanned) {
    actorIn = (actorIn as Actors).isEndUser ? actorIn : undefined;
  }
  if(actorIn == undefined && isPlanned) {
    const filtered = actors.filter((x: Actors) => { return x.isEndUser });
    actorIn = filtered[0];
  }
  if (actorIn != undefined) {
    let yValue = actorIn != undefined? actorIn.y+ actorIn.height/2: 200
    let isDevation = yValue>max?true:false 
    const circles2 = Circle.map(circle => {
      if (circle.id == touchPoint.id) {
        if(SwimlineMode ){
          if( actorIn != undefined && !actorIn.isEndUser){
            actorIn = circle.initiator
          }}
        return { ...circle,  swimlaneY: actorIn != undefined ? actorIn.y + 20 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", swimlaneReceiverY: circle.receiver.y + 20, y:actorIn != undefined? actorIn.y+ actorIn.height/2: 200, devation: isDevation, phase:phase };
      }
      return circle;
    })
    updateCircles(circles2);
    changeArrow(e, touchPoint.id, circles2.filter(y => y.id == touchPoint.id)[0]);
    moveJourneyElement(circles2, index, xPosOfMouse, actions, updateCircles, setActions, arrowId, setArrowId, setArrows);
  } else {
    moveJourneyElement(Circle, index, xPosOfMouse, actions, updateCircles, setActions, arrowId, setArrowId, setArrows);
  }
}

export function moveJourneyElement(elementArray: any, index: any, relativeX: number, actions: any, updateCircles: any, setActions: any,arrowId:any, setArrowId:any, setArrows:any) {
  let objects = JSON.parse(JSON.stringify(elementArray)).concat(JSON.parse(JSON.stringify(actions)));
  let objects2 = elementArray.concat(actions);
  let lefover = -1;
  objects.sort((a: CJMLCircle, b: CJMLCircle) => {
    if(a.x == b.x){
      return  b.y - a.y;
    }
    return a.x - b.x
  });
  let indexOfFirsChange = objects.findIndex((x: CJMLCircle) => {
    return x.x + 180 > relativeX;
  })
  if (indexOfFirsChange != -1) {
    if (indexOfFirsChange > index) {
      for (let j = 0; j <= indexOfFirsChange; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
        if(!objects[j].devation){
          lefover=0
        objects[j].x = 400 + (150 * (j-lefover)) 
        }
        else{
          lefover++;
          objects[j].x = 400 + (150 * (j-lefover)) 
        }
      }

      for (let j = 0; j < objects.length; j++) {
        for (let k = 0; k < objects.length; k++) {
          if (objects2[k].id == objects[j].id) {
            objects2[k].swimlaneX = objects[j].swimlaneX;
          }
        }
      }
    }
    else {
      for (let j = indexOfFirsChange; j < objects.length; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
        if(!objects[j].devation){
          objects[j].x = 400 + (150 * (j-lefover)) 
          }
          else{
            lefover++;
            objects[j].x = 400 + (150 * (j-lefover)) 
          }
      }

      for (let j = 0; j < objects.length; j++) {
        for (let k = 0; k < objects.length; k++) {
          if (objects2[k].id == objects[j].id) {
            objects2[k].swimlaneX = objects[j].swimlaneX;
            objects2[k].x = objects[j].x;
          }
        }
      }
    }
    var actionsTemp: CJMLAction[] = [];
    var touch: CJMLCircle[] = []
    for (let j = 0; j < objects2.length; j++) {
      if (objects2[j].receiver == undefined) {
        actionsTemp.push(objects2[j]);
      }
      else {
        touch.push(objects2[j]);
      }
    }
    setActions(actionsTemp);
    updateCircles(touch);
    remakeArrows(touch,actionsTemp, arrowId,setArrowId,setArrows)
  }
}

export function moveElement(elementArray: any, index: any, relativeX: number, actions: any, updateCircles: any, setActions: any,arrowId:any, setArrowId:any, setArrows:any) {
  let objects = JSON.parse(JSON.stringify(elementArray)).concat(JSON.parse(JSON.stringify(actions)));
  let objects2 = elementArray.concat(actions);
  objects.sort((a: CJMLCircle, b: CJMLCircle) => {
    return a.swimlaneX - b.swimlaneX
  });
  let indexOfFirsChange = objects.findIndex((x: CJMLCircle) => {
    return x.swimlaneX + 180 > relativeX;
  })
  if (indexOfFirsChange != -1) {

    if (indexOfFirsChange > index) {
      for (let j = 0; j <= indexOfFirsChange; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
        objects[j].x = 400 + (150 * j)
      }

      for (let j = 0; j < objects.length; j++) {
        for (let k = 0; k < objects.length; k++) {
          if (objects2[k].id == objects[j].id) {
            objects2[k].swimlaneX = objects[j].swimlaneX;
            objects2[k].x = objects[j].x;
          }
        }
      }
    }
    else {
      for (let j = indexOfFirsChange; j < objects.length; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
        objects[j].x = 400 + (150 * j)
      }

      for (let j = 0; j < objects.length; j++) {
        for (let k = 0; k < objects.length; k++) {
          if (objects2[k].id == objects[j].id) {
            objects2[k].swimlaneX = objects[j].swimlaneX;
            objects2[k].x = objects[j].x;
          }
        }
      }
    }
    var actionsTemp: CJMLAction[] = [];
    var touch: CJMLCircle[] = []
    for (let j = 0; j < objects2.length; j++) {
      if (objects2[j].receiver == undefined) {
        actionsTemp.push(objects2[j]);
      }
      else {
        touch.push(objects2[j]);
      }
    }
    setActions(JSON.parse(JSON.stringify(actionsTemp)));
    updateCircles(touch);
    remakeArrows(touch,actionsTemp, arrowId,setArrowId,setArrows)
  }

}



export function remakeArrows(Circle: any, actions: any, arrowId: number, setArrowId: any, setArrows: any) {
  let objects = JSON.parse(JSON.stringify(Circle)).concat(JSON.parse(JSON.stringify(actions)));
  let newArrows = [];
  objects.sort((a: any, b: any) => {
    if (a.x == b.x) {
      return a.y - b.y ;
    } else {
      return a.x - b.x ;
    }
  })
  for (let i = 0; i < objects.length - 1; i++) {
    let arrow = new CJMLArrow(arrowId, objects[i], objects[i + 1]);
    arrow.Draw();
    newArrows.push(arrow);
    setArrowId(arrow.id + 1);
  }
  setArrows(newArrows);
}

export function collisionSwim(positionY: any, elements: CJMLCircle | CJMLAction, actors: Actors[]) {
  var snapOnIt;
  actors.forEach((element: Actors) => {
    if (
      (element.y <= positionY || element.y <= positionY + 120) &&
      element.y + element.height >= positionY
    ) { snapOnIt = element; }
  });

  return snapOnIt;
}

export function onDragEnd(e: any, touchPoint: any, actors: Actors[], Circle: CJMLCircle[], SwimlineMode: boolean, updateCircles: any, changeArrow: any, actions: CJMLAction[], setActions: any, index: any, isPlanned: boolean,
  arrowId:any, setArrowId:any, setArrows:any, phase?:any) {
  if (SwimlineMode) {
    onDragEndJourney(e, touchPoint, actors, Circle, SwimlineMode, updateCircles, changeArrow, actions, setActions, index, isPlanned, arrowId, setArrowId, setArrows, phase)
  }
  else {
    let yPosOfMouse
    let xPosOfMouse
    let phaseOption:string;
    if (e.target.attrs.y != null) {
      yPosOfMouse = e.target.attrs.y;
      xPosOfMouse = e.target.attrs.x;
    }
    else {
      yPosOfMouse = e.target.getStage().getPointerPosition().y;
      xPosOfMouse = e.target.getStage().getPointerPosition().x;
    }
    var actorIn: Actors | undefined = collisionSwim(yPosOfMouse, touchPoint, actors);

    if(phase==undefined || phase == null){
      phaseOption= touchPoint.phase
    }
    else{
      phaseOption = phase
    }
    if (actorIn != undefined) {
      const circles2 = Circle.map(circle => {
        if (circle.id == touchPoint.id) {
            let tempActor, tempy;
              let swap = true;
              if(circle.swimlaneY > circle.swimlaneReceiverY -50 && circle.swimlaneY < circle.swimlaneReceiverY+ 100 ){
                swap = false;
              }
              
              if (circle.id == touchPoint.id) {
                let tempActor, tempy;
                if (!SwimlineMode && circle.receiver == actorIn) {
                  
                  tempActor = JSON.parse(JSON.stringify(circle.initiator));
                  tempy = circle.initiator.y + 20;
                  return { ...circle, initiator: actorIn, swimlaneY: actorIn != undefined ? actorIn.y + 20 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver: tempActor, swimlaneReceiverY: tempActor != undefined ? tempy : 200, phase:phaseOption };
                }}
              if(!swap){
              
                tempActor = JSON.parse(JSON.stringify(circle.initiator));
                tempy = circle.initiator.y + 20;
                return { ...circle, initiator: actorIn, swimlaneY: actorIn != undefined ? actorIn.y + 20 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver: tempActor, swimlaneReceiverY: tempActor != undefined ? tempy : 200, phase:phaseOption };
              }
              else{
                tempActor = JSON.parse(JSON.stringify(circle.receiver));
                tempy = tempActor.y + 20;
                if(actorIn?.id != tempActor?.id){
              return { ...circle, initiator: actorIn, swimlaneY: actorIn != undefined ? actorIn.y + 20 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver: tempActor, swimlaneReceiverY: tempActor != undefined ? tempy : 200, phase:phaseOption };
                }
                else{
                  return { ...circle, initiator: circle.initiator, swimlaneY: circle.initiator != undefined ? circle.initiator.y + 20 : 200, initiatorColor: actorIn != undefined ? actorIn.color : "#fff", receiver: circle.receiver, swimlaneReceiverY: circle.receiver != undefined ? circle.receiver.y + 20 : 200, phase:phaseOption };
                }
              }
        }
        return circle;
      })
      updateCircles(circles2);
      changeArrow(e, touchPoint.id, circles2.filter(y => y.id == touchPoint.id)[0]);
      moveElement(circles2, index, xPosOfMouse, actions, updateCircles, setActions,arrowId, setArrowId, setArrows);
    } else {
      moveElement(Circle, index, xPosOfMouse, actions, updateCircles, setActions,arrowId, setArrowId, setArrows);
    }
  }
}