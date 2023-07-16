import React, { FC, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, Image, Group } from 'react-konva';
import XMLCreator from '../../XMLParsing/V2/v2.XMLCreator';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLAction } from '../../Classes/CJMLAction';
import ImageSelection from '../ImageSelection/ImageSelection';
import { getStatusJSX } from '../../Functions/CJMLStatusFunction';
import ColorPicker from './ColorPicker/ColorPicker';
import ActorPicker from './ActorPicker/leftMeniu/ActorPicker';

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
}

function LeftMeniu(props: LeftMeniuProps) {

        var imageForSymbol;
        var imageText = "";
        var heighth = 0;
        var initialBoxX = 330;
        var initialBoxY = 55;
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
                return (<Image x={10} y={525} height={20} width={20} image={img} />)
        }
        function getImageActor(x: any, index: any) {
                let img = props.getImageObject(x.img)
                console.log(x);
                return (<Image x={10} y={525} height={20} width={20} image={img} />)
        }

        let download = props.getImageObject("\\\HelpingImages\\Download.png");
        let upload = props.getImageObject("\\\HelpingImages\\form.png");
        let form = props.getImageObject("\\\HelpingImages\\upload.png");
        let screenshot = props.getImageObject("\\\HelpingImages\\screenshot.png");
        function SortActorsByY() {
                let result = props.actors.sort((x, y) => {
                        return x.y - y.y;
                })
                return result;
        }
        function findImagePoints() {
                let result = SortActorsByY();
                if (!props.SwimlineMode) {

                        return { y: result[0].y, height: result[result.length - 1].y + result[result.length - 1].height, width: result[0].width + 200 };
                }
                else {
                        let communicationOrderByY = props.circles.sort((x, y) => {
                                return x.y - y.y;
                        })
                        let actionOrderByY = props.actions.sort((x, y) => {
                                return x.y - y.y;
                        })
                        let communicationOrderByX = props.circles.sort((x, y) => {
                                return x.x - y.x;
                        })
                        let actionOrderByX = props.actions.sort((x, y) => {
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

        function downloadImage(url: any) {
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `Journey.png`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        }



        return (<div>
                <Rect
                        x={0}
                        y={0}
                        width={230}
                        fill={"#e8eaed"}
                        height={window.innerHeight + 30}
                        stroke={'black'}
                        strokeWidth={1}
                        onMouseUp={() => {
                                props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                        }}
                />
                <Rect x={5} y={10} width={220} height={40} fill='#fff' />
                <ActorPicker Actors={props.actors} swimLaneMode={props.SwimlineMode} currentObject={props.currentObject} setActors={props.setActors} setCurrentObject={props.setCurrentObject} addNewActor={props.addNewActor} actions={props.actions}
                        circles={props.circles} setActions={props.setActions} updateCircles={props.setCircles}
                ></ActorPicker>
                <Text x={10} y={14} text={'Diagram type:' + (props.SwimlineMode ? "Journey diagram\n" : "Journey network diagram\n")} fontSize={12}></Text>
                {!(props.Journeys[props.currentJourney] == undefined) && <Text x={10} y={34} text={'Journey type:' + (props.Journeys[props.currentJourney].isPlanned ? "Planned" : "Actual")} fontSize={12}></Text>}
                {props.SwimlineMode &&
                        <Circle x={63}
                                y={350}
                                stroke={'black'}
                                radius={20}
                                strokeWidth={3}
                                onMouseDown={() => { props.setMouseDownFunction('DrawCircle'); props.addNewCircle() }}
                                onMouseUp={() => {
                                        props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                                }}
                        />
                }
                {!props.SwimlineMode && <Group onMouseDown={() => { props.setMouseDownFunction('DrawCircle'); props.addNewCircle() }}
                        onMouseUp={() => {
                                props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                        }}>
                        <Rect x={40} y={306} height={75} width={45}  ></Rect>
                        <Rect x={50}
                                y={310} height={20} width={30} strokeWidth={3}
                                cornerRadius={2}
                                stroke={'black'}

                        ></Rect>
                        <Arrow points={[65, 330, 65, 350]} dash={[2]} fill='black' stroke={"black"} strokeWidth={2} ></Arrow>
                        <Rect x={50}
                                y={350} height={20} width={30} strokeWidth={3}
                                cornerRadius={2}
                                stroke={'black'}
                        ></Rect>

                </Group>
                }

                <Text x={10}
                        y={380} text={"Communication\npoint"} align={"center"} fontSize={16} />
                <Rect
                        x={153}
                        y={330}
                        height={40}
                        width={50}
                        cornerRadius={10}
                        stroke={'black'}
                        strokeWidth={3}
                        onMouseDown={() => { props.setMouseDownFunction('DrawAction'); props.addNewAction() }}
                />
                <Text x={156}
                        y={380} text={"Action"} align={"center"} fontSize={16} />
                {props.SwimlineMode == true && <>
                        <Rect
                                x={35}
                                y={415}
                                width={50}
                                height={45}
                                onClick={() => props.setClickFunction('DrawArrow')}

                        >
                        </Rect>
                        <Arrow
                                points={[40, 460, 80, 420]}
                                stroke={'black'}
                                radius={20}
                                strokeWidth={3}
                                fill={'Black'}
                                onClick={() => props.setClickFunction('DrawArrow')}

                        />
                        <Text x={40}
                                y={470} text={"Arrow"} align={"center"} fontSize={16} />
                </>
                }
                {props.currentObject != -1 && <>
                        <Text text={"Symbol"} x={15} y={500} fontSize={16}></Text>
                        <Rect x={5} y={520} height={200} width={224} cornerRadius={3} fill='white' ></Rect>
                        {imageForSymbol}
                        <Text text={imageText} x={35} y={530} fontSize={14}></Text>
                        <ImageSelection images={props.Images} setImage={props.setImage} type={props.currentObject.img != undefined ? 'Actors' : 'Communication Points'}></ImageSelection></>}

                {props.currentObject != -1 && props.currentObject.isEndUser == undefined && <>
                        <Text text={"Status"} x={15} y={740} fontSize={14}></Text>
                        {getStatusJSX(props.currentObject, 5, 760, props.circles, props.setCurrentObject, props.setCircles)}

                </>
                }

                <Image
                        image={screenshot}
                        x={150}
                        y={heighth - 140}
                        height={40}
                        width={40}
                        onClick={() => {
                                let exportInformation = findImagePoints();
                                var image = props.layerHeight.current.toDataURL({ x: props.layerHeight.current.attrs.x, y: props.layerHeight.current.attrs.x.y, width: exportInformation.width, height: exportInformation.height });
                                downloadImage(image);
                        }}
                />
                <Text x={140}
                        y={heighth - 105} text={"ScreenShot"} align={"center"} fontSize={10} />



                <Image
                        x={15}
                        y={heighth - 140}
                        height={30}
                        width={40}
                        image={form}
                        onClick={() => { props.showModal(true); }}

                />
                <Text x={20}
                        y={heighth - 105} text={"Import"} align={"center"} fontSize={10} />
                <Image
                        x={15}
                        y={heighth - 80}
                        height={40}
                        width={40}
                        image={download}
                        onClick={() => {
                                props.updateCurrentJourney();
                                XMLCreator(props.Journeys, props.getImages);
                        }}

                />
                <Text x={18}
                        y={heighth - 35} text={"Export"} align={"center"} fontSize={10} />
                <Image
                        image={upload}
                        x={150}
                        y={heighth - 80}
                        height={40}
                        width={40}
                        onClick={() => { props.showQuestionary(true); }}

                />
                <Text x={154}
                        y={heighth - 35} text={"Form"} align={"center"} fontSize={10} />

                {props.currentObject != -1 && props.currentObject.isEndUser != undefined && <div>
                        <Text x={18}
                                y={740} text={"Color"} align={"center"} fontSize={16} />
                        <ColorPicker x={20} y={760} Actors={props.actors} currentObject={props.currentObject}
                                setActors={props.setActors} updateCirlces={props.updateCirlces}
                        />

                </div>}


        </div>
        );
}

export default LeftMeniu;
