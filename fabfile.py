
def nutrients():
	db = {'nutrients': []}
	with open('db/nutrients.txt') as nutrients_db:
		nid = 1
		for line in nutrients_db:
			if not re.search('^\s+'):
				db['nutrients'].append([line])
	pprint.pprint(db)
