import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import grassColorSource from './images/house/grass/color.jpg'
import grassNormalSource from './images/house/grass/normal.jpg'
import bricksColorSource from './images/house/bricks/color.jpg'
import bricksNormalSource from './images/house/bricks/normal.png'
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
grassColorTexture.repeat.x = 4
grassColorTexture.repeat.y = 4
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
const grassNormalTexture = textureLoader.load(grassNormalSource)
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
const bricksColorTexture = textureLoader.load(bricksColorSource)
const bricksNormalTexture = textureLoader.load(bricksNormalSource)

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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x0096ff, 0.25)
scene.add(ambientLight)

const moonLight = new THREE.DirectionalLight(0x0096ff, 1)
moonLight.position.set(1, 1, 1)
scene.add(moonLight)

const doorLight = new THREE.PointLight(0xffd800, 2, 5)
doorLight.position.y = 2.2
doorLight.position.x = - 2.7
scene.add(doorLight)

const ghostLightA = new THREE.PointLight(0xea00ff, 3, 5)
ghostLightA.position.z = 5
ghostLightA.position.y = 1
scene.add(ghostLightA)

const ghostLightB = new THREE.PointLight(0x00d8ff, 3, 5)
ghostLightB.position.x = 5
ghostLightB.position.y = 1
scene.add(ghostLightB)

const ghostLightC = new THREE.PointLight(0xd8ff00, 3, 5)
ghostLightC.position.z = - 5
ghostLightC.position.y = 1
scene.add(ghostLightC)

/**
 * Objects
 */
const objectsGroup = new THREE.Group()
objectsGroup.visible = false
scene.add(objectsGroup)

// Material
// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true,
//     opacity: 0.8,
//     color: 0xaaffaa,
//     wireframe: true,
//     side: THREE.DoubleSide
// })
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture
// })
// const material = new THREE.MeshLambertMaterial({
//     color: 0xffffff
// })
// const material = new THREE.MeshPhongMaterial({
//     color: 0xffffff,
//     shininess: 100,
//     specular: 0x1188ff
// })
// const material = new THREE.MeshStandardMaterial({
//     map: doorColorTexture,
//     aoMap: doorAmbientOcclusionTexture,
//     displacementMap: doorHeightTexture,
//     displacementScale: 0.2,
//     metalnessMap: doorMetalnessTexture,
//     roughnessMap: doorRoughnessTexture,
//     normalMap: doorNormalTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true,
//     side: THREE.DoubleSide
// })
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.3
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
objectsGroup.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 40, 40), material)
objectsGroup.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
objectsGroup.add(torusKnot)

// Floor
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20, 1, 1), material)
floor.position.y = - 3
floor.rotation.x -= Math.PI * 0.5
objectsGroup.add(floor)

/**
 * House
 */
const houseGroup = new THREE.Group()
// houseGroup.visible = false
scene.add(houseGroup)

const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 1, 1),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        normalMap: grassNormalTexture
    })
)
grass.rotation.x = - Math.PI * 0.5
houseGroup.add(grass)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        normalMap: bricksNormalTexture
    })
)
walls.position.y = 1.25
houseGroup.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.1, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0x885522 })
)
roof.position.y += 2.5 + 1 * 0.5
roof.rotation.y += Math.PI * 0.25
houseGroup.add(roof)

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0xff8866 })
)
door.position.x = - 2.5
door.position.y = 1
houseGroup.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x228833 })
)
bush1.position.x = - 2.8
bush1.position.z = 1
bush1.position.y = 0.2
houseGroup.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x228833 })
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
 * Camera Controls
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

    // Update house
    const ghostAAngle = Date.now() * 0.0003
    ghostLightA.position.x = Math.cos(ghostAAngle) * 5
    ghostLightA.position.z = Math.sin(ghostAAngle) * 5
    ghostLightA.position.y = Math.sin(Date.now() * 0.001) + 0.5

    const ghostBAngle = Date.now() * 0.0003 + Math.PI * 2 / 3
    ghostLightB.position.x = Math.cos(ghostBAngle) * 5
    ghostLightB.position.z = Math.sin(ghostBAngle) * 5
    ghostLightB.position.y = Math.sin(Date.now() * 0.0012) + 0.5

    const ghostCAngle = Date.now() * 0.0003 - Math.PI * 2 / 3
    ghostLightC.position.x = Math.cos(ghostCAngle) * 5
    ghostLightC.position.z = Math.sin(ghostCAngle) * 5
    ghostLightC.position.y = Math.sin(Date.now() * 0.0015) + 0.5

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002

    // Camera
    // camera.position.y = - cursor.y * 5
    // camera.position.x = cursor.x * 5

    // const angle = cursor.x * Math.PI * 2
    // camera.position.x = Math.cos(angle) * 3
    // camera.position.z = Math.sin(angle) * 3
    // camera.position.y = cursor.y * 5

    // camera.lookAt(scene.position)

    // Camera controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()