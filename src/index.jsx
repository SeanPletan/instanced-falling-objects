import { useRef, useEffect } from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Experience from './Experience.jsx';
import { Vector3 } from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        {/* First Canvas with its own camera */}
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 10],
            }}
        >
            <Experience />
        </Canvas>

        {/* Second Canvas with a different camera */}
        <Canvas
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, -20, 10],
            rotation: [0,0,0]
        }}>
            <Experience />
        </Canvas>
    </>
)
