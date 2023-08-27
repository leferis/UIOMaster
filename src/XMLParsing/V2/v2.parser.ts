import { TouchPointStatus } from './../../enumerator/TouchPointStatus';
import { CJMLArrow } from './../../Classes/CJMLArrow';
import { CJMLAction } from './../../Classes/CJMLAction';
import { CJMLCircle } from './../../Classes/CJMLCircle';
import { Actors } from "../../Classes/Actors";
import { Journey } from "../../Classes/Journey";
import { randomColor } from 'accessible-colors';

function V2parse(file: string | ArrayBuffer | null, GetImage: any) {
    function parseJourney(journey: HTMLCollection) {

    }
    var arrowId = 0;
    var swimlaneXInitial = 400;
    function getTouchPoint(touchpoint: Element, x: number) {
        var id, init, initLabel, timestamp, receiver, receiverLabel, channel, compliance;
        id = getID(touchpoint, 'touchpointID');
        init = getActorsattributeName(touchpoint.getElementsByTagName('initiator')[0].getElementsByTagName('refersTo')[0]);
        receiver = getActorsattributeName(touchpoint.getElementsByTagName('receiver')[0].getElementsByTagName('refersTo')[0]);
        initLabel = getID(touchpoint.getElementsByTagName('initiator')[0], 'initiatorLabel');
        receiverLabel = getID(touchpoint.getElementsByTagName('receiver')[0], 'receiverLabel');
        compliance = getStatus(getID(touchpoint, 'compliance'));
        channel = getID(touchpoint.getElementsByTagName('channel')[0], 'channelName');
        timestamp = getID(touchpoint.getElementsByTagName('timestamps')[0], 'timeConsumed');
        return new CJMLCircle(id, x, 0, false, id[0] == 'D' ? true : false, receiver.value, init.value, channel, receiverLabel, initLabel, swimlaneXInitial, 0, 0, timestamp, compliance);
    }
    function getAction(action: Element, x: number) {
        var id, init, label, timestamp;
        id = getID(action, 'touchpointID');
        init = getActorsattributeName(action.getElementsByTagName('initiator')[0].getElementsByTagName('refersTo')[0]);
        label = getID(action.getElementsByTagName('initiator')[0], 'initiatorLabel');
        timestamp = getID(action.getElementsByTagName('timestamps')[0], 'timeCompleted');
        return new CJMLAction(id, x, 0, false, label, id[0] == 'D' ? true : false, init.value, swimlaneXInitial, timestamp);
    }

    function getStatus(status: string) {
        if (status == "") {
            return TouchPointStatus.Completed
        }
        else if (status == "adhoc") {
            return TouchPointStatus.AdHoc;
        }
        else if (status == "failing") {
            return TouchPointStatus.Failing;
        }
        else if (status == "missing") {
            return TouchPointStatus.Missing;
        }
        else {
            return TouchPointStatus.Completed;
        }
    }

    function getID(action: Element, tagName: string) {
        if (action != undefined)
            return action.getElementsByTagName(tagName).length != 0 ? action.getElementsByTagName(tagName)[0].innerHTML : "";
        return '';
    }

    function setTouchPointMetadata(actors: Actors[], node: CJMLCircle) {
        let nodeTemp = node;
        nodeTemp.receiver = actors.find(x => {
            return x.id == node.receiver
        });

        nodeTemp.initiator = actors.find(x => {
            return x.id == node.initiator
        });
        let yValue = nodeTemp.initiator.isEndUser ? nodeTemp.initiator : nodeTemp.receiver;
        console.log(nodeTemp);
        nodeTemp.y = yValue.y + yValue.height / 2 ;
        nodeTemp.swimlaneY = nodeTemp.initiator.y + 20;
        nodeTemp.swimlaneReceiverY = nodeTemp.receiver.y + 20;
        return nodeTemp;
    }

    function setActionMetadata(actors: Actors[], node: CJMLAction) {
        let nodeTemp = node;
        nodeTemp.initiator = actors.find(x => {
            return x.id == node.initiator
        });
        nodeTemp.y = nodeTemp.initiator.y + nodeTemp.initiator.height / 2 + 20;
        return nodeTemp;
    }

    function actualJourney(journey: HTMLCollection, actors: any) {
        let journeyNew = new Journey();
        let previousInteraction = null;
        journeyNew.Actors = actors;
        let x = 350;
        let devationMove = 170;
        let firstDevation = false;
        for (var i = 0; i < journey.length; i++) {
            if (journey[i].tagName == 'actualAction') {
                let action = getAction(journey[i], x - 180);
                swimlaneXInitial += 225;
                action = setActionMetadata(actors, action);
                action.imageName = GetImage(action.imageName, "Other");
                if (!action.devation) {
                    x += 150;
                    devationMove = 170;
                    firstDevation = false;
                }
                else {
                    if (!firstDevation && x > 350) {
                        x -= 150;
                        firstDevation = true;
                    }
                    action.y += devationMove;
                    devationMove += 120;
                }
                journeyNew.Actions.push(action);
                if (previousInteraction != null) {
                    let arrowsInfo = CreatArrow(previousInteraction, action);
                    arrowsInfo.Draw();
                    journeyNew.Arrow.push(arrowsInfo);
                }
                previousInteraction = action;
            }
            else if (journey[i].tagName == 'actualCommunicationPoint') {
                let touchpoint = getTouchPoint(journey[i], x);
                swimlaneXInitial += 225;
                touchpoint = setTouchPointMetadata(actors, touchpoint);
                touchpoint.imageName = GetImage(touchpoint.imageName, "Other");
                touchpoint.imageNameReceiver = GetImage(touchpoint.imageName, "Other");
                if (!touchpoint.devation) {
                    x += 150;
                    devationMove = 170;
                    firstDevation = false;
                }
                else {
                    if (!firstDevation && x > 350) {
                        firstDevation = true;
                    }
                    touchpoint.y += devationMove;
                    devationMove += 120;
                    touchpoint.x = firstDevation ? touchpoint.x - 150 : touchpoint.x;
                }
                journeyNew.Toucpoint.push(touchpoint);
                if (previousInteraction != null) {
                    let arrowsInfo = CreatArrow(previousInteraction, touchpoint);
                    arrowsInfo.Draw();
                    journeyNew.Arrow.push(arrowsInfo);
                }
                previousInteraction = touchpoint;
            }
        }
        console.log(journeyNew);
        journeyNew.Actors.forEach((y: Actors) => {
            y.width = swimlaneXInitial;
        })
        return journeyNew;
    }

    function CreatArrow(previousNode: any, CurrentNode: any) {
        return new CJMLArrow(arrowId++, previousNode, CurrentNode);
    }
    function PlannedJourney(journey: HTMLCollection, actors: any) {
        let journeyNew = new Journey();
        swimlaneXInitial = 425;
        journeyNew.Actors = actors;
        let x = 400;
        let previousInteraction = null;
        for (var i = 0; i < journey.length; i++) {
            if (journey[i].tagName == 'plannedAction') {
                let action = getAction(journey[i], x);
                swimlaneXInitial += 250;
                action = setActionMetadata(actors, action);
                action.imageName = GetImage(action.imageName, "Other");
                if (!action.devation) x += 150;
                journeyNew.Actions.push(action);
                if (previousInteraction != null) {
                    let arrowsInfo = CreatArrow(previousInteraction, action);
                    arrowsInfo.Draw();
                    journeyNew.Arrow.push(arrowsInfo);
                }
                previousInteraction = action;

            }
            else if (journey[i].tagName == 'plannedCommunicationPoint') {
                let touchpoint = getTouchPoint(journey[i], x);
                swimlaneXInitial += 225;
                touchpoint = setTouchPointMetadata(actors, touchpoint);
                touchpoint.imageName = GetImage(touchpoint.imageName, "Other");
                touchpoint.imageNameReceiver = GetImage(touchpoint.imageName, "Other");
                if (!touchpoint.devation) x += 150;
                journeyNew.Toucpoint.push(touchpoint);
                if (previousInteraction != null) {
                    let arrowsInfo = CreatArrow(previousInteraction, touchpoint);
                    arrowsInfo.Draw();

                    journeyNew.Arrow.push(arrowsInfo);
                }
                previousInteraction = touchpoint;
            }
        }
        journeyNew.Actors.forEach((y: Actors) => {
            y.width = swimlaneXInitial;
        })
        return journeyNew;
    }
    function getActorsattributeName(actors: any) {
        var name = actors.attributes.getNamedItem("actorID");
        if (name == null) {
            name = actors.attributes.getNamedItem("actorIDref");
        }
        return name;
    }
    function parseActors(actors: HTMLCollection) {
        var actorsList: any[] = [];
        let yLocation = 200;
        for (var i = 0; i < actors.length; i++) {
            var name = getActorsattributeName(actors[i]).nodeValue;
            var Title = getActorsName(actors[i]);
            var image = GetImage(getImageOfActor(actors[i]), "Actor");
            image = image == undefined ? "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - actors\\user-3.svg" : image;
            var color = randomColor();
            const actorEntrie = new Actors(Title == null ? name : Title, name, image, yLocation, 200, 700, 130, actors[i].nodeName == 'endUser' ? true : false);
            actorEntrie.color = color;
            yLocation += 200;
            actorsList.push(actorEntrie);
        }
        return actorsList;
    }
    function realJourneyPaserActors(actors: HTMLCollection, plannedActors: Actors[]) {
        let act = parseActors(journey[i].getElementsByTagName('actors')[0].children);
        return mergeActors(act, plannedActors);
    }

    function mergeActors(actors: Actors[], plannedActors: Actors[]) {
        let endUserId = 0;

        let result = actors.map((x: Actors) => {
            if (x.isEndUser) {
                let match = plannedActors.filter(y => {
                    return y.isEndUser
                })[endUserId];
                console.log(match, "Pataikem i enduseri")
                if (match != undefined) {

                    endUserId++;
                    x.color = match.color;
                    x.img = match.img;
                    return x;
                }
            }
            else {
                let match = plannedActors.filter(y => {
                    return x.id == y.id
                })[0];
                if (match != undefined) {

                    x.color = match.color;
                    x.img = match.img;
                    return x;
                }
            }
            return x;
        })
        return result;
    }

    function getImageOfActor(node: any) {
        if (node.getElementsByTagName("providerType").length > 0) {
            return node.getElementsByTagName("providerType")[0].innerHTML;
        }
        return null;
    }
    function getActorsName(node: any) {

        if (node.getElementsByTagName("actorName").length != 0) {
            return node.getElementsByTagName("actorName")[0].innerHTML;
        }
        else if (node.getElementsByTagName("companyName").length != 0) {
            return node.getElementsByTagName("companyName")[0].innerHTML;
        }
        else {
            return null;
        }
    }

    function getJourneyName(value: any) {
        return value.innerHTML
    }

    var parser = new DOMParser();
    var journeys: Journey[] = [];
    if (file != null) {
        var xmlDoc = parser.parseFromString(file.toString(), "text/xml");
        var journey = xmlDoc.getElementsByTagName('plannedJourney');
        let journeysToAdd;
        let initialJourneyAct;
        for (var i = 0; i < journey.length; i++) {
            let nameJourney = getJourneyName(journey[i].getElementsByTagName('journeyID')[0])
            let actPlanned = parseActors(journey[i].getElementsByTagName('actors')[0].children); // external

            if (i == 0) initialJourneyAct = actPlanned;
            if (i > 0) {
                actPlanned = mergeActors(actPlanned, initialJourneyAct == undefined ? [] : initialJourneyAct);
            }
            journeysToAdd = PlannedJourney(journey[i].getElementsByTagName('touchpoints')[0].children, actPlanned);
            journeysToAdd.JourneyName = nameJourney;
            journeysToAdd.isPlanned = true;
            journeys.push(journeysToAdd);
        }
        journey = xmlDoc.getElementsByTagName('actualJourney');
        for (var i = 0; i < journey.length; i++) {
            swimlaneXInitial = 400;
            let nameJourney = getJourneyName(journey[i].getElementsByTagName('journeyID')[0])
            let reference = "";
            try {
                reference = getJourneyName(journey[i].getElementsByTagName('plannedReference')[0])
            }
            catch (ex) {

            }
            let act;
            if (journeys.length > 0 && journeys.filter((x: Journey) => { return x.isPlanned == true }).length > 0) {
                act = realJourneyPaserActors(journey[i].getElementsByTagName('actors')[0].children, journeys[0].Actors);
            }
            if (journeys.length == 0 || journeys.filter((x: Journey) => { return x.isPlanned == true }).length == 0) {
                act = parseActors(journey[i].getElementsByTagName('actors')[0].children);
            }
            // merge actors with planned to get images, and use them from Planned 
            journeysToAdd = actualJourney(journey[i].getElementsByTagName('touchpoints')[0].children, act);
            journeysToAdd.JourneyName = nameJourney;
            journeysToAdd.Reference = reference;
            journeys.push(journeysToAdd);
        }
    }
    return journeys;
}

export default V2parse;