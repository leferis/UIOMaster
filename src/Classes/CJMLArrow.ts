import { Connectable } from './../Interface/Connectable';
import { CJMLCircle } from './CJMLCircle';
export class CJMLArrow{
    id:number;
    fromPoint: Connectable;
    toPoint: Connectable;
    intermidiate:any[];
    constructor(id:number, from:Connectable, to:Connectable){
        this.id = id;
        this.fromPoint = from;
        this.toPoint = to;
        this.intermidiate = [];
    }

    updateNode(obj:Connectable): void{
        if(this.fromPoint.id == obj.id){
            this.fromPoint = obj;
        }
        else{
            this.toPoint = obj;
        }
    }

    redraw(obj:Connectable):void{
        this.updateNode(obj);
        this.Draw();
    }
    swap(){
        if(this.fromPoint.x >this.toPoint.x){
            if(this.fromPoint.x < this.toPoint.x - this.toPoint.width - 60 || this.fromPoint.x > this.toPoint.x + this.toPoint.width + 45){
            let temp = this.fromPoint;
            this.fromPoint = this.toPoint;
            this.toPoint = temp;
            }
        }
    }
    Draw():void{
        let midpointX = 0;
        this.intermidiate = [];
        this.swap();
        midpointX = this.fromPoint.x + (this.toPoint.x- this.fromPoint.x) /2;
        if(midpointX < this.fromPoint.x + this.fromPoint.width){
            midpointX = this.fromPoint.x + this.fromPoint.width
        }
        if((this.fromPoint.x < this.toPoint.x - 60 || this.fromPoint.x > this.toPoint.x + 50 ) && this.fromPoint.x  != this.toPoint.x){
        this.intermidiate.push(midpointX,this.fromPoint.y + Math.round((this.fromPoint.height+2)/2)  , midpointX,this.toPoint.y + Math.round((this.toPoint.height+2)/2));
        }
        console.log(this.intermidiate)
    }
}