
## About

ContaGrama (_pt-BR for GramCounter_) is an application project to infer 
nutritional data off meal recipes through automatic natural language parsing. 
This repository holds preliminary efforts in processing [USDA's database][usda]
and making it suitable for translation to Brazlian portuguese. 

ContaGrama is written in Python/[Flask][flask], JavaScript/[Vue(x)][vue], with
an intentional effort to keep things minimal. There's no Webpack configuration,
no subdirectories other than **`db/`**, and everything's supposed to run with
standard plain HTML5/CSS3 and mostly boring Vue2 components. Data wrangling is 
done with [Fabric][fabric], converting text files onto consumable JSON.

## Development

	pip install -r requirements.txt
	python app.py

All code is contained within **`app.{css,html,js,py}`** and **`fabfile.py`**.

[usda]: https://ndb.nal.usda.gov/ndb/search/list
[open_data]: https://en.wikipedia.org/wiki/Open_data
[flask]: http://flask.pocoo.org/
[vue]: https://vuejs.org/
[fabric]: http://www.fabfile.org/
