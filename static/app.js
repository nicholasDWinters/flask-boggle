let $submit = $('#submitBtn');
let $message = $('.guessMessage');

async function submitGuess(e) {
    e.preventDefault();

    let guess = $('#guess').val();
    let response = await axios.get('/guess', { params: { guess: guess } });
    console.log(response);
}


$submit.on('click', submitGuess);