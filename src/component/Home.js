import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Divider, Grid, Segment,Image } from "semantic-ui-react";
import "../App.css";
import ResizeImg from "./ResizeImg";

const Home = () => {
  const[aspect,setAspect]=useState(true)
  const [crop, setCrop] = useState({  unit: '%',
  width: 50,
  height: 50,
  x: 25,
  y: 25 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [croppedImage, setCroppedImage] = useState(null);
  const inputRef = useRef();
  const imageRef = useRef();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSelectedImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleRotationChange = (event) => {
    setRotation(parseInt(event.target.value, 10));
    getCroppedImage(crop)
  };

  const handleCropComplete = (crop) => {
    getCroppedImage(crop);

    console.log(crop);
  };

  const getCroppedImage = (crop) => {
    const img1 = imageRef.current;

    console.log(img1.naturalWidth, img1.width, img1.naturalHeight, img1.height);
    console.log(crop);
    const canvas = document.createElement("canvas");
    const scaleX = img1.naturalWidth / img1.width;
    const scaleY = img1.naturalHeight / img1.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    console.log(canvas.width, canvas.height);
    const ctx = canvas.getContext("2d");
    ctx.translate(crop.width / 2, crop.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    ctx.drawImage(
      img1,
      (crop.x * scaleX),
      (crop.y * scaleY),
      crop.width * scaleX,
      crop.height * scaleY,
      -crop.width / 2,
      -crop.height / 2,
      crop.width,
      crop.height
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setCroppedImage(croppedImageUrl);
  };

  const handleDownload = () => {
    // Create a temporary <a> element
    const downloadLink = document.createElement("a");
    downloadLink.href = croppedImage;
    downloadLink.download = "cropped-image.png"; // The desired file name for the downloaded image
    downloadLink.target = "_blank";

    // Append the <a> element to the DOM and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
 

  return (
    <>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <h1>Image Crop Application</h1>
            <Button
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Click me
            </Button>
            <input
              className="input-none"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={inputRef}
            />
            <h3>Rotate image</h3>
            <input
              type="range"  //new add
              id="rotation"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={handleRotationChange}
            />
            <br />
            <Button onClick={()=>setAspect(!aspect)}>change aspect {aspect?"1/1":"16/9"}</Button>
            {selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={handleCropComplete}
                aspect={aspect?16/9:1/1}
              >
                <img rotation={rotation} style={{ transform: `rotate(${rotation}deg)` }} ref={imageRef} src={selectedImage} alt="" />
              </ReactCrop>
            )}
          </Grid.Column>
          <Grid.Column>
            {croppedImage && (
              <>
                <h2>Cropped Image:</h2>
                <Button onClick={handleDownload}>Download</Button>
                <div className="croppedimg">
                  <img src={croppedImage} alt="cropped"/>
                </div>
              </>
            )}
          </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
      {crop.width>50?(<ResizeImg croppedImage={croppedImage} crop={crop} />):(<></>)}   
      
    </>
  );
};

export default Home;


// <div>
//       <h1>Image Crop Application</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef}/>
//       {selectedImage && (
//         <ReactCrop
//           crop={crop}
//           onChange={(newCrop) => setCrop(newCrop)}
//           onComplete={handleCropComplete}
//         >
//           <img src={selectedImage} />
//         </ReactCrop>
//       )}
//       <button
//         onClick={() => {
//           inputRef.current.click();
//         }}
//       >Click me</button>

// {croppedImage && (
//   <div>
//     <h2>Cropped Image:</h2>
//     <img src={croppedImage} alt="Cropped" />
//   </div>
// )}
// </div>
