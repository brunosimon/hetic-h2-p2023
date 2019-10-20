let xa ,xb ,za ,z
let circle = document.querySelector('.circle-1')
let arrowRight = document.querySelector('.right')
let arrowLeft = document.querySelector('.left')
let arrowUp = document.querySelector('.up')
let arrowDown = document.querySelector('.down')
xa=78
za=-25
window.addEventListener( 
  'keydown', function(e){
    e.preventDefault()
    if (e.keyCode==40 && xa>-12) {
        xa-=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
    if (e.keyCode==38 && xa<90) {
        xa+=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
    if (e.keyCode==37) {
        za+=10
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
    if (e.keyCode==39) {
        za-=10
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
  }
)

arrowDown.addEventListener(
    'click',function(){
        if (xa>-12){
        xa-=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
        }
    }
)
arrowUp.addEventListener(
    'click',function(){
        if (xa<90){
        xa+=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
        }
    }
)
arrowRight.addEventListener(
    'click',function(){
        za-=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
)
arrowLeft.addEventListener(
    'click',function(){
        za+=5
        circle.style.transform='rotateX( '+ xa +'deg) rotateZ( '+ za +'deg)'
    }
)