const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')
const canvasHeight = $canvas.height
const canvasWidth = $canvas.width
let targetCoordsX = 5
let targetCoordsY = 60
let lines = []
let targets = []
let targetNumber = 0
let score = 1
let highscore = localStorage.setItem('highscore', score)
const balls = []
const ballX = 290
const ballY = 690
const ballR = 10
const balldirX = 0
const balldirY = 0
let firstToGround = true
let thrown = false
let playing = false
const aim = {}
let aimX = 390
let explosions = []

// Mouse coordinates
const mouse = {
	x: 0,
	y: 0
}
// Event listner to update mouse coordinates
document.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX - $canvas.offsetLeft
	mouse.y = event.clientY - $canvas.offsetTop

})


//Clears the canvas
const clear = () => {
	context.clearRect(0, 0, $canvas.width, $canvas.height)
}

//Creates the landing page 
const newLandingPage = () => {
	clear()
	context.font = '40px Lucida Console'
	context.fillStyle = 'white'
	context.fillText('The canvas game', 130, 300)
	context.fillText('play', 250, 500)
	context.strokeStyle = 'white'
	context.setLineDash([0, 0])
	context.lineWidth = 8
	context.strokeRect(100, 450, 400, 75)
}


//Creates a new line that contains between 0 and 7 targets
const newLine = () => {
	for (let i = 0; i < 13; i++) {
		if (Math.random() >= 0.5) {
			const target = {}
			target.x = targetCoordsX
			target.y = targetCoordsY
			target.n = score
			targets.push(target)
		}
		targetCoordsX += 60
	}
	score++
	targetCoordsX = 5
}

//Draws the created lines of targets on the canvas
const drawLines = () => {
	for (const target of targets) {
		context.strokeStyle = 'white'
		context.setLineDash([0, 0])
		context.lineWidth = 6
		context.strokeRect(target.x, target.y, 50, 50)
		context.font = '20px Ostrich'
		context.fillStyle = 'white'
		//		Centers text in the target
		if (target.n < 10) {
			context.fillText(target.n, target.x + 22, target.y + 30)
		} else {
			context.fillText(target.n, target.x + 18, target.y + 30)
		}

	}

}

//Makes all the targets down at the end of the turn
const updateTargets = () => {
	for (const target of targets) {
		target.y += 60

		if (target.y >= 650) {
			gameLost()
		}
	}
}

//Create the balls 
const createBalls = () => {
	if (playing == true) {
		for (let i = 0; i < score - 1; i++) {
			const ball = {}
			ball.x = aimX
			ball.y = ballY
			ball.r = ballR
			ball.dx = (mouse.x - aimX) / 50
			ball.dy = ($canvas.height - mouse.y) / 50
			setTimeout(function () {
				balls.push(ball)
			}, 200 * i)

		}
	}
}

//Draw the balls on the canvas
const drawBalls = () => {
	for (const ball of balls) {
		context.beginPath()
		context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true)
		context.closePath()
		context.fill()
	}
}

//Creates the aim at the location of the first ball to ground on last turn
const createAim = () => {
	aim.x = aimX
	aim.y = 690

}

//Makes the aim visible only when aiming
const drawAim = () => {
	if (playing == true) {
		if (thrown == false) {
			context.beginPath()
			context.lineWidth = 5
			context.lineCap = 'round'
			context.setLineDash([1, 15])
			context.moveTo(aim.x, aim.y)
			context.lineTo(mouse.x, mouse.y)
			context.stroke()
		}
	}
}

//update the balls position (handle collision detection with canvas borders)
const updateBalls = () => {
	for (const ball of balls) {
		for (const target of targets) {
			collisionDetection(ball, target)
		}
		if (ball.x + ball.dx + ball.r >= $canvas.width) {
			ball.dx = -Math.abs(ball.dx)
		}
		if (ball.y + ball.dy + ball.r >= $canvas.height || ball.y + ball.dy - ball.r <= 0) {
			ball.dy = -ball.dy
		}
		if (ball.x + ball.dx - ball.r <= 0) {
			ball.dx = Math.abs(ball.dx)
		}

		ball.x += ball.dx
		ball.y += ball.dy
		if (ball.y + ball.dy + ball.r >= $canvas.height) {
			if (firstToGround) {
				aimX = ball.x
				firstToGround = false
			}
			balls.splice(balls.indexOf(ball), 1)
			if (balls.length == 0) {
				newTurn()
			}
		}
	}
}

//handle collision detection with targets and decrements their lives number 
//delete the targets when their life is 0 or under
const collisionDetection = (ball, target) => {
	let distX = Math.abs(ball.x - target.x - 50 / 2)
	let distY = Math.abs(ball.y - target.y - 50 / 2)

	if (distX >= (50 / 2 + ball.r)) {
		return false
	}
	if (distY >= (50 / 2 + ball.r)) {
		return false
	}
	if (distX <= (50 / 2)) {
		ball.dy = -ball.dy
		target.n--
			if (target.n <= 0) {
				createExplosion(target)

				targets.splice(targets.indexOf(target), 1)
			}
	} else if (distY <= (50 / 2)) {
		ball.dx = -ball.dx
		target.n--
			if (target.n <= 0) {
				createExplosion(target)

				targets.splice(targets.indexOf(target), 1)

			}
	} else if (distY <= (50 / 2) && distY <= (50 / 2)) {
		ball.dx = -ball.dx
		ball.dy = -ball.dy
		target.n--
			if (target.n <= 0) {
				createExplosion(target)

				targets.splice(targets.indexOf(target), 1)

			}
	}
}

//handle click event listener to throw balls once per turn and saves the position of the first ball to ground
const throwBalls = () => {
	document.addEventListener('click', () => {
		if (playing == true) {
			if (thrown == false) {
				createBalls()
				firstToGround = true
				thrown = true
			}
		}
	})
}


//creates particles with random velocities, colors and sizes when a target is destroyed
const createExplosion = (target) => {
	for (let i = 0; i < 100; i++) {
		const explosion = {}
		explosion.x = target.x
		explosion.y = target.y
		explosion.radius = 2 + Math.random() * 3
		explosion.vx = -5 + Math.random() * 10
		explosion.vy = -5 + Math.random() * 10
		explosion.color = `rgba(255, 255, 255, 0.9)`
		explosions.push(explosion)

	}

}

//draw particles on the canvas and delete them if they're outside of it
const drawExplosion = () => {
	if (playing == true) {
		context.globalCompositeOperation = 'lighter'
		for (const explosion of explosions) {
			context.beginPath()
			context.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2, false)
			context.fillStyle = explosion.color
			context.fill()
			explosion.x += explosion.vx
			explosion.y += explosion.vy
			if (
				explosion.x < 0 ||
				explosion.x > $canvas.width ||
				explosion.y < 0 ||
				explosion.y > $canvas.height
			) {
				explosions.splice(explosions.indexOf(explosion), 1)
			}

		}
	}
}
//Displays the actual score
const displayScore = () => {
	if (playing == true) {
		context.font = '30px Ostrich'
		context.fillStyle = 'white'
		context.fillText('Score :', 440, 40)
		context.fillText(score - 1, 540, 40)
	}
}

//start a new turn that create a new line of target and a new aim position
const newTurn = () => {
	updateTargets()
	createAim()
	newLine()
	throwBalls()
	thrown = false
}

//set the highscore
const newHighscore = () => {
	score = parseInt(score)
	highscore = parseInt(localStorage.getItem('highscore'))
	if (score >= highscore) {
		highscore = score
		localStorage.setItem('highscore', score)
	}
}
//display the lost game screen
const gameLost = () => {
	clear()
	playing = false
	newHighscore()
	context.font = '50px Ostrich'
	context.fillStyle = 'white'
	context.fillText('Better luck next time ...', 90, 100)
	context.fillText('Your score :', 195, 200)
	context.fillText(score, 295, 250)
	context.fillText('Best score :', 195, 340)
	context.fillText(highscore, 295, 390)
	context.fillText('Replay ?', 242, 500)
	context.strokeStyle = 'white'
	context.setLineDash([0, 0])
	context.lineWidth = 8
	context.strokeRect(100, 450, 400, 75)

}
//Handle click listenr on play and replay button
$canvas.addEventListener('click', () => {
	if (playing == false) {
		if (mouse.x >= 100 && mouse.x <= 500 && mouse.y >= 450 && mouse.y <= 525) {
			clear()
			newGame()
		}
	}
})

//animates the canvas game
const animateGame = () => {
	if (playing == true) {
		clear()
		drawLines()
		updateBalls()
		drawBalls()
		drawAim()
		drawExplosion()
		displayScore()
		window.requestAnimationFrame(animateGame)
	}
}

//Starts a new game
const newGame = () => {
	score = 1
	targets = []
	explosions = []
	playing = true

	//	Prevents the first ball to be thrown when clicking on play or replay button
	setTimeout(() => {
		newTurn()
		animateGame()

	}, 1)


}

newLandingPage()
