import { Actors } from "../Classes/Actors";
import { CJMLAction } from "../Classes/CJMLAction";
import { CJMLCircle } from "../Classes/CJMLCircle";

function SortActorsByY(actors: Actors[]) {
    let result = actors.sort((x, y) => {
      return x.y - y.y;
    })
    return result;
  }
  
export function findImagePoints(actors: Actors[], swimLaneMode: boolean, cirlces: CJMLCircle[], actions: CJMLAction[]) {
    let result = SortActorsByY(actors,);
    if (!swimLaneMode) {
  
      return { y: result[0].y, height: result[result.length - 1].y + result[result.length - 1].height, width: result[0].width + 200 };
    }
    else {
      let communicationOrderByY = cirlces.sort((x, y) => {
        return x.y - y.y;
      })
      let actionOrderByY = actions.sort((x, y) => {
        return x.y - y.y;
      })
      let communicationOrderByX = cirlces.sort((x, y) => {
        return x.x - y.x;
      })
      let actionOrderByX = actions.sort((x, y) => {
        return x.x - y.x;
      })
  
      let communicationMostY = communicationOrderByY.length > 0 ? communicationOrderByY[communicationOrderByY.length - 1] : { y: 0 };
      let actionmostY = actionOrderByY.length > 0 ? actionOrderByY[actionOrderByY.length - 1] : { y: 0 };
      let communicationMostX = communicationOrderByX.length > 0 ? communicationOrderByX[communicationOrderByY.length - 1] : { x: 0, width: 0 };
      let actionmostX = actionOrderByX.length > 0 ? actionOrderByX[actionOrderByY.length - 1] : { x: 0, width: 0 };
      if (communicationMostY.y > actionmostY.y) {
        let height = communicationOrderByY[communicationOrderByY.length - 1].y - result[0].y + 30;
        let actorHeight = result[result.length - 1].y + result[result.length - 1].height;
        return { y: result[0].y, height: height > actorHeight ? height : actorHeight, width: communicationMostX.x > actionmostX.x ? communicationMostX.x + communicationMostX.width + 50 : actionmostX.x + actionmostX.width + 50 };
      }
      else {
        let height = actionOrderByY[actionOrderByY.length - 1].y - result[0].y + 30;
        let actorHeight = result[result.length - 1].y + result[result.length - 1].height;
        return { y: result[0].y, height: height > actorHeight ? height : actorHeight, width: communicationMostX.x > actionmostX.x ? communicationMostX.x + communicationMostX.width + 50 : actionmostX.x + actionmostX.width + 50 };
      }
    }
  }
  
  export function downloadImage(url: any) {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Journey.png`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  