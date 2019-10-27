/**
 * Lazyload
 */
const lazyloadElements = document.querySelectorAll('.js-lazyload')

for(const _lazyloadElement of lazyloadElements)
{
    if(_lazyloadElement.complete)
    {
        _lazyloadElement.classList.add('is-loaded')
    }
    else
    {
        _lazyloadElement.addEventListener('load', () =>
        {
            _lazyloadElement.classList.add('is-loaded')
        })
    }
}

/**
 * Sizes
 */
const sizes = {}
sizes.width = 1980
sizes.height = 1024
sizes.resize = () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
}

window.addEventListener('resize', sizes.resize)
sizes.resize()

/**
 * Cursor parallax
 */
const cursorParallaxElements = document.querySelectorAll('.js-cursor-parallax')

window.addEventListener('mousemove', (_event) =>
{
    const ratioX = _event.clientX / sizes.width - 0.5
    const ratioY = _event.clientY / sizes.height - 0.5

    let i = 0
    for(const _element of cursorParallaxElements)
    {
        const depth = i / (cursorParallaxElements.length - 1)
        const translateX = - ratioX * 10 * depth
        const translateY = - ratioY * 10 * depth

        _element.style.transform = `translateX(${translateX}%) translateY(${translateY}%)`

        i++
    }
})

/**
 * Scroll parallax
 */
const scrollParallaxesElements = document.querySelectorAll('.js-scroll-parallax')

window.addEventListener('scroll', () =>
{
    const scrollY = window.scrollY

    let i = 0
    for(const _element of scrollParallaxesElements)
    {
        const depth = 1 - (i / (scrollParallaxesElements.length - 1))
        const translateY = scrollY / sizes.height * depth * 100

        _element.style.transform = `translateY(${translateY}%)`

        i++
    }
})