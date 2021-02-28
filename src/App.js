import "./App.css";
import React, { useState } from "react";
import upimg from "./download.png";
import imageCompression from "browser-image-compression";

function App() {
  const [image, setimage] = useState({
    orginalimage: "",
    orginallink: upimg,
    uploded: "false",
    btnstate: "hidden",
  });
  const [compImg, setcompImg] = useState({
    compressedImagelink: "",
    compressedSize: "",
  });

  const compress = () => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    if (options.maxSizeMB >= image.size) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }
    imageCompression(image.orginalimage, options).then((x) => {
      const ACS = x.size / 1024;

      let downloadLink = URL.createObjectURL(x);
      setcompImg({
        compressedImagelink: downloadLink,
        compressedSize: ACS.toFixed(2),
      });
    });
  };

  let changehadler = (e) => {
    console.log(e.target.files[0].size);
    const imagefile = e.target.files[0];
    const filesize = imagefile.size / 1024 / 1024;
    if (imagefile) {
      setimage({
        orginalimage: imagefile,
        orginallink: URL.createObjectURL(imagefile),
        size: filesize.toFixed(2),
        uploded: true,
        btnstate: "visible",
      });
      console.log(image);
    }
  };
  return (
    <div className="App">
      <div className="main_container">
        <div className="child_container">
          <div className="left_part">
            <p>{image.orginalimage.name}</p>
            <p style={{ visibility: image.btnstate }}>size: {image.size}MB</p>
            <img src={image.orginallink} alt="" />

            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              className="inputfile"
              onChange={(e) => changehadler(e)}
            />
            <label for="file">Choose a file</label>
            <button
              style={{ visibility: image.btnstate, marginTop: "10px" }}
              type="button"
              class="btn btn-primary"
              onClick={() => compress()}
            >
              Compress
            </button>
          </div>
          <div className="right_part">
            <h1>Image Compressor</h1>
            <p>(Light⚡Fast and 99% Offline)</p>
            <ul>
              <li>
                <h3>Upload Image </h3>
              </li>
              <li>
                <h3>Click on Compress</h3>
              </li>
              <li>
                {" "}
                <h3>Download</h3>
              </li>
            </ul>
            <h2
              style={{
                visibility: compImg.compressedImagelink ? "visible" : "hidden",
              }}
            >
              Done😎
            </h2>
            <p
              style={{
                visibility: compImg.compressedImagelink ? "visible" : "hidden",
              }}
            >
              compressed to {compImg.compressedSize} KB
            </p>
            <a
              onClick={compImg.compressedImagelink}
              href={compImg.compressedImagelink}
              download={image.orginalimage.name}
              style={{
                visibility: compImg.compressedImagelink ? "visible" : "hidden",
              }}
            >
              Download
            </a>
            <div className="footer">
              <p>Created❤{"<MJBx />"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
