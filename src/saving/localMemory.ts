export  function getSaves(){
    let keys = Object.keys(localStorage)
    return keys
}

export function save(journey:any){
    let date = new Date();
    localStorage.setItem(date.toString(), JSON.stringify(journey));
}

export function load(setJourneys:any, switchJourney:any, toOpen:any,setNewID:any){
    let d = localStorage.getItem(toOpen)
    if(d == null){
        d= "";
    }
    setNewID(findMaxId(d)+1)
    setJourneys(JSON.parse(d));
    switchJourney(JSON.parse(d));
}

function findMaxId(d:any){
   let val =  JSON.parse(d)
    let maxId=0
    for(let i =0; i<val.length;i++){
        let size = val[i].Toucpoint.length
        for( let f= 0 ; f< size; f++){
            if(maxId<val[i].Toucpoint[f].id){
                maxId= val[i].Toucpoint[f].id;
            }
        }
       
    }
    return maxId
}