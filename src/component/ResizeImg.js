import React, { useState,useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Grid,
  Segment,
  Input,
  Dropdown,
  Image,
} from "semantic-ui-react";
import "../App.css";
const ResizeImg = ({ croppedImage, crop ,aspect }) => {
  const heightcrop =crop.height
  const widthcrop =crop.width
  const [height, setHeight] = useState(heightcrop);
  const [width, setWidth] = useState(widthcrop);
  const editimgRef = useRef()

  
  console.log(crop);

  return (
    <>
      <Segment>
        <div className="resize-box">
          <Grid columns={2} relaxed="very">
            <Grid.Column width={10}>
              <div className="resize-image-box">
                <img src={croppedImage} ref={editimgRef} width={width} height={height} />
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="resize-option-box">
                <div>
                  <p>
                    <label>Width</label>
                  </p>
                  <Input>
                    <input type="number" value={width} onChange={event => {setWidth(parseInt(event.target.value))
                    setHeight(width*9/16)}} />
                  </Input>
                  <br />
                  <br />
                  <p>
                    <label>Height</label>
                  </p>
                  <Input>
                    <input type="number" value={height} onChange={event => {setHeight(parseInt(event.target.value))
                    setWidth(height*16/9)}} />
                  </Input>
                </div>

                <div className="dropdown-box">
                  <p>
                    <label>select ratio</label>
                  </p>
                  <Input>
                    <input type="text" value="px" disabled  />
                  </Input>
                </div>
              </div>
             

              <br />
            </Grid.Column>
          </Grid>
        </div>
        <Divider vertical></Divider>
      </Segment>
    </>
  );
};

export default ResizeImg;
