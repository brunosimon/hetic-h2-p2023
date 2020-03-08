import './style/main.styl'
import Toto from './Toto.js'
import imageSource from './images/image.jpg'

console.log('helloooo webpack')
const toto = new Toto()
console.log(imageSource)

const $image = new Image()
$image.src = imageSource
document.body.appendChild($image)