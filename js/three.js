// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.161.0/three.module.min.js";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function update(scene, camera, renderer) {
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(scene, camera, renderer);
    });
}

export function makeControls(camera, renderer) {
    return new OrbitControls(camera, renderer.domElement);
}

export function makeScene() {
    return new THREE.Scene();;
}

export function makeCamera(x, y, z) {
    let camera = new THREE.PerspectiveCamera(
        45, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane (beyond which nothing is visible)
        1000 // far clipping plane (beyond which nothing is visible)
    );
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

export function makeRenderer(scene, camera) {
    const canvas = document.querySelector("#canvas");
    let renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

export function makeSpotLight(color, intensity) {
    let light = new THREE.SpotLight(color, intensity);
    light.castShadow = true;
    light.shadow.mapSize.x = 4096;
    light.shadow.mapSize.y = 4096;
    return light;
}

export function makeAmbientLight(color, intensity) {
    let light = new THREE.AmbientLight(color, intensity);
    return light;
}

export function makeDirectionalLight(color, intensity) {
    let light = new THREE.DirectionalLight(color, intensity);
    light.target.position.set(0, 0, 0);
    return light;
}

export function makePointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);
    return light;
}

export function makeSphere(radius, width, height) {
    let geometry = new THREE.SphereGeometry(radius, width, height);
    let material = new THREE.MeshStandardMaterial({ side: THREE.FrontSide });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    return sphere;
}

export function makeBasicSphere(radius, width, height) {
    let geometry = new THREE.SphereGeometry(radius, width, height);
    let material = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    return sphere;
}

export function makePlane(width, height) {
    let geometry = new THREE.PlaneGeometry(width, height);
    let material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
    let plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    return plane;
}

export function getMap(path) {
    const loader = new THREE.TextureLoader();
    const map = loader.load(path);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
}

export function wrapMap(map, repetition) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(repetition, repetition);
    return map;
}

export function vector2(x, y) {
    return new THREE.Vector2(x, y);
}
