// Reusable floating 3D geometric shape
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FloatingShape = ({ position, shape = 'octahedron', color = '#a855f7', scale = 1 }) => {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
      mesh.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const renderGeometry = () => {
    switch (shape) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.7, 0.3, 16, 100]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {renderGeometry()}
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.3}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

export default FloatingShape;