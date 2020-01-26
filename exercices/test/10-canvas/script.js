const $canvas = document.querySelector('.canvas')
const context = $canvas.getContext('2d')

// const text = 'lorem ipsum dolor sit amet'

// context.font = '40px Arial'
// context.textAlign = 'center'
// context.textBaseline = 'top'

// console.log(context.measureText(text).width)

// context.fillText(text, 300, 100)
// context.strokeText(text, 300, 160)


// const image = new Image()
// image.src = 'https://picsum.photos/600/400'

// const drawImage = () =>
// {
//     context.drawImage(image, 0, 0, image.width * 0.5, image.height * 0.5)
// }

// if(image.complete)
// {
//     drawImage()
// }
// else
// {
//     image.addEventListener('load', drawImage)
// }


// const gradient = context.createLinearGradient(50, 50, 250, 250)

// gradient.addColorStop(0, 'red')
// gradient.addColorStop(0.5, 'orange')
// gradient.addColorStop(1, 'yellow')

// context.fillStyle = gradient

// context.fillRect(0, 0, 400, 400)


// context.save()
// context.beginPath()
// context.moveTo(50, 50)
// context.lineTo(50, 100)
// context.lineWidth = 1
// context.stroke()

// context.save()
// context.beginPath()
// context.moveTo(100, 50)
// context.lineTo(100, 100)
// context.lineWidth = 5
// context.stroke()

// context.save()
// context.beginPath()
// context.moveTo(150, 50)
// context.lineTo(150, 100)
// context.lineWidth = 10
// context.stroke()

// context.restore()
// context.beginPath()
// context.moveTo(200, 50)
// context.lineTo(200, 100)
// context.stroke()

// context.restore()
// context.beginPath()
// context.moveTo(250, 50)
// context.lineTo(250, 100)
// context.stroke()


// const ball = { x: 200, y: 200 }

// const loop = () =>
// {
//     window.requestAnimationFrame(loop)

//     const time = Date.now()

//     ball.x += 4
//     ball.y = 300 - Math.abs(Math.sin(time * 0.005)) * 100

//     if(ball.x > $canvas.width)
//     {
//         ball.x = 0
//     }
    
//     context.fillStyle = '#ffffff'
//     context.globalAlpha = 0.1
//     context.fillRect(0, 0, $canvas.width, $canvas.height)

//     context.beginPath()
//     context.globalAlpha = 1
//     context.fillStyle = 'orange'
//     context.arc(ball.x, ball.y, 50, 0, Math.PI * 2)
//     context.fill()
// }

// loop()



// const ball = {
//     x: 200,
//     y: 200,
//     speedX: (Math.random() - 0.5) * 50,
//     speedY: 0,
//     gravity: 0.9,
//     radius: 50
// }

// const loop = () =>
// {
//     window.requestAnimationFrame(loop)

//     ball.speedY += ball.gravity

//     ball.x += ball.speedX
//     ball.y += ball.speedY

//     if(ball.y > $canvas.height - ball.radius)
//     {
//         ball.speedY *= - 0.9
//         ball.y = $canvas.height - ball.radius
//     }
//     if(ball.x > $canvas.width - ball.radius)
//     {
//         ball.x = $canvas.width - ball.radius
//         ball.speedX *= - 0.9
//     }
//     if(ball.x < ball.radius)
//     {
//         ball.x = ball.radius
//         ball.speedX *= - 0.9
//     }

//     context.fillStyle = '#ffffff'
//     context.globalAlpha = 0.1
//     context.fillRect(0, 0, $canvas.width, $canvas.height)

//     context.beginPath()
//     context.globalAlpha = 1
//     context.fillStyle = 'orange'
//     context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
//     context.fill()
// }

// loop()

/**
 * Sizes
 */
const sizes = { width: window.innerWidth, height: window.innerHeight }

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
 * Mouse
 */
const mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (_event) =>
{
    mouse.x = _event.clientX
    mouse.y = _event.clientY
})

/**
 * Balls
 */
const balls = []
const gravity = 0.9
const friction = 0.1
const colors = ['#ff0000', '#00ff00', '#0000ff']

window.addEventListener('click', () =>
{
    balls.push({
        x: mouse.x,
        y: mouse.y,
        speedX: (Math.random() - 0.5) * 20,
        speedY: - Math.random() * 20,
        radius: Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)]
    })
})

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Clear canvas
    context.clearRect(0, 0, $canvas.width, $canvas.height)

    // Update balls
    for(const _ball of balls)
    {
        _ball.speedY += gravity

        _ball.x += _ball.speedX
        _ball.y += _ball.speedY

        if(_ball.y >= $canvas.height - _ball.radius)
        {
            _ball.y = $canvas.height - _ball.radius
            _ball.speedY *= - (1 - friction)
        }
        if(_ball.x >= $canvas.width - _ball.radius)
        {
            _ball.x = $canvas.width - _ball.radius
            _ball.speedX *= - (1 - friction)
        }
        if(_ball.x <= 0 + _ball.radius)
        {
            _ball.x = _ball.radius
            _ball.speedX *= - (1 - friction)
        }
        
        // Draw ball
        context.beginPath()
        context.arc(_ball.x, _ball.y, _ball.radius, 0, Math.PI * 2)
        context.fillStyle = _ball.color
        context.globalCompositeOperation = 'screen'
        context.fill()
    }
}

loop()