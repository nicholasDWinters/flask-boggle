from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING']=True
app.config['DEBUG_TB_HOSTS']=['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    def test_home_page(self):
        '''test the home route to make sure the board is saved in session, and html is displayed'''
        with app.test_client() as client:
            
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1 class="display-3">Play Boggle!</h1>', html)
            self.assertIn('board', session)

    def test_guess_page(self):
        '''test if guess request evaluates word correctly'''
        with app.test_client() as client:
                client.get('/')
                resp = client.get('/guess?guess=skdfjskfjk')
                self.assertEqual(resp.json['result'],'not-word')

    def test_session(self):
        '''test to see if a score is stored as the highscore in a session'''
        with app.test_client() as client:
            response = client.post('/session', json={ 'total' : 10 })
            client.get("/")
            response = client.post('/session', json={ 'total' : 20 })
            client.get("/")
            self.assertEqual(session['highscore'], 20)
                
