import './style/main.styl'
import dingAudio from './audios/ding.mp3'
import finishAudio from './audios/finish.mp3'

/**
 * Audio
 */
const ding = new Audio(dingAudio)
ding.volume = 0.5
const finish = new Audio(finishAudio)

/**
 * Elements
 */
const $container = document.querySelector('.aim-trainer')
const $score = $container.querySelector('.score')
const $timer = $container.querySelector('.timer')
const $play = $container.querySelector('.play')
const $bestScore = $container.querySelector('.best-score')
const $targets = $container.querySelector('.targets')
const $scoreValue = $score.querySelector('.value')
const $timerValue = $timer.querySelector('.value')
const $bestScoreValue = $bestScore.querySelector('.value')

/**
 * Start
 */
const start = () =>
{
    $play.classList.add('is-hidden')
    $timer.classList.remove('is-hidden')

    timeLeft = timeDuration

    tick()
    createTarget()
    updateScore(0)
}

/**
 * End
 */
const end = () =>
{
    $play.classList.remove('is-hidden')
    $play.textContent = 'RESTART'
    $timer.classList.add('is-hidden')

    while($targets.children.length)
    {
        $targets.children[0].remove()
    }

    finish.currentTime = 0
    finish.play()
}

/**
 * Tick
 */
const timeDuration = 10
let timeLeft = 0

const tick = () =>
{
    $timerValue.textContent = timeLeft
    timeLeft--

    if(timeLeft < 0)
    {
        end()
    }
    else
    {
        window.setTimeout(tick, 1000)
    }
}

/**
 * Create target
 */
const createTarget = () =>
{
    const $target = document.createElement('div')
    $target.classList.add('target')
    $target.style.left = `calc(${Math.random() * 100}% - 5vmin)`
    $target.style.top = `calc(${Math.random() * 100}% - 5vmin)`
    $targets.appendChild($target)

    $target.addEventListener('mouseenter', () =>
    {
        $target.remove()

        createTarget()

        updateScore(score + 1)

        ding.currentTime = 0
        ding.play()
    })
}

/**
 * Update score
 */
let score = 0
let bestScore = 0

if(window.localStorage.getItem('bestScore') !== null)
{
    bestScore = parseInt(window.localStorage.getItem('bestScore'))
    $bestScoreValue.textContent = bestScore
}

const updateScore = (_value) =>
{
    score = _value
    $scoreValue.textContent = score

    if(score > bestScore)
    {
        bestScore = score
        $bestScoreValue.textContent = bestScore

        window.localStorage.setItem('bestScore', bestScore)
    }
}

/**
 * Init
 */
$play.addEventListener('click', start)