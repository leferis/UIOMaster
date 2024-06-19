
interface Image {
    Default?: boolean | string;
    Group?: string;
    GroupPriority?: number;
    Location: string;
    Name: string;
    Main?: boolean | string;
    Sequence?: number;
  }
  
  interface ImagesGroup {
    Images: { [key: string]: Image };
    Name: string;
  }
  
  interface RootObject {
    Images: ImagesGroup[];
  }

  export function DeserlizeFireBaseResponse(jsons:any, changeImages:any){
    var finalJson = jsons;
    jsons.Images.forEach((element: any, index:number) => {
      var result : any[] =[]
      Object.keys(element.Images).forEach(key => {
        result.push(element.Images[key]);
      });
      finalJson.Images[index].Images = result;

    });

    changeImages(finalJson);
  }