import { ExternalEnumerator } from './../enumerator/ExternalEnumerator';
import { CJMLConnectionUnit } from './../Interface/CJMLConnectionUnit';
import { Connectable } from './../Interface/Connectable';
import { TouchPointStatus } from './../enumerator/TouchPointStatus';
import { CJMLArrow } from './CJMLArrow';
export class CJMLCircle implements CJMLConnectionUnit {
   
    Capacity: any;
    Status: TouchPointStatus;
    width:number;
    height:number;
    text: string
    external:ExternalEnumerator;
    imageName:string;
    imageNameReceiver:string;
    initiator:any;
    initiatorColor:string;
    devation:boolean;
    swimlaneX:number
    swimlaneY:number;
    swimlaneReceiverY:number;
    lastRelativex:number;
    timestamp:any;
    isEditing:any;
    isEditingReceiver:any;
    comment:string;
    rating:any;
    constructor(id: string, x: number, y: number, Capacity: boolean, devation:boolean, receiver:any, initiator:any, img:any, receiverText:string, initiatorText:string, initialSwimlaneX:number, initialSwimlaneY:number, swimlaneReceiverY:number, timestamp:any, Status:any) {
        this.x = x;
        this.y = y;
        this.Capacity = Capacity;
        this.id = id;
        this.Status = Status;
        this.width = 20;
        this.height = 0;
        this.text = initiatorText;
        this.imageName =  img;
        this.external = ExternalEnumerator.Internal;
        this.initiator=initiator;
        this.initiatorColor = "#fff";
        this.devation = devation;
        this.receiver = receiver;
        this.receiverText = receiverText;
        this.swimlaneX = initialSwimlaneX;
        this.swimlaneY = initialSwimlaneY;
        this.swimlaneReceiverY = swimlaneReceiverY;
        this.lastRelativex = 0;
        this.timestamp= timestamp;
        this.isEditing = false;
        this.imageNameReceiver = this.imageName;
        this.isEditingReceiver = false;
        this.comment = ""
        this.rating = 0;
    }
    receiver:any;
    receiverText:any;
    id: string ;
    x: number;
    y: number;

    public getConnectingPointCordinates(pointX:number,pointY:number) {
        return 0;
     }
}