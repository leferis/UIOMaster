import React, { FC } from 'react';
import { Rect, Group, Line, Arrow, Text } from 'react-konva';
import { Actors } from '../../../../Classes/Actors';
import { setActionAtEnd } from '../../../../Functions/creation';
import CircleSelect from '../../CircleSelect/leftMeniu/CircleSelect';
import LeftMeniuSelector from '../../leftMeniuSelector/leftMeniuSelector';

interface LeftMeniuTouchpointSelectorProps { 
   xScrollbarreal:any;
   setShowMoreOptions:any;
   showMoreOptions:any;
   Images:any;
   setMouseDownFunction:any;
   setImageChange:any;
   setEnableScroll:any;
   addNewCircle:any;
   setCirlceAtEnd:any;
   circles:any;
   actions:any;
   setCircles:any;
   actors:any;
   addNewAction:any;
   setActions:any;
   SwimlineMode:any;
}

function LeftMeniuTouchpointSelector(props: LeftMeniuTouchpointSelectorProps) {


   return (<div>
      <Rect x={90} y={0} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
      <Text x={110} y={15} fontSize={20} fontStyle='Bold' text='Touchpoint' />

      <Rect x={90} y={props.xScrollbarreal} height={window.innerHeight} width={185} ></Rect>
      <Rect x={270} y={props.xScrollbarreal} height={300} width={5} cornerRadius={5} fill='black'></Rect>
      <Text x={95} y={190} fontSize={16} fontStyle='Bold' text='Channel type' />
      <Group onClick={() => { props.setShowMoreOptions(!props.showMoreOptions) }} onTap={() => props.setShowMoreOptions(!props.showMoreOptions)}>
         <Text x={95} y={620} fontSize={16} fontStyle='Bold' text='More Channels' />
         <Rect x={90} y={620} height={30} width={185} />
         {!props.showMoreOptions && <Line points={[240, 620, 250, 630, 260, 620]} fill='black' width={3} stroke={"black"} />}
         {props.showMoreOptions && <Line points={[240, 630, 250, 620, 260, 630]} fill='black' width={3} stroke={"black"} />}
      </Group>
      <Text x={208} y={65} fontSize={16} fontStyle='Bold' text='Action' />
      {props.Images != undefined && <LeftMeniuSelector xpos={100} ypos={120} elements={props.Images.Images[1].Images} onMouseDown={(img: any) => {
         props.setMouseDownFunction('ImageChange');
         props.setImageChange({ x: -999, y: -999, Image: img }); props.setEnableScroll(false)
      }}
         onMouseUp={(img: any) => {
            props.addNewCircle(img);
            props.setCirlceAtEnd(props.circles, props.actions, props.setCircles, props.actors)
         }} mousetype={"grab"} additionalFiltering={true} />}

      {props.Images != undefined && props.showMoreOptions && <LeftMeniuSelector xpos={100} ypos={560} elements={props.Images.Images[1].Images} onMouseDown={(img: any) => { props.setMouseDownFunction('RatingImageChange'); props.setImageChange({ x: -999, y: -999, Image: img }); props.setEnableScroll(false) }}
         onMouseUp={(img: any) => { props.addNewCircle(img); props.setCirlceAtEnd(props.circles, props.actions, props.setCircles, props.actors) }} mousetype={"grab"} additionalFiltering={false} />}
      <Group onMouseEnter={(e: any) => e.currentTarget.children[0].fill("#cad2de")} onMouseLeave={(e: any) => e.currentTarget.children[0].fill("")} onMouseDown={() => { props.setMouseDownFunction('DrawAction'); props.addNewAction(); props.setEnableScroll(false) }} onMouseUp={() => setActionAtEnd(props.circles, props.actions, props.setActions, props.actors)}>
         <Rect
            x={205}
            y={107}
            height={58}
            width={50}
            cornerRadius={10}
            fill=''
            strokeWidth={1}

         />
         <Rect
            x={210}
            y={118}
            height={30}
            width={40}
            cornerRadius={10}
            stroke={'black'}
            strokeWidth={1}

         />
      </Group>
      <Text x={92} y={55} width={109} align='center' fontSize={16} fontStyle='Bold' text='Comunication point' />

      {!props.SwimlineMode &&
         <div><Group onMouseEnter={(e: any) => e.currentTarget.children[0].fill("#cad2de")} onMouseLeave={(e: any) => e.currentTarget.children[0].fill("")} onMouseDown={() => {
            props.setMouseDownFunction('DrawCircle');
            props.addNewCircle(); props.setEnableScroll(false)
         }}
            onMouseUp={() => props.setCirlceAtEnd(props.circles, props.actions, props.setCircles, props.actors)}>
            <Rect
               x={95}
               y={88}
               height={90}
               width={50}
               cornerRadius={10}
               fill=''
               strokeWidth={1}

            />
            <Rect x={100}
               y={92}
               height={30}
               width={40}
               cornerRadius={10}
               stroke={'black'}
               strokeWidth={1}></Rect>

            <Rect x={100}
               y={142}
               height={30}
               width={40}
               cornerRadius={10}
               stroke={'black'}
               strokeWidth={1}></Rect>
            <Arrow points={[120, 122, 120, 140]} stroke={"black"} fill='black' dash={[2]} pointerWidth={5} pointerLength={5} />

         </Group>
            <Group onMouseDown={() => {
               props.setMouseDownFunction('DrawCircle');
               props.addNewCircle("", true, undefined); props.setEnableScroll(false)
            }}
               onMouseUp={() => props.setCirlceAtEnd(props.circles, props.actions, props.setCircles, props.actors)} onMouseEnter={(e: any) => e.currentTarget.children[0].fill("#cad2de")} onMouseLeave={(e: any) => e.currentTarget.children[0].fill("")} >
               <Rect
                  x={145}
                  y={88}
                  height={90}
                  width={50}
                  cornerRadius={10}
                  fill=''
                  strokeWidth={1}

               />
               <Rect x={150}
                  y={92}
                  height={30}
                  width={40}
                  cornerRadius={10}
                  stroke={'black'}
                  strokeWidth={1}></Rect>

               <Rect x={150}
                  y={142}
                  height={30}
                  width={40}
                  cornerRadius={10}
                  stroke={'black'}
                  strokeWidth={1}></Rect>
               <Arrow points={[170, 142, 170, 122]} stroke={"black"} fill='black' dash={[2]} pointerWidth={5} pointerLength={5} />
            </Group>
         </div>
      }
      
      {
         props.SwimlineMode && <div>

            {props.actors.map((x: Actors, index: number) => {
               if (index < 7)
                  return (<CircleSelect onMouseDown={() => {
                     props.setMouseDownFunction('DrawCircle');
                     props.addNewCircle("", false, x); props.setEnableScroll(false)
                  }}
                     onMouseUp={() => props.setCirlceAtEnd(props.circles, props.actions, props.setCircles, props.actors)}
                     index={index}
                     x={x}
                  ></CircleSelect>)
            })}
         </div>
      }
      <Line points={[90, 185, 270, 185]} stroke={"#d0d2d5"} fill='#d0d2d5' />
   </div>)

}
export default LeftMeniuTouchpointSelector;
