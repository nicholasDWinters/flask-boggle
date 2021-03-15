class Game {
    constructor() {
        this.board = $('#boggle');
        this.timeCounter = $('#timeCounter');
        this.messageList = $('.guessMessages');
        this.score = $('#score');
        this.guessForm = $('#guessForm');
        this.highScore = $('#highScore');
        this.playAgainBtn = $('#playAgainBtn');
        this.total = 0;
        this.numGuesses = 0;
        this.guesses = [];
        this.secs = 60;
        $('#submitBtn', this.board).on('click', this.submitGuess.bind(this));
    }

    async submitGuess(e) {
        e.preventDefault();
        if (this.numGuesses === 0) {
            setTimeout(this.removeForm.bind(this), this.secs * 1000);
            setInterval(() => {
                this.countdown();
            }, 1000);
        }
        this.numGuesses += 1;
        let guess = $('#guess').val();
        if (this.guesses.indexOf(guess) === -1) {
            this.guesses.push(guess);
            let response = await axios.get('/guess', { params: { guess: guess } });
            let phrase = `<p class='phrase'>${guess} is ${response.data.result}</p>`;
            this.messageList.prepend(phrase);

            if (response.data.result === 'ok') {
                this.total += guess.length;
                this.score.text(`Total score: ${this.total}`);
            }
        } else {
            let phrase = `<p class='phrase'>You already guessed ${guess}!</p>`;
            this.messageList.prepend(phrase)
        }
    }
    countdown() {
        this.secs -= 1
        this.timeCounter.text(`Time remaining: ${this.secs} seconds`);
        if (this.secs === 0) {
            this.timeCounter.remove()
        }
    }
    async removeForm() {
        await this.updateSession();
        $('#guessForm').remove();
        this.messageList.remove();
        this.score.text(`Final score: ${this.total}`);
        this.playAgainBtn.toggleClass('hidden');
    }

    async updateSession() {
        let response = await axios.post('/session', { total: this.total });

        this.highScore.text(`High Score: ${response.data.highscore}`)
    }
}


let boggle = new Game();

