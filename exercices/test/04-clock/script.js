const clockElement = document.querySelector('.js-clock')
const hoursElement = clockElement.querySelector('.js-hours')
const minutesElement = clockElement.querySelector('.js-minutes')
const secondsElement = clockElement.querySelector('.js-seconds')

const tick = () =>
{
    const date = new Date()

    const hours = date.getHours()
    const hoursAngle = (hours % 12) / 12 * 360
    hoursElement.style.transform = `rotate(${hoursAngle}deg)`

    const minutes = date.getMinutes()
    const minutesAngle = minutes / 60 * 360 + hours * 360
    minutesElement.style.transform = `rotate(${minutesAngle}deg)`

    const seconds = date.getSeconds()
    const secondsAngle = seconds / 60 * 360 + hours * 360 + minutes * 360
    secondsElement.style.transform = `rotate(${secondsAngle}deg)`
}

window.setInterval(tick, 1000)
tick()