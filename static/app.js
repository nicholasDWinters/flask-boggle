let $submit = $('#submitBtn');
let $messageList = $('.guessMessages');
let $score = $('#score');
let $guessForm = $('#guessForm');
let $highScore = $('#highScore');
let $timeCounter = $('#timeCounter');
let total = 0;
let numGuesses = 0;
let guesses = [];
let secs = 60;

async function submitGuess(e) {
    e.preventDefault();
    if (numGuesses === 0) {
        setTimeout(removeForm, 60000);
        setInterval(() => {
            countdown();
        }, 1000);
    }
    numGuesses += 1;
    let guess = $('#guess').val();
    if (guesses.indexOf(guess) === -1) {
        guesses.push(guess);
        let response = await axios.get('/guess', { params: { guess: guess } });
        let phrase = `<p class='phrase'>${guess} is ${response.data.result}</p>`;
        $messageList.prepend(phrase);

        if (response.data.result === 'ok') {
            total += guess.length;
            $score.text(`Total score: ${total}`);
        }
    } else {
        let phrase = `<p class='phrase'>You already guessed ${guess}!</p>`;
        $messageList.prepend(phrase)
    }
}


$submit.on('click', submitGuess);

function countdown() {
    secs -= 1
    $timeCounter.text(`Time remaining: ${secs} seconds`);
    if (secs === 0) {
        $timeCounter.remove()
    }
}

async function removeForm() {
    $guessForm.remove();
    $messageList.remove();
    $score.text(`Final score: ${total}`);
    await updateSession();
}

async function updateSession() {
    let response = await axios.post('/session', { total: total });

    $highScore.text(`High Score: ${response.data.highscore}`)
}