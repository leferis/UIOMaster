import React, { FC, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, Image } from 'react-konva';
import XMLCreator from '../../XMLParsing/V2/v2.XMLCreator';
import { Actors } from '../../Classes/Actors';
import { CJMLCircle } from '../../Classes/CJMLCircle';
import { CJMLAction } from '../../Classes/CJMLAction';

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
}

function LeftMeniu(props: LeftMeniuProps) {

        var heighth = 0;
        try {
                heighth = props.layerHeight.current.canvas.height;
        }
        catch (ex) {
                heighth = 20;
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

                        return { y: result[0].y, height: result[result.length - 1].y + result[result.length - 1].height, width: result[0].width };
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

        return (<div><Rect
                x={0}
                y={0}
                width={70}
                fill={"#e8eaed"}
                height={window.innerHeight + 30}
                stroke={'black'}
                strokeWidth={1}
                onMouseUp={() => {
                        props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                }}>

        </Rect>

                <Circle x={33}
                        y={60}
                        stroke={'black'}
                        radius={20}
                        strokeWidth={3}
                        onMouseDown={() => { props.setMouseDownFunction('DrawCircle'); props.addNewCircle() }}
                        onMouseUp={() => {
                                props.setCirlceAtEnd(props.circles, props.setCircles, props.actors)
                        }}
                />
                <Text x={0}
                        y={90} text={"Communication\npoint"} align={"center"} fontSize={10} />
                <Rect
                        x={10}
                        y={120}
                        height={40}
                        width={50}
                        cornerRadius={10}
                        stroke={'black'}
                        strokeWidth={3}
                        onMouseDown={() => { props.setMouseDownFunction('DrawAction'); props.addNewAction() }}
                />
                <Text x={20}
                        y={170} text={"Action"} align={"center"} fontSize={10} />
                <Rect
                        x={20}
                        y={190}
                        width={30}
                        height={30}
                        onClick={() => props.setClickFunction('DrawArrow')}

                >

                </Rect>
                <Arrow
                        points={[20, 220, 60, 190]}
                        stroke={'black'}
                        radius={20}
                        strokeWidth={3}
                        fill={'Black'}
                        onClick={() => props.setClickFunction('DrawArrow')}

                />
                <Image
                        image={screenshot}
                        x={15}
                        y={heighth - 260}
                        height={40}
                        width={40}
                        onClick={() => {
                                let exportInformation = findImagePoints();
                                var image = props.layerHeight.current.toDataURL({ x: props.layerHeight.current.attrs.x, y: props.layerHeight.current.attrs.x.y, width: exportInformation.width, height: exportInformation.height });
                                downloadImage(image);
                        }}
                />
                <Text x={10}
                        y={heighth - 220} text={"ScreenShot"} align={"center"} fontSize={10} />

                <Text x={18}
                        y={230} text={"Arrow"} align={"center"} fontSize={10} />

                <Image
                        x={15}
                        y={heighth - 200}
                        height={30}
                        width={40}
                        image={form}
                        onClick={() => { props.showModal(true); }}

                />
                <Text x={18}
                        y={heighth - 165} text={"Import"} align={"center"} fontSize={10} />
                <Image
                        x={15}
                        y={heighth - 140}
                        height={40}
                        width={40}
                        image={download}
                        onClick={() => {
                                XMLCreator(props.Journeys, props.getImages);
                        }}

                />
                <Text x={18}
                        y={heighth - 95} text={"Export"} align={"center"} fontSize={10} />
                <Image
                        image={upload}
                        x={15}
                        y={heighth - 80}
                        height={40}
                        width={40}
                        onClick={() => { props.showQuestionary(true); }}

                />
                <Text x={18}
                        y={heighth - 35} text={"Form"} align={"center"} fontSize={10} />

        </div>
        );
}

export default LeftMeniu;
