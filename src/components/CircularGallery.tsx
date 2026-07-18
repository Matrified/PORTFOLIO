// @ts-nocheck
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function lerp(p1, p2, t) { return p1 + (p2 - p1) * t; }
function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') instance[key] = instance[key].bind(instance);
  });
}
function getFontSize(font) { const m = font.match(/(\d+)px/); return m ? parseInt(m[1], 10) : 30; }
function createTextTexture(gl, text, font = 'bold 26px monospace', color = '#e5e7eb') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, text, textColor = '#e5e7eb', font = '26px sans-serif' }) {
    autoBind(this);
    Object.assign(this, { gl, plane, text, textColor, font });
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.1)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: texture } }, transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.13;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font }) {
    Object.assign(this, { geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font });
    this.extra = 0;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*3.0+uTime)*0.35+cos(p.y*1.5+uTime)*0.35)*(0.05+abs(uSpeed)*0.2);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float a=1.0-smoothstep(-0.002,0.002,d);gl_FragColor=vec4(color.rgb,a);}`,
      uniforms: {
        tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 }, uTime: { value: 100 * Math.random() }, uBorderRadius: { value: this.borderRadius }
      }, transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
  }
  createMesh() { this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program }); this.plane.setParent(this.scene); }
  createTitle() { /* labels removed */ }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0; }
    else {
      const B = Math.abs(this.bend);
      const R = (H * H + B * B) / (2 * B);
      const eff = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - eff * eff);
      if (this.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x) * Math.asin(eff / R); }
      else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x) * Math.asin(eff / R); }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    this.scale = this.screen.height / 1500;
    // Landscape cards sized so roughly 3 fit fully with 2 halves at the edges
    this.plane.scale.y = (this.viewport.height * (620 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (900 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 1.4;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(container, { items, bend, textColor = '#e5e7eb', borderRadius = 0.05, font = 'bold 26px Space Grotesk', scrollSpeed = 2, scrollEase = 0.05 } = {}) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() { this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) }); this.gl = this.renderer.gl; this.gl.clearColor(0, 0, 0, 0); this.container.appendChild(this.gl.canvas); }
  createCamera() { this.camera = new Camera(this.gl); this.camera.fov = 45; this.camera.position.z = 20; }
  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    this.mediasImages = items.concat(items);
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: this.mediasImages.length,
      scene: this.scene, screen: this.screen, text: data.text, viewport: this.viewport, bend, textColor, borderRadius, font
    }));
  }
  onTouchDown(e) { this.isDown = true; this.moved = 0; this.scroll.position = this.scroll.current; this.start = e.touches ? e.touches[0].clientX : e.clientX; }
  onTouchMove(e) { if (!this.isDown) return; const x = e.touches ? e.touches[0].clientX : e.clientX; this.moved = Math.max(this.moved, Math.abs(this.start - x)); this.scroll.target = this.scroll.position + (this.start - x) * (this.scrollSpeed * 0.025); }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
    // Treat a near-stationary press as a click: open the centered certificate image.
    if (this.moved < 8 && this.medias && this.medias[0]) {
      const width = this.medias[0].width;
      const idx = ((Math.round(this.scroll.current / width) % this.medias.length) + this.medias.length) % this.medias.length;
      const media = this.medias[idx];
      if (media?.image) window.open(media.image, '_blank', 'noopener,noreferrer');
    }
  }
  onWheel(e) { const d = e.deltaY || e.wheelDelta || e.detail; this.scroll.target += (d > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2; this.onCheckDebounce(); }
  onCheck() { if (!this.medias || !this.medias[0]) return; const width = this.medias[0].width; const idx = Math.round(Math.abs(this.scroll.target) / width); const item = width * idx; this.scroll.target = this.scroll.target < 0 ? -item : item; }
  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) this.medias.forEach((m) => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel);
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    this.container.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
  }
}

export default function CircularGallery({ items, bend = 2.5, textColor = '#e5e7eb', borderRadius = 0.05, font = 'bold 26px Space Grotesk', scrollSpeed = 2, scrollEase = 0.05, onFocusChange }) {
  const containerRef = useRef(null);
  const focusRef = useRef(onFocusChange);
  focusRef.current = onFocusChange;
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
    let last = -1;
    const poll = setInterval(() => {
      if (!app.medias || !app.medias[0]) return;
      const width = app.medias[0].width;
      const idx = ((Math.round(app.scroll.current / width) % items.length) + items.length) % items.length;
      if (idx !== last) { last = idx; focusRef.current?.(idx); }
    }, 120);
    return () => { clearInterval(poll); app.destroy(); };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
  return <div className="h-full w-full cursor-grab active:cursor-grabbing" ref={containerRef} />;
}
