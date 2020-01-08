const laserSound = new Sound('./sound/laser.mp3')
const explosionSound = new Sound('./sound/blast.mp3')
const thrustSound = new Sound('./sound/thrust.mp3')
thrustSound.sound.volume = 0.2
explosionSound.sound.volume = 0.5
laserSound.sound.volume = 0.5
//sound declaration
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}
