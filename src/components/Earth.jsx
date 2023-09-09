
import { useEffect, useRef } from 'react';
import * as THREE from 'three'

export const Earth = () => {
  const W_WIDTH  = window.innerWidth; // ブラウザの横サイズ
  const W_HEIGHT = window.innerHeight;// ブラウザの縦サイズ
  const W_ASPECT = window.innerWidth / window.innerHeight;// アスペクト比
  const W_RATIO  = window.devicePixelRatio;// ピクセル比

  let camera, scene, renderer, earth, moon;// カメラ、シーン、レンダラー、地球

  const radius = 300;// 半径
  let radian = 0;// ラジアン

  function animate(){
    earth.rotation.y += 0.002;// 地球を回転させる
    moon.rotation.y += 0.002;// 月を回転させる
    moon.position.x = radius * Math.cos(radian);// 月を周回させる
    moon.position.z = radius * Math.sin(radian);
    radian += 0.01;// 角度に加算する
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

    earth = createMesh(200, "tx_moon_1024x512.png");
    scene.add(earth);
    moon = createMesh(30, "moon_tx.jpg")
    scene.add(moon);

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

function createMesh(w, path){
	// テクスチャ
	const txLoader  = new THREE.TextureLoader();
	const normalMap = txLoader.load(path);
	// ジオメトリ
	const geometry = new THREE.SphereGeometry(w, 30, 30);
	// マテリアル
	const material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		map: normalMap
	});
	// メッシュ
	return new THREE.Mesh(geometry, material);
}