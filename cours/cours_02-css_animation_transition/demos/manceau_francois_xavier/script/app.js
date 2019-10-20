const loadingContainer=document.querySelector('.loading-container')
const loadingY=document.querySelector('.y-axis')
const loadingX=document.querySelector('.x-axis')
const loadingCircles=document.querySelector('.loading-circles')
const playButton=document.querySelector('.play-button')
const percentageSpan=document.querySelector('.circle-3 span')

window.addEventListener('mousemove', (e) => 
{
    const yAxis=screen.height/2-13 - e.clientY
    const xAxis=e.clientX - screen.width/2-13
    loadingCircles.style.transform= `rotateX(${yAxis * 0.04}deg) rotateY(${xAxis * 0.02}deg)`
})

// window.addEventListener('deviceorientation', (e) => 
// {
//     const yAxis=e.alpha
//     const xAxis=e.beta
//     console.log(xAxis, yAxis)
//     loadingCircles.style.transform= `rotateX(${yAxis * 0.2}deg) rotateY(${xAxis * 0.1}deg)`
// })

const loading = new Audio('./sounds/start-loading.mp3')
setTimeout(() => 
{
    loading.play()
}, 200)

const loadingAmbientSound = new Audio('./sounds/loading-ambient.mp3')
loadingAmbientSound.loop=true
setTimeout(() => 
{
    loadingAmbientSound.play()
}, 4500)

const buttonHover = new Audio('./sounds/button-over.mp3')
const buttonLeave = new Audio('./sounds/button-leave.mp3')
const buttonClick = new Audio('./sounds/button-click.mp3')
const glitchEffect = new Audio('./sounds/glitch-effect.mp3')
playButton.addEventListener('mouseover', () =>
{
    buttonLeave.pause()
    buttonLeave.currentTime = 0.0
    buttonHover.play()

})
playButton.addEventListener('mouseleave', () =>
{
    buttonHover.pause()
    buttonHover.currentTime = 0.0
    buttonLeave.play()
})
playButton.addEventListener('click', () =>
{
    loadingContainer.classList.add('is-not-active')
    buttonClick.play()
    loadingAmbientSound.pause()
    loadingAmbientSound.currentTime = 0.0
    glitchEffect.play()
    setTimeout(() => 
    {
        loadingAmbientSound.pause()
        loadingContainer.remove()
    }, 5000)
})

let i=0
const percentageProgress = (i) =>
{
    percentageSpan.innerHTML = `${i}%`
    i++
}

const jumpButton = document.querySelector('.jump-button')
const starsContainer = document.querySelector('.stars-container')
const starsLayers = document.querySelector('.stars-layers.hyperspeed')
const starsHyperContainer = document.querySelector('.stars-hyper-container')
const starsHyperLayers = document.querySelector('.stars-hyper-layers')
const hyperLayer1 = document.querySelector('.hyper-layer-1')
const hyperLayer2 = document.querySelector('.hyper-layer-2')
const hyperLayer3 = document.querySelector('.hyper-layer-3')
const hyperLayer4 = document.querySelector('.hyper-layer-4')
const cockpit = document.querySelector('.cockpit')
const chargingMessage = document.querySelector('.jump-charging-bar')
const jump = new Audio('./sounds/jump-effect.mp3')
jumpButton.addEventListener('click', () => 
{
    setTimeout(() => 
    {
        jump.play()
    }, 200)
    starsContainer.classList.add('is-active')
    starsLayers.classList.add('is-active')
    starsHyperContainer.classList.add('is-active')
    starsHyperLayers.classList.add('is-active')
    hyperLayer1.classList.add('is-active')
    hyperLayer2.classList.add('is-active')
    hyperLayer3.classList.add('is-active')
    hyperLayer4.classList.add('is-active')
    cockpit.classList.add('is-active')
    chargingMessage.classList.add('is-active')
    
    setTimeout(() => 
    {
        starsContainer.classList.remove('is-active')
        starsLayers.classList.remove('is-active')
        starsHyperContainer.classList.remove('is-active')
        starsHyperLayers.classList.remove('is-active')
        hyperLayer1.classList.remove('is-active')
        hyperLayer2.classList.remove('is-active')
        hyperLayer3.classList.remove('is-active')
        hyperLayer4.classList.remove('is-active')
        cockpit.classList.remove('is-active')
        chargingMessage.classList.remove('is-active')
    }, 40500)
})

const playListNames = ['Aliotta Haynes Jeremiah - Lake Shore Drive', 'Wham Bam Shang A Lang - Sliver', 'Ain\'t No Mountain High Enough - Marvin Gaye & Tammi Terrell', 'Nyan Papa']
const playList = [new Audio('./sounds/lake-shore-drive.mp3'), new Audio('./sounds/wham-bam-shang-a-lang.mp3'), new Audio('./sounds/aint-no-mountain-high-enough.mp3'), new Audio('./sounds/nyan-papa.mp3')]
const musicButton = document.querySelector('.music-button')
const messagesContainer = document.querySelector('.message-container')
let randomNumber = 0
let buttonState = true
musicButton.addEventListener('click', () =>
{
    if(buttonState){
        randomNumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0
        playList[randomNumber].play()
        musicName = document.createElement('span')
        musicName.classList.add('music-title')
        messagesContainer.appendChild(musicName)
        musicName.innerHTML = `<strong>MUSIC:</strong> ${playListNames[randomNumber]}`
        buttonState=false
        musicButton.setAttribute('value','MUSIC ON')
    }
    else{
        playList[randomNumber].pause()
        playList[randomNumber].currentTime = 0.0
        buttonState=true
        musicButton.setAttribute('value','MUSIC OFF')
    }
})