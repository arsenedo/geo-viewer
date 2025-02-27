import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui';
import './style.css'

const scene = new THREE.Scene();
scene.background = new THREE.Color().setRGB(0.051, 0.051, 0.051);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 5;

camera.position.set( 0, 1, 0 );
controls.update();

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const grid = new THREE.GridHelper(25, 25, 0x444444, new THREE.Color().setRGB(0.1, 0.1, 0.1));
scene.add(grid);

const gui = new GUI();
gui.add( document, 'title' );

function animate() {
    //requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
