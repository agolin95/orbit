import * as three from "/js/three.js"

$(function () {
    initializeScene();
});

function initializeScene() {
    let scene = three.makeScene();

    let earth = makeEarth();
    scene.add(earth);

    // let space = makeSpace();
    // scene.add(space);


    // let plane = makeGrass();
    // scene.add(plane);
    // plane.rotation.x = Math.PI / 2;

    let light = three.makePointLight(0xffffff, 1000);
    scene.add(light);
    light.position.x = 20;
    light.position.y = 0;
    light.position.z = 20;

    let camera = three.makeCamera(0, 2, 10);

    let renderer = three.makeRenderer(scene, camera);

    let controls = three.makeControls(camera, renderer);

    three.update(scene, camera, renderer);

    $(window).on("resize", function () {
        let w = window.innerWidth;
        let h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix()
    });
}

function makeEarth() {
    let earth = three.makeSphere(2, 100, 100);
    let textureMap = three.getMap("img/earth-2k.jpg");
    let normalMap = three.getMap("img/earth-normal.jpg");
    let roughnessMap = three.getMap("img/earth-roughness.jpg");
    let displacementMap = three.getMap("img/earth-bump.jpg");

    let mat = earth.material;
    mat.map = textureMap;
    mat.normalMap = normalMap;
    mat.normalScale = three.vector2(0.1, 0.1);
    mat.roughnessMap = roughnessMap;
    mat.roughness = 0.9;
    mat.displacementMap = displacementMap;
    mat.displacementScale = 0.1;
    return earth;
}

function makeSpace() {
    let space = three.makeBasicSphere(1000, 1000, 1000);
    let textureMap = three.getMap("img/space.jpg");
    let mat = space.material;
    mat.map = textureMap;
    return space;
}

function makeGrass() {
    let grass = three.makePlane(50, 50);
    let textureMap = three.getMap("img/grass.jpg");
    textureMap = three.wrapMap(textureMap, 10);
    let mat = grass.material;
    mat.map = textureMap;
    return grass;
}
