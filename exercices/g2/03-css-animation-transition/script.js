const menuButtonElement = document.querySelector('.js-menu-button')
const menuElement = document.querySelector('.js-menu')

menuButtonElement.addEventListener('click', () =>
{
    menuElement.classList.toggle('is-active')
})

document.addEventListener('keydown', (event) =>
{
    if(event.key === 'Escape' && menuElement.classList.contains('is-active'))
    {
        menuElement.classList.remove('is-active')
    }
})

