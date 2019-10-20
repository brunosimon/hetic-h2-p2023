const zAxis = document.querySelector(".zAxis");
const xAxis = document.querySelector(".xAxis");
const artifcialHorizon = document.querySelector(".layer-3")
const compass = document.querySelector(".dashbox")
const cameraXAxis = document.querySelector(".cameraXAxis")
const cameraYAxis = document.querySelector(".cameraYAxis")
const cameraZAxis = document.querySelector(".cameraZAxis")
const zqsd = document.querySelector(".zqsd")
let camUp = 0;
let camDown = 0;
let camLeft = 0;
let camRight = 0;
let vertical = 0;
let horizontal = 0;
let horizon = 0;
let lace = 0;
let compassDirection = 0;
let cameraVertical = 0;
let cameraHorizontal = 0;
let zqsdOn = true

/*----------------------------------------------------------------------------*/
/*   ---   SHIP MOVEMENTS   ---   */
/*----------------------------------------------------------------------------*/

cameraBehaviourHor = function()
{
  if (camLeft==1)
  {
    if(horizontal<30)
    {
      horizontal+=1
    }
    horizon-=1
  }
  else if (camLeft==0 && horizontal>0)
  {
    horizontal-=1
  }
  else if (camRight==1)
  {
    if(horizontal>-30)
    {
      horizontal-=1
    }
    horizon+=1
  }
  else if (camRight==0 && horizontal<0){
    horizontal+=1
  }
  lace = horizontal/2
  zAxis.style.transform = 'rotateZ(' + horizontal + 'deg) rotateY(' + lace + 'deg)'
  artifcialHorizon.style.transform = 'translateZ(-150px) rotateZ('+ horizon +'deg)'
  compassDirection += Math.sin(horizon/57,2958)
  compass.style.transform = 'translateX(' + compassDirection + 'px)'
  cameraHorizontal+=horizontal/100
  cameraYAxis.style.transform = 'translateY(-1250px) rotateY('+cameraHorizontal+'deg)'

}

cameraBehaviourVer = function()
{
  if (camUp==1 && vertical<30)
  {
    vertical+=1
  }
  else if (camUp==0 && vertical>0)
  {
    vertical-=1
  }
  else if (camDown==1 && vertical>-30)
  {
    vertical-=1
  }
  else if (camDown==0 && vertical<0){
    vertical+=1
  }
  xAxis.style.transform = 'rotateX(' + vertical + 'deg)'
  cameraVertical-=vertical/100
  cameraXAxis.style.transform = 'translateZ(800px) rotateX('+cameraVertical+'deg)'
}

cameraBehaviour = function()
{
  cameraBehaviourHor()
  cameraBehaviourVer()
}

setInterval(cameraBehaviour, 0.1)

window.addEventListener(
  'keydown',
  function(e)
  {
    if(e.keyCode == 90) /*FORWARD (Z)*/
    {
      camDown=0
      camUp=1
      if(zqsdOn)
      {zqsd.style.opacity = "0"}
    }
    else if(e.keyCode == 83) /*BACKWARD (S)*/
    {
      camDown=1
      camUp=0
      if(zqsdOn)
      {zqsd.style.opacity = "0"}
    }
    else if(e.keyCode == 81) /*LEFT (Q)*/
    {
      camLeft=0
      camRight=1
      if(zqsdOn)
      {zqsd.style.opacity = "0"}
    }
    else if(e.keyCode == 68) /*RIGHT (D)*/
    {
      camLeft=1
      camRight=0
      if(zqsdOn)
      {zqsd.style.opacity = "0"}
    }
  }
)

window.addEventListener(
  'keyup',
  function(e)
  {
    if(e.keyCode == 90) /*FORWARD (Z)*/
    {
      camUp=0
    }
    else if(e.keyCode == 83) /*BACKWARD (S)*/
    {
      camDown=0
    }
    else if(e.keyCode == 81) /*LEFT (Q)*/
    {
      camRight=0
    }
    else if(e.keyCode == 68) /*RIGHT (D)*/
    {
      camLeft=0
    }
  }
)
