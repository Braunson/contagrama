import nutrients from '~/nutrients.txt'

export const parseNutrients = () => {
  const parsed = []
  let nid = 1
  let group = null
  let subgroup = null
  let subgroup_started = false
  let line
  const lines = nutrients.split(/\n/)
  for (let i = 0, len = lines.length; i < len; i++) {
    line = lines[i]
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
