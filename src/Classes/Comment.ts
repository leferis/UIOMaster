export class Comments{
    text: string
    isEdit: boolean

    constructor(text: string, isEdit: boolean){
        this.text = text;
        this.isEdit = isEdit;
    }

    public setText (text:string ){
        this.text = text;
    }

    public setIsEditToTrue(){
        this.isEdit = true;
    }

    public setIsEditToFalse(){
        this.isEdit = false;
    }

    public getIsEdit(){
        return this.isEdit;
    }

    public getText(){
        return this.text;
    }
}

