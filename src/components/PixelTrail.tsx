// @ts-nocheck
/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

const DotMaterial = shaderMaterial(
  { resolution: new THREE.Vector2(), mouseTrail: null, gridSize: 80, pixelColor: new THREE.Color('#00ff41') },
  `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
  `uniform vec2 resolution;uniform sampler2D mouseTrail;uniform float gridSize;uniform vec3 pixelColor;
   vec2 coverUv(vec2 uv){vec2 s=resolution.xy/max(resolution.x,resolution.y);vec2 n=(uv-0.5)*s+0.5;return clamp(n,0.0,1.0);}
   void main(){vec2 screenUv=gl_FragCoord.xy/resolution;vec2 uv=coverUv(screenUv);
   vec2 gridUvCenter=(floor(uv*gridSize)+0.5)/gridSize;float trail=texture2D(mouseTrail,gridUvCenter).r;
   gl_FragColor=vec4(pixelColor,trail*0.85);}`
);

function Scene({ gridSize = 80, trailSize = 0.08, maxAge = 320, color = '#00ff41' }) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(color);
  dotMaterial.uniforms.gridSize.value = gridSize;

  const [trail, onMove] = useTrailTexture({ size: 512, radius: trailSize, maxAge, interpolate: 5, ease: (x) => x });
  if (trail) { trail.minFilter = THREE.NearestFilter; trail.magFilter = THREE.NearestFilter; }
  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} resolution={[size.width * viewport.dpr, size.height * viewport.dpr]} mouseTrail={trail} transparent />
    </mesh>
  );
}

export default function PixelTrail({ gridSize = 80, color = '#00ff41', className = '' }) {
  return (
    <Canvas className={className} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} style={{ width: '100%', height: '100%' }}>
      <Scene gridSize={gridSize} color={color} />
    </Canvas>
  );
}
