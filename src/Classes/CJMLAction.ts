import { ExternalEnumerator } from "../enumerator/ExternalEnumerator";
import { CJMLConnectionUnit } from "../Interface/CJMLConnectionUnit";
import { Connectable } from "../Interface/Connectable";
import { CJMLArrow } from "./CJMLArrow";

export class CJMLAction implements CJMLConnectionUnit{

    Capacity: any;
    text: String;
    width:number;
    height:number;
    external:ExternalEnumerator;
    imageName:string| null;
    devation:boolean;
    initiator:any
    swimlaneX:number;
    timestamp:any;
    isEditing:any;
    constructor(id:string,x:number,y:number, Capacity:boolean, Text:String, devation:boolean,initiator:any, initialSwimlaneX:number,timestamp:any){   
        this.id = id;
        this.x = x;
        this.y = y;
        this.Capacity = Capacity;
        this.text = Text;
        this.width = 90;
        this.height = 58;
        this.external = ExternalEnumerator.Internal;
        this.imageName = null;
        this.devation = devation;
        this.initiator = initiator;
        this.swimlaneX = initialSwimlaneX;
        this.timestamp = timestamp;
        this.isEditing = false;
    }
    id: string;
    x: number;
    y: number;


    public getConnectingPointCordinates(pointX:number,pointY:number) {
        return 0;
     }
}