import * as THREE from 'three' ;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' ; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight) ;
document.body.appendChild(renderer.domElement) ;

const scene = new THREE.Scene() ;
scene.background = new THREE.Color(0x808080)

const camera = new THREE.PerspectiveCamera(
    75, //vertical field of view (40-80)
    window.innerWidth/ window.innerHeight, //aspect ratio
    0.1, //nearest dist
    1000 //farthest dist
) ;
//posisi kamera
//camera.position.z = 5 ; //atau
camera.position.set(0,0,2) ;

const axesHelper = new THREE.AxesHelper(5) ;
scene.add(axesHelper) ;

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()
let mixer ;

function initializeLights() {
    const ambientLight = new THREE.AmbientLight(0xeededed)
    scene.add(ambientLight)

    const stageSpotlight = new THREE.SpotLight()
    stageSpotlight.position.set(-0.15, 4.7, -4)
    stageSpotlight.intensity = 30
    //0x8a2be2
    stageSpotlight.angle = 100
    stageSpotlight.target.position.set(0 , 0.1, -4.3)
    stageSpotlight.penumbra = 1
    scene.add(stageSpotlight)
    scene.add(stageSpotlight.target)

    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    light.position.set(1.7, 1, -1);
}

function loadModel() {
    new GLTFLoader().load("../Assets/Models/MilkBar/MilkBar.gltf", function(gltf) {
        let model = gltf.scene ;
        scene.add(model) ;
        console.log(model) ;
        mixer = new THREE.AnimationMixer(model) ;
        const clips = gltf.animations ;
        clips.forEach( ( clip ) => {
            mixer.clipAction( clip ).play();
        } );
        animate() ;
    })
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    mixer.update(clock.getDelta())
    renderer.render(scene, camera) 
}

initializeLights()
loadModel()

renderer.render(scene, camera) ;

animate() ;