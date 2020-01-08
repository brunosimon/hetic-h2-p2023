const Player = {}
Player.posX = 500;
Player.posY = 500;
Player.width = 25;
Player.size = 25;
Player.color = '#454554';
Player.velY = 0;
Player.velX = 0;
Player.speed = 0;
Player.friction = 0.95;
Player.keys = [];
Player.mouvement = true;
Player.life = 1
Player.isFinished = false
Player.xp = 9999999
Player.trail_color = 'rgb(66, 223, 244)'
Player.trail_color_number = 0
Player.trail_size = 20
Player.bonus = 0
Player.laserBonus = 0
Player.numberOfLaser = 1
Player.numberOfLaserGame = 1
Player.bonusNumber = 3
Player.boost = 0
Player.boostPower = 0
Player.boostNumberOfTime = 0
Player.rotation = 1
Player.directionPlayer = true
Player.directionDeath = 0
//player boost
function boost() {
  if (Player.boost > 0 && Player.boostNumberOfTime > 0) {
    VELOCITY += Player.boostPower
    Player.boostNumberOfTime--
  }
}
//player mouvement & key management for player
function playerMouvement() {
  Player.speed *= Player.friction
  Player.posY += Player.speed
  if (VELOCITY >= 15) {
    VELOCITY *= 0.995
  }
  if (VELOCITY < 14) {
    VELOCITY *= 1.1
  }
  if (VELOCITY > 13 && VELOCITY < 15) {
    VELOCITY = 15
  }
  if ((Player.keys[38] || Player.keys[90]) && Player.mouvement) {
    Player.speed += -0.5 * 1.2
  }

  if ((Player.keys[40] || Player.keys[83]) && Player.mouvement) {
    Player.speed += 0.5 * 1.2
  }
  if ((Player.keys[32] || Player.keys[65]) && Player.life > 0 && parcouringLevel && Player.numberOfLaser > 0) {
    if (!keyPressed && Player.bonus == 0) {
      playerShoot(Player, 0)
      keyPressed = true
    }
    if (!keyPressed && Player.bonus == 1) {
      for (let i = 0; i < Player.bonusNumber; i++) {
        playerShoot(Player, (Player.bonusNumber / 2 - i))
      }
      keyPressed = true
    }
  }
  if ((Player.keys[32]) && (Player.isFinished || Player.life < 1)) {
    nextLevel()
  }
  if (Player.posY + Player.size > game.height && Player.life != 0) {
    Player.posY = game.height - Player.size - 1
    Player.speed = 0
  }
  if (Player.posY < 0 && Player.life != 0) {
    Player.posY = 1
    Player.speed = 0
  }
}
//draw & rotate the player
function drawPlayer(curve, curve_speed) {
  curve_speed = -Player.speed * 3
  curve += curve_speed + (Player.posY + Player.size / 2)
  ctx.save()
  ctx.beginPath();
  ctx.lineWidth = 20 // Largeur de la ligne
  const gradient = ctx.createLinearGradient(Player.posX - ((Player.trail_size * VELOCITY) / 1.5), 2000, 500, 2000) // x1, y1, x2, y2
  gradient.addColorStop(0, 'rgba(0,0,0,0)') // Couleur de départ
  gradient.addColorStop(1, Player.trail_color) // Couleur de arrivée
  ctx.strokeStyle = gradient
  ctx.moveTo(Player.posX, (Player.posY + Player.size / 2))
  ctx.quadraticCurveTo(Player.posX - ((Player.trail_size * VELOCITY) / 4), (Player.posY + Player.size / 2), Player.posX - ((Player.trail_size * VELOCITY) / 1.3), curve);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = Player.color;
  ctx.strokeStyle = "#aa7870";
  ctx.translate(Player.posX + Player.size / 2, Player.posY + Player.size / 2);
  ctx.rotate(Player.rotation * Player.speed * 1.5 / 180);
  ctx.translate(-Player.posX - Player.size / 2, -Player.posY - Player.size / 2);
  ctx.lineWidth = 2
  ctx.moveTo(Player.posX, Player.posY);
  ctx.lineTo(Player.posX + Player.size, Player.posY + Player.size / 2);
  ctx.lineTo(Player.posX, Player.posY + Player.size);
  ctx.lineTo(Player.posX, Player.posY);
  ctx.stroke();
  ctx.fill();
  ctx.restore()
}
