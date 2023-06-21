import { Actors } from "../Classes/Actors";
import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLArrow } from "../Classes/CJMLArrow";
import { CJMLCircle } from "../Classes/CJMLCircle";

export function switchBetweenDiagrams(mode: boolean, circles: CJMLCircle[], actions: CJMLAction[], setActions: any, updateCircles: any,  initialArrowId: any, setInitialArrowID: any, setArrows: any) {
    if (mode) {
        fromNetworkToSwimlane(circles, actions, setActions, updateCircles, initialArrowId, setInitialArrowID, setArrows);
    }
    else {
        fromSwimlaneToNetwork(circles, actions, setActions, updateCircles);
    }
}

function fromSwimlaneToNetwork(circles: any[], actions: CJMLAction[], setActions: any, updateCircles: any) {
    let objects = JSON.parse(JSON.stringify(circles)).concat(JSON.parse(JSON.stringify(actions)));
    let objects2 = circles.concat(actions);
    objects.sort((a: CJMLCircle, b: CJMLCircle) => {
        return a.x - b.x
    });
    for (let j = 0; j < objects.length; j++) {
        objects[j].swimlaneX = 400 + (225 * j);
    }
    sortOutAndAssign(objects, setActions, updateCircles)
}

export function updateByActors(circles: any[], actions: CJMLAction[], setActions: any, updateCircles: any, actors:any) {
    let objects = JSON.parse(JSON.stringify(circles)).concat(JSON.parse(JSON.stringify(actions)));
    let objects2 = objects.map((x:any)=>{
        let initiator = actors.find((y:Actors)=> {
            return y.id == x.initiator.id
        })
        let receiver = actors.find((y:Actors)=> {
            if(x.receiver != undefined)
            return y.id == x.receiver.id
            else return false
        })
        if(initiator != undefined){
            if(x.receiver != undefined){
                x.swimlaneY = initiator.y + 20
            }
            else{
                x.swimlaneY = initiator.y + 20
            }
        }
        if(receiver != undefined){
             if(x.receiver != undefined){
                x.swimlaneReceiverY = receiver.y + 20
            }
        }
        return x;
    })
    sortOutAndAssign(objects2, setActions, updateCircles)
}

function fromNetworkToSwimlane(circles: any[], actions: CJMLAction[], setActions: any, updateCircles: any, initialArrowId: any, setInitialArrowID: any, setArrows: any) {
    let devationx = 500;
    let prevX = 350;
    let objects = JSON.parse(JSON.stringify(circles)).concat(JSON.parse(JSON.stringify(actions)));
    objects.sort((a: CJMLCircle, b: CJMLCircle) => {
        return a.swimlaneX - b.swimlaneX
    });
    for (let j = 0; j < objects.length; j++) {

        if (objects[j].devation == true) {
            console.log(objects)
            objects[j].x = prevX > 350? prevX -200 : prevX;
            objects[j].y = devationx;
            devationx = devationx + 150;
        }
        else {
            objects[j].x = prevX;
            objects[j].x = 350 + (200 * j);
            objects[j].y = 275;
            devationx = 500;
            prevX += 200;
        }

    }
    sortOutAndAssign(objects, setActions, updateCircles)
    createArrows(objects, initialArrowId, setInitialArrowID, setArrows);
}

function createArrows(objects: any,initialArrowId:any, setInitialArrowID:any, setArrows:any) {
    console.log(objects)
    let array: CJMLArrow[] = [];
    for (let i = 0; i < objects.length -1; i++) {
        let arrow = new CJMLArrow(initialArrowId,objects[i],objects[i+1]);
        console.log(arrow)
        arrow.Draw();
        array.push(arrow);
        initialArrowId++
    }
    setInitialArrowID(initialArrowId);
    setArrows(array);
}
function sortOutAndAssign(object: any, setActions: any, updateCircles: any) {
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