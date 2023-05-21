import React, { FC } from 'react';
import { Group, Image as KonvaImage } from 'react-konva';
import { Html, useImage } from 'react-konva-utils';
import styles from './ImageSelection.module.css';

interface ImageSelectionProps {
  images: any;
  setImage:any;
  type:any;
}

function ImageSelection(props: ImageSelectionProps) {

  var result: any[] =[];
  var resultFinal: any[] =[];

  function handleOnEnter(e:any){
    e.currentTarget.style.backgroundColor= "Silver";
  }
  function handleOnExit(e:any){
    e.currentTarget.style.backgroundColor= "white";
  }

  function makeList() {
   return( props.images.Images.forEach((x: any) => {
      var images;
      images = x.Images.forEach((image: any) => {
        if( x.Name == props.type){
       result.push( <div style={{borderRadius:"100%", margin:"auto", height:"35px", width:"40px", overflow: "hidden",display:"inline-block"}}
       onPointerEnter={(e) =>{
        handleOnEnter(e);
       }} onPointerLeave={(e) => {
        handleOnExit(e);
       }
      }
      onClick={(e)=>{
        props.setImage(image.Location);
      }}
       ><img  title={image.Name} src= {image.Location} draggable="false" height={29} width={29} ></img>
      </div>)}
   });
      if( x.Name == props.type)
      {resultFinal.push(
        <div>
          <a className={styles.unselectable}>{x.Name}</a> <br/>
          {result}
        </div>);
      result = [];}
    }))
  };
 makeList();
  return (
    <Group x={655} y= {53}>
    <Html ><div id="ImageSelections" style={{maxHeight:150, width:198, overflowY:"scroll", overflowX:"auto"}}>
      {resultFinal} 
    </div>
    </Html>
    </Group>)

}

export default ImageSelection;
