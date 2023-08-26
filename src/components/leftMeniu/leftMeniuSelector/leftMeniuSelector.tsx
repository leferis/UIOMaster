import React, { FC, useState } from 'react';
import { Arrow, Circle, Group, Image as Images, Line, Rect, Text } from 'react-konva';
import LeftMeniuSelectorRepresentatation from '../../leftMeniuSelector/representatation/leftMeniuSelector/representatation';
interface leftMeniuSelectorProps {
    elements: any;
    onMouseUp?: any;
    onMouseDown?: any;
    xpos: any;
    ypos: any;
    mousetype:any;
    width?:any;
}

function LeftMeniuSelector(props: leftMeniuSelectorProps) {
    function getImageObject(imgName: any) {
        const image = new Image();
        image.src = imgName;
        return image;
    }
    let counter = 0;
    let previousGroup="";
    let initialPosX = props.xpos, initialPosY = props.ypos;
    let elements = props.elements
    console.log(props.elements[0].GroupPriority)
    if(props.elements[0].GroupPriority != undefined){
        
         elements.sort((x:any,y:any)=>{
            return x.GroupPriority-y.GroupPriority
        })
    }
    return (
        <div>
            {elements.filter((x:any) => {return x.Default == true}).map((x: any, index: number) => {
                let change = false;
                if(props.elements[0].GroupPriority == undefined){
                if (index % 3 == 0 ) {
                    initialPosX = 100;
                    initialPosY += 100;
                } else {
                    initialPosX += 60;
                }}
                else if(props.elements[0].GroupPriority != undefined){
                    if(previousGroup == x.GroupPriority){
                        counter++;
                        if (counter % 3 == 0 ) {
                            initialPosX = 100;
                            initialPosY += 90;
                        } else {
                            initialPosX += 60;
                        }
                    }
                    else{
                        initialPosX = 100;
                        counter=0;
                        initialPosY += 115;
                        previousGroup = x.GroupPriority
                        change = true;
                    }
                }
                return (
                    <>
                    {change && <><Text x={initialPosX} y={initialPosY-25} text={x.Group} fontSize={18}/>
                    <Line points={[90, initialPosY-30, 270, initialPosY-30]} stroke={"#d0d2d5"} fill='#d0d2d5' />
                    </>}
                    <LeftMeniuSelectorRepresentatation image={getImageObject(x.Location)}
                        width={props.width==undefined?30:props.width}
                        initialPosX={initialPosX} initialPosY={initialPosY} name={x.Name}
                        onMouseUp={() => props.onMouseUp(x.Location)} onMouseDown={() => props.onMouseDown(x.Location)} mousetype={props.mousetype} />
                    </>
                )
            })
            }
        </div>
    )
}
export default LeftMeniuSelector;
