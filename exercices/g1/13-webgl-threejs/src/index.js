import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import grassColorSource from './images/house/grass/color.jpg'
import doorColorSource from './images/house/door/color.jpg'
import doorAmbientOcclusionSource from './images/house/door/ambientOcclusion.jpg'
import doorHeightSource from './images/house/door/height.png'
import doorMetalnessSource from './images/house/door/metalness.jpg'
import doorNormalSource from './images/house/door/normal.jpg'
import doorAlphaSource from './images/house/door/alpha.jpg'
import doorRoughnessSource from './images/house/door/roughness.jpg'
import matcapSource from './images/matcaps/1.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionSource)
const doorHeightTexture = textureLoader.load(doorHeightSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessSource)
const doorNormalTexture = textureLoader.load(doorNormalSource)
const doorAlphaTexture = textureLoader.load(doorAlphaSource)
const doorRoughnessTexture = textureLoader.load(doorRoughnessSource)
const matcapTexture = textureLoader.load(matcapSource)

const grassColorTexture = textureLoader.load(grassColorSource)
grassColorTexture.repeat.x = 2
grassColorTexture.repeat.y = 2
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
// grassColorTexture.rotation = Math.PI * 0.25
// grassColorTexture.center.x = 0.5
// grassColorTexture.center.y = 0.5
grassColorTexture.magFilter = THREE.NearestFilter
// grassColorTexture.minFilter = THREE.NearestFilter

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
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 20)
camera.position.z = 8
scene.add(camera)

/**
 * Objects
 */
const objectsGroup = new THREE.Group()
scene.add(objectsGroup)

// Material
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    // opacity: 0.5,
    // color: 0xaaffaa,
    // wireframe: true,
    side: THREE.DoubleSide
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
objectsGroup.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 4, 4), material)
objectsGroup.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
objectsGroup.add(torusKnot)

/**
 * House
 */
const houseGroup = new THREE.Group()
houseGroup.visible = false
scene.add(houseGroup)

const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 1, 1),
    new THREE.MeshBasicMaterial({ map: grassColorTexture })
)
grass.rotation.x = - Math.PI * 0.5
houseGroup.add(grass)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffcc99 })
)
walls.position.y = 1.25
houseGroup.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.1, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0x885522 })
)
roof.position.y += 2.5 + 1 * 0.5
roof.rotation.y += Math.PI * 0.25
houseGroup.add(roof)

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 1),
    new THREE.MeshBasicMaterial({ color: 0xff8866 })
)
door.position.x = - 2.5
door.position.y = 1
houseGroup.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x228833 })
)
bush1.position.x = - 2.8
bush1.position.z = 1
bush1.position.y = 0.2
houseGroup.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x228833 })
)
bush2.position.x = - 2.8
bush2.position.z = - 0.8
bush2.position.y = 0.15
houseGroup.add(bush2)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

/**
 * Camera controls
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true

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

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002

    // Camera
    // camera.position.y = - cursor.y * 2
    // camera.position.x = cursor.x * 2

    // camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.y = - cursor.y * 5
    // camera.lookAt(scene.position)

    // Camera controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()