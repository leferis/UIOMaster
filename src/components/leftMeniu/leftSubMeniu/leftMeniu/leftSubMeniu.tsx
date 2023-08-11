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
  setmoveStatistics:any;
}
function LeftMeniuLeftSubMeniu(props: LeftMeniuLeftSubMeniuProps) {

  const [onHower, setOnHower] = useState(false)

  var height = 0;
  try {
    height = props.mainLayer.current.canvas.height;
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
  
  console.log("aukstis: "+ height)
  return (<Group>

    <Rect x={0} y={0} width={90} height={90000} fill="#e8eaed" stroke={"black"} strokeWidth={0.5}
    ></Rect>
    <Group onClick={() => props.openForm(true)} onMouseEnter={(e) => { setOnHower(true); changeMouse(e, "pointer") }} onMouseLeave={(e) => { setOnHower(false); changeMouse(e, "default") }}>
      <Rect x={6} y={5} fill={onHower ? '#4f9dea' : '#1976d2'} cornerRadius={6} height={40} width={80}></Rect>
      <Text x={45} y={20} text='Form' fontVariant='bold' fontSize={12} fill='white'></Text>
      <Images x={10} y={10} image={getImageObject("\\HelpingImages\\form.png")} height={30} width={30} />
    </Group>
    <Group onClick={() => { props.setOption("Actor"); props.setRenderMeniu(true);props.setmoveStatistics(true); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={65} height={45} width={45} option={"Actor"} text='Actors'
        currentOption={props.option} represenation='Image' img={"\\HelpingImages\\actor.png"}
      />
      <Text x={24} y={99} text='Actor' fontVariant='bold' fontSize={14}></Text>
    </Group>

    <Group onClick={() => { props.setOption("Touchpoint"); props.setRenderMeniu(true);props.setmoveStatistics(true); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={121} height={45} width={45} option={"Touchpoint"} currentOption={props.option} represenation='Circle' text='Communication points' swimLaneMode={props.swimLaneMode} />
      <Text x={6} y={158} text='Touchpoint' fontSize={14} fontVariant='bold'></Text>

    </Group>


    {props.swimLaneMode && <Group onClick={() => { props.setOption("Arrow"); props.setRenderMeniu(true);props.setmoveStatistics(true); props.layer.current.y(0) }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={180} height={45} width={45} option={"Arrow"} currentOption={props.option} represenation='Arrow' text='Arrows' />
      <Text x={18} y={215} text='Arrows' fontSize={14} fontVariant='bold'></Text>
    </Group>}

    <Group onClick={() => { props.setStatisticsOn(!props.statisticsMode); }}>
      <LeftMeniuLeftSubMeniuBackgroundAndElement x={26} y={props.swimLaneMode ? 314 : 250} height={45} width={45} option={"Statistics"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\statistics.png"} text='Statistics' />
      <Text x={10} y={props.swimLaneMode ? 345 : 285} text='Statistics' fontSize={14} fontVariant='bold'></Text>
    </Group>

    <Group onClick={() => {let exportInformation = props.imagespoints();
    console.log(exportInformation)
        var image = props.mainLayer.current.toDataURL({ x: props.mainLayer.current.attrs.x, y: props.mainLayer.current.attrs.x.y, width: exportInformation.width, height: exportInformation.height });
        downloadImage(image); }}>
          <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 190} height={45} width={45} option={"ScreenShot"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\screenshot.png"} text='ScreenShot' />

      <Text x={6} y={height - 157} text='ScreenShot' fontSize={14} fontVariant='bold'></Text>

    </Group>

    <Group onClick={()=> {props.openModal(true);}} >
  <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={height - 125} height={45} width={45} option={"Import"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\upload.png"} text='Import' />

      <Text x={22} y={height - 90} text='Import' fontSize={14} fontVariant='bold'></Text>

    </Group>
    <Group onClick={() => {props.updateCurrentJourney();
        XMLCreator(props.Journeys, props.getImages);
    }}>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={27} y={height - 65} height={45} width={45} option={"Export"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\Download.png"} text='Export' />

    <Text x={23}
      y={height - 28} text={"Export"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>

      <Group>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 250} height={45} width={45} option={"Help"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\help.png"} text='Help' />

    <Text x={30}
      y={height - 215} text={"Help"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>
      
      <Group>
    <LeftMeniuLeftSubMeniuBackgroundAndElement x={28} y={height - 310} height={45} width={45} option={"Help"} currentOption={props.option} represenation='Image' img={"\\HelpingImages\\settings.png"} text='Help' />

    <Text x={20}
      y={height - 275} text={"Settings"} align={"center"} fontSize={14} fontVariant='bold'/>
      </Group>

  </Group>)
}

export default LeftMeniuLeftSubMeniu;
