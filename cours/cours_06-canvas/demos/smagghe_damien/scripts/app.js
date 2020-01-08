//CONSTENT AND VARIABLES
//DOM CONSTENTS
const $canvas = document.querySelector(".js-canvas")
const context = $canvas.getContext("2d")
const $gameTitle = document.querySelector('.game__title')
const $winner = $gameTitle.querySelector('.game__winner')
const $winnerValue = $winner.querySelector('.value')
const $scorePlayer1 = document.querySelector('.js-value1')
const $scorePlayer2 = document.querySelector('.js-value2')
const $sounds = document.querySelector('.sounds')
const musics = $sounds.querySelectorAll('.js-audio')

//WINDOW SIZE
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

//VARIABLES
let gameOver = false
let scorePlayer1 = 0
let scorePlayer2 = 0
let boost = null
let boostInterval
let currentMusic

$canvas.width = windowWidth
$canvas.height = windowHeight

//REDRAW CANVAS ON RESIZE WINDOW
const resize = () => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = windowWidth
    $canvas.height = windowHeight

    drawWorld()
}

window.addEventListener("resize", resize)

const drawWorld = () => {
    context.beginPath()
    context.lineTo($canvas.width, 0)
    context.lineTo($canvas.width, $canvas.height)
    context.lineTo(0, $canvas.height)
    context.lineTo(0, 0)
    context.closePath()
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.shadowBlur = 10
    context.shadowColor = 'white'
    context.lineWidth = 2
    context.strokeStyle = 'white'
    context.stroke()
}

//PLAYER PROPERTIES
const player1 = {}

player1.name = 'Player 1'
player1.x = Math.random() * 100 + 50
player1.y = Math.random() * 100 + 50
player1.angleDirection = 0
player1.speed = 2.5
player1.color = document.getElementById("color1").value
player1.olderPosition = [
    [player1.x, player1.y]
]
const player2 = {}

player2.name = 'Player 2'
player2.x = Math.random() * 100 + (windowWidth - 150)
player2.y = Math.random() * 100 + (windowHeight - 150)
player2.angleDirection = Math.PI
player2.speed = 2.5
player2.color = document.getElementById("color2").value
player2.olderPosition = [
    [player2.x, player2.y]
]

//PLAYER FUNCTIONS
const drawPlayer = _player => {
    context.beginPath()
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.shadowBlur = 10
    context.shadowColor = _player.color
    context.lineWidth = 0.8
    context.strokeStyle = _player.color
    context.arc(_player.x, _player.y, 5, 0, Math.PI * 2)
    context.stroke()
}

const move = (_player) => {
    if (!gameOver) {
        window.requestAnimationFrame(() => {
            move(_player)
            if (boost != null) {
                detectBoostCollision(_player, boost)
            }
        })
        //update
        _player.x += Math.cos(_player.angleDirection) * _player.speed
        _player.y -= Math.sin(_player.angleDirection) * _player.speed

        _player.olderPosition.push([_player.x, _player.y])
        collisions()
        drawPlayer(_player)
    }
}

//DETECT KEYBOARD EVENTS
let map = {}
onkeydown = onkeyup = function (e) {
    map[e.keyCode] = e.type == "keydown"
    if (map[37] == true) {
        player2.angleDirection += 0.4
    }
    if (map[39] == true) {
        player2.angleDirection -= 0.4
    }
    if (map[69] == true) {
        player1.angleDirection -= 0.4
    }
    if (map[65] == true) {
        player1.angleDirection += 0.4
    }
}

//COLLISIONS
const detectPlayerCollision = (_player1, _player2) => {

    const headCircle = {
        x: windowWidth / 2 + _player1.x,
        y: windowHeight / 2 + _player1.y
    }

    for (let i = 0; i < _player2.olderPosition.length; i++) {
        const circle2 = {
            x: windowWidth / 2 + _player2.olderPosition[i][0],
            y: windowHeight / 2 + _player2.olderPosition[i][1]
        }
        const dx = headCircle.x - circle2.x
        const dy = headCircle.y - circle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 10 && !gameOver) {
            endGame(_player1)
        }
    }
}
const detectSelfCollision = (_player) => {

    if (_player.olderPosition.length > 10) {
        const headCircle = {
            x: windowWidth / 2 + _player.x,
            y: windowHeight / 2 + _player.y
        }
        for (let i = 0; i < _player.olderPosition.length - 10; i++) {
            const circle2 = {
                x: windowWidth / 2 + _player.olderPosition[i][0],
                y: windowHeight / 2 + _player.olderPosition[i][1]
            }
            const dx = headCircle.x - circle2.x
            const dy = headCircle.y - circle2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 10 && !gameOver) {
                endGame(_player)
            }
        }
    }
}
const detectBorderCollision = (_player) => {
    if (_player.x < 0) {
        _player.x = windowWidth
    }
    if (_player.y > windowHeight) {
        _player.y = 0
    }
    if (_player.y < 0) {
        _player.y = windowHeight
    }
    if (_player.x > windowWidth) {
        _player.x = 0
    }
}
const detectBoostCollision = (_player, _boost) => {
    const playerHead = {
        x: windowWidth / 2 + _player.x,
        y: windowHeight / 2 + _player.y
    }
    const boostCircle = {
        x: windowWidth / 2 + _boost.x,
        y: windowHeight / 2 + _boost.y
    }
    const dx = playerHead.x - boostCircle.x
    const dy = playerHead.y - boostCircle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 10) {
        //CLEAR BOOST
        context.save()
        context.arc(_boost.x, _boost.y, 5, 0, Math.PI * 2)
        context.clip()
        context.clearRect(0, 0, $canvas.width, $canvas.height)
        context.restore()
        boost = null
        const oldSpeed = _player.speed
        _player.speed *= 2
        setTimeout(() => {
            _player.speed = oldSpeed
        }, 1000)
    }
}
const collisions = () => {
    detectPlayerCollision(player1, player2)
    detectPlayerCollision(player2, player1)
    detectSelfCollision(player1)
    detectSelfCollision(player2)
    detectBorderCollision(player1)
    detectBorderCollision(player2)
}
const generateBoost = () => {
    if (boost != null) {
        context.save()
        context.arc(boost.x, boost.y, 5.5, 0, Math.PI * 2)
        context.clip()
        context.clearRect(0, 0, $canvas.width, $canvas.height)
        context.restore()
    }
    boost = new Boost(windowWidth, windowHeight, context)
    boost.draw()
}

//RUN GAME FUNCTION
const render = () => {

    gameOver = false
    $canvas.style.visibility = 'visible'
    $gameTitle.style.display = 'none'

    player1.color = document.getElementById("color1").value
    player2.color = document.getElementById("color2").value
    currentMusic = musics[Math.floor(Math.random() * musics.length)]
    currentMusic.play()
    resize()
    move(player1)
    move(player2)
    generateBoost()
    boostInterval = setInterval(generateBoost, 10000)
}
//ENDING GAME FUNCTIONS
const endGame = (_looser) => {
    gameOver = true
    clearInterval(boostInterval)
    const winner = _looser == player1 ? player2.name : player1.name
    iterateScore(winner)
    currentMusic.pause()
    setTimeout(() => {
        $canvas.style.visibility = 'hidden'
        $gameTitle.style.display = 'block'
        $winnerValue.textContent = winner
        $winner.style.display = 'block'
    }, 100)

}
const iterateScore = (_winner) => {
    if (_winner == player1.name) {
        scorePlayer1++
        $scorePlayer1.textContent = scorePlayer1
    } else {
        scorePlayer2++
        $scorePlayer2.textContent = scorePlayer2
    }
}
const resetWorld = () => {
    boost = null
    context.clearRect(0, 0, $canvas.width, $canvas.height)

    player1.x = Math.random() * 100 + 50
    player1.y = Math.random() * 100 + 50
    player1.angleDirection = 0
    player1.speed = 2.5
    player1.olderPosition = [
        [player1.x, player1.y]
    ]

    player2.x = Math.random() * 100 + (windowWidth - 150)
    player2.y = Math.random() * 100 + (windowHeight - 150)
    player2.angleDirection = Math.PI
    player2.speed = 2.5
    player2.olderPosition = [
        [player2.x, player2.y]
    ]

}

//PLAY BUTTON EVENT 
const $launcher = document.querySelector('.js-launcher')
$launcher.addEventListener('click', () => {
    resetWorld()
    render()
})