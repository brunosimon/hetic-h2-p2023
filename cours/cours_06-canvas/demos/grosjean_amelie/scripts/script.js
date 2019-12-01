const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

const $body = document.querySelector('body')
const $logo = document.querySelector('svg')

const $instructions = document.querySelector('.instructions')
const $theme = document.querySelectorAll('.theme')

const $color1 = document.querySelector('.colorOne')
const $color2 = document.querySelector('.colorTwo')
const $color3 = document.querySelector('.colorThree')
const $colorMalus = document.querySelector('.colorMalus')

const $themes = document.querySelector('.themes')
const $themeDark = document.querySelector('.themeDark')
const $themeNeon = document.querySelector('.themeNeon')
const $themeNormal = document.querySelector('.themeNormal')

const $scoreBloc = document.querySelector('.scoreBloc')
const $score = document.querySelector('.score')

/* GLOBAL INIT */

//Responsive Canvas
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

const clear = () =>
{
    context.clearRect(0, 0, $canvas.width, $canvas.height)
}

//Mouse coordinates :
const mouse = { x: $canvas.width, y: $canvas.height }
document.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

/****************************

   COLOR THEMES EFFECTS

 ****************************/

//DOM listener
$themeDark.addEventListener('click', () =>
{
    $themes.classList.remove('neon')
    $themes.classList.remove('normal')
    $themes.classList.add('dark')
})
$themeNeon.addEventListener('click', () =>
{
    $themes.classList.remove('dark')
    $themes.classList.remove('normal')
    $themes.classList.add('neon')
})
$themeNormal.addEventListener('click', () =>
{
    $themes.classList.remove('neon')
    $themes.classList.remove('dark')
})

//colorthemefunctions
const checkColorThemes = () =>
{
    if ($themes.classList.contains('dark'))
    {
        color =
        {
            one : '#e38b89',
            two : '#8aa4e3',
            three : '#84d3a6',
            malus : '#1e1e1e'
        }

        $logo.style.fill = '#e1e1e1'
        $canvas.style.backgroundColor = '#242424'
        $scoreBloc.style.backgroundColor = '#e1e1e1'
        $score.style.color = '#242424'
        $color1.style.backgroundColor = color.one
        $color2.style.backgroundColor = color.two
        $color3.style.backgroundColor = color.three
        $colorMalus.style.backgroundColor = color.malus

        $body.style.color = '#e1e1e1'
        $instructions.style.backgroundColor = '#e1e1e122'
        $themeDark.style.backgroundColor = '#e1e1e122'
        $themeNeon.style.backgroundColor = '#e1e1e122'
        $themeNormal.style.backgroundColor = '#e1e1e122'

    }
    else if ($themes.classList.contains('neon'))
    {
        color =
        {
            one : '#b0ff00',
            two : '#00ffd2',
            three : '#ff00f4',
            malus : '#FFFFFF',
        }

        $logo.style.fill = '#e1e1e1'
        $canvas.style.backgroundColor = '#000000'
        $scoreBloc.style.backgroundColor = '#e1e1e1'
        $score.style.color = '#000000'
        $color1.style.backgroundColor = color.one
        $color2.style.backgroundColor = color.two
        $color3.style.backgroundColor = color.three
        $colorMalus.style.backgroundColor = color.malus

        $body.style.color = '#e1e1e1'
        $instructions.style.backgroundColor = '#e1e1e122'
        $themeDark.style.backgroundColor = '#e1e1e122'
        $themeNeon.style.backgroundColor = '#e1e1e122'
        $themeNormal.style.backgroundColor = '#e1e1e122'
    }
    else
    {
        color =
        {
            one : '#e38b89',
            two : '#8aa4e3',
            three : '#84d3a6',
            malus : '#1e1e1e'
        }

        $logo.style.fill = '#1e1e1e'
        $canvas.style.backgroundColor = '#dbdbdb'
        $scoreBloc.style.backgroundColor = '#1e1e1e'
        $score.style.color = '#dbdbdb'
        $color1.style.backgroundColor = color.one
        $color2.style.backgroundColor = color.two
        $color3.style.backgroundColor = color.three
        $colorMalus.style.backgroundColor = color.malus

        $body.style.color = '#1e1e1e'
        $instructions.style.backgroundColor = '#00000020'
        $themeDark.style.backgroundColor = '#00000020'
        $themeNeon.style.backgroundColor = '#00000020'
        $themeNormal.style.backgroundColor = '#00000020'
    }
}

/*******************************

        GLOBAL VARIABLES

*******************************/

const game =
{
    speed : 1200
}

let color =
{
    one: '#e38b89',
    two: '#8aa4e3',
    three: '#84d3a6',
    malus: '#000000'
}

checkColorThemes()

const square =
{
    width : 100,
    height : 100,
    pos : {},
    color : color.one
}
square.pos.y = $canvas.height - square.height - 2

const dots = []

let score = 0

/*******************************

            SQUARE

********************************/

/* SQUARE DRAW + MOUVEMENT */

const moveSquare = () =>
{
    //define directions for the particles
    if (square.pos.x > mouse.x-square.width/2) {createParticles(1)}
    else if (square.pos.x < mouse.x-square.width/2) {createParticles(2)}

    square.pos.x = mouse.x - square.width/2
    context.beginPath()
    context.rect(square.pos.x,square.pos.y,square.width,square.height)
    context.fillStyle = square.color
    context.fill()
}

/* SQUARE COLOR CHANGES */

const changeSquareColor = () =>
{
    document.onkeydown = function(event) {
        switch (event.keyCode) {
            case 65:
                square.color = color.one
                break
            case 90:
                square.color = color.two
                break
            case 69:
                square.color = color.three
                break
        }
    }
}

/********************************

        SQUARE PARTICLES

 *******************************/

//Create particles
const particles = []

const createParticles = (direction) =>
{
    const particle = {}
    if (direction == 1)
    {
        particle.angle = (Math.random() * Math.PI/3)  -Math.PI/3
        particle.x = square.pos.x + square.width
    }
    else if (direction == 2)
    {
        particle.angle = (Math.random() * Math.PI/3) - Math.PI
        particle.x = square.pos.x
    }
    particle.speed = (Math.random() * 5)+2
    particle.opacity = 70
    particle.y = square.pos.y + square.height
    particle.fillStyle = square.color + particle.opacity + ''
    particle.size = (Math.random() * 15) +10
    particles.push(particle)
}

const updateParticles = () =>
{
    let i = 0
    for(const particle of particles)
    {
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed

        if(
            particle.x < 0 ||
            particle.x > $canvas.width ||
            particle.y < 0 ||
            particle.y > $canvas.height
        )
        {
            particles.splice(i, 1)
        }
        i++
    }
}

const drawParticles = () =>
{
    for(const particle of particles)
    {
        context.beginPath()
        context.rect(particle.x, particle.y, particle.size,particle.size)
        context.fillStyle = particle.fillStyle
        context.fill()
    }
}

/****************************

        DOTS FUNCTIONS

*****************************/

// add new dot to the dots table (function used in the setInterval function)
const addNewDots = () =>
{
    const dot = {}
    dot.x = (280 +(Math.random() * ($canvas.width-280)))
    dot.y = -20
    switch (Math.ceil(Math.random()*4))
    {
        case 1 :
            dot.color = color.one
            break
        case 2 :
            dot.color = color.two
            break
        case 3 :
            dot.color = color.three
            break
        case 4 :
            dot.color = color.malus
            break
    }
    dot.radius = 20
    dot.speed = 8
    dots.push(dot)
}

//draw all the dots currently in the dots table
const drawDots = () =>
{
    for(const dot of dots)
    {
        context.beginPath()
        //neon shadow&gradient
        if ($themes.classList.contains('neon'))
        {
            //dot color :
            context.arc(dot.x, dot.y, 20, 0, Math.PI * 2)
            context.fillStyle = dot.color
            context.fill()
            context.beginPath()
            //gradient :
            const gradient = context.createRadialGradient(
                dot.x, dot.y, 0,
                dot.x, dot.y, 20,
            )
            gradient.addColorStop(0, '#FFFFFF55')
            gradient.addColorStop(1, dot.color)
            context.arc(dot.x, dot.y, 20, 0, Math.PI * 2)
            context.fillStyle = gradient
            //shadow :
            context.shadowColor = dot.color
            context.shadowBlur = 8
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0
        }
        else
        {
            context.arc(dot.x, dot.y, 20, 0, Math.PI * 2)
            context.fillStyle = dot.color
        }
        context.fill()
        context.shadowColor = 'rgba(0,0,0,0)'
    }
}

//update dots pos et remove dots
const updateDots = () =>
{
    let i = 0
    for(const dot of dots)
    {
        //update dots pos
        dot.y += dot.speed

        //remove dots
        if(dot.y > $canvas.height)
        {
            if (dot.color == color.malus)
            {
                dots.splice(i, 1)
            } else {
                dots.splice(i, 1)
                score -= 1
            }
        }
        if ((dot.y >= ($canvas.height-square.height)) && (dot.x >= square.pos.x) && (dot.x <= (square.pos.x + square.width)) )
        {
            dots.splice(i, 1)
            if (dot.color == square.color)
            {
                score += 1
            }
            else if (dot.color == color.malus)
            {
                finish()
                end = true
            }
            else
            {
                score -= 1
            }
        }
        i++
    }
}

/*******************************

    START, PAUSE & END SCREEN

********************************/

let paused = true
let end = false

//start screen
const start = () =>
{
    context.beginPath()
    const text = 'Press the spacebar to start !'
    context.font = '55px Proxima Nova'
    context.fillStyle = $logo.style.fill
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, $canvas.width/2, $canvas.height/2)
}
start()

//pause screen
document.body.onkeydown = function(event) {
    if (event.keyCode == 32 && end)
    {
        window.location.reload()
    }
    else if (event.keyCode == 32 && paused)
    {
        paused=false
        render()
    }
    else if (event.keyCode == 32 && paused == false)
    {
        paused = true
        context.beginPath()
        context.fillStyle = '#00000040'
        context.fillRect(0,0,$canvas.width,$canvas.height)
        context.beginPath()
        const text = 'Game Paused'
        context.font = '80px Proxima Nova'
        context.fillStyle = $logo.style.fill
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(text, $canvas.width/2, $canvas.height/2)
    }
}

//end screen
const finish = () =>
{
    paused=false
    context.beginPath()
    context.fillStyle = '#00000040'
    context.fillRect(0,0,$canvas.width,$canvas.height)
    context.beginPath()
    const text = "You've failed :'("
    const text2 = 'Retry ? Press spacebar'
    context.font = '55px Proxima Nova'
    context.fillStyle = $logo.style.fill
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, $canvas.width/2, $canvas.height/2 -50)
    context.fillText(text2, $canvas.width/2, $canvas.height/2 + 50)
}

/*************************

           LOOPS

*************************/

//create new dots in a specific interval
const newDot = () =>
{
    if(paused){return}
    if(end){return}
    addNewDots()
}
window.setInterval(newDot,game.speed)

const render = () =>
{
    if(paused){return}
    if(end){return}
    clear()
    checkColorThemes()
    changeSquareColor()
    updateParticles()
    drawParticles()
    drawDots()
    updateDots()
    moveSquare()
    //update score in the html
    $score.textContent = score

    window.requestAnimationFrame(render)
}
render()
