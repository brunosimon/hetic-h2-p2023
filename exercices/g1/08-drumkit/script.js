// Initialize drumkit
const initDrumkit = (_config) =>
{
    // Create element
    const containerElement = document.createElement('section')
    containerElement.classList.add('drumkit')
    document.body.appendChild(containerElement)

    // Create sound buttons
    const sounds = []

    for(const _soundConfig of _config)
    {
        const sound = {}
        sound.keyCodes = _soundConfig.keyCodes
        sounds.push(sound)

        // Create button element
        sound.buttonElement = document.createElement('button')
        sound.buttonElement.classList.add('sound')
        sound.buttonElement.innerText = _soundConfig.name
        containerElement.appendChild(sound.buttonElement)

        // Create audio element
        sound.audioElement = new Audio(_soundConfig.src)

        // Create play method
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

        // Listen to click event and play sound
        sound.buttonElement.addEventListener(
            'mousedown',
            sound.play
        )
    }

    // Listen to keyboard event and play sound
    document.addEventListener('keydown', (_event) =>
    {
        // // Old method
        // let sound = null

        // for(const _sound of sounds)
        // {
        //     if(_sound.keyCodes.includes(_event.code))
        //     {
        //         sound = _sound
        //     }
        // }

        // New method
        const sound = sounds.find((_sound) => _sound.keyCodes.includes(_event.code))

        // If sound found, play it
        if(sound)
        {
            sound.play()
        }
    })
}

// Load sounds config
window
    .fetch('https://bruno-simon.com/hetic/p2023/resources/drumkit/sounds.json')
    .then(_response => _response.json())
    .then(_config =>
    {
        initDrumkit(_config)
    })
