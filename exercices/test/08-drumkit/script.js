const initDrumKit = (_config) =>
{
    // Create container element
    const containerElement = document.createElement('section')
    containerElement.classList.add('drumkit')
    document.body.appendChild(containerElement)

    // Create sounds
    const sounds = []

    for(const _soundConfig of _config)
    {
        // Create an object that will contain everything
        const sound = {
            ..._soundConfig
        }

        // Create button element
        sound.buttonElement = document.createElement('button')
        sound.buttonElement.classList.add('button')
        sound.buttonElement.innerText = _soundConfig.name
        containerElement.appendChild(sound.buttonElement)

        // Create overlay element
        sound.overlayElement = document.createElement('span')
        sound.overlayElement.classList.add('overlay')
        sound.overlayElement.innerText = _soundConfig.name
        sound.buttonElement.appendChild(sound.overlayElement)

        // Create audio element
        sound.audioElement = new Audio(_soundConfig.src)

        // Create a play method
        sound.play = () =>
        {
            sound.audioElement.currentTime = 0
            sound.audioElement.play()

            sound.buttonElement.classList.remove('animated')
            window.requestAnimationFrame(() =>
            {
                sound.buttonElement.classList.add('animated')
            })
        }

        // Listen to mouse down event on button element
        sound.buttonElement.addEventListener('mousedown', sound.play)

        // Save
        sounds.push(sound)
    }

    // Listen to key down event
    document.addEventListener('keydown' , (_event) =>
    {
        // // Old method
        // let sound = null

        // for(const _sound of sounds)
        // {
        //     if(_sound.keyCodes.indexOf(_event.code) !== - 1)
        //     {
        //         sound = _sound
        //     }
        // }

        // New method
        const sound = sounds.find((_sound) => _sound.keyCodes.indexOf(_event.code) !== - 1)

        // If sound found, play it
        if(sound)
        {
            sound.play()
        }
    })
}

window
    .fetch('https://bruno-simon.com/hetic/p2023/resources/drumkit/sounds.json')
    .then((_response) => _response.json())
    .then(initDrumKit)