import * as THREE from 'three'

class Cubes
{
    constructor()
    {
        this.group = new THREE.Group()

        const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const cubeMaterial = new THREE.MeshNormalMaterial()

        for(let i = 0; i < 10; i++)
        {
            const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cubeMesh.position.x = Math.random() - 0.5
            cubeMesh.position.y = Math.random() - 0.5
            cubeMesh.position.z = Math.random() - 0.5

            cubeMesh.rotation.x = Math.random() * Math.PI
            cubeMesh.rotation.y = Math.random() * Math.PI

            this.group.add(cubeMesh)
        }
    }
}

export default Cubes