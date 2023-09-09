
import { useEffect, useRef } from 'react';
import * as THREE from 'three'

export const Cube = () => {
  const W_WIDTH  = window.innerWidth; // ブラウザの横サイズ
  const W_HEIGHT = window.innerHeight;// ブラウザの縦サイズ
  const W_ASPECT = window.innerWidth / window.innerHeight;// アスペクト比
  const W_RATIO  = window.devicePixelRatio;// ピクセル比

  let camera, scene, renderer, cube;// カメラ、シーン、レンダラー、立方体

  function animate(){
    cube.rotation.x += 0.002;// 立方体を回転
    cube.rotation.y += 0.002;
    cube.rotation.z += 0.002;
    renderer.render(scene, camera);// レンダリング
    requestAnimationFrame(animate);// 更新
  }

  function handleLoad() {
    // カメラ
    camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 1000);
    camera.position.set(0, 0, 600);

    // シーン
    scene = new THREE.Scene();

    // ライト
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5,3,5);// 光の向き
    scene.add(dirLight);
    const ambLight = new THREE.AmbientLight(0x333333);
    scene.add(ambLight);

    // レンダラー
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(W_RATIO);// ピクセル比
    renderer.setSize(W_WIDTH, W_HEIGHT);

    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(200, 200, 200);// 立方体
    const material = new THREE.MeshLambertMaterial({color: 0x00ddff});// 影が表示される
    cube = new THREE.Mesh(geometry, material);// それらをまとめて3Dオブジェクトにします
    scene.add(cube);

    animate()
  }

  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef != null) {
      window.addEventListener('load', handleLoad);
  
      return () => {
        window.removeEventListener('load', handleLoad);
      };
      
    }
  }, [])

  return (
    <div ref={containerRef} />
  )
}
