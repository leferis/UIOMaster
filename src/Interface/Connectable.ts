import { CJMLArrow } from "../Classes/CJMLArrow";

export class Connectable{
    id:string;
    x: number;
    y: number;
    height:number;
    width:number
    constructor(id:string, x:number, y:number, height:number, width:number){
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}