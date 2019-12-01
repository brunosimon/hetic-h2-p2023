const $canvas = document.querySelector("canvas")
const $info = document.querySelector("h1.title")
const context = $canvas.getContext('2d')
// Define particles colors
const color = [
  '#334D6C',
  '#45B28D',
  '#EFC93C',
  '#E26A3F',
  '#DF5A48'
]
// Size of particles
const radius = 20
// Number of Particles
let nbParticle = 10

// Info message
document.addEventListener("mousedown", () =>
{
  $info.setAttribute('class','title_hidden')
})

// Resize window
const resize = () => 
{
   $canvas.width = window.innerWidth
   $canvas.height = window.innerHeight
}

window.addEventListener('resize', resize)
resize()

// Save position of the mouse
const mouse = { x: 0, y: 0 }
document.addEventListener("mousemove", (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Function to generate a random number between "min" & "max"
function random(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Create particle
const particle = function(x, y, radius, color)
{
  this.radius = Math.floor(Math.random() * radius)
  this.color = color
  this.dx = (Math.random()) * 10
  this.dy = (Math.random()) * 10
  this.pos = { x : x, y : y }
}

// Object to generate physics of particles
particle.prototype.update = function()
{
  this.pos.x += this.dx 
  this.pos.y += this.dy
    if(this.pos.x + this.radius >= $canvas.width || this.pos.x - this.radius < 0)
    {
      this.dx = -this.dx
    }
    if(this.pos.y > $canvas.height || this.pos.y < 0)
    {
      this.dy = -this.dy
    }
    if (this.pos.x + radius * 2 > mouse.x && mouse.x != 0)
    {
      this.dx -= 1
    }
    if (this.pos.x < mouse.x - radius * 2 && mouse.x != 0)
    {
      this.dx += 1.5
    }
    if (this.dx > 10)
      this.dx -=1

    if (this.pos.y + radius * 2 > mouse.y + radius * 2 && mouse.y != 0)
    {
      this.dy -= 1
    }
    if (this.pos.y < mouse.y - radius * 2 && mouse.y != 0)
    {
      this.dy += 2
    }
    if (this.dy > 10)
      this.dy -=1
}

// Draw particles
particle.prototype.render = function()
{
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.strokeStyle = this.color
    context.fill()
    context.stroke()
}

// Push particles in Array
const particleArray = []
for (let i = 0; i < nbParticle ; i++) 
{
    let middleX = $canvas.width / 2
    let middleY = $canvas.height / 2
    particleArray.push(new particle(middleX,middleY, radius, color[Math.floor(Math.random() * color.length)]))
}
context.fillStyle = "rgba(0,0,0,0.1)"
context.fillRect(0,0,$canvas.width,$canvas.height)
context.fill()

// New particle on click
document.addEventListener("mousedown", () =>
{
    let middleX = $canvas.width / 2
    let middleY = $canvas.height / 2
    particleArray.push(new particle(middleX,middleY, radius, color[Math.floor(Math.random() * color.length)]))
     nbParticle ++
})

// Loop function
const loop = () => 
{
    context.fillStyle='rgb(36, 43, 49)'
    context.fillRect(0, 0, $canvas.width, $canvas.height)
   for (let i = 0; i < particleArray.length ; i++) {
     particleArray[i].update()
     particleArray[i].render()
   }
   requestAnimationFrame(loop)
}
loop()