/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* INITILIZATION                                                              |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Get body
const $body = document.body

// Get canvases
const $canvasStars = $body.querySelector('canvas.stars')
const contextStars = $canvasStars.getContext('2d')
const $canvasBars  = $body.querySelector('canvas.bars')
const contextBars  = $canvasBars.getContext('2d')
const $canvasPiano = $body.querySelector('canvas.piano')
const contextPiano = $canvasPiano.getContext('2d')

// Get title
const $h1          = $body.querySelector('h1')

// Get score
const $score  = $body.querySelector('.score')
const $points = $score.querySelector('.points')

// Get home
const $home        = $body.querySelector('.home')
const $container_1 = $home.querySelector('.container-1')
const $button      = $container_1.querySelector('.button')
const $container_2 = $home.querySelector('.container-2')
const $logo        = $container_2.querySelector('.logo')
const $title       = $container_2.querySelector('.title')

// Get menu
const $menu           = $body.querySelector('.menu')
const $container      = $menu.querySelector('.container')
const $cross          = $menu.querySelector('.cross')
const $hamburger      = $menu.querySelector('.hamburger')
const $autoplayOption = $menu.querySelector('.autoplay')
const $vocalOption    = $menu.querySelector('.vocal')
const $replayOption   = $menu.querySelector('.replay')

// Get end
const $end    = $body.querySelector('.end')
const $repeat = $end.querySelector('.repeat')

// Get audios
const $instrumental = $body.querySelector('audio.instrumental')
const $vocals       = $body.querySelector('audio.vocals')

// Define delays
const delay_0 = 1250  // $container_1 disappearance
const delay_1 = 6250  // $container_2 disappearance
const delay_2 = 8750  // $h1 appearance
const delay_3 = 11250 // $canvas appearance
const delay_4 = 17500 // $h1 disappearance
const delay_5 = 20000 // $score appearance
const delay_6 = 22500 // $score appearance

// Define menu parameters
const clickedMenu = { x : 0, y : 0 } // help to check if the menu is clicked or slided
let isSliding     = false
let isLaunched    = false

// Define positions
const mouse          = { x : 0, y : 0 }
const touch          = { x : 0, y : 0 }
const distanceCenter = { x : 0, y : 0 }

// Define stars parameters
const stars       = new Array()
const numberStars = 100
let isSpeeding    = false

// Define piano parameters
const keyMax     = 10
const pianoRatio = { w: 1, h: 3 }
const whiteRatio = { w: keyMax, h: 1 }
const blackRatio = { w: 2.5, h: 1.875 }
let whiteWidth   = $canvasPiano.width / whiteRatio.w
let whiteHeight  = $canvasPiano.height / whiteRatio.h
let whiteKeys    = new Array()
let blackWidth   = whiteWidth / blackRatio.w
let blackHeight  = whiteHeight / blackRatio.h
let blackKeys    = new Array()
let isFocused    = true
let isVocalized  = true
let isPaused     = false
let isMouseDown  = false
let isTouched    = false
let savedKey     = {}
let savedSound

// Define keycodes
const keyWhiteCodes = new Array(81, 83, 68, 70, 71, 72, 74, 75, 76, 77)
const keyBlackCodes = new Array(90, 69, undefined, 84, 89, 85, undefined, 79, 80)

// Initialize canvases
const setSizes = () =>
{
    $canvasPiano.width  = window.innerWidth / pianoRatio.w
    $canvasPiano.height = window.innerHeight / pianoRatio.h
    $canvasStars.width  = window.innerWidth
    $canvasStars.height = window.innerHeight
    $canvasBars.width   = window.innerWidth
    $canvasBars.height  = window.innerHeight - $canvasPiano.height
}
setSizes()

// Define bars parameters
let currentBar
let isAutoplay        = false
let score             = 0
const malusFail       = -4
const malusEarly      = -2
const bonusAlmost     = 1
const bonusSuccess    = 2
const colorParameters = { h : 0, s : 0, l : 100 }
const veryLongSize    = $canvasPiano.height * 2
const longSize        = $canvasPiano.height
const mediumSize      = $canvasPiano.height / 2
const shortSize       = $canvasPiano.height / 4
const veryShortSize   = $canvasPiano.height / 8
const duration        = 2.5
const fraction        = $canvasBars.height / 60 / duration
const bars            = new Array()
const playedBars      = new Array()

// Init option
const initOptions = () =>
{
    if (!isAutoplay)
    {
        $autoplayOption.classList.add('disabled')
    }
    if (!isVocalized)
    {
        $vocalOption.classList.add('disabled')
    }
}
initOptions()

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* KEYS                                                                       |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Create keys
const createKeys = () =>
{
    // Create white keys
    for (let rank = -1 ; rank <= keyMax ; rank++)
    {
        const whiteKey = {}
        whiteKey.x = rank * whiteWidth
        whiteKey.y = 0
        whiteKey.w = whiteWidth
        whiteKey.h = whiteHeight
        whiteKey.b = 7.5
        whiteKey.o = 0
        whiteKey.s = 5
        whiteKeys.push(whiteKey)
    }

    // Create black keys
    for (let rank = 1 ; rank < keyMax ; rank++)
    {
        const blackKey = {}
        if (rank % 7 && rank % 7 != 3)
        {
            blackKey.x = rank * whiteWidth - blackWidth / 2
            blackKey.y = 0
            blackKey.w = blackWidth
            blackKey.h = blackHeight
            blackKey.b = 15
            blackKey.o = -2.5
            blackKey.s = 2/5
        }
        blackKeys.push(blackKey)
    }
}
createKeys()

// Draw key
const drawKey = (key) =>
{
    contextPiano.beginPath()
    contextPiano.rect(key.x, key.y, key.w, key.h)
    contextPiano.shadowColor   = '#000000'
    contextPiano.shadowBlur    = key.b
    contextPiano.shadowOffsetX = key.o
    contextPiano.fill()
    contextPiano.stroke()
}

// Draw shadow when a key is pressed
const drawShadow = (key) =>
{
    contextPiano.beginPath()
    contextPiano.rect(key.x, key.y, key.w, key.h)
    contextPiano.shadowBlur = key.b * key.s
    contextPiano.fill()
}

// Set initial keys
const setKeys = () =>
{
    // Reset saved sound
    savedSound = undefined

    // Stylize white keys
    contextPiano.strokeStyle = '#000000'
    contextPiano.fillStyle = '#FFFFFF'
    for (const whiteKey of whiteKeys)
    {
        // Draw white key
        drawKey(whiteKey)
    }

    // Stylize black keys
    contextPiano.fillStyle = '#000000'
    for (const blackKey of blackKeys)
    {
        // Draw white key
        drawKey(blackKey)
    }
}
setKeys()

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* SOUNDS                                                                     |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Create sound
const createSound = () =>
{
    let totalKeys = whiteKeys.length - 2 + blackKeys.length

    // Create sound for white keys
    for (let index = 0 ; index < whiteKeys.length - 2 ; index++)
    {
        const $sound = document.createElement('audio')
        $sound.classList.add('sound')
        $sound.classList.add(`white-${index + 1}`)
        $sound.src = `assets/audios/w${index + 1}.wav`
        $body.appendChild($sound)
    }

    // Create sound for black keys
    for (let index = 0 ; index <= totalKeys - (whiteKeys.length - 2) ; index++)
    {
        if (index % 7 && index % 7 != 3)
        {
            const $sound = document.createElement('audio')
            $sound.classList.add('sound')
            $sound.classList.add(`black-${index}`)
            $sound.src = `assets/audios/b${index}.wav`
            $body.appendChild($sound)
        }
    }
}
createSound()
const $sounds = Array.from($body.querySelectorAll('.sound'))

// Play sound
const playSound = (soundName, autoplay , bar) =>
{
    // Prevent same sound played continuously
    if (savedSound != soundName)
    {
        const $sound = $sounds.find( element => element.classList.contains(soundName))

        // Prevent keypress and touchmove playing continuously a same sound while these events are not canceled
        if (!autoplay)
        {
            $sound.currentTime = 0
            savedSound = soundName
        }
        else
        {
            // Allow bars of a same key playing sound multiple times in a row and in a short time
            const newBar = currentBar
            currentBar = bar
            if (newBar != currentBar)
            {
                $sound.currentTime = 0
            }
        }
        $sound.play()
    }
}

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* PRESS                                                                      |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Press key
const pressKey = (code, color, isBar) =>
{
    if (code)
    {
        // Detect white key pressed
        if (color == 'white')
        {
            const indexCode = keyWhiteCodes.indexOf(code) + 1
        
            if (indexCode > 0 && indexCode <= keyMax)
            {
                contextPiano.fillStyle = '#FFFFFF'
        
                // Draw the key pushed
                drawKey(whiteKeys[indexCode])
        
                // Draw shadows
                drawShadow(whiteKeys[indexCode - 1])
                drawShadow(whiteKeys[indexCode + 1])
        
                // Reset other keys
                for (const whiteKey of whiteKeys)
                {
                    // Draw white keys exept the one pushed
                    if (whiteKey != whiteKeys[indexCode])
                    {
                        drawKey(whiteKey)
                    }
                }
                contextPiano.fillStyle = '#000000'
                for (const blackKey of blackKeys)
                {
                    // Draw every black key
                    drawKey(blackKey)
                }
            }

            // Prevent a maintained key to replay when a bar reaches the piano
            if (!isBar)
            {
                playSound(`${color}-${indexCode}`, false, undefined)

                // Update last key used
                savedKey.c = color
                savedKey.i = indexCode - 1
            }

        }

        // Detect black key pressed
        if (color == 'black')
        {
            const indexCode = keyBlackCodes.indexOf(code) + 1
            contextPiano.fillStyle = '#FFFFFF'
            for (const whiteKey of whiteKeys)
            {
                // Draw every white key
                drawKey(whiteKey)
            }
            contextPiano.fillStyle = '#000000'
            for (const blackKey of blackKeys)
            {
                // Draw black keys exept the one pushed
                if (blackKey != blackKeys[indexCode - 1])
                {
                    drawKey(blackKey)
                }
            }
            drawShadow(blackKeys[indexCode - 1])

            // Prevent a maintained key to replay when a bar reaches the piano
            if (!isBar)
            {
                playSound(`${color}-${indexCode}`, false, undefined)

                // Update last key used
                savedKey.c = color
                savedKey.i = indexCode
            }
        }
    }
}

// Detect where there is a contact with the piano
const detectContact = (eventX, eventY, isBar) =>
{
    let isFound = false
    // Check white keys
    for (let rank = 1 ; rank < keyMax ; rank++)
    {
        let isBlack = false
        if
        (
            rank % 7 && rank % 7 != 3 &&
            eventX >= whiteWidth * rank - blackWidth / 2 &&
            eventX < whiteWidth * rank + blackWidth / 2 &&
            eventY <= $canvasPiano.offsetTop + blackHeight
        )
        {
            pressKey(keyBlackCodes[rank - 1], 'black', isBar)
            isBlack = !isBlack
        }
        if (isBlack)
        {
            isFound = !isFound
            break
        }
    }

    // Check black keys
    if (!isFound)
    {
        for (let rank = 0 ; rank < keyMax ; rank++)
        {
            if (eventX >= whiteWidth * rank && eventX < whiteWidth * (rank + 1))
            {
                pressKey(keyWhiteCodes[rank], 'white', isBar)
                break
            }
        }
    }
}

// Resize piano
const resizePiano = () =>
{
    // Reset piano parameters
    setSizes()
    whiteWidth  = $canvasPiano.width / whiteRatio.w
    whiteHeight = $canvasPiano.height / whiteRatio.h
    blackWidth  = whiteWidth / blackRatio.w
    blackHeight = whiteHeight / blackRatio.h
    contextPiano.clearRect(0, 0, $canvasPiano.width, $canvasPiano.height)
    whiteKeys = []
    blackKeys = []
    createKeys()
    setKeys()

    // Edit widths of bars
    for (const bar of bars)
    {
        bar.w = blackWidth
    }
}
resizePiano()
window.addEventListener('resize', resizePiano)

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* BARS                                                                       |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Create every bar
const createBars = () =>
{
    // V1L1
    bars[0] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 0
    }
    bars[1] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 0.375
    }
    bars[2] =
    {
        k : 'black',
        r : 5,
        h : longSize,
        d : 0.75
    }
    bars[3] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 2.875
    }
    bars[4] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 3.25
    }
    bars[5] =
    {
        k : 'white',
        r : 7,
        h : longSize,
        d : 3.625
    }
    bars[6] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 5.75
    }
    bars[7] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 6.125
    }
    bars[8] =
    {
        k : 'black',
        r : 2,
        h : longSize,
        d : 6.5
    }
    // V1L2
    bars[9] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 11.5
    }
    bars[10] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 11.875
    }
    bars[11] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 12.25
    }
    bars[12] =
    {
        k : 'black',
        r : 2,
        h : mediumSize,
        d : 12.875
    }
    bars[13] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 14.375
    }
    bars[14] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 14.75
    }
    bars[15] =
    {
        k : 'white',
        r : 7,
        h : longSize,
        d : 15.125
    }
    bars[16] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 17.25
    }
    bars[17] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 17.625
    }
    bars[18] =
    {
        k : 'black',
        r : 2,
        h : longSize,
        d : 18
    }
    // V1L3
    bars[19] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 23
    }
    bars[20] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 23.375
    }
    bars[21] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 23.75
    }
    bars[22] =
    {
        k : 'white',
        r : 7,
        h : mediumSize,
        d : 24.375
    }
    bars[23] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 25.75
    }
    bars[24] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 26.125
    }
    bars[25] =
    {
        k : 'white',
        r : 7,
        h : longSize + shortSize,
        d : 26.5
    }
    bars[26] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 28.625
    }
    bars[27] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 29
    }
    bars[28] =
    {
        k : 'white',
        r : 7,
        h : veryLongSize,
        d : 29.375
    }
    // V1L4
    bars[29] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 34.375
    }
    bars[30] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 34.75
    }
    bars[31] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 35.125
    }
    bars[32] =
    {
        k : 'white',
        r : 3,
        h : veryShortSize,
        d : 35.875
    }
    bars[33] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 36.25
    }
    bars[34] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 37.125
    }
    bars[35] =
    {
        k : 'white',
        r : 7,
        h : longSize,
        d : 38
    }
    bars[36] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 40
    }
    bars[37] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 40.375
    }
    bars[38] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 40.75
    }
    bars[39] =
    {
        k : 'black',
        r : 6,
        h : mediumSize,
        d : 41.125
    }
    // B1
    bars[40] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 43
    }
    bars[41] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 43.375
    }
    bars[42] =
    {
        k : 'black',
        r : 6,
        h : mediumSize,
        d : 43.75
    }
    // C1L1
    bars[43] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 45
    }
    bars[44] =
    {
        k : 'black',
        r : 8,
        h : shortSize,
        d : 45.375
    }
    bars[45] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 45.75
    }
    bars[46] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 46.125
    }
    bars[47] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 46.5
    }
    bars[48] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 46.875
    }
    bars[49] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 47.25
    }
    bars[50] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 47.625
    }
    bars[51] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 48
    }
    // C1L2
    bars[52] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 48.625
    }
    bars[53] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 49
    }
    bars[54] =
    {
        k : 'black',
        r : 9,
        h : mediumSize + shortSize,
        d : 49.375
    }
    bars[55] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 50.375
    }
    bars[56] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 50.75
    }
    bars[57] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 51.125
    }
    bars[58] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 51.5
    }
    bars[59] =
    {
        k : 'white',
        r : 7,
        h : mediumSize + shortSize,
        d : 52.125
    }
    // C1L3
    bars[60] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 53.625
    }
    bars[61] =
    {
        k : 'white',
        r : 7,
        h : veryShortSize,
        d : 54
    }
    bars[62] =
    {
        k : 'black',
        r : 6,
        h : mediumSize,
        d : 54.25
    }
    bars[63] =
    {
        k : 'white',
        r : 7,
        h : veryShortSize,
        d : 55
    }
    bars[64] =
    {
        k : 'black',
        r : 6,
        h : mediumSize,
        d : 55.25
    }
    // C1L4-C1L7
    const delayChorus           = 11.375
    const firstChorus           = 43
    const middleChorus          = 65
    const gapMiddleChorus       = middleChorus - firstChorus
    const beginningBridgeChorus = 9
    const beforeEndBridgeChorus = middleChorus + gapMiddleChorus + beginningBridgeChorus
    for (let index = middleChorus ; index < beforeEndBridgeChorus ; index++)
    {
        const bar = {}
        bar.k = bars[index - gapMiddleChorus].k
        bar.r = bars[index - gapMiddleChorus].r
        bar.h = bars[index - gapMiddleChorus].h
        bar.d = bars[index - gapMiddleChorus].d + delayChorus
        bars.push(bar)
    }
    // C1L8
    bars[beforeEndBridgeChorus] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : bars[beforeEndBridgeChorus - 1].d + 1
    }
    bars[beforeEndBridgeChorus + 1] =
    {
        k : 'black',
        r : 6,
        h : longSize + mediumSize,
        d : bars[beforeEndBridgeChorus - 1].d + 1.5
    }
    bars[beforeEndBridgeChorus + 2] =
    {
        k : 'black',
        r : 5,
        h : longSize,
        d : bars[beforeEndBridgeChorus - 1].d + 3.625
    }
    // V2L2
    bars[99] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 79.375
    }
    bars[100] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 79.75
    }
    bars[101] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 80.125
    }
    bars[102] =
    {
        k : 'white',
        r : 3,
        h : mediumSize,
        d : 80.75
    }
    bars[103] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 82.25
    }
    bars[104] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 82.625
    }
    bars[105] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 83
    }
    bars[106] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 84.25
    }
    bars[107] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 85
    }
    bars[108] =
    {
        k : 'black',
        r : 2,
        h : mediumSize,
        d : 85.75
    }
    // V2L2
    bars[109] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 90.75
    }
    bars[110] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 91.125
    }
    bars[111] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 91.5
    }
    bars[112] =
    {
        k : 'white',
        r : 3,
        h : mediumSize,
        d : 92.125
    }
    bars[113] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 93.625
    }
    bars[114] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 94
    }
    bars[115] =
    {
        k : 'white',
        r : 7,
        h : longSize + shortSize,
        d : 94.375
    }
    bars[116] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 96.5
    }
    bars[117] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 96.875
    }
    bars[118] =
    {
        k : 'white',
        r : 7,
        h : longSize + mediumSize + shortSize,
        d : 97.25
    }
    bars[119] =
    {
        k : 'white',
        r : 7,
        h : longSize + mediumSize + veryShortSize,
        d : 100
    }
    // V2L3
    bars[120] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 102.125
    }
    bars[121] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 102.5
    }
    bars[122] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 102.875
    }
    bars[123] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 103.5
    }
    bars[124] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 105
    }
    bars[125] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 105.375
    }
    bars[126] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 105.75
    }
    bars[127] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 106.375
    }
    bars[128] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : 107.875
    }
    bars[129] =
    {
        k : 'white',
        r : 3,
        h : shortSize,
        d : 108.25
    }
    bars[130] =
    {
        k : 'white',
        r : 7,
        h : veryLongSize + mediumSize + shortSize + veryShortSize,
        d : 108.625
    }
    // V2L4
    bars[131] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 112.875
    }
    bars[132] =
    {
        k : 'black',
        r : 8,
        h : shortSize,
        d : 113.25
    }
    bars[133] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 113.625
    }
    bars[134] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 114
    }
    bars[135] =
    {
        k : 'black',
        r : 6,
        h : shortSize + veryShortSize,
        d : 114.375
    }
    bars[136] =
    {
        k : 'black',
        r : 5,
        h : mediumSize,
        d : 115
    }
    bars[137] =
    {
        k : 'white',
        r : 7,
        h : shortSize,
        d : 116.5
    }
    bars[138] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 116.875
    }
    bars[139] =
    {
        k : 'black',
        r : 6,
        h : shortSize + veryShortSize,
        d : 117.25
    }
    bars[140] =
    {
        k : 'black',
        r : 5,
        h : mediumSize + shortSize,
        d : 117.875
    }
    bars[141] =
    {
        k : 'black',
        r : 5,
        h : shortSize,
        d : 119.375
    }
    bars[142] =
    {
        k : 'black',
        r : 6,
        h : shortSize,
        d : 119.75
    }
    bars[143] =
    {
        k : 'black',
        r : 6,
        h : longSize + mediumSize,
        d : 120.125
    }
    // B2 - C2
    const delayBridge      = 79.25
    const barsBridge       = 3
    const gapBridge        = 104
    const barsChorus       = 56
    const beginningBridge  = 144
    const beforeSongBridge = beginningBridge + barsBridge + barsChorus
    for (let index = beginningBridge ; index <  beforeSongBridge ; index++)
    {
        const bar = {}
        bar.k = bars[index - gapBridge].k
        bar.r = bars[index - gapBridge].r
        bar.h = bars[index - gapBridge].h
        bar.d = bars[index - gapBridge].d + delayBridge
        bars.push(bar)
    }
    bars[beforeSongBridge - 1].h = veryLongSize + mediumSize + shortSize
    // C3
    const gapChorus = beforeSongBridge - firstChorus
    for (let index = beforeSongBridge ; index < beforeSongBridge + barsChorus ; index++)
    {
        const bar = {}
        bar.k = bars[index - gapChorus].k
        bar.r = bars[index - gapChorus].r
        bar.h = bars[index - gapChorus].h
        bar.d = bars[index - gapChorus].d + 135.75
        bars.push(bar)
    }
    // C3B2
    bars[beforeSongBridge + barsChorus] =
    {
        k : 'black',
        r : 2,
        h : shortSize,
        d : bars[beforeEndBridgeChorus - 1].d + 1 + 135.75 + 7.875
    }
    bars[beforeSongBridge + barsChorus + 1] =
    {
        k : 'black',
        r : 6,
        h : veryLongSize,
        d : bars[beforeEndBridgeChorus - 1].d + 1.5 + 135.75 + 7.875
    }
    bars[beforeSongBridge + barsChorus + 2] =
    {
        k : 'black',
        r : 5,
        h : veryLongSize,
        d : bars[beforeEndBridgeChorus - 1].d + 3.625 + 135.75 + 8.625
    }
}
createBars()

// Add delay of first singing note
const addDelay = () =>
{
    const beginningDelay = 27.75
    for (const bar of bars)
    {
        bar.d += beginningDelay
    }
}
addDelay()

// Add properties to each bar
const completeBars = () =>
{
    for (const bar of bars)
    {
        bar.w = bar.k == 'white' ? whiteWidth : blackWidth
        bar.x = whiteWidth * bar.r - (bar.k == 'white' ? 0 : blackWidth / 2)
        bar.y = -bar.h
        bar.c = `hsl(${colorParameters.h}, ${colorParameters.s}%, ${colorParameters.l}%)`
        bar.d -= duration
        bar.p = -bar.d * fraction * 60
    }
}
completeBars()

// Delete all played bars
const popBars = () =>
{
    while (playedBars.length != 0)
    {
        playedBars.pop()
    }

    // Reset positions
    for (const bar of bars)
    {
        bar.p = -bar.d * fraction * 60
    }
}

// Init bars
const initBars = () =>
{
    // Reinit bars
    popBars()

    // Reset played bars
    for (const bar of bars)
    {
        playedBars.push(bar)
    }

    // Allow to pop the array to prevent from shifting every bar when one is deleted
    playedBars.reverse()

    // Reset score
    score = 0

    // Init volume
    $vocals.volume = 0.5
    $instrumental.volume = 0.5

    // Init current time
    $vocals.currentTime = 0
    $instrumental.currentTime = 0

    // Play audio
    $instrumental.play()
    if (isVocalized)
    {
        $vocals.play()
    }
}

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* PLAY                                                                       |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Play piano
const playPiano = () =>
{
    isPaused = false
    $instrumental.play()
    if (isVocalized)
    {
        $vocals.currentTime = $instrumental.currentTime
        $vocals.play()
    }
}

// Pause piano
const pausePiano = () =>
{
    isPaused = true
    $instrumental.pause()
    $vocals.pause()
}

// Toggle vocals
const toggleVocal = () =>
{
    isVocalized = !isVocalized
    if ($vocals.paused && !isPaused)
    {
        $vocals.currentTime = $instrumental.currentTime
        $vocals.play()
    }
    else
    {
        $vocals.pause()
    }
}

// Calculate average of an array of numbers
const calculateAverage = (array) =>
{
    const arrayLength = array.length
    let total = 0
    for (const element of array)
    {
        total += element
    }
    return total / arrayLength
}

// Play sound if autoplay option is selected
const autoplayKey = (bar) =>
{
    // Check if the bar reaches the piano
    if (bar.y + bar.p + bar.h >= $canvasBars.height && bar.y + bar.p + bar.h < $canvasBars.height + fraction)
    {
        const middleX = calculateAverage([bar.x, bar.x + bar.w])
        const middleY = calculateAverage([0, bar.h])
        detectContact(middleX, middleY, true)
        playSound(`${bar.k}-${bar.r + (bar.k == 'white' ? 1 : 0)}`, true, bar)
    }
}

// Scroll each bar
const scrollBars = () =>
{
    for (const bar of playedBars)
    {

        if (bar.p >= 0)
        {
            // Set a shining blur when the bar reaches the piano
            if (bar.p >= $canvasBars.height)
            {
                contextBars.shadowColor = bar.c
                contextBars.shadowBlur  = bar.w / 2
            }
            
            // Prevent other bars to shine
            else
            {
                contextBars.shadowColor = '#000000'
            }
    
            // Draw bar
            contextBars.fillStyle = bar.c
            contextBars.fillRect(bar.x, bar.y + bar.p, bar.w, bar.h)

            // Delete bar
            if (bar.y + bar.p > $canvasBars.height)
            {
                playedBars.pop()
                setKeys()
            }
    
            // Autoplay sounds if the option is selected
            if (isAutoplay)
            {
                autoplayKey(bar)
            }
        }
        
        // Update position
        bar.p += fraction
    }
}

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* STARS                                                                      |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Create stars
const createStars = (number) =>
{
    for (var i = 0 ; i < number ; i++)
    {
        const star =
        {
            x : Math.random() * $canvasStars.width,
            y : Math.random() * $canvasStars.height,
            z : Math.random() * 2.5
        }
        stars.push(star)
    }
}
createStars(numberStars)

// Update star
const updateStar = (star) =>
{
    star.x += distanceCenter.x * star.z / (!isSpeeding ? 1000 : 100)
    star.y += distanceCenter.y * star.z / (!isSpeeding ? 1000 : 100)
    star.x = ((star.x % $canvasStars.width) + $canvasStars.width) % $canvasStars.width
    star.y = ((star.y % $canvasStars.height) + $canvasStars.height) % $canvasStars.height
}

// Draw stars
const drawStars = () =>
{
    contextStars.fillStyle = `rgba(0, 0, 0, ${!isSpeeding ? 0.5 : 0.25})`
    contextStars.fillRect(0, 0, $canvasStars.width, $canvasStars.height)
    for (const star of stars)
    {
        contextStars.beginPath()
        contextStars.arc(star.x, star.y, star.z / 2.5, 0, Math.PI * 2)
        contextStars.fillStyle = `hsl(${colorParameters.h}, ${colorParameters.s}%, ${colorParameters.l}%)`
        contextStars.fill()
        updateStar(star)
    }
}

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* ANIMATION                                                                  |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Clear bars
const clearBars = () =>
{
    contextBars.clearRect(0, 0, $canvasBars.width, $canvasBars.height)
}

// Update score
const updateScore = () =>
{
    if (playedBars.length > 0)
    {
        // Substract points if the key pressed is wrong or if it is pressed way too early
        if
        (
            playedBars[playedBars.length - 1].k != savedKey.c ||
            playedBars[playedBars.length - 1].r != savedKey.i ||
            playedBars[playedBars.length - 1].p < $canvasBars.height * 0.75
        )
        {
            score += malusFail
        }
    
        // Substract points if the key is pressed a little early
        else if (playedBars[playedBars.length - 1].p < $canvasBars.height)
        {
            score += malusEarly
        }
    
        // Add points if the key is pressed a little late
        else if (playedBars[playedBars.length - 1].p > $canvasBars.height + $canvasPiano.height / 2)
        {
            score += bonusAlmost
        }
    
        // Add points if the key is pressed on right time
        else
        {
            score += bonusSuccess
        }
    }
    $points.textContent = score
}

// Animate frames
const animate = () =>
{
    window.requestAnimationFrame(animate)

    if (!isPaused && isFocused)
    {
        drawStars()
        clearBars()
        scrollBars()

        // Update score if the player plays
        if (isMouseDown || isTouched)
        {
            updateScore()
        }
    }
}
animate()

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* EVENTS                                                                     |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Check if the window is focused
window.addEventListener('focus', () =>
{
    isFocused = true
    if (!isPaused && isLaunched && !$instrumental.ended)
    {
        $instrumental.play()
        if (isVocalized)
        {
            $vocals.currentTime = $instrumental.currentTime
            $vocals.play()
        }
    }
})

// Check if the windowis not focused
window.addEventListener('blur', () =>
{
    isFocused = false
    $instrumental.pause()
    $vocals.pause()
})

// Hide menu
$cross.addEventListener('click', () =>
{
    $menu.style.transform = 'translateY(-100%)'
    isPaused = false
    playPiano()
})

// Toggle option disabled state
const toggleOption = (option) =>
{
    option.classList.toggle('disabled')
    if (option == $autoplayOption)
    {
        isAutoplay = !isAutoplay
    }
    else if (option == $vocalOption)
    {
        isVocalized = !isVocalized
    }
}

$autoplayOption.addEventListener('click', (event) =>
{
    event.preventDefault()
    toggleOption($autoplayOption)
})

$vocalOption.addEventListener('click', (event) =>
{
    event.preventDefault()
    toggleOption($vocalOption)
})

$replayOption.addEventListener('click', (event) =>
{
    event.preventDefault()
    $menu.style.transform = 'translateY(-100%)'
    $points.textContent = '0'
    isPaused = false
    initBars()
})

// Speed up stars when music reaches bridge
$instrumental.addEventListener('timeupdate', () =>
{
    if ($instrumental.currentTime > 198 && $instrumental.currentTime < 208)
    {
        isSpeeding = true
    }
    else
    {
        isSpeeding = false
    }
})

// Show replay option when the song ends
$instrumental.addEventListener('ended', () =>
{
    $end.style.transform = 'translateY(0)'
})

// Replay when the song ends
$repeat.addEventListener('click', (event) =>
{
    event.preventDefault()
    $end.style.transform = 'translateY(100%)'
    $points.textContent = '0'
    isPaused = false
    initBars()
})

if (!Modernizr.touchevents)
{
    // Press key
    document.addEventListener('keydown', (event) =>
    {
        if (!isPaused)
        {
            const whiteCode = keyWhiteCodes.find( element => element == event.keyCode)
            const blackCode = keyBlackCodes.find( element => element == event.keyCode)
            pressKey(whiteCode, 'white', false)
            pressKey(blackCode, 'black', false)
            if (whiteCode != undefined || blackCode != undefined)
            {
                updateScore()
            }
        }
    })

    // Click key
    $canvasPiano.addEventListener('mousedown', (event) =>
    {
        if (!isPaused)
        {
            detectContact(event.x, event.y, false)
            isMouseDown = true
            updateScore()
        }
    })

    // Detect movement
    document.addEventListener('mousemove', (event) =>
    {
        // Mouse key
        if (isMouseDown)
        {
            detectContact(event.x, event.y, false)
        }

        // Update positions
        mouse.x = event.clientX
        mouse.y = event.clientY
        distanceCenter.x = $canvasStars.width / 2 - mouse.x
        distanceCenter.y = $canvasStars.height / 2 - mouse.y

        // Slide menu
        if (isSliding)
        {
            $menu.style.transform = `translateY(${(mouse.y - $hamburger.offsetHeight) / window.innerHeight * 100 - 100}%)`
        }
    })

    // Reset keys
    document.addEventListener('keyup', setKeys)
    document.addEventListener('mouseup', () =>
    {
        setKeys()
        isMouseDown = false
    })

    // Toggle menu on mousedown
    $hamburger.addEventListener('mousedown', () =>
    {
        $menu.style.transition = ''
        isSliding = true
        clickedMenu.x = mouse.x
        clickedMenu.y = mouse.y
    })

    // Toggle menu on mouseup
    $hamburger.addEventListener('mouseup', () =>
    {
        $menu.style.transition = 'transform 0.25s ease-out'
        // Slide menu
        if
        (
            (Math.abs(clickedMenu.x - mouse.x) < $hamburger.offsetHeight + window.innerHeight * 0.025 / 10 &&
            Math.abs(clickedMenu.y - mouse.y) < $hamburger.offsetHeight + window.innerHeight * 0.025 / 10) ||
            mouse.y >= window.innerHeight / 4
        )
        {
            $menu.style.transform = 'translateY(0%)'
            isPaused = true
            pausePiano()
        }
        else
        {
            $menu.style.transform = 'translateY(-100%)'
            isPaused = false
        }
        isSliding = false
    })
}
else
{
    // Touch key
    $canvasPiano.addEventListener('touchstart', (event) =>
    {
        if (!isPaused)
        {
            isTouched = true
            detectContact(event.touches[0].clientX, event.touches[0].clientY, false)
            updateScore()
        }
    })

    // Move key
    $canvasPiano.addEventListener('touchmove', (event) =>
    {
        if (!isPaused)
        {
            detectContact(event.touches[0].clientX, event.touches[0].clientY, false)
            updateScore()
        }
    })

    // Reset keys
    document.addEventListener('touchend', () =>
    {
        setKeys()
        isTouched = false
    })

    // Prevent context menu
    document.addEventListener('contextmenu', (event) =>
    {
        event.preventDefault()
    })

    // Update positions
    window.addEventListener('deviceorientation', (event) =>
    {
        distanceCenter.x = event.gamma / 90 * $canvasStars.width / 2
        distanceCenter.y = (event.beta - 45) / 90 * $canvasStars.height / 2
    })

    // Hide keys instruction
    $container.querySelector('.buttons').style.display = 'none'

    // Toggle menu on touch start
    $hamburger.addEventListener('touchstart', (event) =>
    {
        $menu.style.transition = ''
        isSliding = true
        clickedMenu.x = event.touches[0].clientX
        clickedMenu.y = event.touches[0].clientY
    })

    // Slide menu
    window.addEventListener('touchmove', () =>
    {
        touch.x = event.touches[0].clientX
        touch.y = event.touches[0].clientY
        if (isSliding)
        {
            $menu.style.transform = `translateY(${touch.y / window.innerHeight * 100 - 100}%)`
        }
    })

    // Toggle menu on touch end
    $hamburger.addEventListener('touchend', () =>
    {
        $menu.style.transition = 'transform 0.25s ease-out'
        // Slide menu
        if
        (
            (Math.abs(clickedMenu.x - touch.x) < $hamburger.offsetHeight + window.innerHeight * 0.025 / 10 &&
            Math.abs(clickedMenu.y - touch.y) < $hamburger.offsetHeight + window.innerHeight * 0.025 / 10) ||
            touch.y >= window.innerHeight / 4
        )
        {
            $menu.style.transform = 'translateY(0%)'
            isPaused = true
            pausePiano()
        }
        else
        {
            $menu.style.transform = 'translateY(-100%)'
            isPaused = false
        }
        isSliding = false
    })
}

/*----------------------------------------------------------------------------------------------------*\
|                                                                                                      |
|                                                                                                      |
| ************************* LAUNCHING                                                                  |
|                                                                                                      |
|                                                                                                      |
\*----------------------------------------------------------------------------------------------------*/

// Launch the game
const launch = () =>
{
    $container_1.style.opacity = `0`
    setTimeout(() =>
    {
        initBars()
        isLaunched = true
        $instrumental.play()
        if (isVocalized)
        {
            $vocals.play()
        }
        $container_1.style.display = `none`
        $container_2.style.display = `block`
        $logo.classList.add('animated')
        $title.classList.add('animated')

        // Home fading out
        setTimeout(() =>
        {
            $home.style.opacity = `0`
            // Home disappearance
            setTimeout(() =>
            {
                $home.style.display = `none`
            }, delay_0)
        }, delay_1)

        // H1 appearance
        setTimeout(() =>
        {
            $h1.style.opacity = `1`
            $h1.style.transform = `translate(-50%, -50%)`
        }, delay_2)

        // Canvases appearance
        setTimeout(() =>
        {
            $canvasBars.style.opacity = `1`
            $canvasPiano.style.opacity = `1`
            $menu.style.display = `block`
        }, delay_3)

        // H1 disappearance and menu appearance
        setTimeout(() =>
        {
            $h1.style.opacity = `0`
            $h1.style.transform = `translate(-50%, -100%)`
            $hamburger.style.opacity = `0.75`
            setTimeout(() =>
            {
                $h1.style.display = `none`
            }, delay_0)
        }, delay_4)

        // Score appearance
        setTimeout(() =>
        {
            $score.style.opacity = `0.125`
        }, delay_5)

        // Stars appearance
        setTimeout(() =>
        {
            $canvasStars.style.opacity = `1`
        }, delay_6)
    }, delay_0)
}

// Launch on click
$button.addEventListener('click', launch)