import * as THREE from 'three' ;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' ; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight) ;
document.body.appendChild(renderer.domElement) ;

const scene = new THREE.Scene() ;
scene.background = new THREE.Color(0x808080);

const camera = new THREE.PerspectiveCamera(
    75, //vertical field of view (40-80)
    window.innerWidth/ window.innerHeight, //aspect ratio
    0.1, //nearest dist
    1000 //farthest dist
) ;
//posisi kamera
//camera.position.z = 5 ; //atau
camera.position.set(0, 0.5, 2) ;

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5) ;
scene.add(axesHelper) ;

const clock = new THREE.Clock()
let mixer ;

initializeLights() ;
loadModel() ; 

renderer.render(scene, camera) ;

animate() ;

function initializeLights() {
    const ambientLight = new THREE.AmbientLight()
    scene.add(ambientLight)

    let stageSpotLight = initializeStageLight() //0x8a2be2
    let lampLightOne = initializeLampLight(1, 3, -4)
    //let lampLightTwo = initializeLampLight(-0.15, 4.7, -4)
    //0xeededed
    scene.add(lampLightOne)
    scene.add(stageSpotLight)
    scene.add(stageSpotLight.target)
}

function initializeStageLight() {
    const stageSpotlight = new THREE.SpotLight()
    stageSpotlight.position.set(-0.15, 4.7, -4)
    stageSpotlight.intensity = 30 
    stageSpotlight.angle = 100
    stageSpotlight.target.position.set(0 , 0.1, -4.3)
    stageSpotlight.penumbra = 1
    return stageSpotlight
}

function initializeLampLight(x, y, z) {
    const light = new THREE.DirectionalLight(0x8a2be2, 1);
    light.position.set(x, y, z);
    light.intensity = 10
    const dLHelper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(dLHelper) 
    return light
}

function loadModel() {
    new GLTFLoader().load("../Assets/Models/MilkBar/MilkBar.gltf", function(gltf) {
        let model = gltf.scene ;
        scene.add(model) ;
        console.log(model) ;
        mixer = new THREE.AnimationMixer(model) ;
        const clips = gltf.animations ;
        clips.forEach(clip => {
            mixer.clipAction(clip).play();
        });
        animate() ;
    })
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    mixer.update(clock.getDelta())
    renderer.render(scene, camera) 
}
