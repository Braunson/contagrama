import nutrients from '~/nutrients.txt'

export const loadNutrients = () => {
  const parsed = []
  let nid = 1
  let group = null
  let subgroup = null
  let subgroup_started = false
  let line
  const lines = nutrients.split(/\n/)
  for (let i = 0, len = lines.length; i < len; i++) {
    line = lines[i]
    if (!line.match(/^\s+/)) {
      line = line.replace('★', '').trim()
      parsed.push([line])
      group = parsed[parsed.length - 1]
    } else if (group !== null) {
      if not re.search('^\t\t', line) {
        if (line.includes('★')) {
          line = line.replace('★', '').trim()
          group.push(line)
        }
        subgroup_started = false
      } else {
        if (!subgroup_started) {
          subgroup = group[-1] = [group[-1]]
          subgroup_started = true
        }
        if (line.includes('★')) {
          line = line.replace('★', '').trim()
          subgroup.push(line)
        }
      }
    }
  }
}

export const exportNutrients = (arr) => {
  const ndb = []
  let nextId = 1
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
