const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
updateScoreElement();

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} , Loses: ${score.loses} , Ties: ${score.ties}`;
}
let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true
        document.querySelector('.auto-play-btn').innerHTML = 'Stop Play';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
    }
}
document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playGame('scissors');
});

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}
document.querySelector('.js-reset-btn').addEventListener('click', () => {
    showResetConfirmation();
});
document.querySelector('.js-autoPlay-btn').addEventListener('click', () => {
    autoPlay();
});
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        // resetScore();
        showResetConfirmation();
    }
});

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML =
        `Are you sure you want to reset the score ?
    <button class="js-reset-confirm-yes reset-confirm-button"
    >Yes</button>
    <button class="js-reset-confirm-no reset-confirm-button">
    No
    </button>
    `;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    });
    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirmation();
    })
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'Lose';
        } else if (computerMove === 'paper') {
            result = 'Win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'Win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'Lose';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'Lose';
        } else if (computerMove === 'scissors') {
            result = 'Win';
        }
    }

    if (result === 'Win') {
        score.wins += 1;
    } else if (result === 'Lose') {
        score.loses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }


    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = `Your ${result}`;
    document.querySelector('.js-moves').innerHTML = `You
        <img src="./images/${playerMove}-emoji.png" alt="" class="game-img">
        <img src="./images/${computerMove}-emoji.png" alt="" class="game-img"> 
        Computer`;
    // alert(`You picked ${playerMove} . Computer picked ${computerMove} . Your ${result}\nWins: ${score.wins} , Loses: ${score.loses} , Ties: ${score.ties}`);
}

function pickComputerMove() {
    const randomNum = Math.random();
    let computerMove = '';
    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNum >= 2 / 3 && randomNum < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}