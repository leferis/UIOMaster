import React, { FC, useState } from 'react';
import styles from './leftMeniu/leftSubMeniu.module.css';
import { Arrow, Circle, Group, Image as Images, Rect, Tag, Text } from 'react-konva';
import LeftMeniuLeftSubMeniuBackgroundAndElement from '../backgroundAndElement/leftMeniu/leftSubMeniu/backgroundAndElement';
import { ImageList, ImageListItemBar } from '@mui/material';
import { downloadImage, findImagePoints } from '../../../../Functions/Screenshot';
import XMLCreator from '../../../../XMLParsing/V2/v2.XMLCreator';

interface LeftMeniuLeftSubMeniuProps {
  option: string;
  setOption: any;
  layer: any;
  openForm: any;
  swimLaneMode: any;
  setStatisticsOn: any;
  statisticsMode: any;
  setRenderMeniu: any;
  mainLayer: any;
  imagespoints: any;
  getImageObject:any;
  updateCurrentJourney:any;
  Journeys:any;
  getImages:any;
  openModal:any;
  setShowSettings:any;
  setOpenHelp:any;
}
function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  const [onHower, setOnHower] = useState(false)

  var height = 0;
  try {
    height = window.innerHeight-180;
  }
  catch (ex) {
    height = 20;
  }
  function getImageObject(imgName: any) {
    const image = new Image();
    image.src = imgName;
    return image;
  }
  const changeMouse = (e: any, style: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = style;
  }
  
  function changeOption(optionName:string){
    props.setOption(optionName); props.setRenderMeniu(true); props.layer.current.y(0)
  }

  function imageExport(){
    let exportInformation = props.imagespoints();
        var image = props.mainLayer.current.toDataURL({ x: props.mainLayer.current.attrs.x, y: props.mainLayer.current.attrs.x.y, width: exportInformation.width, height: exportInformation.height });
        downloadImage(image);
  }
  return (<Group>

    <Rect x={0} y={0} width={90} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5}
    ></Rect>

    <Group onTap={() => { changeOption("Actor") }}
     onClick={() => { changeOption("Actor") }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={25} height={59} width={45} option={"Actor"} text='Actors'
        currentOption={props.option} represenation='Image' img={"\\HelpingImages\\actor.png"}
      />
      <Text x={18} y={59} text='Add Actor' align='center'  width={50}fontVariant='bold' fontSize={14}></Text>
    </Group>

    <Group onClick={() => { changeOption("Touchpoint")  }}  onTap={() => { changeOption("Touchpoint") }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={101} height={59} width={45} option={"Touchpoint"} currentOption={props.option} represenation='Circle' text='Communication points' swimLaneMode={props.swimLaneMode} />
      <Text x={-5} y={138} align='center' text='Add Touchpoint' width={100}fontSize={14} fontVariant='bold'></Text>

    </Group>

    <Group onClick={() => { changeOption("Rating")  }}  onTap={() => { changeOption("Rating") }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={175} height={59} width={45} option={"Rating"} currentOption={props.option} represenation='Image' text='Rating' swimLaneMode={props.swimLaneMode} img={"\\HelpingImages\\satisfied.png"} />
      <Text x={-5} y={218} align='center' text='Add UX' width={100}fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => { props.setStatisticsOn(true); }} onTap={() => {props.setStatisticsOn(true); }}>
    {props.statisticsMode && <Rect x={5} y={props.swimLaneMode ? 314 : 250} height={45+6} width={45+35} cornerRadius={4}  fill={props.statisticsMode? '#d4dbe4':""}  /> }
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={props.swimLaneMode ? 314 : 250} height={45} width={45} option={"Statistics"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\statistics.png"} text='Statistics' />
     
      <Text x={10} y={props.swimLaneMode ? 345 : 285} text='Statistics' fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => { imageExport()}} onTap={()=>{imageExport()}}>
          <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 190} height={45} width={45} option={"ScreenShot"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\screenshot.png"} text='ScreenShot' />

      <Text x={6} y={height - 157} text='ScreenShot' fontSize={14} fontVariant='bold'></Text>

    </Group>

    <Group onClick={()=> {props.openModal(true);}} onTap={()=> {props.openModal(true);}} >
  <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={height - 125} height={45} width={45} option={"Import"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\upload.png"} text='Import' />

      <Text x={22} y={height - 90} text='Import' fontSize={14} fontVariant='bold'></Text>

    </Group>
    <Group onClick={() => {props.updateCurrentJourney();
        XMLCreator(props.Journeys, props.getImages);
    }}
    onTap={() => {props.updateCurrentJourney();
      XMLCreator(props.Journeys, props.getImages);
  }}
    >
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={height - 65} height={45} width={45} option={"Export"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\Download.png"} text='Export' />

    <Text x={23}
      y={height - 28} text={"Export"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>

      <Group onClick={()=>{props.setOpenHelp(true)}}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 250} height={45} width={45} option={"Help"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\help.png"} text='Help' />

    <Text x={30}
      y={height - 215} text={"Help"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>
      
      <Group onClick={()=> props.setShowSettings(true)} onTap={()=>{props.setShowSettings(true)}}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 310} height={45} width={45} option={"Settings"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\settings.png"} text='settings' />

    <Text x={20}
      y={height - 275} text={"Settings"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>

  </Group>)
}

export default LeftMeniuLeftSubMeniu;
