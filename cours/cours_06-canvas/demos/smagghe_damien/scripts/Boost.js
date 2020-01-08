// BOOST PROPERTIES AND DRAWING CLASS
class Boost {
    constructor(_width, _height, _context) {
        this.x = Math.random() * _width
        this.y = Math.random() * _height
        this.context = _context
    }

    draw() {
        this.context.save()
        this.context.beginPath()
        this.context.arc(this.x, this.y, 5, 0, Math.PI * 2)
        this.context.shadowOffsetX = 0
        this.context.shadowOffsetY = 0
        this.context.shadowBlur = 0
        this.context.fillStyle = 'green'
        this.context.fill()
        this.context.restore()
    }
}