// Set variables
const $player = document.querySelector('.container')
const $song = document.querySelector('.song-1')
const $volume = $player.querySelector('.soundCube')
const $volumeZero = $volume.querySelector('.volume-0')
const $volumeOne = $volume.querySelector('.volume-1')
const $volumeTwo = $volume.querySelector('.volume-2')
const $volumeThree = $volume.querySelector('.volume-3')
const $playPause = $player.querySelector('.playCube')
const $speed = $player.querySelector('.speedCube')
const $playButton = $playPause.querySelector('.play')
const $playIcon = $playPause.querySelector('.playIcon')
const $pauseIcon = $playPause.querySelector('.pauseIcon')
const $pauseButton = $playPause.querySelector('.pause')
const $playPauseFace = $player.querySelector('.playCube .face')
const $backgroundTimer = $player.querySelector('.timer')
const $cubeTimer = $player.querySelector('.playCube .face-6 .cubeTimer')
const $playSeekBar = $player.querySelector('.seek-bar-one')
const $soundSeekBar = $player.querySelector('.seek-bar-two')
const $speedSeekBar = $player.querySelector('.seek-bar-three')
const $CubesReferentiel = $player.querySelector('.referentiel-2')
const $groundLines = $player.querySelector('.groundLines')

// Set booleans
let grabbing = false
let grabbingTwo = false
let grabbingThree = false

// Display song's time after metadata charging
$song.onloadedmetadata = () => 
{
	console.log('data charged')
	$backgroundTimer.innerHTML = `<p>${convertTime($song.currentTime)}/${convertTime($song.duration)}</p>`
	$cubeTimer.innerHTML = `<p>${convertTime($song.currentTime)}/${convertTime($song.duration)}</p>`
}

// Listening mousedown on play cube
$playPause.addEventListener('mousedown', (event) => 
{
	// Prevent default event (text selection)
	event.preventDefault()

	// Upgrade grabbing statue
	grabbing = true

	// Upgrade style of cursor : grabbing
	$playPause.style.cursor = '-webkit-grabbing'

	// Disable animation when mousedown on play cube
	$groundLines.style.animation = 'none'

	document.addEventListener('mousemove', (event) => 
	{
		// Prevent default event (text selection)
		event.preventDefault()

		// Update position of plau cube
		updateCubePosition($playPause, $playPauseFace, grabbing)


		if(grabbing == true)
		{

		// Calculette the timing ratio 
		const ratio = (event.clientX - $CubesReferentiel.offsetLeft) / $CubesReferentiel.offsetWidth
		// Calculette audio  current time
		const audioTime = ratio * $song.duration

		// Update song current time
		$song.currentTime = audioTime
		}
	})

	document.addEventListener('mouseup', (event) => 
	{
		// Prevent default event (text selection)
		event.preventDefault()

		// Upgrade grabbing statue
		grabbing = false

		// Upgrade style of cursor : grab
		$playPause.style.cursor = '-webkit-grab'
		
		// Stop animation when mouseup on document and when song is on pause
		$song.paused ? $groundLines.style.animation = 'none' : $groundLines.style.animation = 'groundHorizontalLinesTranslateY 2s linear infinite'
	})
})

// Listening mousedown on volume cube
$volume.addEventListener('mousedown', (event) => 
{
	// Prevent default event (text selection)
	event.preventDefault()

	// Update grabbing two statue
	grabbingTwo = true

	// Update style of cursor : grabbing
	$volume.style.cursor = '-webkit-grabbing'

	document.addEventListener('mousemove', (event) => 
	{
		
		// Update cube position
		updateCubePosition($volume, $playPauseFace, grabbingTwo)
		
		if(grabbingTwo == true)
		{
			// Update audio current time
			let ratio = (event.clientX - $CubesReferentiel.offsetLeft) / $CubesReferentiel.offsetWidth 
		
			// Stop the maximum volume at 1
			if(ratio > 1)
			{
				ratio = 1
			}
			// Stop the minimum volume at 0 and upadte volume-0 image
			else if(ratio < 0)
			{
				ratio = 0
				$volumeOne.style.opacity = '0'
				$volumeTwo.style.opacity = '0'
				$volumeThree.style.opacity = '0'
				$volumeZero.style.opacity = '1'
			}
			// Update volume-1 image 
			else if(ratio > 0 && ratio <= 0.33)
			{
				$volumeZero.style.opacity = '0'
				$volumeTwo.style.opacity = '0'
				$volumeThree.style.opacity = '0'
				$volumeOne.style.opacity = '1'
			}
			// Update volume-2 image 
			else if(ratio > 0.33 && ratio <= 0.66)
			{
				$volumeZero.style.opacity = '0'
				$volumeOne.style.opacity = '0'
				$volumeThree.style.opacity = '0'
				$volumeTwo.style.opacity = '1'
			}
			// Update volume-3 image 
			else if(ratio > 0.66 && ratio <= 1)
			{
				$volumeZero.style.opacity = '0'
				$volumeOne.style.opacity = '0'
				$volumeTwo.style.opacity = '0'
				$volumeThree.style.opacity = '1'
			}

			// Update the song volume 
			$song.volume = ratio
		
		}

		document.addEventListener('mouseup', (event) => 
		{
			// Prevent default event (text selection)
			event.preventDefault()
	
			// Upgrade grabbing statue
			grabbingTwo = false
	
			// Upgrade style of cursor : grab
			$volume.style.cursor = '-webkit-grab'
		})
	})	
})

// Listening when mouse down on speed cube
$speed.addEventListener('mousedown', (event) => 
{
	// Prevent default event (text selection)
	event.preventDefault()

	// Update grabbing statue
	grabbingThree = true

	// Update cursor style : grabbing
	$speed.style.cursor = '-webkit-grabbing'

	// Listening when mousemove on document
	document.addEventListener('mousemove', (event) => 
	{
		// When speed cube has grabbing
		if(grabbingThree == true)
		{
			// Calculate ratio to have a value between 0.5 and 1.5
			let ratio = (event.clientX - $CubesReferentiel.offsetLeft) / $CubesReferentiel.offsetWidth + 0.5

			// Stop ratio at 0.5 at start
			if(ratio <= 0.5)
			{
				ratio = 0.5
			}
			// Stop ratio at 1.5 at end
			else if(ratio >=1.5)
			{
				ratio = 1.5
			}
			// Help the user to choose the initial speed
			else if(ratio > 0.96 && ratio < 1.04)
			{
				ratio = 1
				$speed.style.transition = 'transform 0.2s ease'
			}
			// Disable transition when speed cube is not in middle
			else if(ratio < 0.96 || ratio > 1.04)
			{
				$speed.style.transition = 'none'
			}
			
			// Active the 'insane mode' when speed is lower than 0.7
			if(ratio < 0.7)
			{
				$player.style.animation = 'insaneMode 10s ease infinite alternate'
			}
			// Disable 'insane mode' when speed higher than 0.7
			else if(ratio > 0.7)
			{
				$player.style.animation = 'none'
			}

			// Update audio speed
			$song.playbackRate = ratio;
		}
	})

	// Listen when mouse up on the document
	document.addEventListener('mouseup', (event) => 
	{
		// Prevent default event (text selection)
		event.preventDefault()

		// Calculate speed ratio to have a interval between 0.5 and 1.5
		let ratio = 1 / ((event.clientX - $CubesReferentiel.offsetLeft) / $CubesReferentiel.offsetWidth + 0.5)

		// Upgrade grabbing statue
		grabbingThree = false

		// Upgrade style of cursor : grab
		$speed.style.cursor = '-webkit-grab'

		// Stop and run ground lines animation when paused and played
		if($song.paused)
		{
			$groundLines.style.animation =`groundHorizontalLinesTranslateY ${ratio}s linear infinite`
			$groundLines.style.animationPlayState = 'paused'
		}
		else
		{
			$groundLines.style.animation =`groundHorizontalLinesTranslateY ${ratio}s linear infinite`
			$groundLines.style.animationPlayState = 'running'
		}
	})
})

// Update playCube position and the ground lines when you drag play cube
$song.addEventListener('timeupdate', () => 
{
	// Update the playCube position at the current time
	const ratio = ($song.currentTime / $song.duration * ($CubesReferentiel.offsetWidth - $playPauseFace.offsetWidth))
	let groundLinesRatio = ratio * 5
	
	// Display the update time of timers
	updateTime()

	// Initialize the translateY of ground lines when is higher than 85px to make a infinite bearing effect
	if(groundLinesRatio > 85)
	{
		groundLinesRatio %=85
	}
	
	// Display update of play cube position when time update
	$playPause.style.transform = `translateX(${ratio}px) translateZ(3vw)`

	// Display update of ground lines position when time update
	$groundLines.style.transform = `translateX(-50%) rotateX(75deg) scaleY(4) scaleX(7) translateY(${groundLinesRatio}px)`
})

$song.addEventListener('volumechange', () => 
{
	// Calculate the volume ratio
	const ratio = $song.volume * ($CubesReferentiel.offsetWidth - ($playPauseFace.offsetWidth))

	// Display changed position of play cube
	$volume.style.transform = `translateX(${ratio}px) translateZ(3vw)`
})

$song.addEventListener('ratechange', () => 
{
	// Calculate the ratechange ratio
	const ratio = ($song.playbackRate - 0.5) * ($CubesReferentiel.offsetWidth - ($playPauseFace.offsetWidth))

	// Display changed position of speed cube
	$speed.style.transform = `translateX(${ratio}px) translateZ(3vw)`
})


$playButton.addEventListener('click', (event) => 
{
	event.preventDefault()

	// Song is played 
	$song.play()
	
	// Toggle active class on all of the elements which change apparance when played
	$playButton.classList.toggle('active')
	$pauseButton.classList.toggle('active')
	$playIcon.classList.toggle('active')
	$pauseIcon.classList.toggle('active')
	$groundLines.classList.toggle('active')
	$groundLines.style.animation = `groundHorizontalLinesTranslateY ${speedUpdateGroundLines()}s linear infinite`
})

$pauseButton.addEventListener('click', (event) => 
{
	event.preventDefault()

	// Song is paused 
	$song.pause()

	// Toggle active class on all of the elements which change apparance when paused
	$playButton.classList.toggle('active')
	$pauseButton.classList.toggle('active')
	$playIcon.classList.toggle('active')
	$pauseIcon.classList.toggle('active')
	$groundLines.classList.toggle('active')
	$groundLines.style.animation = 'none'
})

const updateCubePosition = (playPauseCube, playPauseCubeFaces, grabbing) => 
{
	if (grabbing == true) {
		// Calculate the cursor position at the seekBar
		let mousePosX = event.clientX - $CubesReferentiel.offsetLeft - playPauseCubeFaces.offsetWidth / 2

		// Stop the dragging of Cube at the beginning and at the end
		if (mousePosX > $CubesReferentiel.offsetWidth - playPauseCubeFaces.offsetWidth) 
		{
			mousePosX = $CubesReferentiel.offsetWidth - playPauseCubeFaces.offsetWidth
		}
		else if (mousePosX < 0) 
		{
			mousePosX = 0
		}
	}
}

// Function to display the updating time
const updateTime = () => 
{
	// Display on the background
	$backgroundTimer.innerHTML = `<p>${convertTime($song.currentTime)}/${convertTime($song.duration)}</p>`

	// Display on the play cube
	$cubeTimer.innerHTML = `<p>${convertTime($song.currentTime)}/${convertTime($song.duration)}</p>`

	// When song is finish
	if(Math.floor($song.currentTime) == Math.floor($song.duration))
	{
		$groundLines.style.animationPlayState = 'paused'

		if($song.paused == false)
		{
			// Toggle active class on all of the elements which change apparance when paused
			$playButton.classList.toggle('active')
			$playIcon.classList.toggle('active')
			$pauseButton.classList.toggle('active')
			$pauseIcon.classList.toggle('active')
		}
	}
}

// Function to convert seconds in minutes and seconds like 00 : 00
const convertTime = (time) =>
{
	// Set variables
	let timeInMinute = Math.floor(time / 60)
	let timeInSecond = Math.floor(time - timeInMinute * 60)
	let convertDone = ''

	// Adds a zero when number of second is lower than 10
	if(timeInSecond < 10)
	{
		timeInSecond = '0' + timeInSecond
	}

	// Display minutes and seconds
	convertDone = timeInMinute + ':' + timeInSecond

	return convertDone
}


	


const speedUpdateGroundLines = () => 
{
	// Calculate speed ratio to have a interval between 0.5 and 1.5
	let ratio = 1 / ((event.clientX - $CubesReferentiel.offsetLeft) / $CubesReferentiel.offsetWidth + 0.5)

	return ratio
}
