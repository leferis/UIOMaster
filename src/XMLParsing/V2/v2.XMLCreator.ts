import { TouchPointStatus } from './../../enumerator/TouchPointStatus';
import { CJMLAction } from './../../Classes/CJMLAction';
import { CJMLCircle } from './../../Classes/CJMLCircle';
import { Actors } from './../../Classes/Actors';
import { Journey } from "../../Classes/Journey";
import { CJMLImage } from '../../Classes/CJMLImage';


function XMLCreator(Journey:Journey[],images:any){
    var previousActors:string[]= []
    function getendUserActors(Actors:Actors[]){
        let ActorPart ="";
        Actors.forEach(Actor => {
            ActorPart+= "<endUser ";
            ActorPart+= previousActors.includes(Actor.id)?"actorIDref=\""+ Actor.id+ "\">":"actorID=\"" + Actor.id+ "\">";
            ActorPart+= "</endUser>";
            if(!previousActors.includes(Actor.id))
            previousActors.push(Actor.id);
        });
        console.log(ActorPart)
        return ActorPart;
    }

    function getUserActor(Actors:Actors[]){
        let ActorPart="";
        Actors.forEach(Actor => {  
        ActorPart+="<serviceProvider "
        ActorPart+=previousActors.includes(Actor.id)?"actorIDref=\"" + Actor.id+ "\">":"actorID=\"" + Actor.id+ "\">";
        ActorPart+= "</serviceProvider>";
        if(!previousActors.includes(Actor.id))
        previousActors.push(Actor.id);})
      
        return ActorPart;
    }
    function SanitizeTouchpointId(id:string){
        return id.replace("D","").replace("T","");
    }

    function formatTouchpoint(touhchPoint:CJMLCircle,isJourneyPlanned:any){
        let formated = "";
        formated+= isJourneyPlanned?"<plannedCommunicationPoint>":"<actualCommunicationPoint>";
        formated += "<touchpointID>";
        formated+=  touhchPoint.devation?"D"+SanitizeTouchpointId(touhchPoint.id)+"</touchpointID>":"T"+SanitizeTouchpointId(touhchPoint.id)+"</touchpointID>";
        if(touhchPoint.phase !== null && touhchPoint.phase !== undefined) {
            formated += "<belongsTo phaseIDref=\"" + touhchPoint.phase + "\"></belongsTo>";
        }
        if(!isJourneyPlanned){formated+= "<compliance>"+TouchPointStatus[touhchPoint.Status].toLowerCase().toString()+"</compliance>";}
        formated+= "<initiator>";
        formated+= "<refersTo actorIDref=\"" + touhchPoint.initiator.id +"\"/>";
        formated+= "<initiatorLabel>"+touhchPoint.text+"</initiatorLabel>"
        formated+= "</initiator>";
        formated+= "<receiver>";
        formated+= "<refersTo actorIDref=\"" + touhchPoint.receiver.id +"\"/>";
        formated+= "<receiverLabel>"+touhchPoint.receiverText+"</receiverLabel>"
        formated+= "</receiver>";
        formated+= "<channel>";
        formated+= "<channelName>"+images(touhchPoint.imageName,'Other')+"</channelName>";
        formated+= "</channel>";
        formated+= isJourneyPlanned?"</plannedCommunicationPoint>":"</actualCommunicationPoint>";
        return formated;
    }

    function formatAction(action:CJMLAction,isJourneyPlanned:any){
        let formated = "";
        formated+= isJourneyPlanned?"<plannedAction>":"<actualAction>";
        formated+= "<touchpointID>"+SanitizeTouchpointId(action.id)+"</touchpointID>";
        formated+= "<initiator>";
        formated+= "<refersTo actorIDref=\"" + action.initiator.id +"\"/>";
        formated+= "<initiatorLabel>"+action.text+"</initiatorLabel>"
        formated+= "</initiator>";
        formated+= isJourneyPlanned?"</plannedAction>":"</actualAction>";
        return formated;
    }

    function getTouchPoints(isJourneyPlanned:any,Communication:any){
        let touchpoint ="";
        let idTouchpoint= 1;
        let devationId= 1;
        console.log(Communication)
        Communication.forEach((x:any) => {
            console.log(x)
            if(x.receiver == undefined){
                touchpoint+= formatAction(x,isJourneyPlanned);
            }else{
                touchpoint+= formatTouchpoint(x,isJourneyPlanned);
            }
        });
        
        return touchpoint;
    }

    function getPhases(touchpoints:CJMLCircle[],actions:CJMLAction[]){
        let phases:string[] = [];
        touchpoints.forEach(touchpoint => {
            if(touchpoint.phase !== null && touchpoint.phase !== undefined && !phases.includes(touchpoint.phase)){
                phases.push(touchpoint.phase);
            }
        });
        actions.forEach(action => {
            if(action.phase !== null && action.phase !== undefined && !phases.includes(action.phase)){
                phases.push(action.phase);
            }
        });
        return phases;
    }
    var data = "<CJML version=\"2.0\">";
    for(let i =0;i<Journey.length;i++){
        data+= Journey[i].isPlanned?"<plannedJourney>":"<actualJourney>";
            data+= "<journeyID>"+Journey[i].JourneyName+"</journeyID>"
            if(Journey[i].Reference != undefined){
                data+= "<plannedReference>"+Journey[i].Reference +"</plannedReference>"
            }
            var phases = getPhases(Journey[i].Toucpoint,Journey[i].Actions);
            console.log(phases);
            data += "<journeyPhases>";
            phases.forEach(phase => {
                data += "<journeyPhase phaseID=\""+phase+"\">";
                data += "<phaseName>"+phase+"</phaseName>";
                data += "<phaseDescription></phaseDescription>";
                data += "</journeyPhase>";
            });
            data += "</journeyPhases>";
            data += "<journeyShortSummary>"+Journey[i].JourneyDescription+"</journeyShortSummary>";

            data+= "<actors>"
            data += getendUserActors(Journey[i].Actors.filter(x=> {return x.isEndUser}));    
            data += getUserActor(Journey[i].Actors.filter(x=> {return !x.isEndUser}));    
            data+= "</actors>"
            data+= "<touchpoints>"
            let Communication = Journey[i].Actions;
            Communication = Communication.concat(Journey[i].Toucpoint);
            Communication.sort((a,b) => {
                return a.x - b.x;
            })
            data += getTouchPoints(Journey[i].isPlanned,Communication);
            
            data+= "</touchpoints>"
        
            data+= Journey[i].isPlanned?"</plannedJourney>":"</actualJourney>";
        
    }

    data += "</CJML>";
    const XmlBeautify = require('xml-beautify');
    const { DOMParser } = require('xmldom');// When used in a node.js environment, DOMParser is needed.

    const xml = new XmlBeautify({ parser: DOMParser }).beautify(data);
    const blob = new Blob([xml], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "Journey.xml";
    link.href = url;
    link.click();
    link.remove();
}

export default XMLCreator;