import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import './style.css'

const debugConsole = document.querySelector('.debug-console');
debugConsole?.setAttribute("data-state", "close");
debugConsole?.addEventListener('click', () => {
    const state = debugConsole.getAttribute("data-state");
    console.log(state);
    if (state === "open") {
        debugConsole.classList.add("closed");
        debugConsole.classList.remove("open");

        debugConsole.setAttribute("data-state", "close");
    } else {
        debugConsole.classList.add("open");
        debugConsole.classList.remove("closed");

        debugConsole.setAttribute("data-state", "open");
    }
});

const scene = new THREE.Scene();
scene.background = new THREE.Color().setRGB(0.051, 0.051, 0.051);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 5;

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        console.log(e.touches);
    }
});

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
