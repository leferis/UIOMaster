import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLCircle } from "../Classes/CJMLCircle";

export function switchBetweenDiagrams(mode:boolean,circles:CJMLCircle[], actions:CJMLAction[],setActions:any, updateCircles:any){
    if (mode){
        fromNetworkToSwimlane(circles,actions,setActions,updateCircles);
    }
    else{
        fromSwimlaneToNetwork(circles,actions,setActions,updateCircles);
    }
}

function fromSwimlaneToNetwork(circles:any[], actions:CJMLAction[],setActions:any, updateCircles:any){
    let objects = JSON.parse(JSON.stringify(circles)).concat(JSON.parse(JSON.stringify(actions)));
    let objects2 = circles.concat(actions);
    objects.sort((a: CJMLCircle, b: CJMLCircle) => {
      return a.x - b.x
    });
    for (let j = 0; j < objects.length; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
      }
      sortOutAndAssign(objects,setActions,updateCircles)
}

function fromNetworkToSwimlane(circles:any[], actions:CJMLAction[],setActions:any, updateCircles:any){
    let devationx = 400;
    let prevX = 350;
    let objects = JSON.parse(JSON.stringify(circles)).concat(JSON.parse(JSON.stringify(actions)));
    objects.sort((a: CJMLCircle, b: CJMLCircle) => {
        return a.swimlaneX - b.swimlaneX
      });
      for (let j = 0; j < objects.length; j++) {
         
          if(objects[j].devation == true){
            console.log(objects)
            objects[j].x = prevX - 100;
            objects[j].y = devationx;
            devationx = 400 + 125;
          }
          else{
          objects[j].x = prevX;
          objects[j].x = 350 + (100 * j);
          objects[j].y = 275;
          devationx=400;
          prevX +=100;
          }

        }
    sortOutAndAssign(objects,setActions,updateCircles)
    createArrows(objects);
}

function createArrows(objects:any){
    
}
function sortOutAndAssign(object:any,setActions:any, updateCircles:any){
    var actionsTemp: CJMLAction[] = [];
    var touch: CJMLCircle[] = []
    for (let j = 0; j < object.length; j++) {
        if (object[j].receiver == undefined) {
            actionsTemp.push(object[j]);
        }
        else {
          touch.push(object[j]);
        }
      }
      setActions(actionsTemp);
      updateCircles(touch);
}