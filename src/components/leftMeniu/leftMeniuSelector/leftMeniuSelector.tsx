import React, { FC, useState } from 'react';
import { Arrow, Circle, Group, Image as Images, Rect, Text } from 'react-konva';
interface leftMeniuSelectorProps {
    elements: any;
    onMouseUp?:any;
    onMouseDown?:any;
}

function LeftMeniuSelector(props: leftMeniuSelectorProps) {
    function getImageObject(imgName: any) {
        const image = new Image();
        image.src = imgName;
        return image;
    }
    let initialPosX = 60, initialPosY = 30;
    return (
        <div>
            {props.elements.map((x: any, index: number) => {
                const [onHower, setOnHower] = useState(false)
                if (index % 3 == 0) {
                    initialPosX = 60;
                    initialPosY += 60;
                }else{
                    initialPosX += 60;
                }
                return (
                    <Group  onMouseUp={()=>props.onMouseUp(x.Location)} onMouseDown={()=>props.onMouseDown(x.Location)} onMouseEnter={()=> {setOnHower(true)}} onMouseLeave={()=>{setOnHower(false)}}>
                        {onHower && <Rect x={initialPosX-6} y={initialPosY -3} height={55} width={45} fill='#cad2de' cornerRadius={3}></Rect>}
                        <Images x={initialPosX} y={initialPosY} image={getImageObject(x.Location)} height={30} width={30} />
                        <Text x={initialPosX-2} y={initialPosY+40} text={x.Name} fontSize={12}/>
                       
                    </Group>
                )
            })
            }
        </div>
    )
}
export default LeftMeniuSelector;
