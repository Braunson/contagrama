
# coding: utf-8

import pprint
import re

def nutrients():
	db = {'nutrients': []}
	with open('db/nutrients.txt') as nutrients_db:
		nid = 1
		group = None
		subgroup = None
		subgroup_started = False
		for line in nutrients_db:
			if not re.search('^\s+', line):
				db['nutrients'].append([line])
				group = db['nutrients'][-1]
			elif group is not None:
				if not re.search('^\t\t', line):
					if '\xe2\x98\x85' in line:
						group.append(line.strip())
					subgroup_started = False
				else:
					if not subgroup_started:
						subgroup = group[-1] = [group[-1]]
						subgroup_started = True
					if '\xe2\x98\x85' in line:
						subgroup.append(line.strip())

	pprint.pprint(db)
