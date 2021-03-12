from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()
app = Flask(__name__)

app.config['SECRET_KEY']="oh-so-secret"
debug = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html', board=board)

@app.route('/guess')
def make_guess():
    board = session['board']
    word = request.args['guess']
    result = boggle_game.check_valid_word(board,word)
    return jsonify({'result': result})

