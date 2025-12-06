import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SceneObjects() {
  return (
    <group name="obstacles">
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-4, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -5]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-2, 0, 3]}>
        <torusGeometry args={[0.6, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function LidarScanner({ obstaclesRef }: { obstaclesRef: React.RefObject<THREE.Group | null> }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const rayCount = 360;
  const maxDistance = 15;
  const raycaster = useRef(new THREE.Raycaster());

  const { detectedPoints, linePositions, pointsGeometry, linesGeometry } = useMemo(() => {
    const points = new Float32Array(rayCount * 3);
    const lines = new Float32Array(rayCount * 6);

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));

    const lGeometry = new THREE.BufferGeometry();
    lGeometry.setAttribute("position", new THREE.BufferAttribute(lines, 3));

    return {
      detectedPoints: points,
      linePositions: lines,
      pointsGeometry: pGeometry,
      linesGeometry: lGeometry,
    };
  }, [rayCount]);

  useFrame(() => {
    if (!groupRef.current || !obstaclesRef.current) return;

    groupRef.current.rotation.z += 0.02;

    let detectedCount = 0;

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize();

      raycaster.current.set(new THREE.Vector3(0, 0, 0), direction);
      raycaster.current.far = maxDistance;

      const intersects = raycaster.current.intersectObjects(obstaclesRef.current.children, true);

      if (intersects.length > 0 && intersects[0].distance < maxDistance) {
        const point = intersects[0].point;
        detectedPoints[detectedCount * 3] = point.x;
        detectedPoints[detectedCount * 3 + 1] = point.y;
        detectedPoints[detectedCount * 3 + 2] = point.z;

        linePositions[detectedCount * 6] = 0;
        linePositions[detectedCount * 6 + 1] = 0;
        linePositions[detectedCount * 6 + 2] = 0;
        linePositions[detectedCount * 6 + 3] = point.x;
        linePositions[detectedCount * 6 + 4] = point.y;
        linePositions[detectedCount * 6 + 5] = point.z;

        detectedCount++;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.setDrawRange(0, detectedCount);
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, detectedCount * 2);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </lineSegments>

      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial size={0.25} color="#06b6d4" sizeAttenuation={false} />
      </points>
    </group>
  );
}

export default function Lidar() {
  const obstaclesRef = useRef<THREE.Group>(null);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
        <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest">LIDAR Scanner</div>
      </div>
      <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 10, 30]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[-10, 5, -10]} intensity={0.3} color="#8b5cf6" />
        <group ref={obstaclesRef}>
          <SceneObjects />
        </group>
        <LidarScanner obstaclesRef={obstaclesRef} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <gridHelper args={[20, 20, "#06b6d4", "#0f172a"]} />
      </Canvas>
    </div>
  );
}
