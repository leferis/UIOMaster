import { Connectable } from './../Interface/Connectable';
import { CJMLArrow } from './CJMLArrow';

export class CJMLDescisionPoint implements Connectable{
    id:string;
    x: number;
    y: number;
    height:number;
    width:number;
     constructor(id:string,x:number,y:number){
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 20;
     }
}