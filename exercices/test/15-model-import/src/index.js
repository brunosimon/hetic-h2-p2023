import './style/main.styl'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import duckSource from './models/duck/glTF-Binary/Duck.glb'

const gltfLoader = new GLTFLoader()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

// Model
let duck = null
gltfLoader.load(
    duckSource,
    (gltf) =>
    {
        duck = gltf.scene.children[0]
        scene.add(duck)
    }
)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ alpha: true })
document.body.appendChild(renderer.domElement)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 0)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Raycaster
    const raycasterMouse = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
    // console.log(raycasterMouse)
    raycaster.setFromCamera(raycasterMouse, camera)

    if(duck)
    {
        const intersects = raycaster.intersectObjects([duck], true)

        if(intersects.length)
        {
            if(intersects[0].object === duck || intersects[0].object.parent === duck)
            {
                console.log('hover duck')
            }
        }
    }

    // Camera
    const cameraTarget = {}
    camera.lookAt(scene.position)

    // Render
    renderer.render(scene, camera)
}

loop()