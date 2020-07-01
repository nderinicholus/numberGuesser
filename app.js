// Game vales
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
  window.location.reload();
  }

});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum) {
    // Game over - Won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = 'green';
    // // setMessage
    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green')

  } else {
    // Wrong Number
    guessesLeft -= 1

    if(guessesLeft === 0) {
    // Gave over - Lost

    gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)

    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = 'red';
    // // setMessage
    // setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red')
      
    } else {
      // Game continues - answer wrong

      // change border color
      guessInput.style.borderColor = 'green';

      guessInput.value = '';
      
      // Tell user its the wrong number
      setMessage(`${guess} is not correct correct, ${guessesLeft} guesses left`, 'red')

    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // setMessage
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}

// get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}