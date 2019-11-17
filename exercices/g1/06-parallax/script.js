/**
 * Lazyload
 */
const lazyloadElements = document.querySelectorAll('.js-lazyload')

for(const _element of lazyloadElements)
{
    if(_element.complete)
    {
        _element.classList.add('is-loaded')
    }
    else
    {
        _element.addEventListener('load', () =>
        {
            _element.classList.add('is-loaded')
        })
    }
}

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

/**
 * Cursor parallax
 */
const cursorParallaxElements = document.querySelectorAll('.js-cursor-parallax')

document.addEventListener('mousemove', (_event) =>
{
    const ratioX = _event.clientX / sizes.width - 0.5
    const ratioY = _event.clientY / sizes.height - 0.5

    cursorParallaxElements.forEach((_element, _key) =>
    {
        const strength = _key / (cursorParallaxElements.length - 1)
        const translateX = - ratioX * 10 * strength
        const translateY = - ratioY * 10 * strength
        
        _element.style.transform = `translateX(${translateX}%) translateY(${translateY}%)`
    })
})

