import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, Canvas } from "react-three-fiber";
import { List } from "immutable";
import { FaceColors } from "three";
import { FaceState } from "../reducer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const faceTheme = {
  [FaceState.NONE]: 0x00ff00, // зеленый
  [FaceState.PLAYER1]: 0xff0000, // красный
  [FaceState.PLAYER2]: 0x0000ff // синий
};

// FIXME: сделать вращение без gimbal lock
function Controls() {
  const { gl, camera } = useThree();

  return (
    // @ts-ignore
    <orbitControls
      args={[camera, gl.domElement]}
      enablePan={true}
      enableZoom={false}
    />
  );
}

function Icosahedron({
  faceStates,
  onFaceClick
}: {
  faceStates: List<FaceState>;
  onFaceClick: Function;
}) {
  const geometryRef = useRef() as React.MutableRefObject<any>;
  const geometry = (
    <icosahedronGeometry ref={geometryRef} attach="geometry" args={[2, 0]} />
  );

  useEffect(() => {
    if (!geometryRef.current) {
      return;
    }

    for (let i = 0; i < 20; i++) {
      const hex = faceTheme[faceStates.get(i) as FaceState];

      geometryRef.current.faces[i].color.setHex(hex);
    }

    geometryRef.current.colorsNeedUpdate = true;
  }, [geometryRef, faceStates]);

  const [isMoved, setIsMoved] = useState(false);

  return (
    <>
      {/* FIXME: настроить свет, чтобы не использовать wireframe */}
      <mesh>
        {geometry}
        <meshBasicMaterial
          attach="material"
          color={"black"}
          wireframe={true}
          wireframeLinewidth={2}
        />
      </mesh>
      <mesh
        onPointerMove={() => setIsMoved(true)}
        onPointerDown={() => setIsMoved(false)}
        onClick={({ face }) => {
          if (!geometryRef.current || isMoved) {
            return;
          }

          for (let i = 0; i < 20; i++) {
            if (geometryRef.current.faces[i] === face) {
              onFaceClick(i);
              return;
            }
          }
        }}
      >
        {geometry}
        <meshBasicMaterial attach="material" vertexColors={FaceColors} />
      </mesh>
    </>
  );
}

export function GameCanvas({
  faceStates,
  onFaceClick
}: {
  faceStates: List<FaceState>;
  onFaceClick: Function;
}) {
  return (
    <Canvas>
      <Icosahedron faceStates={faceStates} onFaceClick={onFaceClick} />
      <Controls />
    </Canvas>
  );
}
