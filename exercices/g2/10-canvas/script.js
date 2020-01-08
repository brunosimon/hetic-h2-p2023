const $canvas = document.querySelector('.canvas')
const context = $canvas.getContext('2d')

context.beginPath()

context.moveTo(50, 50)
context.lineTo(200, 200)
context.lineTo(50, 200)
// context.closePath()

context.lineWidth = 20
context.lineCap = 'round'
context.lineJoin = 'bevel'
context.strokeStyle = 'hsl(0deg, 100%, 50%)'

context.fillStyle = 'orange'
context.shadowOffsetX = 5
context.shadowOffsetY = 10
context.shadowBlur = 50
context.shadowColor = 'blue'

context.fill()
context.stroke()