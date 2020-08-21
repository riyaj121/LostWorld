const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, aspectRatio, 50, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Loading images for skybox texture 
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './images/raspberry_ft.jpg',
    './images/raspberry_bk.jpg',
    './images/raspberry_up.jpg',
    './images/raspberry_dn.jpg',
    './images/raspberry_rt.jpg',
    './images/raspberry_lf.jpg',
]);
scene.background = texture;

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 30, 100);
controls.update();

//Loading the gltf file 

var modelloader = new THREE.GLTFLoader();

modelloader.load('./RX07.glb', function(gltf) {

    var model = gltf.scene;

    model.scale.set(3, 3, 3);

    scene.add(model);

}, undefined, function(error) {

    console.error(error);

});

var renderScene = function() {
    requestAnimationFrame(renderScene);

    controls.update();
    renderer.render(scene, camera);
};

renderScene();
