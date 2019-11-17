//PREVIEW CONTAINER
const previewContainer = document.querySelector('.preview-container')
const mainContainer = document.querySelector('.main-container')
const video = document.querySelector('.main-container .player video')

previewContainer.addEventListener('click', () =>
{
    previewContainer.style.display='none'
    mainContainer.style.display='flex'
    video.play()
})



//VIDEO PLAYER

// DOM elements variable

const videoPlayer = document.querySelector('.main-container .player')
const controls = videoPlayer.querySelector('.controls')

const videoTimer = controls.querySelector('.bottom-controls .time')
const playButton = controls.querySelector('.center-controls .play-container')
const playIcons = playButton.querySelector('.play')
const dragDrop = playButton.querySelector('.drag-drop')

const soundIcons = controls.querySelector('.bottom-controls .left img')
const soundControls = controls.querySelector('.sound-controls')
const soundBar = controls.querySelector('.sound-bar')
const soundState = controls.querySelector('.sound-state')
const soundCircle = soundControls.querySelector('.circle')

const settingsIcons = controls.querySelector('.bottom-controls .right .img-1')
const settingsControls = controls.querySelector('.settings-controls')
const lowSpeed = settingsControls.querySelector('.low')
const normalSpeed = settingsControls.querySelector('.normal')
const highSpeed = settingsControls.querySelector('.high')

const speedButtons = settingsControls.querySelectorAll('p')

const qualityControls = controls.querySelector('.quality-controls')
const qualityControlsText = qualityControls.querySelector('h1')


//Toggle Play/Pause

const togglePlay = () => 
{
    if (!video.paused)
    {
        video.currentTime===video.duration ? video.play() : video.pause()
        playIcons.src="images/play.png"
    }
    else
    {
        video.play()
        playIcons.src="images/pause.png"
    }
}

playButton.addEventListener('click', () => 
{
    togglePlay()
})

//Timer function

const videoTimerFunction = () => 
{
    window.requestAnimationFrame(videoTimerFunction)

    let secondsNumber = Math.floor(video.currentTime)
    let minutesNumber = Math.floor(video.currentTime/60);
    let secondsLeftNumber = Math.floor((video.duration-video.currentTime)%60);
    let videoDuration = `${Math.floor(video.duration/60)}:${Math.floor(video.duration)%60}`;

    if (secondsNumber < 60)
    {
        secondsNumber = (secondsNumber < 10 ? '0' : '')+secondsNumber
    }
    else
    {   
        secondsNumber = ((Math.floor(video.currentTime)%60) < 10 ? '0' : '')+(Math.floor(video.currentTime)%60)
    }

    if (secondsLeftNumber < 60)
    {
        secondsLeftNumber = (secondsLeftNumber < 10 ? '0' : '')+secondsLeftNumber
    }

    videoTimer.textContent =`${minutesNumber}:${secondsNumber}`
    videoTimer.textContent += ' / '
    videoTimer.textContent += videoDuration

}

videoTimerFunction()

// timeline rotation function when video is progressing

const seekMotionFunction = () =>
{
    window.requestAnimationFrame(seekMotionFunction)

    let rotate = (360/video.duration)*video.currentTime
    dragDrop.style.transform=`rotateZ(${rotate}deg)`
}

seekMotionFunction()

//Fullscreen function

const fullScreen = document.querySelector('.main-container .player .controls .bottom-controls .right .img-2')
fullScreenMode = false

fullScreen.addEventListener('click', () => 
{

    if (fullScreenMode === false)
    {
        if (videoPlayer.webkitRequestFullscreen)
        {
            videoPlayer.webkitRequestFullscreen() 
        }
        else if (videoPlayer.mozRequestFullScreen)
        {
            videoPlayer.mozRequestFullScreen()
        }
        video.style.width='100%'
    }
    else
    {
        if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
        else if (document.mozCancelFullScreen)
        {
            document.mozCancelFullScreen()
        }
    }

    fullScreenMode = !fullScreenMode
})

// Drag and drop function for timeline

let mouseDown = false

dragDrop.addEventListener('mousedown', (e) =>
{
    mouseDown = true
    
    videoPlayer.addEventListener('mousemove', (e) =>
    {

        if (mouseDown) 
        {

        let bounding = videoPlayer.getBoundingClientRect()
        let getX = e.clientX-bounding.left-(bounding.width/2)
        let getY = e.clientY-bounding.top-(bounding.height/2)
        let getRadius = Math.sqrt(Math.pow(getX,2)+Math.pow(getY,2))

        let getAngle = Math.acos(getX/getRadius)
        let angle = convertRadianToDegrees(getAngle)

        //Reconstitute the 360 degrees model with the Trigonometric model
        angle = getY <= 0 ? angle : -angle
        angle = getX >= 0 ? 90-angle: angle
        angle = getX <= 0 ? 90-angle: angle
        angle = (getX<=0)&&(getY<=0) ? angle+360: angle
        
        //update video time
        let ratio = angle/360
        let updateTime = video.duration*ratio
        video.currentTime = updateTime
        }
        
    })

    e.preventDefault()
})   

videoPlayer.addEventListener('mouseup', () =>
{
    mouseDown=false
}) 

//convert radian to degrees function
const convertRadianToDegrees = (a) =>
{
    result = a * 180 / Math.PI
    return result
}

//sound animation

const toggleAnimSound = (status) => 
{
    if(status) 
    {
        soundBar.classList.add('anim')
        soundCircle.classList.add('anim-circle')
    }
    else
    {
        soundBar.classList.remove('anim')
        soundCircle.classList.remove('anim-circle')
    }
}

soundIcons.addEventListener('mouseover', () =>
{
    toggleAnimSound(true)
})

soundControls.addEventListener('mouseleave', () =>
{
    toggleAnimSound(false)
})

videoPlayer.addEventListener('mouseleave', () =>
{
    toggleAnimSound(false)
})


//drag and drop for volume

let mouseDownOnSound = false

soundCircle.addEventListener('mousedown', (e) =>
{
    mouseDownOnSound = true
    soundControls.style.cursor="pointer"

    soundControls.addEventListener('mousemove', (e) =>
    {
        if (mouseDownOnSound)
        {
            let bounding = videoPlayer.getBoundingClientRect()
            let getY = -(e.clientY-bounding.top-bounding.height+60);
            let scaleY = getY/105
            let translateY= -getY+105                                //105 is px height of soundBar (in all the script)

            if((getY>0)&&(getY<=105))
            {
                changeVolumeAndPosition(scaleY,translateY)
            }
        }
    })
    e.preventDefault()
})   

videoPlayer.addEventListener('mouseup', () =>
{
    mouseDownOnSound=false
}) 

// volume click function on sound bar and sound icon
soundBar.addEventListener('click', (e) =>
{
    const mouseY = e.clientY
    const bounding = soundBar.getBoundingClientRect()
    const ratio = (bounding.bottom - mouseY)/bounding.height
    const translate = (mouseY - bounding.bottom)+bounding.height
    
    changeVolumeAndPosition(ratio,translate)
})

let storageVideoVolume = 1
soundIcons.addEventListener('click', () =>
{
    if (video.volume!=0)
    {
        storageVideoVolume = video.volume
        video.volume=0
    }
    else
    {
        video.volume = storageVideoVolume
    }
    changeVolumeAndPosition(video.volume,105-video.volume*105)
})

//icon change function
const changeIconsForVolume = () =>
{
    if (video.volume>0.5)
    {
        soundIcons.src='images/speaker.png'
    }
    else if (video.volume !== 0)
    {
        soundIcons.src='images/speaker-middle.png'
    }
    else
    {
        soundIcons.src='images/speaker-muted.png'
    }
}

//set volume and position function
const changeVolumeAndPosition = (ratio,translate) =>
{
    soundState.style.transform=`scaleY(${ratio})`
    soundCircle.style.transform=`translateY(${translate}px)`
    video.volume = ratio > 0.035 ? ratio : 0
    changeIconsForVolume()
}

//settings animation

const toggleAnimSettings = (status) => 
{
    if(status) 
    {
        settingsControls.classList.add('anim')
    }
    else
    {
        settingsControls.classList.remove('anim')
    }
}

settingsIcons.addEventListener('mouseover', () =>
{
    toggleAnimSettings(true)
})

settingsControls.addEventListener('mouseleave', () =>
{
    toggleAnimSettings(false)
})

videoPlayer.addEventListener('mouseleave', () =>
{
    toggleAnimSettings(false)
})

//set speed function
const changeSpeed = (speed) => 
{
    speedButtons.forEach(button => 
    {
        button.style.opacity = '0.5'
    })
    let currentSpeed = document.querySelector(`.settings-controls .${speed}`)
    currentSpeed.style.opacity = '1'
    video.playbackRate = +currentSpeed.textContent
}

lowSpeed.addEventListener('click', () =>
{
    changeSpeed('low')
})

normalSpeed.addEventListener('click', () =>
{
    changeSpeed('normal')
})

highSpeed.addEventListener('click', () =>
{
    changeSpeed('high')
})


//change video quality

qualityControls.addEventListener('click', () =>
{
    let storageVideoTime = video.currentTime
    let storageVideoPaused = video.paused
    if (qualityControlsText.textContent=='HD')
    {
        qualityControlsText.textContent='LD'
        video.src='videos/view-from-a-blue-moon-ld.mp4'
    }
    else 
    {
        qualityControlsText.textContent='HD'
        video.src='videos/view-from-a-blue-moon-hd.mp4'
    }
    video.currentTime = storageVideoTime
    storageVideoPaused ? video.pause() : video.play()
})


//Controls disappear if stay too long without moving
let timeoutInactive = setTimeout(function()
{
    controls.classList.add('inactive')
}, 5000);
videoPlayer.addEventListener('mousemove', () =>
{
    controls.classList.remove('inactive')
    clearTimeout(timeoutInactive)
    timeoutInactive = setTimeout(function()
    {
        if(!video.paused) controls.classList.add('inactive')
    }, 5000);
})

//keydown function for volume, video progress and play/pause
window.addEventListener('keydown', (e) => 
{
    switch(e.code)
    {
        case 'Space':
            togglePlay()
            break;
        case 'ArrowUp':
            video.volume <= 0.9 ? video.volume += 0.1 : video.volume = 1
            changeVolumeAndPosition(video.volume,105-video.volume*105)
            break;
        case 'ArrowDown':
            video.volume >= 0.1 ? video.volume -= 0.1 : video.volume = 0
            changeVolumeAndPosition(video.volume,105-video.volume*105)
            break;
        case 'ArrowLeft':
            video.currentTime -= 5
            break;
        case 'ArrowRight':
            video.currentTime += 5
            break;
    }
})