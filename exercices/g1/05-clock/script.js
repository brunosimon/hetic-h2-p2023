const clockElement = document.querySelector('.js-clock')
const clockHoursElement = clockElement.querySelector('.js-hours')
const clockMinutesElement = clockElement.querySelector('.js-minutes')
const clockSecondsElement = clockElement.querySelector('.js-seconds')

const tick = () =>
{
    const date = new Date()

    const hours = date.getHours()
    const hoursAngle = (hours % 12) / 12 * 360

    clockHoursElement.style.transform = `rotate(${hoursAngle}deg)`
}

window.setInterval(tick, 1000)
