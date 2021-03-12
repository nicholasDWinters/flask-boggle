let $submit = $('#submitBtn');
let $messageList = $('.guessMessages');

async function submitGuess(e) {
    e.preventDefault();

    let guess = $('#guess').val();
    let response = await axios.get('/guess', { params: { guess: guess } });
    let phrase = `<p class='phrase'>${guess} is ${response.data.result}</p>`
    $messageList.append(phrase)
}


$submit.on('click', submitGuess);