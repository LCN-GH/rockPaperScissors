// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

//DOM
const btnRules = document.querySelector('.rulesBtn')
const btnClose = document.querySelector('.closeBtn')
const modalRules = document.querySelector('.modal')


const choices = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
]
const choiceButtons = document.querySelectorAll('.choiceBtn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.resultsResult')

const resultWinner = document.querySelector('.resultsWinner')
const resultText = document.querySelector('.resultsText')

const playAgainBtn = document.querySelector('.playAgain')

const scoreNumber = document.querySelector('.scoreNumber')
let score = 0;


// Game Logic

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = choices.find(choice => choice.name === choiceName)
        choose(choice)
    })
})

function choose(choice) {
    const aiChoice = aiChoose()
    displayResults([choice, aiChoice])
    displayWinner([choice, aiChoice])
}

function aiChoose() {
    const rand = Math.floor(Math.random() * choices.length)
    return choices[rand]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, index) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[index].name}">
                    <img src="images/icon-${results[index].name}.svg" alt="${results[index].name}"/>
                </div>
            `;
        }, index * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if (userWins) {
            resultText.innerText = "you win";
            resultDivs[0].classList.toggle('winner')
            keepScore(1)
        } else if (aiWins) {
            resultText.innerText = "you lose";
            resultDivs[1].classList.toggle('winner')
            keepScore(-1)
        } else {
            resultText.innerText = "draw";
        }
        resultWinner.classList.toggle('hidden')
        resultsDiv.classList.toggle('showWinner')
    }, 1000);


}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    score += point
    scoreNumber.innerText = score
}

// Play Again
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultText.innerText = ""
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('showWinner');
});


// Show/Hide Rules
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('showModal');
})
btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('showModal');
})