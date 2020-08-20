const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, aspectRatio, 50, 10000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a cube 
var geometry = new THREE.BoxBufferGeometry(50, 50, 50);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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


var renderScene = function() {
    requestAnimationFrame(renderScene);

    controls.update();

    renderer.render(scene, camera);
};

renderScene();