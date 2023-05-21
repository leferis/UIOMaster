import { CJMLConnectionUnit } from "../Interface/CJMLConnectionUnit";

export class Actors implements CJMLConnectionUnit{
    Title:string;
    img:string;
    width:number;
    height:number;
    color:string;
    isEditing:any;
    constructor(Title:string,id:string,img:string,yStart:number, xStart:number,width:number , height:number, endUser:boolean){
        this.Title = Title;
        this.img = img;
        this.x = JSON.parse(JSON.stringify(xStart));
        this.y = JSON.parse(JSON.stringify(yStart));
        this. id = id;
        this.height = height;
        this.width = width;
        this.color= "#fff";
        this.isEndUser = endUser;
        this.isEditing = false;
    }
    id: string;
    x: number;
    y: number;
    isEndUser:boolean;
}