

export  function getSaves(){
        let keys = Object.keys(localStorage)
        return keys
    }

    export function save(journey:any){
        let date = new Date();
        localStorage.setItem(date.getDate().toString(), JSON.stringify(journey));
    }

   export function load(setJourneys:any, switchJourney:any, toOpen:any){
        let d = localStorage.getItem(toOpen)
        if(d == null){
            d= "";
        }
        console.log(d)
        setJourneys(JSON.parse(d));
        switchJourney(JSON.parse(d));
    }


