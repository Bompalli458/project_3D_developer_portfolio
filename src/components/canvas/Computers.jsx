import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Adjust light settings to reduce GPU load */}
      <hemisphereLight intensity={0.1} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={isMobile ? 0.7 : 1} // Reduce intensity on mobile
        castShadow={!isMobile} // Disable shadows on mobile
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.65 : 0.75} // Slightly smaller on mobile
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add a small debounce to prevent unnecessary re-renders
    const debouncedHandleChange = debounce(handleMediaQueryChange, 100);

    mediaQuery.addEventListener("change", debouncedHandleChange);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", debouncedHandleChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows={!isMobile} // Disable shadows on mobile
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower dpr on mobile
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={isMobile} // Enable panning on mobile
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

// Debounce function to avoid rapid state updates
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default ComputersCanvas;
