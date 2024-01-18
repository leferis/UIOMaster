export class Experience{
    experienceDescription: string;
    experienceRating: number|undefined;
    experienceImage:string|undefined;
    isEditing: boolean;
    
    constructor(text:string){
        this.experienceDescription = text;
        this.experienceRating= undefined;
        this.experienceImage = undefined;
        this.isEditing = false;
    }
}