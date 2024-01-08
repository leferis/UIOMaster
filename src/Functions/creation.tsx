import { Actors } from "../Classes/Actors";
import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLCircle } from "../Classes/CJMLCircle"

export function setCirlceAtEnd(circles:any[], actions:any[], setObject:any, actors:Actors[]){
    const endUser = actors.filter((x) =>{
        return x.isEndUser;
    })[0];
    let positioX= endUser.x , positionY= endUser.y + 75, positionSwimY= -999, positionSwimReceiverY= -999;

    circles.forEach((x:CJMLCircle)=>{
        if(x.x > positioX){
            positioX = x.x ;
        }
        if(x.y > positionY){
            positionY = x.y + 75; 
        }
        if(x.swimlaneReceiverY > positionSwimY){
            positionSwimY = x.receiver.y +20;
        }
        if(x.swimlaneY > positionSwimReceiverY){
            positionSwimReceiverY = x.initiator.y +20;
        }
    })

    actions.forEach((x:CJMLAction)=>{
        if(x.x > positioX){
            positioX = x.x ;
        }
        if(x.y > positionY){
            x.y = x.y + 75; 
        }
    })
    const result = circles.map((x:CJMLCircle)=>{
        if(x.x > positioX){
            x.x = positioX;
        }
        if(x.y== -9999){
            x.y = endUser.y + 75; 
        }
        if(x.swimlaneReceiverY == -9999){
            x.swimlaneReceiverY = x.receiver.y +20;
        }
        if(x.swimlaneY == -9999){
            x.swimlaneY = x.initiator.y +20;
        }
        return x
    })

    setObject(result);

}

export function setActionAtEnd(circles:any[], actions:any[],setObject:any, actors:Actors[]){
    const endUser = actors.filter((x) =>{
        return x.isEndUser;
    })[0];
    const result = circles.map((x:CJMLAction)=>{
        if(x.x == -9999){
            x.x = endUser.x ;
            x.swimlaneX = endUser.x
        }
        if(x.y== -9999){
            x.y = endUser.y + 75; 
        }
        return x
    })
    setObject(result);
}