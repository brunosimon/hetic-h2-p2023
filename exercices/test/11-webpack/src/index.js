import './style/main.styl'
import imageSource from './images/image.jpg'

const $image = new Image()
$image.src = imageSource
document.body.appendChild($image)

console.log('ok 5')