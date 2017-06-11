
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
                line = line.replace('\xe2\x98\x85', '').strip()
                db['nutrients'].append([line.decode('utf-8')])
                group = db['nutrients'][-1]
            elif group is not None:
                if not re.search('^\t\t', line):
                    if '\xe2\x98\x85' in line:
                        line = line.replace('\xe2\x98\x85', '').strip()
                        group.append(line.decode('utf-8'))
                    subgroup_started = False                    
                else:
                    if not subgroup_started:
                        subgroup = group[-1] = [group[-1]]
                        subgroup_started = True
                    if '\xe2\x98\x85' in line:
                        line = line.replace('\xe2\x98\x85', '').strip()
                        subgroup.append(line.decode('utf-8'))
    ndb = []
    for group in db['nutrients']:
        ngroup = []
        for subgroup in group:
            if type(subgroup) is list and len(subgroup) == 1:
                ngroup.append(subgroup[0])
            else:
                ngroup.append(subgroup)
        if len(ngroup) > 1:
            ndb.append(ngroup)
    ndb = {'nutrients': ndb}
    pprint.pprint(ndb)
    return ndb
