const elements = document.querySelectorAll('.hud-piece')
const menuToggle = document.querySelector('.button-toggle-menu')
const menu = document.querySelector('.menu-container')
const container = document.querySelector('.hud-big-container')
const loaderContainer = document.querySelector('.loader-container')
const cubeElements = document.querySelectorAll('.cube-3d')
const rippleElements = document.querySelectorAll('.ripple-style')
const rippleContainer = document.querySelector('.ripple-container')
const cubeContainer = document.querySelector('.cube-container')
const waveContainer = document.querySelector('.wave-container')
const wavesHoverElements = document.querySelectorAll('.single-wave-container')
const wavesElements = document.querySelectorAll('.wave-style')
const rainContainer = document.querySelector('.rain-container')
const optionCubeButtons = document.querySelectorAll('.option-cube-selection')
const optionRippleSelection = document.querySelectorAll('.option-ripple-selection')
const optionRainSelection = document.querySelectorAll('.option-rain-selection')
const optionWaveSelection = document.querySelectorAll('.option-wave-selection')
for (let i = 0; i < wavesElements.length; i++) {
  wavesElements[i].style.height = '10px'
}
for (let i = 0; i < 100; i++) {
  generateRainElements(rainContainer)
}
wavesOnHover(wavesHoverElements, wavesElements);
//Option cube buttons
for (let i = 0; i < optionCubeButtons.length; i++) {
  optionCubeButtons[i].addEventListener('click', () => {
    clearButtons(optionCubeButtons)
    optionCubeButtons[i].classList.toggle('small-option-button-container-selected')
    if (i == 0) {
      cubeElements[0].classList.remove('changePlus')
      cubeElements[1].classList.remove('changeMinus')
    }
    if (i == 1) {
      cubeElements[0].classList.add('changePlus')
      cubeElements[1].classList.add('changeMinus')
    }
  });
}
//Option ripple buttons
for (let i = 0; i < optionRippleSelection.length; i++) {
  optionRippleSelection[i].addEventListener('click', () => {
    clearButtons(optionRippleSelection)
    optionRippleSelection[i].classList.toggle('small-option-button-container-selected')
    if (i == 0) {
      rippleContainer.style.width = "200px"
      rippleContainer.style.height = "200px"
    }
    if (i == 1) {
      rippleContainer.style.width = "400px"
      rippleContainer.style.height = "400px"
    }
    if (i == 2) {
      rippleContainer.style.width = "600px"
      rippleContainer.style.height = "600px"
    }
    if (i == 3) {
      rippleContainer.style.width = "1000px"
      rippleContainer.style.height = "1000px"
    }
  });
}
//Option rain button
for (let i = 0; i < optionRainSelection.length; i++) {
  optionRainSelection[i].addEventListener('click', () => {
    clearButtons(optionRainSelection)
    optionRainSelection[i].classList.toggle('small-option-button-container-selected')
    if (i == 0) {
      rainContainer.style.transform = "skewX(0deg)"
    }
    if (i == 1) {
      rainContainer.style.transform = "skewX(10deg)"
    }
    if (i == 2) {
      rainContainer.style.transform = "skewX(25deg)"
    }
    if (i == 3) {
      rainContainer.style.transform = "skewX(45deg)"
    }
  });
}
//Option wave buttons
for (let i = 0; i < optionWaveSelection.length; i++) {
  optionWaveSelection[i].addEventListener('click', () => {
    clearButtons(optionWaveSelection)
    optionWaveSelection[i].classList.toggle('small-option-button-container-selected')
    if (i == 0) {
      for (let i = 0; i < wavesElements.length; i++) {
        wavesElements[i].style.height = '10px';
        wavesElements[i].classList.add('wave-animation')
      }
    }
    if (i == 1) {
      for (let i = 0; i < wavesElements.length; i++) {
        wavesElements[i].style.height = '10px';
        wavesElements[i].classList.remove('wave-animation')
      }
    }
  });
}
//Rain button
elements[0].addEventListener('click', () => {
  rainContainer.style.visibility = 'visible'
  cubeContainer.style.visibility = 'hidden'
  rippleContainer.style.visibility = 'hidden'
  waveContainer.style.visibility = 'hidden'
})
//Cube button
elements[1].addEventListener('click', () => {
  cubeContainer.style.visibility = 'visible'
  rippleContainer.style.visibility = 'hidden'
  waveContainer.style.visibility = 'hidden'
  rainContainer.style.visibility = 'hidden'
})
//Wave button
elements[2].addEventListener('click', () => {
  waveContainer.style.visibility = 'visible'
  cubeContainer.style.visibility = 'hidden'
  rippleContainer.style.visibility = 'hidden'
  rainContainer.style.visibility = 'hidden'
})
//Ripple button
elements[3].addEventListener('click', () => {
  rippleContainer.style.visibility = 'visible'
  cubeContainer.style.visibility = 'hidden'
  waveContainer.style.visibility = 'hidden'
  rainContainer.style.visibility = 'hidden'
})
setTimeout(function() {
  loaderContainer.style.zIndex = '-15';
}, 2000);
window.addEventListener('mousemove', (_event) => {
  const x = (window.innerWidth / 2 - _event.clientX) / 300
  const y = (window.innerHeight / 2 - _event.clientY) / 100
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.transform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
  }
})
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open')
  menuToggle.classList.toggle('move')
  if (menu.classList.contains('open')) {
    menu.style.zIndex = '15'
  } else {
    setTimeout(function() {
      menu.style.zIndex = '-1'
    }, 1000);
  }
})

function clearButtons(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('small-option-button-container-selected');
  }
}

function wavesOnHover(wavesHoverElements, wavesElements) {
  for (let i = 0; i < wavesHoverElements.length; i++) {
    wavesHoverElements[i].addEventListener('mouseover', () => {
      if (wavesElements[i].style.height == '10px') {
        wavesElements[i].style.height = '100px'
      } else {
        wavesElements[i].style.height = '10px'
      }
    });
  }
}

function generateRainElements(rainContainer) {
  let rainElement = document.createElement('div')
  let random = Math.ceil(Math.random() * 5000);
  rainElement.classList.add('single-rain-element');
  rainElement.classList.add('rain-delay');
  rainElement.style.animationDelay = `${random}ms`;
  rainElement.style.left = `${Math.ceil(Math.random() * window.innerWidth)}px`;
  rainElement.innerHTML = ' ';
  rainContainer.appendChild(rainElement)
}
