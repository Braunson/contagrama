
# coding: utf-8

from flask import Flask, render_template

app = Flask(__name__, template_folder='.')

@app.route('/')
def home():
	return render_template('app.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=9000, debug=True)
