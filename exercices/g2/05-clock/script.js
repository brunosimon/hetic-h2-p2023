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

    const minutes = date.getMinutes()
    const minutesAngle = minutes / 60 * 360 + hours * 360
    clockMinutesElement.style.transform = `rotate(${minutesAngle}deg)`

    const seconds = date.getSeconds()
    const secondsAngle = seconds / 60 * 360 + hours * 360 + minutes * 360
    clockSecondsElement.style.transform = `rotate(${secondsAngle}deg)`
}

window.setInterval(tick, 1000)
tick()


















// const clockElement = document.querySelector('.js-clock')
// const hoursElement = clockElement.querySelector('.js-hours')
// const minutesElement = clockElement.querySelector('.js-minutes')
// const secondsElement = clockElement.querySelector('.js-seconds')

// const tick = () =>
// {
//     const date = new Date()

//     const hours = date.getHours()
//     const angleHours = (hours % 12) / 12 * 360

//     hoursElement.style.transform = `rotate(${angleHours}deg)`
// }

// window.setInterval(tick, 1000)