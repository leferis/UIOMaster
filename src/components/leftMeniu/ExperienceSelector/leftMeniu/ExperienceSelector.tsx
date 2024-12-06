import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { FC } from 'react';
import { Rect, Text, Image as Images, Group } from 'react-konva';
import { Html } from 'react-konva-utils';

interface LeftMeniuExperienceSelectorProps {
   setMouseDownFunction: any;
   setImageChange: any;
   setExperience: any;
   showExperience: any;
   showComments: any;
   setShowComments: any;
   showPhase: any;
   setShowPhase: any;
   setComments: any;
   setShowId:any;
   showId:any;
}

function LeftMeniuExperienceSelector(props: LeftMeniuExperienceSelectorProps) {
   const ratings = [[1, "Very Unsatisfied", "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - customer experience\\very-unsatisfied.svg"],
   [2, "Unsatisfied", "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - customer experience\\unsatisfied.svg"],
   [3, "Neutral", "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - customer experience\\neutral.svg"],
   [4, "Satisfied", "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - customer experience\\satisfied.svg"],
   [5, "Very satisfied", "\\CJML v1.1 - Graphical elements - PNG SVG\\Symbols - SVG\\CJML symbols - customer experience\\very-satisfied.svg"]
   ]
   function getImageObject(imgName: any) {
      const image = new Image();
      image.src = imgName;
      return image;
   }
   let xPos = 40;
   let yPos = 150;
   return (<>
      <Rect x={90} y={0} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
      <Text x={100} y={15} fontSize={20} fontStyle='Bold' text='Miscellaneous' />

      <Text x={100} y={70} fontSize={20} fontStyle='Bold' text='Rating' />
      {ratings.map((x: any) => {
         xPos += 60
         if (xPos > 260) {
            xPos = 100
            yPos += 120
         }
         return (<>
            <Group onMouseDown={(img: any) => { props.setMouseDownFunction('RatingImageChange'); props.setImageChange({ x: -999, y: -999, Image: x[2] }); }} onMouseEnter={(e: any) => e.currentTarget.children[0].fill("#cad2de")} onMouseLeave={(e: any) => e.currentTarget.children[0].fill("")}>
               <Rect
                  x={xPos - 5}
                  y={yPos - 60}
                  height={95}
                  width={50}
                  cornerRadius={10}
                  fill=''
                  strokeWidth={1}

               />
               <Rect x={xPos - 5} y={yPos - 60} height={95} width={55} />
               <Images x={xPos} y={yPos - 50} image={getImageObject(x[2])} height={40} width={40} />
               <Text x={xPos} y={yPos} text={x[1]} width={45} />
            </Group>


         </>)
      })}
      <Rect x={90} y={300} height={50} width={185} fill='#f8f8f9' stroke={"#d0d2d5"} strokeWidth={1}></Rect>
      <Text x={100} y={315} fontSize={20} fontStyle='Bold' text='Toggles' />

      <Html groupProps={{ x: 100, y: 355 }} >
         <FormGroup>
            <FormControlLabel labelPlacement="top" control={<Checkbox />}
            defaultChecked={false}
            onChange={(e: any) => {
               props.setShowId(!props.showId)
            } } label={"Show touchpointIds"}/>   
            
         </FormGroup>
         <FormGroup>
            <FormControlLabel labelPlacement="top" control={<Checkbox
               defaultChecked={props.showComments}
               onChange={(e: any) => {
                  props.setComments(!props.showComments)
               }} />} label={"Show Comments"} />
         </FormGroup>

         <FormGroup>
            <FormControlLabel labelPlacement="top" control={<Checkbox
               defaultChecked={props.showExperience}
               onChange={(e: any) => {
                  props.setExperience(!props.showExperience)
               }} />} label={"Show user experience"} />
         </FormGroup>
      </Html>
   </>)
}

export default LeftMeniuExperienceSelector;
