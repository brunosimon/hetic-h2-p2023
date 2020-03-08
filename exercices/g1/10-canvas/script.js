/**
 * Canvas
 */
const $canvas = document.createElement('canvas')
$canvas.classList.add('canvas')
document.body.appendChild($canvas)

const context = $canvas.getContext('2d')

/**
 * Sizes
 */
const sizes = { width: null, height: null }

const resize = () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    $canvas.width = sizes.width
    $canvas.height = sizes.height
}

window.addEventListener('resize', resize)
resize()

/**
 * Cursor
 */
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX
    cursor.y = _event.clientY
})

/**
 * Balls
 */
const balls = []

window.addEventListener('click', () =>
{
    balls.push({
        x: cursor.x,
        y: cursor.y,
        speedX: 5,
        speedY: - 5,
        radius: Math.random() * 50,
        color: `hsl(${Math.random() * 360}deg, 100%, 90%)`
    })
})

const gravity = 0.5
const friction = 0.1

/**
 * Loop
 */
let previousTime = Date.now()

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Time
    const time = Date.now()
    const delta = time - previousTime
    previousTime = time

    // Clear canvas
    context.clearRect(0, 0, sizes.width, sizes.height)

    // Update balls
    for(const ball of balls)
    {
        ball.speedY += gravity

        ball.x += ball.speedX
        ball.y += ball.speedY

        if(ball.y > sizes.height - ball.radius)
        {
            ball.speedY *= - (1 - friction)
            ball.y = sizes.height - ball.radius
        }
        if(ball.x > sizes.width - ball.radius)
        {
            ball.speedX *= - (1 - friction)
            ball.x = sizes.width - ball.radius
        }
        if(ball.x < ball.radius)
        {
            ball.speedX *= - (1 - friction)
            ball.x = ball.radius
        }
        
        // Draw ball
        context.beginPath()
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        context.fillStyle = ball.color
        context.fill()
    }
}

loop()