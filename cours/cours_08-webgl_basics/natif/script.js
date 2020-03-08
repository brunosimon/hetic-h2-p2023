/**
 * Canvas
 */
const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 400
document.body.appendChild(canvas)

/**
 * GL context
 */
const gl = canvas.getContext('webgl')

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

/**
 * Shaders
 */

// Create shader function
const createShader = (_gl, _type, _source) =>
{
    // Compile
    const shader = _gl.createShader(_type)
    _gl.shaderSource(shader, _source)
    _gl.compileShader(shader)

    // Get success
    const success = _gl.getShaderParameter(shader, _gl.COMPILE_STATUS)

    if(success)
    {
        return shader
    }

    // Error
    console.warn('Error creatting shader', shader)
    _gl.deleteShader(shader)
}

// Shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
    attribute vec2 aPosition;
    attribute vec4 aColor;

    uniform vec2 uResolution;

    varying vec4 vColor;

    void main()
    {
        vec2 zeroToOne = aPosition / uResolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1.0, - 1.0), 0.0, 1.0);

        vColor = aColor;
    }
`)

const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;

    uniform vec4 uColor;

    varying vec4 vColor;

    void main()
    {
        gl_FragColor = vColor;
    }
`)

/**
 * Program
 */

// Create program function
const createProgram = (_gl, _vertexShader, _fragmentShader) =>
{
    // Link program
    const program = _gl.createProgram()
    _gl.attachShader(program, _vertexShader)
    _gl.attachShader(program, _fragmentShader)
    _gl.linkProgram(program)

    // Get success
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)

    if(success)
    {
        return program
    }

    // Error
    console.warn('Error creatting program', program)
    _gl.deleteProgram(program)
}

const program = createProgram(gl, vertexShader, fragmentShader)
gl.useProgram(program)

/**
 * Uniforms
 */

// Resolution
const resolutionUniformLocation = gl.getUniformLocation(program, 'uResolution')
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

// Color
const colorUniformLocation = gl.getUniformLocation(program, 'uColor')
gl.uniform4f(colorUniformLocation, 1.0, 0.0, 1.0, 1.0)

/**
 * Attributes
 */

// Position
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(positionAttributeLocation)
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

// Color
const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

const colorAttributeLocation = gl.getAttribLocation(program, 'aColor')
gl.enableVertexAttribArray(colorAttributeLocation)
gl.vertexAttribPointer(colorAttributeLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0)

/**
 * Draw shape
 */

// Position
const positions = [
    0, 0,
    100, 300,
    300,  100
]

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

// Color
const colors = [
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255
]

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW)

// Draw
gl.drawArrays(gl.TRIANGLES, 0, 3)