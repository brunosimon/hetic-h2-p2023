let NUMBER_OF_TRAPS = parseInt(document.getElementById('numberElements').value)
let autoRun = false
let VELOCITY = 0
let numberTrap = 0
const $canvas = document.querySelector('.js-canvas')
const ctx = $canvas.getContext('2d')
let sizeOfTraps = getSizeElement()
let windowWidth = $canvas.width
let windowHeight = $canvas.height
let autoGenerate = false
let debug = false
let curve = 0
let curve_speed = 0
let arrayLaser = new Array()
let particlesArray = new Array()
let explosionParticlesArray = new Array()
let finishingLinesArray = new Array()
let bgArray = new Array()
let keyPressed = false
let cooldown = false
let playingState = false
let parcouringLevel = false
let levelxp = 0
let canvas_color = 'rgba(23, 41, 48, 0.5)';
let particles_display = true
let soundPlay = true
let story = false;
let numberElementStory = 2
let sizeElementStory = 1
let spacinElementStory = 20
let allXp = 0
//first traps, doesn't serve much
let traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())
//Resize
const resize = () => {
  windowWidth = window.innerWidth
  windowHeight = window.innerHeight
  $canvas.width = windowWidth
  $canvas.height = windowHeight
  initBG()
}
// listen to resize
window.addEventListener('resize', resize)
resize()


function initCanvasSize() {
  game.width = screen.width
  game.height = screen.height
}

function updateLevelSize(width, heigth) {
  initCanvasSize()
}

//window frame loop
const loop = () => {
  window.requestAnimationFrame(loop)
  if (playingState) {
    gameLoop()
  }
  if (!playingState) {
    chronoStop()
  }
}
loop()

//Keymanagement
window.addEventListener("keydown", keyManagement, true)
window.addEventListener("keydown", function(e) {
  Player.keys[e.keyCode] = true
})
window.addEventListener("keyup", function(e) {
  Player.keys[e.keyCode] = false
})

//reset level
function resetLevel() {
  resetCanvas()
  initBG()
  explosionParticlesArray.splice(0, explosionParticlesArray.length + 1)
  if (story) {
    if (Player.life > 0) {
      setSeedLevel(Math.ceil(Math.random() * 10000))
      numberElementStory = 5 + Math.ceil(Math.random() * 100)
      sizeElementStory = 0.2 + Math.random() * 1.5
      spacinElementStory = 0 + Math.random() * 50
    }
    traps = generateTraps(autoGenerate, numberElementStory, sizeElementStory, spacinElementStory)
  } else {
    traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())
  }
  resetPlayer()
}

//reset Player
function resetPlayer() {
  Player.mouvement = true
  Player.life = 1
  Player.isFinished = false
  Player.directionDeath = 0
  Player.directionPlayer = true
  Player.posX = 500
  Player.boostNumberOfTime = 1
  Player.numberOfLaserGame = Player.numberOfLaser
  levelxp = 0
  VELOCITY = 0.1
}

//Main gameloop
function gameLoop() {
  redrawCanvas()
  drawAllElements(curve, curve_speed)
  trapDetectionPlayer()
  trapDetectionLaser(traps, arrayLaser)
  playerMouvement()
  playerLifeHandler()
  if (particles_display) {
    drawExplosion()
  }
  if (autoRun) {
    trapsMouvement(-1, VELOCITY)
    if (Player.life > 0 && soundPlay) {
      thrustSound.play()
    }
  } else {
    VELOCITY = 0
  }
  if (Player.life < 1) {
    thrustSound.stop()
  }
  if (Player.isFinished) {
    finishLineHandler()
  }
  if (Player.life < 1) {
    finishLineHandler()
  }
}

function generateTraps(auto, nbTraps, sizeTrap, spacingTrap) {
  let seedLevel = getSeedLevel()
  let startingPoint = 1000
  Math.seedrandom(seedLevel)
  let sizeOfTraps = sizeTrap
  let numberElements = nbTraps
  let spacing = spacingTrap
  let array = new Array()
  array.push(new Trap(1000, 0, numberElements + 1, 0, true, false))
  for (let i = 0; i < numberElements; i++) {
    startingPoint += 500
    array.push(new Trap(startingPoint, spacing, i, sizeOfTraps, false, false))
    startingPoint = startingPoint + spacing
  }

  array.push(new Trap(startingPoint + 2000, spacing, numberElements + 1, 0, false, true))
  return array
}

function resetCanvas() {
  ctx.fillStyle = 'rgba(23, 41, 58,1)'
  ctx.fillRect(0, 0, game.width, game.height)
}

function keyManagement(e) {
  e = e || window.event
  switch (e.keyCode) {
    case 38: // arrow up key
    case 90: //z key
      break
    case 40: // arrow down key
    case 83:
      break
    case 82: //left
      if (parcouringLevel) {
        chronoStop()
        resetLevel()
      }
      break
    case 39:
    case 69:
      if (parcouringLevel) {
        boost()
      }
      break
    case 27: //space
      optionShow()
      break
    default:
      break
  }
}
//redraw all canvas
function redrawCanvas() {
  ctx.fillStyle = canvas_color
  ctx.fillRect(0, 0, game.width, game.height)
}
//draw all traps
function drawTraps(width, heigth) {
  for (let i = 0; i < traps.length; i++) {
    ctx.font = "30px Poppins"
    if (traps[i].type == 0) {
      drawXP(traps[i])
    }
    if (traps[i].type == 1) {
      drawAsteroid(traps[i])
      if (debug) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(traps[i].posX, traps[i].posY, traps[i].width, traps[i].size)
      }
    }
    if (traps[i].type == 2) {
      drawBoost(traps[i])
    }
    if (traps[i].type == 3) {
      drawLines(traps[i])
    }
    if (traps[i].type == 4) {
      drawLines(traps[i])
    }
    if (debug) {
      ctx.fillText(traps[i].number, traps[i].posX, traps[i].posY - 10)
      ctx.fillText(Math.round(traps[i].posX), traps[i].posX + 50, traps[i].posY - 10)
    }
  }
}
//for debug only
function drawPlayerDebug() {
  if (debug) {
    ctx.fillText(Math.round(Player.posY), Player.posX, Player.posY - 10)
  }
}
//draw asteroids on traps position
function drawAsteroid(traps) {
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#bbbbbb'
  ctx.strokeStyle = "#454545"
  ctx.lineWidth = 3
  ctx.translate(traps.posX + traps.width / 2, traps.posY + traps.size / 2)
  ctx.rotate(traps.rotation * Math.PI / 180)
  ctx.translate(-traps.posX - traps.width / 2, -traps.posY - traps.size / 2)
  ctx.moveTo(traps.posX, traps.posY)
  ctx.lineTo(traps.posX + traps.size, traps.posY - 10)
  ctx.lineTo(traps.posX + traps.size + traps.asteroidPoint_1, traps.posY + traps.size / 3)
  ctx.lineTo(traps.posX + traps.size + traps.asteroidPoint_2, traps.posY + traps.size / 2.8)
  ctx.lineTo(traps.posX + traps.size + traps.asteroidPoint_3, traps.posY + traps.size / 2.5)
  ctx.lineTo(traps.posX + traps.size + traps.asteroidPoint_4, traps.posY + traps.size / 2)
  ctx.lineTo(traps.posX + traps.size, traps.posY + traps.size)
  ctx.lineTo(traps.posX + traps.size / 2, traps.posY + traps.size / 1.5)
  ctx.lineTo(traps.posX + traps.size / 3, traps.posY + traps.size / 1.2)
  ctx.lineTo(traps.posX, traps.posY + traps.size)
  ctx.lineTo(traps.posX + traps.size / 5, traps.posY + traps.size / 2)
  ctx.lineTo(traps.posX, traps.posY)
  ctx.stroke()
  ctx.fill()
  ctx.restore()
}
//draw boost
function drawBoost(boost) {
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.shadowColor = boost.color // Couleur de l'ombre
  ctx.shadowBlur = boost.size
  ctx.fillRect(boost.posX, boost.posY + boost.size / 1.5, boost.width, boost.size - boost.size / 1.5)
  ctx.restore()
}
//draw start & finish line
function drawLines(traps) {
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.shadowColor = traps.color // Couleur de l'ombre
  ctx.shadowBlur = 50 // Largeur du flou
  ctx.fillRect(traps.posX + 40, traps.posY, traps.width - 15, traps.size)
  ctx.restore()
}
//draw xp
function drawPoints() {
  allXp = Player.xp + levelxp
  ctx.fillStyle = "white"
  ctx.fillText('Difficulty : ' + Math.abs(Math.round(getDifficulty())), game.width - 300, 75)
  ctx.fillText('xp : ' + allXp, game.width - 500, 75)
  ctx.fillText(min + ' : ' + sec + ' : ' + msec, game.width - 700, 75)
}
//Draw all elements
function drawAllElements(curve, curve_speed) {
  drawBG()
  drawTraps()
  drawPoints()
  if (Player.life >= 1) {
    //drawShield()
    drawPlayer(curve, curve_speed)
  }
  drawLaserCount()
  drawPlayerDebug()
  drawParticle(particlesArray, game.width - 500, 100)
  drawLaser(arrayLaser)
}
//detect traps
function trapDetectionPlayer() {
  for (let i = 0; i < traps.length; i++) {
    if ((traps[i].posX < Player.posX) && (traps[i].posX + traps[i].width > Player.posX) && Player.life >= 0) {
      if (((traps[i].posY + traps[i].size > (Player.posY)) && ((Player.posY) > traps[i].posY)) ||
        ((traps[i].posY + traps[i].size > (Player.posY + Player.size)) && ((Player.posY + Player.size) > traps[i].posY)) ||
        ((traps[i].posY + traps[i].size > (Player.posY + Player.size / 2)) && ((Player.posY + Player.size / 2) > traps[i].posY))) {
        if (VELOCITY < 40 && traps[i].type == 2) {
          VELOCITY += 5
        }
        if (traps[i].type == 1) {
          Player.life -= 1
        }
        if (Player.life == 0) {
          traps[i].posY = 9000
        }
        if (traps[i].type == 3) {
          Player.isFinished = true
          parcouringLevel = false
        }
        if (traps[i].type == 4) {
          parcouringLevel = true
          chronoReset()
          chronoStart()
        }
        if (traps[i].type == 0) {
          particlesArray.push(new Particle(traps[i].posX, traps[i].posY))
          traps[i].posY = 10000
        }
      }
    }
  }
}
//check if player is dead
function playerLifeHandler() {
  if (Player.life <= 0) {
    VELOCITY = 0.1
    if (Player.speed && Player.directionPlayer) {
      Player.directionDeath = Player.speed
      for (let i = 0; i < 100; i++) {
        explosionParticlesArray.push(new Explosionparticles(Player.posX, Player.posY))
      }
      Player.directionPlayer = false
    }
    levelxp = 0
    parcouringLevel = false
    chronoStop()
  }
}
//handles death
function playerDeathHandler(directionDeath) {
  Player.speed = Player.directionDeath / 2
  Player.posX += 5
}
