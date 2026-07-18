// @ts-nocheck
import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// React Bits GridScan, ported WITHOUT face-api.js/webcam. Static-style animated
// 3D perspective grid room with a scanning beam; only slightly reacts to the cursor.
const vert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`;
const frag = `precision highp float;
uniform vec3 iResolution;uniform float iTime;uniform vec2 uSkew;uniform float uTilt;uniform float uYaw;
uniform float uLineThickness;uniform vec3 uLinesColor;uniform vec3 uScanColor;uniform float uGridScale;
uniform float uScanOpacity;uniform float uScanDuration;uniform float uScanDelay;varying vec2 vUv;
float smoother01(float a,float b,float x){float t=clamp((x-a)/max(1e-5,(b-a)),0.0,1.0);return t*t*t*(t*(t*6.0-15.0)+10.0);}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
vec2 p=(2.0*fragCoord-iResolution.xy)/iResolution.y;
vec3 ro=vec3(0.0);vec3 rd=normalize(vec3(p,2.0));
float cR=cos(uTilt),sR=sin(uTilt);rd.xy=mat2(cR,-sR,sR,cR)*rd.xy;
float cY=cos(uYaw),sY=sin(uYaw);rd.xz=mat2(cY,-sY,sY,cY)*rd.xz;
vec2 skew=clamp(uSkew,vec2(-0.7),vec2(0.7));rd.xy+=skew*rd.z;
vec3 color=vec3(0.0);float minT=1e20;float gridScale=max(1e-5,uGridScale);float fadeStrength=2.0;
vec2 gridUV=vec2(0.0);float hitIsY=1.0;
for(int i=0;i<4;i++){float isY=float(i<2);
float pos=mix(-0.2,0.2,float(i))*isY+mix(-0.5,0.5,float(i-2))*(1.0-isY);
float num=pos-(isY*ro.y+(1.0-isY)*ro.x);float den=isY*rd.y+(1.0-isY)*rd.x;float t=num/den;
vec3 h=ro+rd*t;float depthBoost=smoothstep(0.0,3.0,h.z);h.xy+=skew*0.15*depthBoost;
bool use=t>0.0&&t<minT;gridUV=use?mix(h.zy,h.xz,isY)/gridScale:gridUV;minT=use?t:minT;hitIsY=use?isY:hitIsY;}
vec3 hit=ro+rd*minT;float dist=length(hit-ro);
float fx=fract(gridUV.x);float fy=fract(gridUV.y);float ax=min(fx,1.0-fx);float ay=min(fy,1.0-fy);
float wx=fwidth(gridUV.x);float wy=fwidth(gridUV.y);float halfPx=max(0.0,uLineThickness)*0.5;
float lineX=1.0-smoothstep(halfPx*wx,halfPx*wx+wx,ax);float lineY=1.0-smoothstep(halfPx*wy,halfPx*wy+wy,ay);
float lineMask=max(lineX,lineY);float fade=exp(-dist*fadeStrength);
float dur=max(0.05,uScanDuration);float del=max(0.0,uScanDelay);float scanZMax=2.0;
float sigma=0.18;float cycle=dur+del;float tCycle=mod(iTime,cycle);float phase=clamp((tCycle-del)/dur,0.0,1.0);
float scanZ=phase*scanZMax;float dz=abs(hit.z-scanZ);float lineBand=exp(-0.5*(dz*dz)/(sigma*sigma));
float headFade=smoother01(0.0,0.15,phase);float tailFade=1.0-smoother01(0.85,1.0,phase);float pw=headFade*tailFade;
float pulse=lineBand*pw*clamp(uScanOpacity,0.0,1.0);
vec3 gridCol=uLinesColor*lineMask*fade;vec3 scanCol=uScanColor*pulse;color=gridCol+scanCol;
color=clamp(color,0.0,1.0);float alpha=clamp(max(lineMask*fade,pulse),0.0,1.0);
fragColor=vec4(color,alpha);}
void main(){vec4 c;mainImage(c,vUv*iResolution.xy);gl_FragColor=c;}`;

function srgb(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }

export default function GridScan({
  linesColor = '#123d1f',
  scanColor = '#00ff88',
  scanOpacity = 0.5,
  gridScale = 0.1,
  lineThickness = 1,
  sensitivity = 0.25,
  chromaticAberration = 0.002,
  bloomIntensity = 0.5,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const lookTarget = useRef(new THREE.Vector2(0, 0));
  const lookCurrent = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    const s = Math.min(Math.max(sensitivity, 0), 1);
    const skewScale = 0.06 + 0.14 * s;
    const tiltScale = 0.12 + 0.18 * s;

    const uniforms = {
      iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio()) },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 }, uYaw: { value: 0 },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: srgb(linesColor) },
      uScanColor: { value: srgb(scanColor) },
      uGridScale: { value: gridScale },
      uScanOpacity: { value: scanOpacity },
      uScanDuration: { value: 2.4 }, uScanDelay: { value: 1.6 }
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false, depthTest: false });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new BloomEffect({ intensity: 1.0, luminanceThreshold: 0, luminanceSmoothing: 0 });
    bloom.blendMode.opacity.value = bloomIntensity;
    const chroma = new ChromaticAberrationEffect({ offset: new THREE.Vector2(chromaticAberration, chromaticAberration), radialModulation: true, modulationOffset: 0 });
    const ep = new EffectPass(camera, bloom, chroma);
    ep.renderToScreen = true;
    composer.addPass(ep);

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
      composer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      lookTarget.current.set(nx, ny);
    };
    container.addEventListener('mousemove', onMove);
    const onLeave = () => lookTarget.current.set(0, 0);
    container.addEventListener('mouseleave', onLeave);

    let raf = 0, visible = true;
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      lookCurrent.current.lerp(lookTarget.current, 0.05);
      uniforms.uSkew.value.set(lookCurrent.current.x * skewScale, -lookCurrent.current.y * 1.3 * skewScale);
      uniforms.uTilt.value = lookCurrent.current.y * tiltScale;
      uniforms.iTime.value = performance.now() / 1000;
      renderer.clear();
      composer.render();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      io.disconnect();
      composer.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [linesColor, scanColor, scanOpacity, gridScale, lineThickness, sensitivity, chromaticAberration, bloomIntensity]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', ...style }} />;
}
