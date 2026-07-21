// Full 3D scene for home page background
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField.jsx';
import FloatingShape from './FloatingShape.jsx';

const HomeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        {/* Particle Field */}
        <ParticleField count={3000} />

        {/* Floating Shapes - Positioned in corners */}
        <FloatingShape position={[-6, 2, -2]} shape="octahedron" color="#a855f7" scale={0.8} />
        <FloatingShape position={[6, -2, -3]} shape="icosahedron" color="#ec4899" scale={1} />
        <FloatingShape position={[-5, -3, -1]} shape="tetrahedron" color="#06b6d4" scale={0.7} />
        <FloatingShape position={[5, 3, -2]} shape="torus" color="#f97316" scale={0.6} />
      </Canvas>
    </div>
  );
};

export default HomeBackground;