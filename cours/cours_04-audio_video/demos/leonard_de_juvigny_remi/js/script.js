// VARIABLES

const $filterBlack = document.querySelector('.black-filter')
const $views = document.querySelector('.views')
const $player = document.querySelector('.player')
const $filterRed = $player.querySelector('.red-filter')
const $videos = $player.querySelectorAll('.video')
const $settingsPopup = $player.querySelector('.settings-popup')
const $nightMode = $settingsPopup.querySelector('.night-mode')
const $autoplay = $settingsPopup.querySelector('.autoplay')
const $speedValues = Array.from($settingsPopup.querySelectorAll('.speed .value'))
const $speedValuesCheckBoxes = Array.from($settingsPopup.querySelectorAll('.speed .value .material-icons'))
const $controls = $player.querySelector('.controls')
const $playPause = $controls.querySelector('.play-pause')
const $timeSeekBar = $controls.querySelector('.seek-bar.time-bar')
const $timeFillBar = $timeSeekBar.querySelector('.fill-bar.time-bar')
const $timeCursor = $timeFillBar.querySelector('.cursor.time-bar')
const $volumeSeekBar = $controls.querySelector('.volume-wrap .seek-bar')
const $volumeFillBar = $volumeSeekBar.querySelector('.volume-wrap .fill-bar')
const $volumeCursor = $volumeFillBar.querySelector('.volume-wrap .cursor')
const $timePast = $controls.querySelector('.time')
const $timeLeft = $controls.querySelector('.time-left')
const $playPauseIcon = $controls.querySelector('.material-icons.play-pause')
const $volumeIcon = $controls.querySelector('.material-icons.volume')
const $settingsIcon = $controls.querySelector('.material-icons.settings')
const $fullScreenIcon = $controls.querySelector('.material-icons.full-screen')

let fullscreenExitHandled = false
let isDraggingTimeSeekBar = false
let isDraggingVolumeSeekBar = false
let timeout
let lastVolumeSettingBeforeDrag = 1
let userConfig = JSON.parse(window.localStorage.getItem('userConfig'))



// FUNCTIONS



// Play and pause video
const togglePause = () => {
  // Hide settings if they're shown but don't play/pause
  if (!$settingsPopup.classList.contains('hidden')) {
    $settingsPopup.classList.add('hidden')
  } else if ($playPause.dataset.state == 'playing') {
    // Pause the video if it's playing
    for (const $video of $videos) {
      $video.pause()
    }
    $playPause.dataset.state = 'paused'
    $playPause.innerText = 'play_arrow'
  } else if ($playPause.dataset.state == 'paused') {
    // Play the video if it's paused
    for (const $video of $videos) {
      $video.play()
    }
    $playPause.dataset.state = 'playing'
    $playPause.innerText = 'pause'
  } else if ($videos[0].currentTime == $videos[0].duration){
    // Restart the video if it ended
    for (const $video of $videos) {
      $video.currentTime = 0
      $video.play()
    }
    $playPause.dataset.state = 'playing'
    $playPause.innerText = 'pause'
  }
}

// Turn fullscreen on and off
const toggleFullscreen = () => {
  // Check fullscreen state
  if (window.innerHeight == screen.height) {
    // Fullscreen is on, turn it off
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    $fullScreenIcon.innerText = 'fullscreen'
    // Reset styling
    resetStyling()
    // Confirm successful fullscreen escape
    fullscreenExitHandled = true
  } else {
    // Fullscreen is off, turn it on
    if ($player.requestFullscreen) {
      $player.requestFullscreen()
    } else if ($player.msRequestFullscreen) {
      $player.msRequestFullscreen()
    } else if ($player.mozRequestFullScreen) {
      $player.mozRequestFullScreen()
    } else if ($player.webkitRequestFullscreen) {
      $player.webkitRequestFullscreen()
    }
    // Adapt elements to fullscreen
    $fullScreenIcon.innerText = 'fullscreen_exit'
    $player.style.width = '100%'
    $player.style.maxWidth = '100%'
    $player.style.margin = '0'
    $player.style.boxShadow = 'inset 0 -3px 0 #000'
    $controls.style.width = '750px'
    // Initialize successful fulscreen escape
    fullscreenExitHandled = false
  }
  // Adapt settings popup to the change
  $settingsPopup.classList.add('hidden')
  updateSettingsPopupStyle()
  // Update blurred background to the new dimensions once they're applied
  window.setTimeout(updateBlurStyle, 500)
}

// Turn volume on and off
const toggleVolume = () => {
  if ($videos[0].volume == 0) {
    // Put previous value
    if (userConfig.volume > 0) {
      updateVolume(userConfig.volume)
    } else {
      updateVolume(lastVolumeSettingBeforeDrag)
    }
  } else {
    // Store last volume setting
    const lastVolumeSetting = userConfig.volume
    updateVolume(0)
    userConfig.volume = lastVolumeSetting
  }
}

const toggleNightMode = () => {
  // Add or remove filters
  if ($filterRed.style.opacity == 0) {
    // Filters are off, turn them on
    $filterRed.style.opacity = 1
    $filterBlack.style.opacity = 1
    userConfig.nightMode = true
  } else {
    // Filters are on, turn them off
    $filterRed.style.opacity = 0
    $filterBlack.style.opacity = 0
    userConfig.nightMode = false
  }
  // Adapt view count color
  $views.classList.toggle('night-mode')
  // Switch checkbox style
  const $nightModeCheckBox = $nightMode.querySelector('.material-icons')
  if ($nightModeCheckBox.innerText == 'check_box') {
    $nightModeCheckBox.innerText = 'check_box_outline_blank'
  } else {
    $nightModeCheckBox.innerText = 'check_box'
  }
}

// Turn autoplay on and off
const toggleAutoplay = () => {
  if (userConfig.autoplay) {
    // Autoplay is on, turn it off
    userConfig.autoplay = false
    // Update checkbox
    $autoplay.querySelector('.material-icons').innerText = 'check_box_outline_blank'
  } else {
    // Autoplay is off, turn it on
    userConfig.autoplay = true
    // Update checkbox
    $autoplay.querySelector('.material-icons').innerText = 'check_box'
  }
}

// Go back and forth in video
const updateCurrentTime = (difference) => {
  // Difference is in seconds
  for ($video of $videos) {
    $video.currentTime += difference
    // Prevent impossible values
    if ($video.currentTime < 0) {
      $video.currentTime = 0
    } else if ($video.currentTime > $video.duration) {
      $video.currentTime = $video.duration
    }
  }
}

// Hide controls
const hideControls = () => {
  if (!$controls.classList.contains('collapsed')) {
    // Trigger CSS transition
    $controls.classList.add('collapsed')
    // Hide mouse cursor on player
    $player.style.cursor = 'none'
    // Hide settings popup if it's on
    $settingsPopup.classList.add('hidden')
  }
}

// Show controls
const showControls = () => {
  if ($controls.classList.contains('collapsed')) {
    // Trigger CSS transition
    $controls.classList.remove('collapsed')
    // Hide mouse cursor on player
    $player.style.cursor = 'default'
  }
}

// Reset styling if fullscreen was cancelled with escape key
const fixEscapeBehavior = () => {
  if (window.innerHeight == screen.height && !fullscreenExitHandled) {
    // Set default player width
    $player.style.width = '650px'
    // Reset blur backgorund position and dimensions
    updateBlurStyle()
    // Reset player position
    resetStyling()
    // Update fullscreen icon
    $fullScreenIcon.innerText = 'fullscreen'
  }
}

const updateTimeValues = () => {
  // Time past (minutes then seconds with 2 digits)
  // Initialize
  $timePast.innerText = ''
  // Minutes
  $timePast.innerText += Math.floor($videos[0].currentTime/60).toString()
  // Force 2 digits on seconds by prepending a 0 if the value is less than 10
  $timePast.innerText += `:${Math.floor($videos[0].currentTime%60) < 10 ? "0" : ""}`
  // Seconds
  $timePast.innerText += Math.floor($videos[0].currentTime%60)

  // Time left
  // Initialize
  $timeLeft.innerText = '-'
  // Minutes
  $timeLeft.innerText += Math.floor(($videos[0].duration - $videos[0].currentTime)/60).toString()
  // Force 2 digits on seconds by prepending a 0 if the value is less than 10
  $timeLeft.innerText += `:${Math.floor(($videos[0].duration - $videos[0].currentTime)%60) < 10 ? "0" : ""}`
  // Seconds
  $timeLeft.innerText += Math.floor(($videos[0].duration - $videos[0].currentTime)%60).toString()
}

// Update video position based on seekbar click/drag
const updateVideoPosition = (left) => {
  const ratio = (left - $timeSeekBar.getBoundingClientRect().left) / $timeSeekBar.offsetWidth
  for (const $video of $videos) {
    const videoTime = ratio * $video.duration
    $video.currentTime = videoTime
  }
}

// Update volume based on seekbar click/drag
const updateVolume = (ratio) => {
  // Prevent impossible values
  if (ratio > 1) {
    ratio = 1
  } else if (ratio < 0) {
    ratio = 0
  }
  // Set new video volume
  $videos[0].volume = ratio
  // Update seekbar position
  $volumeFillBar.style.transform = `scaleX(${ratio})`
  // Compensate cursor shrink
  $volumeCursor.style.transform = `scaleX(${1/ratio})`
  // Save new volume in user consig
  userConfig.volume = ratio
  // Update icon depending on volume value
  if (ratio == 0) {
    $volumeIcon.innerText = 'volume_off'
  } else if (ratio < 0.4) {
    $volumeIcon.innerText = 'volume_down'
  } else {
    $volumeIcon.innerText = 'volume_up'
  }
}

const updatePlayBackRate = (speed) => {
  for (const $video of $videos) {
    // Change video speed
    $video.playbackRate = speed
  }
  // Save playback rate in user preferences
  userConfig.playBackRate = parseFloat(speed)
  // Initialize speed checkboxes
  for (const $checkBox of $speedValuesCheckBoxes) {
    $checkBox.innerText = 'radio_button_unchecked'
  }
  // Find the matching checkbox
  const $selectedOption = $speedValues.find((element) => element.dataset.speed == speed)
  // Check the matching checkbox
  $selectedOption.querySelector('.material-icons').innerText = 'radio_button_checked'
}

const updateBlurStyle = () => {
  // Update dimensions
  $videos[1].style.width = $videos[0].getBoundingClientRect().width.toString() + 'px'
  $videos[1].style.height = $videos[0].getBoundingClientRect().height.toString() + 'px'
  // Update position
  $videos[1].style.left = ($player.getBoundingClientRect().left - $controls.getBoundingClientRect().left).toString() + 'px'
  $videos[1].style.top = ($player.getBoundingClientRect().top - $controls.getBoundingClientRect().top).toString() + 'px'
}

const updateSettingsPopupStyle = () => {
  $settingsPopup.style.left = ($settingsIcon.getBoundingClientRect().left - 85).toString() + 'px'
  $settingsPopup.style.top = ($settingsIcon.getBoundingClientRect().top - 114).toString() + 'px'
}

const resetStyling = () => {
  $player.style.width = '650px'
  $player.style.maxWidth = '90%'
  $player.style.margin = '27.5vmin auto 0 auto'
  $player.style.boxShadow = 'none'
  $controls.style.width = '550px'
}

const updateUserConfig = () => {
  window.localStorage.setItem('userConfig', JSON.stringify(userConfig))
}



// EVENT LISTENERS



// Create default config if there isn't one
if (userConfig == null) {
  userConfig = {
    autoplay: true,
    views: 0,
    lastSessionTime: 0,
    nightMode: false,
    playBackRate: 1,
    volume: 1
  }
}

// Increment view count
userConfig.views++

// Display new view count
if (userConfig.views > 1) {
  $views.innerText = `${userConfig.views} views`
}

// Play video or not depending on autoplay toggle
if (userConfig.autoplay) {
  // Update autoplay checkbox
  $autoplay.querySelector('.material-icons').innerText = 'check_box'
  for (const $video of $videos) {
    $video.play()
    $playPauseIcon.innerText = 'pause'
    $playPauseIcon.dataset.state = 'playing'
  }
}

// Turn night mode on depending on user settings
if (userConfig.nightMode) {
  window.setTimeout(toggleNightMode, 50)
}

// Adjust playback rate depending on user settings
updatePlayBackRate(userConfig.playBackRate)

// Adjust volume depending on user settings
updateVolume(userConfig.volume)

// Save current video position on page close
window.addEventListener('beforeunload', () => {
  userConfig.lastSessionTime = $videos[0].currentTime
  // Save all config changes
  updateUserConfig()
})

// Prevent all drag gestures
document.addEventListener('mousedown', (event) => {
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
})

// Start video where it was left the previous session
$videos[0].addEventListener('loadedmetadata', () => {
  if (userConfig.lastSessionTime < $videos[0].duration) {
    for (const $video of $videos) {
      $video.currentTime = userConfig.lastSessionTime
    }
  }
  // Display time past and time left on load
  updateTimeValues()
})

// Update player data when the video is playing
$videos[0].addEventListener('timeupdate', () => {
  // Update fill bar
  const ratio = $videos[0].currentTime / $videos[0].duration
  $timeFillBar.style.transform = `scaleX(${ratio})`
  // Prevent cursor shrink
  $timeCursor.style.transform = `scaleX(${1/ratio})`
  // Update time info
  window.setInterval(updateTimeValues, 1000)
})

// Update video time on seekbar click and drag
$timeSeekBar.addEventListener('mousedown', (event) => {
  // Seek bar drag started
  isDraggingTimeSeekBar = true
  for ($video of $videos) {
    $video.pause()
  }
  // Change reload icon if video has ended
  if ($videos[0].currentTime == $videos[0].duration) {
    $playPauseIcon.innerText = 'play_arrow'
    togglePause()
  }
  // Hide setting popup
  $settingsPopup.classList.add('hidden')
  // Prevent drag to the very end of the video
  if (event.clientX < $timeSeekBar.getBoundingClientRect().left + $timeSeekBar.getBoundingClientRect().width) {
    updateVideoPosition(event.clientX)
  }
})

document.addEventListener('mouseup', (event) => {
  if (isDraggingTimeSeekBar) {
    // Seek bar drag ended, resume video
    for ($video of $videos) {
      // Only play video if it wasn't paused
      if ($playPauseIcon.innerText == 'pause') {
        $video.play()
      }
    }
    // Prevent drag to the very end of the video
    if (event.clientX < $timeSeekBar.getBoundingClientRect().left + $timeSeekBar.getBoundingClientRect().width) {
      updateVideoPosition(event.clientX)
    }
    isDraggingTimeSeekBar = false
  }
})

document.addEventListener('mousemove', (event) => {
  if (
    isDraggingTimeSeekBar &&
    event.clientX < $timeSeekBar.getBoundingClientRect().left + $timeSeekBar.getBoundingClientRect().width
  ) {
    updateVideoPosition(event.clientX)
  }
})

// Update volume on seekbar click and drag
$volumeSeekBar.addEventListener('mousedown', (event) => {
  // Seek bar drag started
  isDraggingVolumeSeekBar = true
  // Hide setting popup
  $settingsPopup.classList.add('hidden')
  // Change volume
  const ratio = (event.clientX - $volumeSeekBar.getBoundingClientRect().left) / $volumeSeekBar.offsetWidth
  lastVolumeSettingBeforeDrag = ratio
  updateVolume(ratio)
})

document.addEventListener('mouseup', (event) => {
  if (isDraggingVolumeSeekBar) {
    // Change volume
    const ratio = (event.clientX - $volumeSeekBar.getBoundingClientRect().left) / $volumeSeekBar.offsetWidth
    updateVolume(ratio)
    isDraggingVolumeSeekBar = false
  }
})

document.addEventListener('mousemove', (event) => {
  if (isDraggingVolumeSeekBar) {
    // Change volume
    const ratio = (event.clientX - $volumeSeekBar.getBoundingClientRect().left) / $volumeSeekBar.offsetWidth
    updateVolume(ratio)
  }
})

// Position controls background when videos are ready
$videos[1].addEventListener('canplay', updateBlurStyle)

// Play/pause on play-pause icon click
$playPause.addEventListener('click', togglePause)
// Play/pause on video click
$videos[0].addEventListener('click', togglePause)
// Play/pause on spacebar and K key presses
document.addEventListener('keydown', (event) => {
  if (event.keyCode == 32 || event.keyCode == 75) {
    togglePause()
  }
})

// Show settings popup
$settingsIcon.addEventListener('click', () => {
  // Show and position popup
  $settingsPopup.classList.toggle('hidden')
  if (!$settingsPopup.classList.contains('hidden')) {
    updateSettingsPopupStyle()
  }
})

// Turn night mode on and off
$nightMode.addEventListener('click', () => {
  toggleNightMode()
})

// Turn autoplay on and off
$autoplay.addEventListener('click', () => {
  toggleAutoplay()
})

// Change playback rate
for (const $speedValue of $speedValues) {
  $speedValue.addEventListener('click', () => {
    // Change video speed
    updatePlayBackRate($speedValue.dataset.speed)
  })
}

// Turn on/off fullscreen on icon click
$fullScreenIcon.addEventListener('click', toggleFullscreen)
// Turn on/off fullscreen on video double-click
$videos[0].addEventListener('dblclick', toggleFullscreen)

// Hide controls if mouse hasn't moved at all
let collapseTimeout = () => {
  timeout = window.setTimeout(hideControls, 5000)
}
collapseTimeout()

// Start timeout on player hover
$player.addEventListener('mouseenter', collapseTimeout)

// Show controls if mouse moves over player
$player.addEventListener('mousemove', () => {
  // Reset previous timeout
  window.clearTimeout(timeout)
  // Show controls
  showControls()
  // Set new timeout to hide controls if mouse doesn't move
  collapseTimeout()
})

// Check if fullscreen change was done properly
document.addEventListener('fullscreenchange', fixEscapeBehavior)
document.addEventListener('webkitfullscreenchange', fixEscapeBehavior)
document.addEventListener('mozfullscreenchange', fixEscapeBehavior)
document.addEventListener('MSFullscreenChange', fixEscapeBehavior)

// Turn on/off video sound on volume icon click
$volumeIcon.addEventListener('click', toggleVolume)

// Show replay icon if video ended
$videos[0].addEventListener('ended', () => {
  $playPauseIcon.innerText = 'replay'
  $playPause.dataset.state = 'ended'
})

// Control video current time with keyboard
document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      // Left arrow
      updateCurrentTime(-5)
      break
    case 39:
      // Right arrow
      updateCurrentTime(5)
      break
    case 70:
      // F key: turn fullscreen on and off
      toggleFullscreen()
    case 74:
      // J key
      updateCurrentTime(-10)
      break
    case 76:
      // L key
      updateCurrentTime(10)
      break
  }
})
