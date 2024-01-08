import _ from "lodash";
import { CJMLAction } from "../../Classes/CJMLAction";
import { CJMLCircle } from "../../Classes/CJMLCircle";
import { Actors } from "../../Classes/Actors";

export function findFurthestPoint(circles: CJMLCircle[], actions: CJMLAction[], ActorsCJML: Actors[], setActors: any, e?: any) {
    let furhterPoint: number = 200;
    if (e != undefined) {
        if (e.target.attrs.x > furhterPoint) {
            furhterPoint = e.target.attrs.x + 200;
        }
    }
    circles.forEach((value) => {
        if (furhterPoint < value.swimlaneX) {
            furhterPoint = value.swimlaneX;
        }
    });
    actions.forEach((value) => {
        if (furhterPoint < value.swimlaneX) {
            furhterPoint = value.swimlaneX
        }
    });
    if (furhterPoint % 200 != 0) {

        furhterPoint = 200 * ((furhterPoint / 200) + 1)
    }
    let actors = _.cloneDeep(ActorsCJML);
    actors = actors.map((x) => {
        if (furhterPoint - x.x > x.width) {
            x.width = furhterPoint - x.x + 280;
        }
        return x;
    })
    setActors(actors);
}
