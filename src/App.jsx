import './App.css'
import React, { useRef, useState} from 'react';
import Webcam from 'react-webcam';


function App() {  
  const webcamRef = useRef(null); // Using react-webcam function
  const [images, setImage] = useState([]); // Take Photos
  const [gridFrame, setGridFrame] = useState(null); // Make Grid Frame

  // Capture function
  const capture = () => {
    const takePicture = webcamRef.current.getScreenshot();
      setImage((prev) => [...prev, takePicture]);
  };

  // Back to frame selection
  const reset = () => {
    setGridFrame(null);
    setImage([]);
  }

  return (
      <div className="container">
        {gridFrame === null ? (
        <div>
        <h1>P H O T O B O O T H</h1>
        <h2>Select Frame</h2>
        <div className="grid-options">
          {[1, 3, 4].map((count) => (
            <button key={count} onClick={() => setGridFrame(count)}> {count} Grid </button>
          ))}
        </div>
      </div>
    ) : images.length < gridFrame ? (

      <div>
        <h3>
          {`Take Photo ${images.length + 1} from ${gridFrame}`}  
        </h3>
        <Webcam 
            audio = {false}
            ref={webcamRef}
            screenshotFormat="image/jpg"
            height={300}
            imageSmoothing = {true}
            mirrored= {true}
            width={400}
            videoConstraints = {{facingMode: "user"}}
          />

        <div className="controls">
          <button onClick={capture}>Snap</button>
          <button onClick={reset}>Back</button>
        </div>
      </div>
    ) : (

      <div className="strip-container">
        <h2>Photo Strip ({gridFrame} Grid)</h2>
        <div className="photo-strip">
        { images.map((image, index) => (
          <div key={index} className="photo-group">
            <div className="photo-box">
              <img src={image} alt={`Photo ${index + 1}`} />
            </div>
          </div>
          )) }
        </div>
        <button onClick={reset} className="reset-button">Reset</button>

      </div>
    )
    }


  </div>

  );
}

export default App
