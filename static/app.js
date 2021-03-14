let $submit = $('#submitBtn');
let $messageList = $('.guessMessages');
let $score = $('#score');
let $guessForm = $('#guessForm');
let $highScore = $('#highScore');
let total = 0;
let numGuesses = 0;
let guesses = [];
async function submitGuess(e) {
    e.preventDefault();
    if (numGuesses === 0) {
        setTimeout(removeForm, 10000);
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

async function removeForm() {
    $guessForm.remove();
    $messageList.remove();
    $score.text(`Final score: ${total}`);
    await updateSession();
}

async function updateSession() {
    let response = await axios.post('/session', { total: total });
    console.log(response);
    $highScore.text(`High Score: ${response.data.highscore}`)
}