import React, { FC } from 'react';
import styles from './ribbon/ChangeBar.module.css';
import ImageChange from '../ImageChange/ribbon/ChangeBar/ImageChange';
import ColorChange from '../ColorChange/ribbon/ChangeBar/ColorChange';
import TypeChange from '../TypeChange/ribbon/ChangeBar/TypeChange';
import RibbonChangeBarCheckBoxChange from '../CheckBoxChange/ribbon/ChangeBar/CheckBoxChange';

interface RibbonChangeBarProps {
  images: any;
  currentObj: any
  TouchPoints: any;
  updateTouhcPoints: any;
  currentJourney: any;
}

function RibbonChangeBar(props: RibbonChangeBarProps) {
  let Actor = true;
  let touchpoint = true;
  let render = false;
  if (props.currentJourney != undefined) {
    render = !props.currentJourney.isPlanned;
  }
  console.log(render);
  console.log(props.currentJourney)
  return (<div>
    {props.currentObj != -1 && <div >
      {props.currentObj.img != undefined && <div style={{ maxWidth: "10%" }}>
        {props.images != undefined && <ImageChange images={props.images.Images[1]} text={"Symbol"} currentObject={props.currentObj} />}
        {/*<ColorChange/> */}
      </div>
      }
      {props.currentObj.imageName != undefined &&
        <div style={{ display: "grid", justifyItems:"start" }}>
          {props.images != undefined &&
            <div style={{  display: "inline-block" }}>
              <ImageChange images={props.images.Images[0]} text="Initiator's Symbol" currentObject={props.currentObj} />
              <ImageChange images={props.images.Images[1]} text="Receivers's Symbol" currentObject={props.currentObj} />
              {(render) &&
                <TypeChange currenctObj={props.currentObj} TouchPoints={props.TouchPoints} updateTouhcPoints={props.updateTouhcPoints} />}
              {(render) && <RibbonChangeBarCheckBoxChange text={"Deviation"} value={props.currentObj.devation} />}
            </div>}

        </div>
      }
    </div>}
  </div>
  )
};

export default RibbonChangeBar;
