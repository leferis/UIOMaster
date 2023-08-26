import React, { FC, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, Image as Images, Group, Tag } from 'react-konva';
import XMLCreator from '../../XMLParsing/V2/v2.XMLCreator';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLAction } from '../../Classes/CJMLAction';
import ImageSelection from '../ImageSelection/ImageSelection';
import { getStatusJSX } from '../../Functions/CJMLStatusFunction';
import ColorPicker from './ColorPicker/ColorPicker';
import ActorPicker from './ActorPicker/leftMeniu/ActorPicker';
import LeftMeniuLeftSubMeniu from './leftSubMeniu/leftMeniu/leftSubMeniu';
import LeftMeniuSelector from './leftMeniuSelector/leftMeniuSelector'
import Statistics from '../Statistics/Statistics';
import { findImagePoints } from '../../Functions/Screenshot';
import { setActionAtEnd } from '../../Functions/creation';
interface LeftMeniuProps {
        setClickFunction: any;
        enableDevationMode: any;
        showModal: any;
        showQuestionary: any;
        Journeys: any
        getImages: any;
        getImageObject: any;
        SwimlineMode: any;
        layerHeight: any;
        actors: Actors[];
        circles: CJMLCircle[];
        actions: CJMLAction[];
        setMouseDownFunction: any;
        mouseDownFunction: any;
        addNewCircle: any;
        addNewAction: any;
        setCircles: any;
        setCirlceAtEnd: any;
        updateCurrentJourney: any;
        Images: any;
        setImage: any;
        currentObject: any;
        GetImageFullName: any;
        setCurrentObject: any;
        setActors: any;
        updateCirlces: any;
        currentJourney: any;
        addNewActor: any;
        setActions: any;
        mainLayer: any;
        openModal: any;
        setmoveStatistics: any;
        setShowSettings: any;
}

function LeftMeniu(props: LeftMeniuProps) {
        const [subMeniuOption, setSubMeniuOption] = useState("")
        const [enableScroll, setEnableScroll] = useState(true)
        const [xScrollbarreal, setXScrollbarreal] = useState(70)
        const [xScroll, setXScroll] = useState(10)
        const [onHower, setOnHower] = useState(false);
        const layerEl: any = useRef();
        const layerStat: any = useRef();
        const [enableStatistics, setEnableStatistics] = useState(false)
        const [renderMeniu, setRenderMeniu] = useState(false);


        const changeMouse = (e: any, style: any) => {
                const container = e.target.getStage().container();
                container.style.cursor = style;
        }

        var imageForSymbol;
        var imageText = "";
        var heighth = 0;

        function getImageObject(imgName: any) {
                const image = new Image();
                image.src = imgName;
                return image;
        }

        try {
                heighth = props.layerHeight.current.canvas.height;
        }
        catch (ex) {
                heighth = 20;
        }
        try {
                if (props.currentObject.imageName != undefined) {
                        imageText = props.GetImageFullName(props.currentObject.imageName, 'Other')
                        imageForSymbol = getImage(props.currentObject, 0);
                }
                else if (props.currentObject != -1) {
                        imageText = props.GetImageFullName(props.currentObject.img, 'Actor')
                        imageForSymbol = getImageActor(props.currentObject, 0);
                }
        }
        catch {
                imageText = "Unknown channel";
                imageForSymbol = '';
        }

        function getImage(x: any, index: any) {
                let img = props.getImageObject(x.imageName)
                return (<Images x={10} y={525} height={20} width={20} image={img} />)
        }
        function getImageActor(x: any, index: any) {
                let img = props.getImageObject(x.img)
                console.log(x);
                return (<Images x={10} y={525} height={20} width={20} image={img} />)
        }



        return (<>
                <Layer >
                        {renderMeniu &&
                                <Rect
                                        x={0}
                                        y={0}
                                        width={275}
                                        fill={"#e8eaed"}
                                        height={window.innerHeight + 30}
                                        stroke={'black'}
                                        strokeWidth={1}
                                        onMouseUp={() => {
                                                props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                                        }}
                                />}

                </Layer>
                {renderMeniu && <Layer ref={layerEl}
                        x={0}
                        y={0}
                        height={window.innerHeight}
                        width={450}
                        draggable={(subMeniuOption == "Actor" || subMeniuOption == "Touchpoint") && enableScroll}
                        dragBoundFunc={(pos) => {
                                if (pos.y > 0) {

                                        return {
                                                x: 0,
                                                y: 0
                                        }
                                }
                                else {


                                        return {
                                                x: 0,
                                                y: pos.y
                                        }
                                }
                        }}
                        onMouseLeave={() => { setEnableScroll(true) }}
                        onWheel={(e: any) => {
                                e.evt.preventDefault();
                                const dx = e.evt.deltaY * -1;
                                setXScroll(xScroll + dx)
                                let xpos = xScroll + dx
                                if (xScrollbarreal + (dx * 2 * -1) > 10) {
                                        setXScrollbarreal(xScrollbarreal + (dx * 2 * -1))
                                }
                                else if (xScrollbarreal + (dx * 2 * -1) < 10) {
                                        setXScroll(0)
                                        setXScrollbarreal(70)
                                        xpos = 0
                                }
                                else {
                                        setXScrollbarreal(-790)
                                }


                                if (xpos > 0) {
                                        xpos = 0
                                }
                                if (subMeniuOption == "Actor" || subMeniuOption == "Touchpoint")
                                        layerEl.current.y(xpos)
                        }}
                >

                        {subMeniuOption == "Actor" && <div>
                                <Rect x={90} y={0} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
                                <Text x={110} y={15} fontSize={20} fontStyle='Bold' text='Actor' />

                                <Rect x={90} y={xScrollbarreal} height={window.innerHeight} width={185} ></Rect>

                                <Rect x={270} y={xScrollbarreal} height={330} width={5} cornerRadius={5} fill='black'></Rect>
                                {props.Images != undefined && <LeftMeniuSelector width={25} xpos={115} ypos={-20} elements={props.Images.Images[0].Images} onMouseUp={(img: string) =>
                                        props.addNewActor(img)} onMouseDown={() => { }} mousetype={"pointer"} />}</div>
                        }

                        {subMeniuOption == "Touchpoint" && <div>
                                <Rect x={90} y={0} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
                                <Text x={110} y={15} fontSize={20} fontStyle='Bold' text='Touchpoint' />

                                <Rect x={90} y={xScrollbarreal} height={window.innerHeight} width={185} ></Rect>
                                <Rect x={270} y={xScrollbarreal} height={300} width={5} cornerRadius={5} fill='black'></Rect>
                                <Text x={95} y={155} fontSize={18} fontStyle='Bold' text='Communication points' />



                                <Text x={95} y={65} fontSize={18} fontStyle='Bold' text='Action' />
                                {props.Images != undefined && <LeftMeniuSelector xpos={80} ypos={100} elements={props.Images.Images[1].Images} onMouseDown={(img: any) => { props.setMouseDownFunction('DrawCircle'); props.addNewCircle(img); setEnableScroll(false) }}
                                        onMouseUp={() => props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)} mousetype={"grab"} />}
                                <Group onMouseDown={() => { props.setMouseDownFunction('DrawAction'); props.addNewAction(); setEnableScroll(false) }} onMouseUp={() => setActionAtEnd(props.actions, props.setActions, props.actors)}>
                                        <Rect
                                                x={95}
                                                y={87}
                                                height={58}
                                                width={50}
                                                cornerRadius={10}
                                                fill=''
                                                strokeWidth={1}
                                                onMouseEnter={(e: any) => { e.currentTarget.fill("#cad2de") }}
                                                onMouseLeave={(e: any) => { e.currentTarget.fill("") }}
                                        />
                                        <Rect
                                                x={100}
                                                y={92}
                                                height={30}
                                                width={40}
                                                cornerRadius={10}
                                                stroke={'black'}
                                                strokeWidth={1}

                                        />
                                        <Text x={100}
                                                y={125} text={"Action"} align={"center"} fontSize={14} />
                                </Group>
                                <Line points={[90, 145, 270, 145]} stroke={"#d0d2d5"} fill='#d0d2d5' />
                        </div>}

                        {subMeniuOption == "Arrow" && props.SwimlineMode && <div>
                                <Rect x={90} y={0} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
                                <Text x={110} y={15} fontSize={20} fontStyle='Bold' text='Arrow' />
                                <Rect
                                        x={95}
                                        y={62}
                                        width={47}
                                        height={62}
                                        cornerRadius={10}
                                        fill=''
                                        onClick={() => props.setClickFunction('DrawArrow')}
                                        onMouseEnter={(e: any) => { e.currentTarget.fill("#cad2de") }}
                                        onMouseLeave={(e: any) => { e.currentTarget.fill("") }}
                                >
                                </Rect>
                                <Arrow
                                        points={[100, 100, 130, 70]}
                                        stroke={'black'}
                                        radius={20}
                                        strokeWidth={3}
                                        fill={'Black'}
                                        onClick={() => props.setClickFunction('DrawArrow')}

                                />
                                <Text x={100}
                                        y={105} text={"Arrow"} align={"center"} fontSize={14} />
                        </div>
                        }


                        <Group onClick={() => { setRenderMeniu(false); props.setmoveStatistics(false); setSubMeniuOption("") }} onMouseEnter={(e) => { changeMouse(e, "pointer"); setOnHower(true) }} onMouseLeave={(e) => { changeMouse(e, "default"); setOnHower(false) }}>
                                <Rect x={240} y={10} height={30} width={30} fill={onHower ? '#c6c6c7' : "#d3d3d4"} cornerRadius={4} />
                                <Line points={[250, 20, 260, 30]} stroke={'black'} strokeWidth={2}></Line>
                                <Line points={[260, 20, 250, 30]} stroke={'black'} strokeWidth={2}></Line>
                        </Group>
                </Layer>}
                <Layer onClick={() => console.log(subMeniuOption)} ref={layerStat}>
                        {enableStatistics &&
                                <Statistics Journeys={props.Journeys} actions={props.actions} circles={props.circles} currentJourney={props.currentJourney} diagramType={props.SwimlineMode} layer={layerStat}></Statistics>}
                        <LeftMeniuLeftSubMeniu openModal={props.openModal} imagespoints={() => { return findImagePoints(props.actors, props.SwimlineMode, props.circles, props.actions) }}
                                mainLayer={props.mainLayer} openForm={props.showQuestionary} option={subMeniuOption}
                                setRenderMeniu={setRenderMeniu} setmoveStatistics={props.setmoveStatistics} setOption={setSubMeniuOption} layer={layerEl}
                                swimLaneMode={props.SwimlineMode} setStatisticsOn={setEnableStatistics} statisticsMode={enableStatistics}
                                getImageObject={getImageObject} Journeys={props.Journeys} getImages={props.getImages} updateCurrentJourney={props.updateCurrentJourney}
                                setShowSettings={props.setShowSettings}
                        ></LeftMeniuLeftSubMeniu>
                </Layer>
        </>
        );
}

export default LeftMeniu;
