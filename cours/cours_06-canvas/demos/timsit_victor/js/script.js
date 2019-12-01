// Set canvas
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// Set sounds
const kickSound = document.querySelector('.kickSound')
const dingSound = document.querySelector('.dingSound')
const errorSound = document.querySelector('.errorSound')
const soundMenu = document.querySelector('.soundMenu')
const soundGame = document.querySelector('.soundGame')

// Set volume of sounds
dingSound.volume = 0.2
errorSound.volume = 0.6

// Set game settings
let score = 0
let generationSpeed = 1500

// Set booleans
let running = false
let homePageActive = true
let gameOverPageActive = false

// Set keys properties
const keyBindings =
    [
        { key: 'A', keyCode: '65' },
        { key: 'Z', keyCode: '90' },
        { key: 'E', keyCode: '69' },
        { key: 'R', keyCode: '82' },
        { key: 'T', keyCode: '84' },
        { key: 'Y', keyCode: '89' },
        { key: 'U', keyCode: '85' },
        { key: 'I', keyCode: '73' },
        { key: 'O', keyCode: '79' },
        { key: 'P', keyCode: '80' },

        { key: 'Q', keyCode: '81' },
        { key: 'S', keyCode: '83' },
        { key: 'D', keyCode: '68' },
        { key: 'F', keyCode: '70' },
        { key: 'G', keyCode: '71' },
        { key: 'H', keyCode: '72' },
        { key: 'J', keyCode: '74' },
        { key: 'K', keyCode: '75' },
        { key: 'L', keyCode: '76' },
        { key: 'M', keyCode: '77' },

        { key: 'W', keyCode: '87' },
        { key: 'X', keyCode: '88' },
        { key: 'C', keyCode: '67' },
        { key: 'V', keyCode: '86' },
        { key: 'B', keyCode: '66' },
        { key: 'N', keyCode: '78' }
    ]

// Set values of any key
const key =
    {
        marginX: 75,
        marginY: 75,
        w: 60,
        h: 60,
        radius: 10,
        font: "20px nunitoregular"
    }

// Set keyboard Origin
const keyboardOrigin =
    {
        x: (window.innerWidth - (10 * key.marginX)) / 2, // Horizontal center
        y: (window.innerHeight / 2) - (3 * key.marginY) / 2
    }

// Recover font
const font = new FontFace('nunitoregular', 'url(fonts/nunito-regular-webfont.woff2)');

// Set keys array to push any creating key in
const keys = []

// Home page object
class HomePage {
    constructor(textColor, textFont, welcomeText, launchingText) {
        this.textColor = textColor
        this.textFont = textFont
        this.welcomeText = welcomeText
        this.launchingText = launchingText
    }
    draw() {
        homePageActive = true

        font.load().then(() => {
            context.beginPath()
            context.fillStyle = this.textColor
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.font = this.textFont  // Font

            context.fillText(this.welcomeText, $canvas.width / 2, $canvas.height / 2)
        })

        setTimeout(() => {
            clearCanvas()


            setTimeout(() => {
                context.beginPath()
                context.fillStyle = this.textColor
                context.textAlign = 'center'
                context.textBaseline = 'middle'
                context.font = this.textFont  // Font

                context.fillText(this.launchingText, $canvas.width / 2, $canvas.height / 2)
            }, 200)

            const interval = setInterval(() => {
                if (homePageActive) {
                    clearCanvas()

                    setTimeout(() => {
                        context.beginPath()
                        context.fillStyle = this.textColor
                        context.textAlign = 'center'
                        context.textBaseline = 'middle'
                        context.font = this.textFont  // Font

                        context.fillText(this.launchingText, $canvas.width / 2, $canvas.height / 2)
                    }, 200)
                } else { clearInterval(interval) }
            }, 400)


            const launchGame = (event) => {
                if (event.keyCode == 13) {
                    homePageActive = false
                    window.removeEventListener('keydown', launchGame)

                    initGame()

                    soundMenu.pause()
                    soundGame.play()
                }
            }

            window.addEventListener('keydown', launchGame)

        }, 1100)
    }
}

// Key Object
class Key {
    constructor(x, y, w, h, radius, font, key, keyCode) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = '#e5e5e5'
        this.currentColor = this.defaultColor
        this.pushedColor = '#c4c4c4'
        this.radius = radius
        this.font = font
        this.key = key
        this.keyCode = keyCode
    }
    draw() {
        // Draw key
        context.lineJoin = 'round'
        context.lineWidth = this.radius // Use as border radius
        context.fillStyle = this.currentColor
        // // Active shadow to realistic look
        // context.shadowColor = '#111111'
        // context.shadowBlur = 20
        // context.shadowOffsetX = 2
        // context.shadowOffsetY = 2
        context.strokeStyle = this.currentColor
        context.strokeRect(this.x, this.y, this.w, this.h)
        context.fillRect(this.x, this.y, this.w, this.h)

        // Draw letter's key
        context.fillStyle = '#111'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = this.font  // Font
        context.fillText(this.key, this.x + this.w / 2, this.y + this.h / 2)
        
    }
}

// Create any key of keyboard
const createKeyboard = () => {
    for (const currentKey of keyBindings) {
        keys.push
            (
            new Key
                (
                keyboardOrigin.x,
                keyboardOrigin.y,
                key.w,
                key.h,
                key.radius,
                key.font,
                currentKey.key,
                currentKey.keyCode
                )
            )
    }
}

// Timer and score counter object
class Timer {
    constructor(x, y, w, initW, h) {
        this.x = x
        this.y = y
        this.w = w
        this.initW = initW
        this.staticW = w
        this.h = h
        this.scoreY = y
        this.color = '#111'
        this.staticColor = '#7d75cd'
        this.ratio = this.w / 90
    }
    update() {
        setTimeout(() => {
            this.w -= this.ratio
        }, 750)

        if (this.w <= 0) {
            this.w = 0
        }
    }
    draw() {
        context.beginPath()
        context.fillStyle = this.staticColor
        context.fillRect(this.x, this.y, this.staticW, this.h)

        context.beginPath()
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.w, this.h)

        context.fillStyle = '#111'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = "2Opx nunitoregular"  // Font

        context.fillText(score, $canvas.width - 60, this.scoreY)
    }
    init() {
        this.w = this.initW
    }
}

// Game over page object
class GameOverPage {
    constructor(textColor, gameOverTextFont, gameOverText, scoreTextFont, scoreText, score, retryTextFont, retryText) {
        this.textColor = textColor
        this.gameOverTextFont = gameOverTextFont
        this.gameOverText = gameOverText
        this.scoreTextFont = scoreTextFont
        this.scoreText = scoreText
        this.score = score
        this.retryTextFont = retryTextFont
        this.retryText = retryText
    }
    draw() {

        clearCanvas()

        gameOverPageActive = true

        setInterval(() => {

            clearCanvas()

            // Game over
            context.beginPath()
            context.fillStyle = this.textColor
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.font = this.gameOverTextFont  // Font

            context.fillText(this.gameOverText, $canvas.width / 2, $canvas.height / 2 - 40)

            // Score
            context.beginPath()
            context.fillStyle = this.textColor
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.font = this.scoreTextFont  // Font

            context.fillText(this.scoreText + score, $canvas.width / 2, $canvas.height / 2)

            // Retry
            context.beginPath()
            context.fillStyle = this.textColor
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.font = this.retryTextFont  // Fo
            context.fillText(this.retryText, $canvas.width / 2, $canvas.height / 2 + 40)

        }, 100)

        const launchGame = (event) => {
            if (event.keyCode == 13) {
                gameOverPageActive = false
                window.removeEventListener('keydown', launchGame)

                initGame()

                soundMenu.pause()

                soundGame.currentTime = 0
                soundGame.play()
            }
        }

        window.addEventListener('keydown', launchGame)
    }
}

// Draw any key of keyboard
const drawKeyboard = () => {

    // Set boolean to line break
    let lineBreak = false
    // OffsetLeft off current line
    let lineOffset = 50

    // Set counter
    let keyCount = 0

    $canvas.width <= 768 ? lineOffset = 0 : lineOffset = 50

    for (const currentKey of keys) {
        if (keyCount < 10) // Top line of keys
        {
            currentKey.x = keyboardOrigin.x + lineOffset - key.w + key.radius
            currentKey.y = keyboardOrigin.y
        }

        else if (keyCount < 20) // Middle line of keys
        {
            if (lineBreak == false) {
                $canvas.width <= 768 ? lineOffset = 0 : lineOffset = 75 // OffsetLeft off current line
                lineBreak = true
            }

            currentKey.x = keyboardOrigin.x + lineOffset - key.w + key.radius
            currentKey.y = keyboardOrigin.y + key.marginY
        }

        else if (keyCount > 19 && keyCount < keys.length) // Bottom line of keys
        {
            if (lineBreak == true) {
                $canvas.width <= 768 ? lineOffset = 0 : lineOffset = 112.5
                lineBreak = false
            }
            currentKey.x = keyboardOrigin.x + lineOffset - key.w + key.radius
            currentKey.y = keyboardOrigin.y + key.marginY * 2
        }
        currentKey.draw()

        lineOffset += key.marginX
        keyCount++
    }

    // Reset values after any drawing
    lineOffset = 50 // OffsetLeft off current line
    keyCount = 0
}

const runningGame = () => {
    if (!homePageActive && running || !gameOverPageActive && running) {
        let randomAcess = ''
        let randomKey = ''
        let pushed = false

        const isGoodKey = (event) => {
            if (event.keyCode != 13) {

                pushed = true

                if (event.keyCode == randomKey.keyCode) {

                    dingSound.currentTime = 0
                    dingSound.play()
                }
                else {

                    window.removeEventListener('keydown', isGoodKey)
                    running = false

                    errorSound.play()

                    soundGame.pause()

                    soundMenu.currentTime = 0
                    soundMenu.play()
                }
            }
        }

        window.addEventListener('keydown', isGoodKey)

        let interval = setInterval(() => {

            randomAcess = ''
            randomKey = ''

            if (running) {

                randomAcess = Math.floor(Math.random() * keys.length)
                randomKey = keys[randomAcess]

                kickSound.play()

                randomKey.currentColor = 'red'

                setTimeout(() => {

                    timer.init()

                    if (!pushed) {

                        window.removeEventListener('keydown', isGoodKey)
                        running = false

                        soundGame.pause()

                        soundMenu.currentTime = 0
                        soundMenu.play()
                    }

                    if (running) {

                        score++
                    }

                    pushed = false

                    randomKey.currentColor = keys[0].defaultColor

                }, generationSpeed / 2)
            }
            else { clearInterval(interval) }
        }, generationSpeed)
    }
}

// Resize
const resize = () => {
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight

    keyboardOrigin.x = (window.innerWidth - (10 * key.marginX)) / 2 // Horizontal center

    $canvas.width <= 768 ? homePage.textFont = '20px nunitoregular' : homePage.textFont = '30px nunitoregular'

    // Little resolution device
    if ($canvas.width <= 768) {
        key.marginX = $canvas.width / 11
        key.marginY = $canvas.width / 11
        key.w = $canvas.width / 11
        key.h = $canvas.width / 11
        key.radius = 1
        key.font = '10px nunitoregular'

        timer.w = 10 * key.marginX
        timer.initW = 10 * key.marginX
        timer.staticW = 10 * key.marginX
        timer.x = (window.innerWidth - (10 * key.marginX)) / 2
        timer.ratio = timer.w / 90
        timer.scoreY = 40

        keyboardOrigin.x = (window.innerWidth - (8 * key.marginX)) / 2
    }
    // High resolution device
    else if ($canvas.width > 768) {
        key.marginX = 75
        key.marginY = 75
        key.w = 60
        key.h = 60
        key.radius = 10
        key.font = '20px nunitoregular'

        timer.w = 10 * key.marginX
        timer.initW = 10 * key.marginX
        timer.staticW = 10 * key.marginX
        timer.x = keyboardOrigin.x
        timer.scoreY = timer.y

        keyboardOrigin.x = (window.innerWidth - (10 * key.marginX)) / 2
    }
}

// Clear the canvas
const clearCanvas = () => {
    context.clearRect(0, 0, $canvas.width, $canvas.height)
}

// Called clearCanvas() and drawKeyboard at any frame: +/- 60 fps 
const loop = () => {

    clearCanvas()

    if (running) {
        updateGame()
        window.requestAnimationFrame(loop)
    }
    else if (!running && !homePageActive) {
        gameOver.draw()
    }
    else {
        homePage.draw()
    }
}

// Init the game
const initGame = () => {
    score = 0
    running = true
    timer.init()

    runningGame()

    loop()
}

// Update game
const updateGame = () => {
    timer.update()
    timer.draw()
    drawKeyboard()
}

// Create home page
const homePage = new HomePage('#111111', '30px nunitoregular', 'Welcome to Keyboard Trainer', 'Press enter to process')

// Create game over page
const gameOver = new GameOverPage('#111111', '40px nunitoregular', 'GAME OVER', '20px nunitoregular', 'Score: ', score, '20px nunitoregular', 'Press enter to retry')

// Create timer
const timer = new Timer(keyboardOrigin.x, 80, 10 * key.marginX, 10 * key.marginX, 2)

// Called resize function
window.addEventListener('resize', resize)
resize()

// Create keyboard
createKeyboard()

// Loop
loop()

// Play sound of menu at the beginin
soundMenu.play()

// Change color of keys at any keydown
for (const currentKey of keys) {
    window.addEventListener('keydown', (event) => {
        // condition because for ; and : keys have the same keyCode
        if (event.key == ';' || event.key == ':') {
            if (event.key == currentKey.key) {
                currentKey.currentColor = currentKey.pushedColor
            }
        }
        else if (event.keyCode == currentKey.keyCode) {
            currentKey.currentColor = currentKey.pushedColor
        }

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == currentKey.keyCode || event.key == currentKey.key) {
                currentKey.currentColor = currentKey.defaultColor
            }
        })
    })
}