// Set up
const menuTriggerElement = document.querySelector('.js-menu-trigger')
const menuElement = document.querySelector('.js-menu')

// Menu trigger click event
menuTriggerElement.addEventListener('click', () =>
{
    // Toggle active class
    menuElement.classList.toggle('is-active')
})

// Keydown event
document.addEventListener('keydown', (_event) =>
{
    // If espace and menu active, deactivate
    if(_event.key === 'Escape' && menuElement.classList.contains('is-active'))
    {
        menuElement.classList.toggle('is-active')
    }
})