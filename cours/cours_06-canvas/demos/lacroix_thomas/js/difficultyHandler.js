//Calculate the overall difficulty of the level
function getDifficulty() {
  let difficulty = (difficultyOfSize() + difficultyNumberOfElements() + difficultySpacingAverage())
  return difficulty
}
//determines w/ nb elements
function difficultyNumberOfElements() {
  if (getNumberOfElement() < 10000) {
    difficultyOfElements = 5
  }
  if (getNumberOfElement() < 200) {
    difficultyOfElements = 4
  }
  if (getNumberOfElement() < 100) {
    difficultyOfElements = 3
  }
  if (getNumberOfElement() < 50) {
    difficultyOfElements = 2
  }
  if (getNumberOfElement() < 30) {
    difficultyOfElements = 1
  }
  return difficultyOfElements
}
//Calculate de difficulty of the spacing
function difficultySpacingAverage() {
  let sum = 0
  for (let i = 1; i < traps.length - 2; i++) {
    sum = sum + (traps[i + 1].posX - traps[i].posX)
  }
  let avg = sum / traps.length - 2
  let difficultyElement = 0
  if (avg < 1000) {
    difficultyElement = 1
  }
  if (avg < 500) {
    difficultyElement = 2
  }
  if (avg < 300) {
    difficultyElement = 3
  }
  if (avg < 200) {
    difficultyElement = 4
  }
  if (avg < 100) {
    difficultyElement = 5
  }
  return difficultyElement
}
//Calculate de difficulty of the spacing
function difficultyOfSize() {
  let difficultyElement = getSizeElement()
  return difficultyElement
}
