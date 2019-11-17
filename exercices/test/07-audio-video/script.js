const audio = document.querySelector('audio')
// console.log(audio)

const play = () =>
{
    const promise = audio.play()

    promise
        .then(() =>
        {
            console.log('could play')
        })
        .catch(() =>
        {
            console.log('could not play')
        })
}

play()

window.addEventListener('keydown', () =>
{
    play()
})

window.addEventListener('click', () =>
{
    play()
})