import { Actors } from "../Classes/Actors";
import { CJMLCircle } from "../Classes/CJMLCircle"

export function setCirlceAtEnd(circles:any[], setObject:any, actors:Actors[]){
    const endUser = actors.filter((x) =>{
        return x.isEndUser;
    })[0];
    const result = circles.map((x:CJMLCircle)=>{
        if(x.x == -9999){
            x.x = endUser.x ;
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