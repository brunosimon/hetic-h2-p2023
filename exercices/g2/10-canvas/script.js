const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = 800
$canvas.height = 600

const ball = { x: 200, y: 200, radius: 50 }

const loop = () =>
{
    window.requestAnimationFrame(loop)

    context.clearRect(0, 0, $canvas.width, $canvas.height)

    ball.x += 2

    if(ball.x > $canvas.width + ball.radius)
    {
        ball.x = - ball.radius
    }

    ball.y = 300 - Math.abs(Math.sin(Date.now() * 0.005)) * 150
    
    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fillStyle = 'orange'
    context.fill()
}

loop()