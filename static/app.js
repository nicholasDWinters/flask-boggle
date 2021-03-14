let $submit = $('#submitBtn');
let $messageList = $('.guessMessages');
let $score = $('#score');
let $guessForm = $('#guessForm')
let total = 0;
let numGuesses = 0;
async function submitGuess(e) {
    e.preventDefault();
    if (numGuesses === 0) {
        setTimeout(removeForm, 60000);
    }
    numGuesses += 1;
    let guess = $('#guess').val();
    let response = await axios.get('/guess', { params: { guess: guess } });
    let phrase = `<p class='phrase'>${guess} is ${response.data.result}</p>`
    $messageList.append(phrase);
    if (response.data.result === 'ok') {
        total += guess.length;
        $score.text(`Total score: ${total}`);
    }
}


$submit.on('click', submitGuess);

function removeForm() {
    $guessForm.remove();
    $messageList.remove();
    $score.text(`Final score: ${total}`)
}