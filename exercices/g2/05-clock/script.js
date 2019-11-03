const clockElement = document.querySelector('.js-clock')
const hoursElement = clockElement.querySelector('.js-hours')
const minutesElement = clockElement.querySelector('.js-minutes')
const secondsElement = clockElement.querySelector('.js-seconds')

const tick = () =>
{
    const date = new Date()

    const hours = date.getHours()
    const angleHours = (hours % 12) / 12 * 360

    hoursElement.style.transform = `rotate(${angleHours}deg)`
}

window.setInterval(tick, 1000)