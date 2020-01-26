const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = 800
$canvas.height = 600

const ball = { x: 200, y: 200, radius: 50 }

const loop = () =>
{
    window.requestAnimationFrame(loop)

    context.clearRect(0, 0, $canvas.width, $canvas.height)

    ball.x += 4

    ball.y = - Math.abs(Math.sin(Date.now() * 0.005)) * 100 + 200

    if(ball.x > $canvas.width + ball.radius)
    {
        ball.x = - ball.radius
    }
    
    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fillStyle = 'orange'
    context.fill()
}

loop()