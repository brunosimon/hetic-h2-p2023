import './style/main.styl'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import grassColorSource from './images/house/grass/color.jpg'
import grassNormalSource from './images/house/grass/normal.jpg'
import grassRoughnessSource from './images/house/grass/roughness.jpg'
import bricksColorSource from './images/house/bricks/color.jpg'
import bricksNormalSource from './images/house/bricks/normal.png'
import doorColorImageSource from './images/house/door/color.jpg'
import doorAmbientOcclusionImageSource from './images/house/door/ambientOcclusion.jpg'
import doorHeightImageSource from './images/house/door/height.png'
import doorMetalnessImageSource from './images/house/door/metalness.jpg'
import doorNormalImageSource from './images/house/door/normal.jpg'
import doorAlphaImageSource from './images/house/door/alpha.jpg'
import doorColorRoughnessSource from './images/house/door/roughness.jpg'
import matcapSource from './images/matcaps/1.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const grassColorTexture = textureLoader.load(grassColorSource)
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassColorTexture.repeat.x = 4
grassColorTexture.repeat.y = 4
const grassNormalTexture = textureLoader.load(grassNormalSource)
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
const grassRoughnessTexture = textureLoader.load(grassRoughnessSource)
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const bricksColorTexture = textureLoader.load(bricksColorSource)
const bricksNormalTexture = textureLoader.load(bricksNormalSource)

const doorColorTexture = textureLoader.load(doorColorImageSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImageSource)
const doorHeightTexture = textureLoader.load(doorHeightImageSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessImageSource)
const doorNormalTexture = textureLoader.load(doorNormalImageSource)
const doorAlphaTexture = textureLoader.load(doorAlphaImageSource)
const doorColorRoughnessTexture = textureLoader.load(doorColorRoughnessSource)
const matcapTexture = textureLoader.load(matcapSource)

/**
 * Scene
 */
const scene = new THREE.Scene()

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
    // Update cursor position with values between -0.5 and +0.5
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 11
scene.add(camera)

/**
 * Objects
 */
const objectsGroup = new THREE.Group()
objectsGroup.visible = false
scene.add(objectsGroup)

// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true,
//     opacity: 0.8,
//     color: new THREE.Color(0xaaffaa),
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
//     roughnessMap: doorColorRoughnessTexture,
//     normalMap: doorNormalTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true
// })
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.3
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
sphere.castShadow = true
sphere.receiveShadow = true
objectsGroup.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 80, 80), material)
plane.castShadow = true
plane.receiveShadow = true
objectsGroup.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
torusKnot.castShadow = true
torusKnot.receiveShadow = true
objectsGroup.add(torusKnot)

// Floor
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20, 1, 1), material)
floor.position.y = - 3
floor.rotation.x -= Math.PI * 0.5
floor.receiveShadow = true
objectsGroup.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
objectsGroup.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.x = - 2
directionalLight.position.y = 3
directionalLight.position.z = 4
objectsGroup.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
objectsGroup.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 1, 10)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
objectsGroup.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 5, 5)
rectAreaLight.position.x = 5
rectAreaLight.position.z = 5
rectAreaLight.position.y = - 3
rectAreaLight.lookAt(new THREE.Vector3())
objectsGroup.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x00ff9c, 1, 0, Math.PI * 0.2, 0.5)
spotLight.position.z = 3
spotLight.position.y = 2
objectsGroup.add(spotLight)

spotLight.target.position.z = - 2
objectsGroup.add(spotLight.target)

// Shadows
directionalLight.castShadow = true
pointLight.castShadow = true
spotLight.castShadow = true

// Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
objectsGroup.add(directionalLightHelper)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
objectsGroup.add(hemisphereLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
objectsGroup.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
objectsGroup.add(spotLightHelper)

/**
 * House
 */
const houseGroup = new THREE.Group()
// houseGroup.visible = false
scene.add(houseGroup)

const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 1, 1),
    new THREE.MeshStandardMaterial({ map: grassColorTexture, normalMap: grassNormalTexture, normalScale: new THREE.Vector2(0, 0.4), roughnessMap: grassRoughnessTexture, metalness: 0, roughness: 0.4 })
)
grass.rotation.x = - Math.PI * 0.5
houseGroup.add(grass)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
    new THREE.MeshStandardMaterial({ map: bricksColorTexture, normalMap: bricksNormalTexture })
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
    new THREE.PlaneGeometry(2.2, 2.2, 1, 1),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.2,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorColorRoughnessTexture,
        normalMap: doorNormalTexture,
        alphaMap: doorAlphaTexture,
        transparent: true
    })
)
door.rotation.y = - Math.PI * 0.5
door.position.x = - 2.55
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

// Lights
const generalLight = new THREE.AmbientLight(0x0096ff, 0.15)
houseGroup.add(generalLight)

const moonLight = new THREE.DirectionalLight(0x0096ff, 1)
moonLight.position.x = 1
moonLight.position.z = 1
houseGroup.add(moonLight)

const doorLight = new THREE.PointLight(0xffd800, 2, 5)
doorLight.position.x = - 2.8
doorLight.position.z = 0
doorLight.position.y = 2.2
houseGroup.add(doorLight)

const ghostLightA = new THREE.PointLight(0xea00ff, 3, 5)
ghostLightA.position.x = 5
ghostLightA.position.z = 5
ghostLightA.position.y = 1
houseGroup.add(ghostLightA)

const ghostLightB = new THREE.PointLight(0x00d8ff, 3, 5)
ghostLightB.position.x = 5
ghostLightB.position.z = - 5
ghostLightB.position.y = 1
houseGroup.add(ghostLightB)

const ghostLightC = new THREE.PointLight(0xd8ff00, 3, 5)
ghostLightC.position.x = - 5
ghostLightC.position.z = 5
ghostLightC.position.y = 1
houseGroup.add(ghostLightC)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

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
    // Save width and height
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    const time = Date.now()

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002

    // Update camera controls
    cameraControls.update()

    // Update house
    const ghostLightAAngle = time * 0.0002
    ghostLightA.position.x = Math.cos(ghostLightAAngle) * 5
    ghostLightA.position.z = Math.sin(ghostLightAAngle) * 5
    ghostLightA.position.y = 0.7 + Math.sin(time * 0.001) * 1

    const ghostLightBAngle = time * 0.0002 + Math.PI * 2 / 3 * 2
    ghostLightB.position.x = Math.cos(ghostLightBAngle) * 5
    ghostLightB.position.z = Math.sin(ghostLightBAngle) * 5
    ghostLightB.position.y = 0.7 + Math.sin(time * 0.001 + 1) * 1

    const ghostLightCAngle = time * 0.0002 + Math.PI * 2 / 3 * 1
    ghostLightC.position.x = Math.cos(ghostLightCAngle) * 5
    ghostLightC.position.z = Math.sin(ghostLightCAngle) * 5
    ghostLightC.position.y = 0.7 + Math.sin(time * 0.001 + 2) * 1

    // Render
    renderer.render(scene, camera)
}

loop()