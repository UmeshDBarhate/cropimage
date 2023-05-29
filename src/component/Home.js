import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import "../App.css";

const Home = () => {
  const [crop, setCrop] = useState({ aspect: 1 / 16 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const inputRef = useRef();
  const imageRef =useRef()

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSelectedImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = (crop ) => {
    getCroppedImage(crop );

    console.log(crop);
  };

  const getCroppedImage = (crop) => {
    
    const img1 = imageRef.current
   
    console.log(img1.naturalWidth, img1.width, img1.naturalHeight, img1.height);
    console.log(crop.x)
    const canvas = document.createElement("canvas");
    const scaleX = img1.naturalWidth / img1.width;
    const scaleY = img1.naturalHeight / img1.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    console.log(canvas.width, canvas.height);
    const ctx = canvas.getContext("2d");
    

    ctx.drawImage(
      img1,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
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
            {selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={handleCropComplete}
              >
                <img ref = {imageRef}src={selectedImage} alt="" />
              </ReactCrop>
            )}
          </Grid.Column>
          <Grid.Column>
            {croppedImage && (
              <>
                <h2>Cropped Image:</h2>
                <Button onClick={handleDownload}>Download</Button>
                <div>
                  <img src={croppedImage} alt="Cropped" />
                </div>
              </>
            )}
          </Grid.Column>
        </Grid>

        <Divider vertical></Divider>
      </Segment>
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
