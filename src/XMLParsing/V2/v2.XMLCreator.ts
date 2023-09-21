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
            if(Actor.Title){
                ActorPart+= "<actorName>"+Actor.Title+"</actorName>"
            }
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
        if(Actor.Title){
            ActorPart+= "<companyName>"+Actor.Title+"</companyName>"
           // ActorPart+= "<providerType>" + Actor.Type+ "</providerType>" Pakurti Enumeratoriu ir susiparsinti. Paklausti userio klausymine
        }
        ActorPart+= "</serviceProvider>";
        if(!previousActors.includes(Actor.id))
        previousActors.push(Actor.id);})
      
        return ActorPart;
    }

    function formatTouchpoint(touhchPoint:CJMLCircle,isJourneyPlanned:any){
        let formated = "";
        formated+= isJourneyPlanned?"<plannedCommunicationPoint>":"<actualCommunicationPoint>";
        formated += "<touchpointID>";
        formated+=  touhchPoint.devation?"D"+touhchPoint.id+"</touchpointID>":"T"+touhchPoint.id+"</touchpointID>";
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
        formated+= "<touchpointID>"+action.id+"</touchpointID>";
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

    var data = "<CJML version=\"2.0\">";
    for(let i =0;i<Journey.length;i++){
        data+= Journey[i].isPlanned?"<plannedJourney>":"<actualJourney>";
            data+= "<journeyID>"+Journey[i].JourneyName+"</journeyID>"
            if(Journey[i].JourneyName != null){
                data+= "<journeyTitle>"+Journey[i].JourneyName+"</journeyTitle>" // Title suteikti
            }
            if(Journey[i].Reference != undefined){
                data+= "<plannedReference>"+Journey[i].Reference +"</plannedReference>"
            }
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