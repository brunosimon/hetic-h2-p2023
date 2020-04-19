import './style/main.styl'
import * as THREE from 'three'
import font from 'three/examples/fonts/helvetiker_bold.typeface.json'

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

/**
 * Objects
 */
const torusGeometry = new THREE.TorusGeometry(1, 0.7, 12, 32)
const material = new THREE.MeshNormalMaterial()

const textGeometry = new THREE.TextGeometry(
    'BRUNO SIMON',
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
const text = new THREE.Mesh(textGeometry, material)
text.position.x = - 8
scene.add(text)

for(let i = 0; i < 50; i++)
{
    const torus = new THREE.Mesh(torusGeometry, material)
    
    torus.position.x = (Math.random() - 0.5) * 50
    torus.position.y = (Math.random() - 0.5) * 50
    torus.position.z = (Math.random() - 0.5) * 50

    torus.rotation.x = Math.random() * Math.PI
    torus.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    torus.scale.x = scale
    torus.scale.y = scale
    torus.scale.z = scale

    scene.add(torus)
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 8
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

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    camera.position.x = cursor.x * 40
    camera.position.y = - cursor.y * 40
    camera.lookAt(scene.position)

    // Render
    renderer.render(scene, camera)
}

loop()