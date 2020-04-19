import './style/main.styl'
import * as THREE from 'three'
import Cubes from './javascript/Cubes.js'
import Duck from './javascript/Duck.js'
import { TweenLite } from 'gsap/all'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

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

// Cubes
const cubes = new Cubes()
cubes.group.position.x = 2
scene.add(cubes.group)

// Duck
const duck = new Duck()
scene.add(duck.group)

const raycaster = new THREE.Raycaster()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearAlpha(0)
document.body.appendChild(renderer.domElement)

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})
let hoverDuck = false
document.addEventListener('click', () =>
{
    if(hoverDuck)
    {
        console.log('click sur le canard')

        TweenLite.to(
            duck.duck.position,
            1,
            {
                y: duck.duck.position.y - 1,
                x: duck.duck.position.x - 1,
                ease: 'Power3.easeInOut'
            }
        )
    }
})

/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Camera
    camera.lookAt(scene.position)

    // Cursor raycasting
    const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
    raycaster.setFromCamera(raycasterCursor, camera)

    const intersects = raycaster.intersectObject(duck.group, true)
    if(intersects.length)
    {
        hoverDuck = true
    }
    else
    {
        hoverDuck = false
    }

    // Render
    renderer.render(scene, camera)
}

loop()