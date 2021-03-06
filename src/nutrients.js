import nutrients from '@/nutrients.txt'

const NUTRIENT_REGEX = /^(.*?)\s(?:\(((?:k|(?:mc?)|(?:\xb5)?g)|(?:IU)|(?:kcal)|(?:kJ))\))?$/

export const loadNutrients = () => {
  const parsed = []
  let group = null
  let subgroup = null
  let subgroupStarted = false
  let line
  const lines = nutrients.split(/\n/)
  for (let i = 0, len = lines.length; i < len; i++) {
    line = lines[i]
    if (!line.match(/^\s+/)) {
      line = line.replace('★', '').trim()
      parsed.push([line])
      group = parsed[parsed.length - 1]
    } else if (group !== null) {
      if (!line.match(/^\t\t/)) {
        if (line.includes('★')) {
          line = line.replace('★', '').trim()
          group.push(line)
        }
        subgroupStarted = false
      } else {
        if (!subgroupStarted) {
          subgroup = group[-1] = [group[-1]]
          subgroupStarted = true
        }
        if (line.includes('★')) {
          line = line.replace('★', '').trim()
          subgroup.push(line)
        }
      }
    }
  }
  return parsed
}

export const parseNutrients = (arr) => {
  const ndb = []
  let group
  let subgroup
  let ngroup
  let nutrient
  let nextId = 1
  for (let i = 0, ilen = arr.length; i < ilen; i++) {
    group = arr[i]
    ngroup = []
    for (let k = 0, klen = group.length; k < klen; k++) {
      subgroup = group[i][k]
      nutrient = subgroup.match(NUTRIENT_REGEX)
      if (nutrient) {
        nutrient = nutrient.slice(1)
        if (nutrient.length < 2) {
          nutrient.push(null)
          ngroup.push([nextId, nutrient[0], nutrient[1]])
        } else {
          console.log('Failed: ', subgroup)
        }
        nextId += 1
        if (ngroup.length > 1) {
          ndb.push(ngroup)
        }
      }
    }
  }
  return ndb
}
