import './style/main.styl'

import * as THREE from 'three'
import font from 'three/examples/fonts/helvetiker_bold.typeface.json'

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
const material = new THREE.MeshNormalMaterial()

// Objects
const objects = new THREE.Group()
scene.add(objects)

const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1)
const torusGeometry = new THREE.TorusBufferGeometry(1, 0.7, 12, 32)

for(let i = 0; i < 150; i++)
{
    const scale = 0.1 + Math.random() * 0.8

    /**
     * Box
     */
    // Mesh
    const box = new THREE.Mesh(boxGeometry, material)
    objects.add(box)

    // Scale
    box.scale.set(scale, scale, scale)

    // Position
    box.position.x = (Math.random() - 0.5) * 50
    box.position.y = (Math.random() - 0.5) * 50
    box.position.z = (Math.random() - 0.5) * 50

    // Rotation
    box.rotation.x = Math.random() * Math.PI * 2
    box.rotation.y = Math.random() * Math.PI * 2

    /**
     * Torus
     */
    // Mesh
    const torus = new THREE.Mesh(torusGeometry, material)
    objects.add(torus)

    // Scale
    torus.scale.set(scale, scale, scale)

    // Position
    torus.position.x = (Math.random() - 0.5) * 50
    torus.position.y = (Math.random() - 0.5) * 50
    torus.position.z = (Math.random() - 0.5) * 50

    // Rotation
    torus.rotation.x = Math.random() * Math.PI * 2
    torus.rotation.y = Math.random() * Math.PI * 2
}

// Text
const textGeometry = new THREE.TextBufferGeometry(
    'SUPER PORTFOLIO',
    {
        font: new THREE.Font(font),
        size: 1.5,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.1,
        bevelOffset: - 0.08,
        bevelSegments: 10
    }
)

textGeometry.computeBoundingBox()
console.log(textGeometry.boundingBox.max.x)

const text = new THREE.Mesh(textGeometry, material)
text.position.x -= textGeometry.boundingBox.max.x * 0.5
scene.add(text)


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 10
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
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Camera
    const cameraTarget = {}
    cameraTarget.x = cursor.x * 40
    cameraTarget.y = - cursor.y * 40
    camera.position.x += (cameraTarget.x - camera.position.x) * 0.05
    camera.position.y += (cameraTarget.y - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    // Render
    renderer.render(scene, camera)
}

loop()