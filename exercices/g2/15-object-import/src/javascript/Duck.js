import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Duck
{
    constructor()
    {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/duck/glTF-Draco/Duck.gltf',
            (_gltf) =>
            {
                this.duck = _gltf.scene.children[0].children[1]
                this.duck.scale.set(0.01, 0.01, 0.01)
                this.duck.material = new THREE.MeshToonMaterial({
                    map: this.duck.material.map
                })
                this.group.add(this.duck)
            }
        )
    }
}
