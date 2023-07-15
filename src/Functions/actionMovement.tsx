import { Actors } from "../Classes/Actors";
import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLCircle } from "../Classes/CJMLCircle";
import {collisionSwim, moveElement} from "../Functions/Movement"
export function onActionDragEnd(e: any, touchPoint: any, actors: Actors[], Action: CJMLAction[], SwimlineMode: boolean, updateCircles: any, changeArrow: any, elementsAreFarFromBorder: any, circles: CJMLCircle[], setActions: any, index: any, isPlanned: boolean) {
   
      let yPosOfMouse
      let xPosOfMouse
      if (e.target.attrs.y != null) {
        yPosOfMouse = e.target.attrs.y;
        xPosOfMouse = e.target.attrs.x;
      }
      else {
        yPosOfMouse = e.target.getStage().getPointerPosition().y;
        xPosOfMouse = e.target.getStage().getPointerPosition().x;
      }
     
      var actorIn: Actors | undefined = collisionSwim(yPosOfMouse, touchPoint, actors);
      console.log(actorIn)
      if (actorIn != undefined) {
        const circles2 = Action.map(circle => {
          if (circle.id == touchPoint.id) {
              let differnce = SwimlineMode?50:20
              return { ...circle, initiator: actorIn, y: actorIn != undefined ? actorIn.y + differnce : 200};
          }
          return circle;
        })
        setActions(circles2);
        changeArrow(e, touchPoint.id, circles2.filter(y => y.id == touchPoint.id)[0]);
        elementsAreFarFromBorder();
        moveElement(circles, index, xPosOfMouse, circles2, updateCircles, setActions);
      } else {
        moveElement(circles, index, xPosOfMouse, Action, updateCircles, setActions);
      }
  }

  export function onActionDragMove(e: any, Circle: CJMLCircle[], touchPoint: any, updateCircles: any, changeArrow: any, elementsAreFarFromBorder: any, index: any, elementCheckCloseToBorder: any, actions: CJMLAction[], setActions: any, actors: any,SwimlineMode: boolean, isPlanned:any) {

    const circles = actions.map(circle => {
      if (circle.id == touchPoint.id) {
        return { ...circle, swimlaneX: e.target.getPosition().x, y: e.target.getPosition().y, x:  e.target.getPosition().x};
      }
      return circle;
    })
    var actorIn: Actors | undefined = collisionSwim(e, touchPoint, actors); // fix colision
    if (actorIn != undefined) {
      const circles = actions.map(circle => {
        if (circle.id == touchPoint.id) {
          return { ...circle, y: actorIn != undefined ? actorIn.y - actorIn.height / 2 : 200, };
        }
        return circle;
      })
      setActions(circles);
      changeArrow(e, touchPoint.id, circles.filter(y => y.id == touchPoint.id)[0]);
      elementsAreFarFromBorder();
    }
    changeArrow(e, touchPoint.id, circles.filter(y => y.id == touchPoint.id)[0]);
    moveElement(Circle, index, e.target.attrs.x, actions, updateCircles, setActions);
    setActions(circles);
    elementCheckCloseToBorder(e.target.getPosition().x);
  }