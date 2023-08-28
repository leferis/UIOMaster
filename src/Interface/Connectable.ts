import { CJMLArrow } from "../Classes/CJMLArrow";

export class Connectable{
    id:string;
    x: number;
    y: number;
    height:number;
    width:number
    deviation:boolean;
    constructor(id:string, x:number, y:number, height:number, width:number,deviation:boolean){
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.deviation = deviation;
    }

    public getConnectingPointCordinates(pointX:any,pointY:any) {
        
    } 
}