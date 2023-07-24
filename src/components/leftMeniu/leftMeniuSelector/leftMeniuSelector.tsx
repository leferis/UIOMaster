import React, { FC, useState } from 'react';
import { Arrow, Circle, Group, Image as Images, Rect, Text } from 'react-konva';
import LeftMeniuSelectorRepresentatation from '../../leftMeniuSelector/representatation/leftMeniuSelector/representatation';
interface leftMeniuSelectorProps {
    elements: any;
    onMouseUp?: any;
    onMouseDown?: any;
    xpos: any;
    ypos: any;
}

function LeftMeniuSelector(props: leftMeniuSelectorProps) {
    function getImageObject(imgName: any) {
        const image = new Image();
        image.src = imgName;
        return image;
    }
    let initialPosX = props.xpos, initialPosY = props.ypos;
    return (
        <div>
            {props.elements.map((x: any, index: number) => {
                if (index % 3 == 0) {
                    initialPosX = 60;
                    initialPosY += 100;
                } else {
                    initialPosX += 60;
                }
                return (
                    <><LeftMeniuSelectorRepresentatation image={getImageObject(x.Location)}
                        initialPosX={initialPosX} initialPosY={initialPosY} name={x.Name}
                        onMouseUp={() => props.onMouseUp(x.Location)} onMouseDown={() => props.onMouseDown(x.Location)} />
                    </>
                )
            })
            }
        </div>
    )
}
export default LeftMeniuSelector;
