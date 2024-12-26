import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
let renderer;
let camera;

init(); // Initialisation
render(); // Boucle de mise à jour

function init() {
  // Setup de la caméra
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(0, 1, 3);

  // Setup du rendu
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Setup de la lumière
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Charger le modèle GLB
  const loader = new GLTFLoader();
  loader.load('model.glb', function (gltf) {
    scene.add(gltf.scene);
    render(); // Rendu initial
  }, undefined, function (error) {
    console.error('Erreur lors du chargement du modèle GLB :', error);
  });

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  
  // Gérer la taille de la fenêtre
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}
