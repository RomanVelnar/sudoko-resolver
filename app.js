// const { json } = require("body-parser");

// Selectors
const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const solutionDisplay = document.querySelector('#solution');
const squares = 81;
const submission = [];

//functions
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53) 
    ) {
        inputElement.classList.add('odd-section')
    }

    puzzleBoard.appendChild(inputElement);
}

// wrapped the document in a new div
const wrapper = document.createElement('div')
puzzleBoard.parentNode.insertBefore(wrapper, puzzleBoard)
wrapper.appendChild(puzzleBoard)

wrapper.className = "puzzle"


const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push('.');
        }
    })
    console.log(submission)
}


const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input');
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i];
        })
        solutionDisplay.innerHTML = 'Here is the answer!';
    } else {
        solutionDisplay.innerHTML = 'You made a mistake, this is not solvable';
    }

}

const solve = () => {

    joinValues()
    const data = {numbers: submission.join('')}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify(data)
    })  
    .then(response => response.json())
    .then(data => {
        console.log(data)
        populateValues(data.solvable, data.solution)
        submission = []
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

solveButton.addEventListener('click', solve);





