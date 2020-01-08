const menuButton = document.querySelector('.option-menu-button')
const menuContainer = document.querySelector('.option-menu-container')
const menuButtonBar = document.querySelectorAll('.hidding-bar-effect')
const starContainers = document.querySelectorAll('.star-containers')
const returnHome = document.querySelector('.return-home')
const homeContainer = document.querySelector('.menu-container')
const playButtton = document.querySelector('.play-button')
const playGenerateButtton = document.querySelector('.play-generate-button')
const finishContainer = document.querySelector('.finishing-container')
const variablesContainer = document.querySelector('.finishing-variables')
const canvasButton = document.querySelector('.canvas-button')
const mainOptionButton = document.querySelector('.principal-option-button')
const mainOptionInnerButton = document.querySelector('.principal-option-inner-button')
const mainOptionContainer = document.querySelector('.option-main-container')
const controlsContainer = document.querySelector('.controls-main-container')
const controlsButton = document.querySelector('.controls-button')
const returnControlsButton = document.querySelector('.controls-return-button')
const generateContainer = document.querySelector('.generate-main-container')
const generateReturn = document.querySelector('.principal-generate-button')
const generateMenu = document.querySelector('.generate-button')
const timerContaier = document.querySelector('.timer-container')
const xpContainer = document.querySelector('.xp-container')
const totalXpContainer = document.querySelector('.total-xp-container')
const motionBlurButtons = document.querySelectorAll('.motion-blur-button')
const particlesButtons = document.querySelectorAll('.particles-button')
const soundButtons = document.querySelectorAll('.sound-button')
const customButton = document.querySelector('.custom-button')
const customContainer = document.querySelector('.custom-main-container')
const returnCustomButton = document.querySelector('.custom-return-button')
const laserCustomButton = document.querySelectorAll('.laser-bonus')
const boostCustomButton = document.querySelectorAll('.boost-bonus')
const trailCustomButton = document.querySelectorAll('.trail-bonus')
const laserPrices = document.querySelectorAll('.laser-bonus-price')
const boostPrices = document.querySelectorAll('.boost-bonus-price')
const trailPrices = document.querySelectorAll('.trail-bonus-price')
const playerXPContainer = document.querySelector('.custom-xp-span')
//Generate bg stars
for (let i = 0; i < 150; i++) {
  for (let j = 0; j < starContainers.length; j++) {
    generateStarsMenu(starContainers[j])
  }
}
const starSingleElement = document.querySelectorAll('.single-star-element')
//Clear all custom buttons
function clearButtons(elements, type) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(type);
  }
}
//Clear all color button
function clearButtonsColor(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('selected-color-blue');
    elements[i].classList.remove('selected-color-red');
    elements[i].classList.remove('selected-color-rose');
    elements[i].classList.remove('selected-color-yellow');
  }
}
//Handler of the laser bonus
for (let i = 0; i < laserCustomButton.length; i++) {
  laserCustomButton[i].addEventListener('click', () => {
    if (i == 0) {
      clearButtons(laserCustomButton, 'bonus-button-selected')
      Player.numberOfLaser = 1
      Player.bonus = 0
      laserCustomButton[i].classList.toggle('bonus-button-selected')
    }
    if (i == 1 && (Player.xp >= 5000 || Player.laserBonus > 0)) {
      clearButtons(laserCustomButton, 'bonus-button-selected')
      Player.numberOfLaser = 3
      Player.bonus = 0
      laserCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.laserBonus < 1) {
        laserPrices[i].innerHTML = '0 xp'
        Player.laserBonus = 1
        Player.xp = Player.xp - 5000
      }
    }
    if (i == 2 && (Player.xp >= 50000 || Player.laserBonus > 1)) {
      clearButtons(laserCustomButton, 'bonus-button-selected')
      Player.numberOfLaser = 6
      Player.bonus = 1
      laserCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.laserBonus < 2) {
        laserPrices[i].innerHTML = '0 xp'
        Player.laserBonus = 2
        Player.xp = Player.xp - 50000
      }
    }
    if (i == 3 && (Player.xp >= 500000 || Player.laserBonus > 2)) {
      clearButtons(laserCustomButton, 'bonus-button-selected')
      Player.numberOfLaser = 12
      Player.bonus = 1
      laserCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.laserBonus < 3) {
        laserPrices[i].innerHTML = '0 xp'
        Player.laserBonus = 3
        Player.xp = Player.xp - 500000
      }
    }
    playerXPContainer.innerHTML = 'xp : ' + Player.xp
  });
}

//hendler of the boost bonus
for (let i = 0; i < boostCustomButton.length; i++) {
  boostCustomButton[i].addEventListener('click', () => {
    if (i == 0) {
      clearButtons(boostCustomButton, 'bonus-button-selected')
      Player.boostPower = 0
      Player.boostNumberOfTime = 0
      boostCustomButton[i].classList.toggle('bonus-button-selected')
    }
    if (i == 1 && (Player.xp >= 5000 || Player.boost > 0)) {
      clearButtons(boostCustomButton, 'bonus-button-selected')
      Player.boostPower = 10
      Player.boostNumberOfTime = 1
      boostCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.boost < 1) {
        boostPrices[i].innerHTML = '0 xp'
        Player.boost = 1
        Player.xp = Player.xp - 5000
      }
    }
    if (i == 2 && (Player.xp >= 50000 || Player.boost > 1)) {
      clearButtons(boostCustomButton, 'bonus-button-selected')
      Player.boostPower = 20
      Player.boostNumberOfTime = 1
      boostCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.boost < 2) {
        boostPrices[i].innerHTML = '0 xp'
        Player.boost = 2
        Player.xp = Player.xp - 50000
      }
    }
    if (i == 3 && (Player.xp >= 500000 || Player.boost > 2)) {
      clearButtons(boostCustomButton, 'bonus-button-selected')
      Player.boostPower = 40
      Player.boostNumberOfTime = 1
      boostCustomButton[i].classList.toggle('bonus-button-selected')
      if (Player.boost < 3) {
        boostPrices[i].innerHTML = '0 xp'
        Player.boost = 3
        Player.xp = Player.xp - 500000
      }
    }
    playerXPContainer.innerHTML = 'xp : ' + Player.xp
  });
}

//handler of the trails color
for (let i = 0; i < trailCustomButton.length; i++) {
  trailCustomButton[i].addEventListener('click', () => {
    if (i == 0) {
      clearButtonsColor(trailCustomButton)
      Player.trail_color = 'rgb(66, 223, 244)'
      trailCustomButton[i].classList.toggle('selected-color-blue')
    }
    if (i == 1 && (Player.xp >= 5000 || Player.trail_color_number > 0)) {
      clearButtonsColor(trailCustomButton)
      Player.trail_color = 'rgb(255, 56, 81)'
      trailCustomButton[i].classList.toggle('selected-color-red')
      if (Player.trail_color_number < 1) {
        trailPrices[i].innerHTML = '0 xp'
        Player.trail_color_number = 1
        Player.xp = Player.xp - 5000
      }
    }
    if (i == 2 && (Player.xp >= 50000 || Player.trail_color_number > 1)) {
      clearButtonsColor(trailCustomButton)
      Player.trail_color = 'rgb(233, 113, 255)'
      trailCustomButton[i].classList.toggle('selected-color-rose')
      if (Player.trail_color_number < 2) {
        trailPrices[i].innerHTML = '0 xp'
        Player.trail_color_number = 2
        Player.xp = Player.xp - 50000
      }
    }
    if (i == 3 && (Player.xp >= 500000 || Player.trail_color_number > 2)) {
      clearButtonsColor(trailCustomButton)
      Player.trail_color = 'rgb(255, 250, 114)'
      trailCustomButton[i].classList.toggle('selected-color-yellow')
      if (Player.trail_color_number < 3) {
        trailPrices[i].innerHTML = '0 xp'
        Player.trail_color_number = 3
        Player.xp = Player.xp - 500000
      }
    }
    playerXPContainer.innerHTML = 'xp : ' + Player.xp
  });
}
//Add player xp to custom menu & open menu
customButton.addEventListener('click', function() {
  customContainer.classList.toggle('custom-main-container-selected')
  playerXPContainer.innerHTML = 'xp : ' + Player.xp
}, false)
//Close custom menu
returnCustomButton.addEventListener('click', function() {
  customContainer.classList.toggle('custom-main-container-selected')
}, false)
//Open controls menu
controlsButton.addEventListener('click', function() {
  controlsContainer.classList.toggle('controls-main-container-selected')
}, false)
//Close controls menu
returnControlsButton.addEventListener('click', function() {
  controlsContainer.classList.toggle('controls-main-container-selected')
}, false)
//Close options menu on pause
menuButton.addEventListener('click', () => {
  optionShow()
})
//Handler of sounds, if true play else no
for (let i = 0; i < soundButtons.length; i++) {
  soundButtons[i].addEventListener('click', () => {
    if (!soundPlay) {
      for (let j = 0; j < soundButtons.length; j++) {
        soundButtons[j].classList.add('sound-on')
      }
      soundPlay = true
    } else {
      for (let j = 0; j < soundButtons.length; j++) {
        soundButtons[j].classList.remove('sound-on')
      }
      soundPlay = false
    }
  })
}
//handler of particles, if true show else no
for (let i = 0; i < particlesButtons.length; i++) {
  particlesButtons[i].addEventListener('click', () => {
    if (!particles_display) {
      for (let j = 0; j < particlesButtons.length; j++) {
        particlesButtons[j].classList.add('particles-on')
      }
      particles_display = true
    } else {
      for (let j = 0; j < particlesButtons.length; j++) {
        particlesButtons[j].classList.remove('particles-on')
      }
      particles_display = false
    }
  })
}
//generate button, close everything & play without story
playGenerateButtton.addEventListener('click', () => {
  story = false
  homeContainer.classList.toggle('menu-container-unselected')
  homeContainer.classList.toggle('menu-container-selected')
  mainOptionContainer.classList.toggle('option-main-container-unselected')
  generateContainer.classList.toggle('generate-main-container-selected')
  resetLevel()
  optionShow()
  chronoStop()
  chronoReset()
  if (!autoRun) {
    autoRun = true
  }
})
//Show generate menu
generateMenu.addEventListener('click', function() {
  generateContainer.classList.toggle('generate-main-container-selected')
}, false)
//close generate menu
generateReturn.addEventListener('click', function() {
  generateContainer.classList.toggle('generate-main-container-selected')
}, false)
//show options menu
mainOptionButton.addEventListener('click', function() {
  mainOptionContainer.classList.toggle('option-main-container-unselected')
}, false)
//close options menu
mainOptionInnerButton.addEventListener('click', function() {
  mainOptionContainer.classList.toggle('option-main-container-unselected')
}, false)
//show in game option, pause the game & resume
function optionShow() {
  thrustSound.stop()
  menuButton.classList.toggle('button-open-animation')
  menuButton.classList.toggle('button-close-animation')
  menuContainer.classList.toggle('option-menu-container-selected')
  menuContainer.classList.toggle('menu-container-close')

  for (let i = 0; i < starSingleElement.length; i++) {
    starSingleElement[i].classList.toggle('single-star-element-show')
    starSingleElement[i].classList.toggle('shining-star')
  }
  for (let i = 0; i < menuButtonBar.length; i++) {
    menuButtonBar[i].classList.toggle('hidding-bar-effect-show')
  }
  if (playingState) {
    playingState = false
  } else {
    playingState = true
    chronoContinue()
  }
}
//old play button, still here if debugging, don't pay attention
document.getElementById('Play').addEventListener('click', function() {
  nextLevel()
  resetLevel()
  chronoStop()
  chronoReset()
  if (autoRun == false) {
    autoRun = true
  } else {
    autoRun = false
  }
}, false)
//motion blur options
for (let i = 0; i < motionBlurButtons.length; i++) {
  motionBlurButtons[i].addEventListener('click', () => {
    if (canvas_color == 'rgba(23, 41, 48, 1)') {
      for (let j = 0; j < motionBlurButtons.length; j++) {
        motionBlurButtons[j].classList.add('motion-blur-on')
      }
      canvas_color = 'rgba(23, 41, 48, 0.5)'
    } else {
      for (let j = 0; j < motionBlurButtons.length; j++) {
        motionBlurButtons[j].classList.remove('motion-blur-on')
      }
      canvas_color = 'rgba(23, 41, 48, 1)'
    }
  })
}
//close in game option
returnHome.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
})
//main play button w/ story true
playButtton.addEventListener('click', () => {
  story = true
  homeContainer.classList.toggle('menu-container-unselected')
  homeContainer.classList.toggle('menu-container-selected')
  resetLevel()
  optionShow()
  chronoStop()
  chronoReset()
  if (!autoRun) {
    autoRun = true
  }
})
//generate stars for the menu
function generateStarsMenu(starContainer) {
  let starElement = document.createElement('div')
  let random = 3000 + Math.ceil(Math.random() * 1000)
  starElement.classList.add('single-star-element')
  starElement.classList.add('single-star-element-show')
  starElement.classList.add('shining-star')
  starElement.style.left = `${Math.ceil(Math.random() * 100)}%`
  starElement.style.top = `${Math.ceil(Math.random() * 100)}%`
  starElement.style.width = `${Math.ceil(Math.random() * 10)}px`
  starElement.style.opacity = 50 + Math.ceil(Math.random() * 49) / 100
  starElement.style.height = starElement.style.width
  starElement.style.animationDelay = `${random}ms`
  starElement.innerHTML = ' '
  starContainer.appendChild(starElement)
}
//get generation options
function getSeedLevel() {
  let seed = document.getElementById('seed').value
  return seed
}

function getSizeElement() {
  let size = parseInt(document.getElementById('size').value)
  return size
}
//get nb elements, but not more than 1000 else its a mess
function getNumberOfElement() {
  let numberElements = parseInt(document.getElementById('numberElements').value)
  if (numberElements > 1000) {
    numberElements = 1000
  }
  if (numberElements < 0) {
    numberElements = 1
  }
  if (isNaN(numberElements)) {
    numberElements = 1
  }
  setNumberOfElement(numberElements)
  return numberElements
}

function getNumberOfSpacing() {
  let numberSpacing = parseInt(document.getElementById('numberSpacing').value)
  return numberSpacing
}
//set generation option
function setNumberOfSpacing(element) {
  document.getElementById('numberSpacing').value = element
}

function setNumberOfElement(element) {
  document.getElementById('numberElements').value = element
}

function setSizeElement(element) {
  document.getElementById('size').value = element
}

function setSeedLevel(element) {
  document.getElementById('seed').value = element
}
//if click on generate button, reset everything
document.getElementById('manualGenerate').addEventListener('click', function() {
  story = false
  nextLevel()
  resetLevel()
  if (autoGenerate == true) {
    console.clear()
    setElementInDOM()
  }
  traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())
}, false)
//if autoGenerate then auto generate
document.getElementById('autoGenerate').addEventListener('click', function() {
  story = false
  if (autoGenerate == true) {
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
    autoGenerate = false
  } else {
    autoGenerate = true
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
  }
}, false)
//set all elements of generation in dom
function setElementInDOM() {
  setSeedLevel(Math.ceil(Math.random() * 10000))
  setSizeElement(0.5 + Math.ceil(Math.random() * 200) / 100)
  setNumberOfElement(Math.ceil(Math.random() * 200))
  setNumberOfSpacing(50 + Math.ceil(Math.random() * 2000))
}
// finish handler, if dead, show menu
function finishLineHandler() {
  if (levelxp != 0 && Player.life > 0) {
    xpContainer.innerHTML = `xp gained : ${levelxp}`
    Player.xp += levelxp
    levelxp = 0
  }
  finishContainer.classList.add('finishing-container-show')
  variablesContainer.classList.add('finishing-variables-show')
  timerContaier.innerHTML = `Time taken : ${min}:${sec}:${msec}`
  totalXpContainer.innerHTML = `Total xp : ${Player.xp}`
  canvasButton.style.backgroundColor = "rgba(23, 41, 48, 1)"
  canvasButton.style.color = "white"
  chronoStop()
}
//continue button when dead or finish
canvasButton.addEventListener('click', () => {
  nextLevel()
})
//generate new level
function nextLevel() {
  Player.isFinished = false
  resetLevel()
  resetPlayer()
  VELOCITY = 10
  chronoResetVar()
  canvasButton.style.backgroundColor = "white"
  canvasButton.style.color = "rgba(23, 41, 48, 1)"
  finishContainer.classList.remove('finishing-container-show')
  variablesContainer.classList.remove('finishing-variables-show')
  //traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())
  for (let i = 0; i < traps.length; i++) {
    traps[i].posX += 2000
  }
}
