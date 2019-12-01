var canvas = document.querySelector('canvas'); // Recuperate canvas in the DOM
var context = canvas.getContext('2d');
var audio = document.querySelector('audio');


canvas.width = window.innerWidth; // Adapt the canvas to viewport
canvas.height = window.innerHeight; // width and height



var numberParticle = 750; //Generating particles



var mouse =
{
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2  
};



window.addEventListener("mousemove", function(event) 
{ 
    mouse.x = event.clientX - canvas.width / 2;  //Detect mouse moves
    mouse.y = event.clientY - canvas.height / 2;
});



window.addEventListener("resize", function() 
{ 
    canvas.width = window.innerWidth;	
    canvas.height = window.innerHeight;

    starParticles = [];
    particlesInit();
});




function StarLight(x, y, radius, color) 
{ 
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() 
    {

        this.draw();
    };

    this.draw = function() 
    {                                       //Particles drawing
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
        context.shadowColor = this.color;
        context.shadowBlur = 10;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    };
}




var starParticles = []; 

var timer = 0;
var opacity = 1;
var speed = 0.0007;
var colors = [
    "#FC35D1",
    "#35FC8F",
    "#E4F1FE",
    "#35D1FC",
    "#35A2FC",
];



var particlesInit;




(particlesInit = function() // Random spawn of particles
{
    for (var i = 0; i < numberParticle; i++) 
    {

        var randomColorIndex = Math.floor(Math.random() * 6);
        var randomRadius = Math.random() * 2;

        var x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;  // Generate particles past screen
        var y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;  // so there won't be any missing 
       starParticles.push(new StarLight(x, y, randomRadius, colors[randomColorIndex])); // star when canvas rotate
    }
})();




function animate() // Animation of the canvas
{  
    window.requestAnimationFrame(animate);

    context.save();
    if (isMouseDown === true) 
    {

        var newOpacity = 0.01;  // Ease into new opacity
        opacity += (newOpacity - opacity) * 0.25;
        context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";

        var newSpeed = 0.012;  // Ease into new speed
        speed += (newSpeed - speed) * 0.10;
        timer += speed;

    } else {

        var firstOpacity = 1;   // Ease back to  original opacity
        opacity += (firstOpacity - opacity) * 0.00050;
        context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";

        var firstSpeed = 0.001;  // Ease back to the original speed
        speed += (firstSpeed - speed) * 0.010;
        timer += speed;


    }

    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height/2 );
    context.rotate(timer);

    for (var i = 0; i < starParticles.length; i++) 
    {
        starParticles[i].update();
    }

    context.restore();

    
}

window.addEventListener('mousedown', () =>
{
    if (audio)
    {
    audio.play()
    } else 
    {
    $audio.pause()
    }
})

window.addEventListener('mouseup', () =>
{
    if (audio)
    {
    audio.pause()
    } else 
    {
    $audio.play()
    }
})



var isMouseDown = false;   //Basic mouse state                                          

window.addEventListener("mousedown", function()  // Lauch animation when mouse down
{                                                       
    isMouseDown = true;	
});


window.addEventListener("mouseup", function()   //Stop animation when mouse up
{ 
    isMouseDown = false;	
});

animate();


