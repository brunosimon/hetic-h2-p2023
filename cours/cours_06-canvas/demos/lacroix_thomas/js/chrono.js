//declaration of the chronometer variables
let startTime = 0
let start = 0
let end = 0
let diff = 0
let timerID = 0
let msec = 00
let sec = 00
let min = 00

function chrono() {
  //init chrono
  end = new Date()
  diff = end - start
  diff = new Date(diff)
  msec = diff.getMilliseconds()
  sec = diff.getSeconds()
  min = diff.getMinutes()
  var hr = diff.getHours() - 1
  //print chrono
  if (min < 10) {
    min = "0" + min
  }
  if (sec < 10) {
    sec = "0" + sec
  }
  if (msec < 10) {
    msec = "00" + msec
  } else if (msec < 100) {
    msec = "0" + msec
  }
  //refresh time
  timerID = setTimeout("chrono()", 16)
}
//Chrono start
function chronoStart() {
  start = new Date()
  chrono()
}
//Chrono continue
function chronoContinue() {
  start = new Date() - diff
  start = new Date(start)
  chrono()
}
//Chrono reset
function chronoReset() {
  start = new Date()
}
//chrono stop
function chronoStop() {
  clearTimeout(timerID)
}
//Chrono reset var
function chronoResetVar() {
  msec = 0
  sec = 0
  min = 0
}
