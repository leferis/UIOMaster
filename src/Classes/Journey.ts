
import { Actors } from "./Actors";
import { CJMLAction } from "./CJMLAction";
import { CJMLArrow } from "./CJMLArrow";
import { CJMLCircle } from "./CJMLCircle";

export class Journey{
    JourneyID:string = '';
    JourneyName:string ='';
    JourneyDescription:String='';
    Comment:String='';
    Actors: Actors[] = [];
    Toucpoint:CJMLCircle[] = [];
    Actions:CJMLAction[] = [];
    Arrow:CJMLArrow[] = [];
    isPlanned:boolean = false;
    JourneyAnalysis:String = '';
    Reference:any;
    complianceContent:boolean = true;
    ComplianceSequence:boolean= true;

}