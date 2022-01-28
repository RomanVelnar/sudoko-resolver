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
    inputElement.setAttribute('min', 1);
    inputElement.setAttribute('max', 9);
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

const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push('.');
        }
    })
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
    const axios = require("axios").default;


    joinValues();
    const data = submission.join('');
    const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
        'x-rapidapi-key': '65059a14f4msh8040cda6acebc99p12c6c4jsnc8b6dfe475d8'
    },
    data: {
        puzzle: data
    }
    };

    axios.request(options).then((response) => {
        console.log(response.data);
        populateValues(response.data.solvable, response.data.solution)
    }).catch((error) => {
        console.error(error);
    });
    }

    solveButton.addEventListener('click', solve);



