
# coding: utf-8

import json
from flask import Flask, render_template
from fabfile import nutrients

app = Flask(
	__name__, 
	template_folder='.', 
	static_folder='.', 
	static_url_path='/static'
)

@app.route('/')
def home():
	return render_template('app.html', **{
		'nutrients': json.dumps(nutrients()['nutrients'])
	})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=9000, debug=True)
