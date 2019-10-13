const spaceJumpSound = document.querySelector('.spaceJumpSound') //spaceJumpSound is the sound which is launched after click on begin
const planetAppearance = document.querySelectorAll('.planet') //planetAppearance select all planets elements (all planets, planets shadow)
const sunAppearance = document.querySelector('.sun') //sunAppearance select sun element (sun of first animation)
const planetTwoAppearance = document.querySelectorAll('.planetTwo') //planetTwoAppearance select all planets elements of second appearance
const planetThreeAppearance = document.querySelectorAll('.planetThree') //planetThreeAppearance select all planets elements of third appearance
const navSpeed = document.querySelector('.AnimateElementsContainer')
const txtNavigation = document.querySelector('.txtNavigation')
const activeElements =
    [
        document.querySelector('.AnimateElementsContainer'), //animationContainer contains all of starry night animate element
        document.querySelector('.blackBox'), //blackBox is element to hide stars after click
        document.querySelector('.one'), //txtLaunchOne is number one of countdown
        document.querySelector('.two'), //txtLaunchTwo is number two of countdown
        document.querySelector('.three'), //txtLaunchThree is number three of countdown*/
        document.querySelector('.txtLaunch') //launch is home text, he's use to launch animation
    ]
let count = 0; //count is a counter of click number

activeElements[5].addEventListener('click', () => {
    if (count == 0) //lauch all of first animation elements in toggle active class
    {
        txtNavigation.classList.toggle('active')
        for (let j = 0; j < planetAppearance.length; j++) {
            planetAppearance[j].classList.toggle('active')
        }
        sunAppearance.classList.toggle('active')
    }
    else if (count == 1)  //lauch the end of first animation with toggle activeAfter class and launch all of second animation elements with toggle active class
    {
        for (let j = 0; j < planetAppearance.length; j++) {
            planetAppearance[j].classList.toggle('activeAfter')
        }
        sunAppearance.classList.toggle('activeAfter')

        for (let j = 0; j < planetAppearance.length; j++) {
            planetAppearance[j].classList.toggle('active')
        }
        sunAppearance.classList.toggle('active')

        for (let j = 0; j < planetTwoAppearance.length; j++) {
            planetTwoAppearance[j].classList.toggle('active')
        }
    }
    else if (count == 2)  //lauch the end of second animation with toggle activeAfter class and launch all of third animation elements with toggle active class
    {
        for (let j = 0; j < planetTwoAppearance.length; j++) {
            planetTwoAppearance[j].classList.toggle('activeAfter')
        }

        for (let j = 0; j < planetTwoAppearance.length; j++) {
            planetTwoAppearance[j].classList.toggle('active')
        }

        for (let j = 0; j < planetThreeAppearance.length; j++) {
            planetThreeAppearance[j].classList.toggle('active')
        }

        for (let j = 0; j < planetAppearance.length; j++) {
            planetAppearance[j].classList.toggle('activeAfter')
        }
        sunAppearance.classList.toggle('activeAfter')
    }
    else if (count == 3)  //lauch the end of third animation with toggle activeAfter class
    {
        for (let j = 0; j < planetThreeAppearance.length; j++) {
            planetThreeAppearance[j].classList.toggle('activeAfter')
        }

        for (let j = 0; j < planetThreeAppearance.length; j++) {
            planetThreeAppearance[j].classList.toggle('active')
        }

        for (let j = 0; j < planetTwoAppearance.length; j++) {
            planetTwoAppearance[j].classList.toggle('activeAfter')
        }

        count = -1; //initialise count at the end of third animation to start again animation
    } //remove activeAfter elements to initialize 
    else if (count == 4) {
        for (let j = 0; j < planetThreeAppearance.length; j++) {
            planetThreeAppearance[j].classList.toggle('activeAfter')
        }

    }

    count++ // increase with each click to counter

    for (let i = 0; i < activeElements.length; i++) //launch all of speed jump element with toggle active class
    {
        activeElements[i].classList.toggle('active');
    }

    setTimeout(() => { //launch transition after jump to move during the high speed travel
        navSpeed.style.transition = "ease 0.5s";
    },
        3300)

    setTimeout(() => { //Remove transition property to limited speed of move after the high speed travel
        navSpeed.style.removeProperty('transition');
    },
        11050)

    spaceJumpSound.play() //Lanch spaceJumpSound at the beginin of speed jump animation

    setTimeout(() => { //This setTimeout function is to remove 'active' class in the end of animation to initialize
        for (let i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.toggle('active')
        }

    },
        12500)
})

