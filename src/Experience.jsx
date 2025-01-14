import { useMatcapTexture, Text3D, OrbitControls } from '@react-three/drei'
import { InstancedRigidBodies, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { IcosahedronGeometry, Vector3 } from 'three'

export default function Experience() {
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    const [material, setMaterial] = useState()
    const instanceCount = 50


    const icosohedron = useRef()
    const cubes = useRef()
    const balls = useRef()
    const pyramids = useRef()







    useFrame((state) => {
        if (icosohedron.current && icosohedron.current.translation().y < -30) {
            icosohedron.current.setTranslation(new Vector3(0, 10, 0))
            icosohedron.current.setLinvel(new Vector3(0, 0, 0))
            icosohedron.current.setAngvel(new Vector3(0, 0, 0))
        }
    });

    useFrame(() => {
        if (balls.current) {
            for (let i = 0; i < instanceCount; i++) {
                const specificBall = balls.current.at(i); // Access the first cube
                if (specificBall && specificBall.translation().y < -30) {
                    //console.log(specificBall.translation());
                    specificBall.setTranslation(new Vector3(((Math.random() - 0.5) * 5), 10 + i * 0.10, (Math.random() * 2.5) - 0.55))
                    specificBall.setLinvel(new Vector3(0, 0, 0))
                    specificBall.setAngvel(new Vector3(0, 0, 0))
                }
            }
        }
    });

    useFrame(() => {
        if (cubes.current) {
            for (let i = 0; i < instanceCount; i++) {
                const specificCube = cubes.current.at(i); // Access the first cube
                if (specificCube && specificCube.translation().y < -30) {
                    //console.log(specificCube.translation());
                    specificCube.setTranslation(new Vector3(((Math.random() - 0.5) * 5), 10 + i * 0.10, (Math.random() * 2.5) - 0.55))
                    specificCube.setLinvel(new Vector3(0, 0, 0))
                    specificCube.setAngvel(new Vector3(0, 0, 0))
                }
            }
        }
    });

    useFrame(() => {
        if (pyramids.current) {
            for (let i = 0; i < instanceCount; i++) {
                const specificPyramid = pyramids.current.at(i); // Access the first cube
                if (specificPyramid && specificPyramid.translation().y < -30) {
                    //console.log(specificPyramid.translation());
                    specificPyramid.setTranslation(new Vector3(((Math.random() - 0.5) * 5), 10 + i * 0.10, (Math.random() * 2.5) - 0.55))
                    specificPyramid.setLinvel(new Vector3(0, 0, 0))
                    specificPyramid.setAngvel(new Vector3(0, 0, 0))
                }
            }
        }
    });


    const cubeInstances = useMemo(() => {
        const cubeInstances = []

        for (let i = 0; i < instanceCount; i++) {
            const randomScale = Math.random() * 0.3 + 0.1;
            cubeInstances.push({
                key: 'cubeInstance_' + i, //used by react
                position: [
                    ((Math.random() - 0.5) * 4),
                    10 + i * 0.10,
                    ((Math.random() * 1.75) - 0.5)
                ],
                rotation: [Math.random(), Math.random(), Math.random()],
                scale: randomScale,
            })
        }

        return cubeInstances
    }, [instanceCount])

    const sphereInstances = useMemo(() => {
        const sphereInstances = []

        for (let i = 0; i < instanceCount; i++) {
            const randomScale = Math.random() * 0.1 + 0.1;
            sphereInstances.push({
                key: 'sphereInstance_' + i, //used by react
                position: [
                    ((Math.random() - 0.5) * 4),
                    10 + i * 0.10,
                    (Math.random() * 1.75) - 0.5
                ],
                rotation: [Math.random(), Math.random(), Math.random()],
                scale: randomScale,
            })
        }

        return sphereInstances
    }, [])

    const pyramidInstances = useMemo(() => {
        const pyramidInstances = []

        for (let i = 0; i < instanceCount; i++) {
            const randomScale = Math.random() * 0.5 + 0.1;
            pyramidInstances.push({
                key: 'pyramidInstance_' + i, //used by react
                position: [
                    ((Math.random() - 0.5) * 4),
                    10 + i * 0.10,
                    (Math.random() * 1.75) - 0.5
                ],
                rotation: [Math.random(), Math.random(), Math.random()],
                scale: randomScale,
            })
        }

        return pyramidInstances
    }, [])





    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />






        <Physics gravity={[0, - 2.9, 0]}>



            {/*--------------START CUBES--------------*/}
            <InstancedRigidBodies
                instances={cubeInstances}
                restitution={0.9}
                ref={cubes}
                
                // type='fixed'
            >
                <instancedMesh frustumCulled={false} args={[null, null, instanceCount]} >
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </instancedMesh>
            </InstancedRigidBodies>

            {/*--------------START SPHERES--------------*/}
            <InstancedRigidBodies
                instances={sphereInstances}
                restitution={0.9}
                colliders="ball"
                ref={balls}
                // type='fixed'
            >
                <instancedMesh frustumCulled={false} args={[null, null, instanceCount]} >
                    <sphereGeometry />
                    <meshStandardMaterial color="blue" />
                </instancedMesh>
            </InstancedRigidBodies>

            {/*--------------START PYRAMIDS--------------*/}
            <InstancedRigidBodies
                instances={pyramidInstances}
                restitution={0.9}
                colliders="hull"
                ref={pyramids}
                // type='fixed'
            >
                <instancedMesh frustumCulled={false} args={[null, null, instanceCount]} >
                    <coneGeometry args={[0.6, 1.0, 4]} />
                    <meshStandardMaterial color="green" />
                </instancedMesh>
            </InstancedRigidBodies>


            {/*START ENCLOSURE*/}
            <RigidBody type='fixed'>
                <CuboidCollider args={[4, 30, 0.5]} position={[0, -15, -2]} />
                <CuboidCollider args={[4, 30, 0.5]} position={[0, -15, 3]} />
                <CuboidCollider args={[0.5, 30, 2]} position={[4, -15, 0.5]} />
                <CuboidCollider args={[0.5, 30, 2]} position={[-4, -15, 0.5]} />
            </RigidBody>
            {/*START FLOOR*/}
            <RigidBody type='fixed' restitution={0}>
                <mesh receiveShadow position-y={- 33}>
                    <boxGeometry args={[7, 2, 4]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            </RigidBody>

            <RigidBody ref={icosohedron} restitution={0.9} colliders="hull">
                <mesh position={[3, 8, 1]}>
                    <icosahedronGeometry args={[0.2, 0]}/>
                    <meshStandardMaterial color="green" />
                </mesh>
            </RigidBody>





            {/*////////////////////START NAME//////////////////////*/}
            <RigidBody type='fixed' colliders="hull">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-1.308, 0, -0.2]}
                >
                    S
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="trimesh">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-0.64, 0, -0.2]}
                >
                    E
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="hull">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-0.049, 0, -0.2]}
                >
                    A
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="trimesh">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[0.707, 0, -0.2]}
                >
                    N
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="hull">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-1.851, -0.88, -0.2]}
                >
                    P
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="trimesh">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[1.26, -0.876, -0.2]}
                >
                    N
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="hull">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-1.212, -0.876, -0.2]}
                >
                    LETA
                </Text3D>
            </RigidBody>
            <RigidBody type='fixed' colliders="hull">
                <Text3D
                    material={material}
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-3.5, -21, -0.2]}
                >
                    CONTACT ME
                </Text3D>
            </RigidBody>
        </Physics>
    </>
}