//word list
const wordList = [
    'pot', 'luck', 'gold', 'clover', 'parade', 'shamrock', 'blarney', 'ireland', 'rainbow', 'leprechaun'
]

//declare variable 
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

//start game function
function startGame(level) {
    //reset game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level)

    displayedWord = '_'.repeat(selectedWord.length)

    updatedDifficultyDisplay(level)

    updateUI()



    //show game area and difficulty display, hide selection buttons 
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('difficultySelection').classList.add('d-none')
    //auto focus on input
    document.getElementById('letterInput').focus()
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update difficulty display 
function updatedDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if (level === 'easy') {
        difficultyBox.textContent = 'Difficulty: Easy'
        difficultyBox.classList.add('easy')
    } else if (level === 'medium') {
        difficultyBox.textContent = 'Difficulty: Medium'
        difficultyBox.classList.add('medium')
    } else if (level === 'hard') {
        difficultyBox.textContent = 'Difficulty: Hard'
        difficultyBox.classList.add('hard')
    }
}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

}

function guessLetter () {
    let inputField = document.getElementById('letterInput') // Get input field
    let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase
  
    //Check if input is a valid letter (A-Z)
    if (!guessedLetter.match(/^[a-z]$/)){
      alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
      inputField.value = '' // Clear input field
      return // Exit function
    }
    
  
    //Check if letter was already guessed
    if(guessedLetters.includes(guessLetter)){
      alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
      inputField.value = '' // Clear input field
      return
    }
  
    //Store guessed letter
    guessedLetters.push(guessedLetter)
  
    //Check if guessed letter is in the selected word
    if (selectedWord.includes(guessedLetter)){
      updateCorrectGuess(guessedLetter)
    } else {
      updateWrongGuess(guessedLetter)
    }
  
    inputField.value = '' // Clear input field
    document.getElementById('letterInput').focus() // Refocus input field for next guess
  
  }