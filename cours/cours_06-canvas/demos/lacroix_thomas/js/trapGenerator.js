function Trap(startingPoint, spacing, number, sizeOfTraps, start, finish) {
  this.type = Math.floor(Math.random() * 3);
  if (this.type != 1) {
    if (Math.round(Math.random()) == 1) {
      this.type = 1
    }
  }
  if (finish) {
    this.type = 3
  }
  if (start) {
    this.type = 4
  }
  this.number = number;
  //if bonus
  if (this.type == 0) {
    this.size = parseInt(20 + Math.random() * 10);
    this.posY = parseInt(Math.random() * (game.height - this.size));
    this.width = this.size;
    this.color = "#ff6501";
  }
  if (this.type == 1) {
    this.size = parseInt(50 + Math.random() * 70 * sizeOfTraps);
    this.posY = parseInt(Math.random() * (game.height - this.size));
    this.width = parseInt(50 + Math.random() * 70);
    this.color = "#ff5041";
    this.rotation = Math.ceil(Math.random() * 360)
    this.asteroidPoint_1 = -5 + (Math.random() * 7)
    this.asteroidPoint_2 = -5 + (Math.random() * 7)
    this.asteroidPoint_3 = -5 + (Math.random() * 7)
    this.asteroidPoint_4 = -5 + (Math.random() * 7)
  }
  if (this.type == 2) {
    this.size = parseInt(20 + Math.random() * 20 * sizeOfTraps);
    this.posY = parseInt(Math.random() * (game.height - this.size));
    this.width = parseInt(100 + Math.random() * 500);
    this.color = "#12fa21";
  }
  if (this.type == 3) {
    this.size = game.height * 4
    this.posY = 0
    this.width = 40;
    this.color = "red";
  }
  if (this.type == 4) {
    this.size = game.height * 4
    this.posY = 0
    this.width = 30;
    this.color = "blue";
  }
  this.posX = startingPoint + this.width + parseInt(-spacing / 2 + Math.random() * (spacing))
}
//move traps
function trapsMouvement(direction, speed) {
  for (let i = 0; i < traps.length; i++) {
    traps[i].posX = traps[i].posX + (speed * direction);
  }
}
