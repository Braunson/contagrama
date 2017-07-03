
# coding: utf-8

from code import interact
import collections
import pprint
import re
import requests
import lxml.html

BROWSER_HEADERS = dict([
    ('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    ('Accept-Charset', 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'),
    ('Accept-Encoding', 'gzip,deflate,sdch'),
    ('Accept-Language', 'en-US,en;q=0.8'),
    ('Connection', 'keep-alive'),
    ('User-Agent', (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.4'
        '(KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    ))
])

def usda():
    pass
    # https://ndb.nal.usda.gov/ndb/search/list
    # https://ndb.nal.usda.gov/ndb/search/list?qlookup=&qt=&manu=&SYNCHRONIZER_URI=%2Fndb%2Fsearch%2Flist&SYNCHRONIZER_TOKEN=7794dde1-429d-40b8-84d4-c399a6783176&ds=Standard+Reference
    # https://ndb.nal.usda.gov/ndb/search/list?maxsteps=6&format=&count=&max=50&sort=fd_s&fgcd=&manu=&lfacet=&qlookup=&ds=Standard+Reference&qt=&qp=&qa=&qn=&q=&ing=&offset=50&order=asc
    # https://ndb.nal.usda.gov/ndb/search/list?maxsteps=6&format=&count=&max=50&sort=fd_s&fgcd=&manu=&lfacet=&qlookup=&ds=Standard+Reference&qt=&qp=&qa=&qn=&q=&ing=&offset=100&order=asc

def test_usda():
    params = collections.OrderedDict({
        'qlookup': '',
        'qt': '',
        'manu': '',
        'SYNCHRONIZER_URI': '/ndb/search/list',
        'SYNCHRONIZER_TOKEN': '7794dde1-429d-40b8-84d4-c399a6783176',
        'ds': 'Standard+Reference'
    })
    response = requests.get('https://ndb.nal.usda.gov/ndb/search/list', params=params)
    parsed = lxml.html.fromstring(response.content)
    items = parsed.cssselect('.list-left tr')[1:]
    interact(local=locals())

"""

    ?{
        'maxsteps': 6,
        'format': '',
        'count': '',
        'max': 50,
        'sort': 'fd_s',
        'fgcd': '',
        'manu': '',
        'lfacet': '',
        'qlookup': '',
        'ds': 'Standard+Reference',
        'qt': '',
        'qp': '',
        'qa': '',
        'qn': '',
        'q': '',
        'ing': '',
        'offset': 50,
        'order': 'asc'
    }
    ?{
        'maxsteps': 6,
        'format': '',
        'count': '',
        'max': 50,
        'sort': 'fd_s',
        'fgcd': '',
        'manu': '',
        'lfacet': '',
        'qlookup': '',
        'ds': 'Standard+Reference',
        'qt': '',
        'qp': '',
        'qa': '',
        'qn': '',
        'q': '',
        'ing': '',
        'offset': 100,
        'order': 'asc'
    }
"""

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
    nextId = 1
    for group in db['nutrients']:
        ngroup = []
        for subgroup in group:
            nutrient = re.search(
                (
                    '^(.*?)\s*'
                    '(?:\(('
                        '(?:k|(?:mc?)|(?:\xb5)?g)|'
                        '(?:IU)|'
                        '(?:kcal)|'
                        '(?:kJ)'
                    ')\))?$'
                ),
                subgroup
            )
            if nutrient:
                nutrient = list(nutrient.groups())
                if len(nutrient) < 2:
                    nutrient.append(None)
                ngroup.append((nextId, nutrient[0], nutrient[1]))
            else:
                print('Failed: ', subgroup)
            nextId += 1
        if len(ngroup) > 1:
            ndb.append(ngroup)
    ndb = {'nutrients': ndb}
    pprint.pprint(ndb)
    return ndb
