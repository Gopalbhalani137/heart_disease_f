// Homepage.js
import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function Homepage() {
  const { scene, animations } = useGLTF('Animation/scene.gltf');
  const [mixer, setMixer] = useState(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      const mixerInstance = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixerInstance.clipAction(clip).play());
      setMixer(mixerInstance);
      return () => mixerInstance.stopAllAction();
    } else {
      console.log('No animations found in GLTF model');
    }
  }, [animations, scene]);
  // Update the animation on each frame if needed
  useFrame(() => {
    // If you want the model to move/rotate, you can add logic here.
    scene.rotation.y += 0.01; // Remove or modify if you don't want auto-rotation.
  });

  return (
    <primitive object={scene} scale={15} /> 
  );
}

export default Homepage;
