import React from 'react';
import { Canvas } from '@react-three/fiber';
import Homepage from './components/Homepage';
import Lottie from 'react-lottie-player';
import Modal from './components/Modal';
import { useState } from 'react';
import Heatrate from './Lottie/Heartrate.json'
function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  return (
    <div className="h-screen flex bg-black flex-col lg:flex-row">
      {/* Left side for 3D model */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Homepage />
        </Canvas>
      </div>

      {/* Right side for text and animation */}
      {
        predictionResult == null ? (
          <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center bg-black text-white p-4">
          <Lottie
            loop
            animationData={Heatrate}
            play
            style={{
              maxWidth: '50%',
              width: '100%',
              height: 'auto',
            }}
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Heart Disease Prediction Model
          </h1>
          <p className="text-lg md:text-xl mb-5 text-center">
            Welcome to our Heart Disease Prediction tool. This tool uses advanced machine learning models to predict the likelihood of heart disease.
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Get Started
          </button>
        </div>
        ):(
          document.getElementById("my_modal_5").close(),
          <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center bg-black text-white p-4">
  <h1 className="text-3xl md:text-4xl font-bold mb-6">Prediction Result:</h1>
  <p className="text-lg mb-3">
    Prediction: {predictionResult.prediction === 1 ? 'Heart Disease' : 'No Heart Disease'}
  </p>
  <div className="w-full max-w-md">
    <p className="text-sm mb-2">Probability of Heart Disease:{predictionResult.probability.heart_disease}</p>
    <div className="w-full bg-gray-800 h-4 rounded-full relative">
      <div
        className="h-4 rounded-full"
        style={{
          width: `${predictionResult.probability.heart_disease * 100}%`,
          background: `linear-gradient(to right, green, yellow, red)`,
        }}
      ></div>
    </div>
  </div>
  <div className="w-full max-w-md mt-4">
    <p className="text-sm mb-2">Probability of No Heart Disease:{predictionResult.probability.no_heart_disease}</p>
    <div className="w-full bg-gray-800 h-4 rounded-full relative">
      <div
        className="h-4 rounded-full"
        style={{
          width: `${predictionResult.probability.no_heart_disease * 100}%`,
          background: `linear-gradient(to right, red, yellow, green)`,
        }}
      ></div>
    </div>
  </div>
  <button
    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-10"
    onClick={() => setPredictionResult(null)}
  >
    Try Again
  </button>
</div>

        )
      }

      {/* Modal Component */}
      <Modal setPredictionResult={setPredictionResult}/>
    </div>
  );
}

export default App;
