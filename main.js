// main.js
import * as THREE from 'https://unpkg.com/three@0.133.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.133.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Ajout de lumière
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Charger le modèle .glb
  const loader = new GLTFLoader();
  loader.load('model.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    camera.position.z = 5;
    animate();
  }, undefined, function (error) {
    console.error('Erreur de chargement du modèle GLB:', error);
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

init();

