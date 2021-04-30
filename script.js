'use strict'

// selecting elements
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

// starting coditions

let scores, playing, currentScore, activePlayer

const init = () => {
  // defaults
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  playing = true
  current0El.textContent = 0
  current1El.textContent = 0
  score0El.textContent = 0
  score1El.textContent = 0
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
}

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  currentScore = 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

init()

// rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1.generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1

    // 2.display dice
    diceEl.classList.remove('hidden')
    diceEl.src = `./images/dice-${dice}.png`

    // 3. check for the rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice
      // default active player is player 0
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      // switch to the next player
      switchPlayer()
    }
  }
})

// holds the current score and add it on player score and switch player
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. add active player to score
    scores[activePlayer] += currentScore
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    // 2. check if players score is >= 100 if true : wins the game
    if (scores[activePlayer] >= 20) {
      playing = false
      diceEl.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    } else {
      // 3. switch to next player
      switchPlayer()
    }
  }
})

// restarts the game

btnNew.addEventListener('click', init)
