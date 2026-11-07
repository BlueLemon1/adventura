import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = fs.readFileSync(path.join(root, 'data/sources/srd-5.2.1/classes.de.md'), 'utf8')
const dataPath = path.join(root, 'src/data/class-features-2024.json')
const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const classIds = { Barbar:'barbarian', Barde:'bard', Druide:'druid', Hexenmeister:'warlock', Kleriker:'cleric', Kämpfer:'fighter', Magier:'wizard', Mönch:'monk', Paladin:'paladin', Schurke:'rogue', Waldläufer:'ranger', Zauberer:'sorcerer' }
const parsed = new Map()
let currentClass, subclassStarted = false, currentFeature
function flush() {
  if (!currentFeature) return
  currentFeature.description = currentFeature.lines.join('\n').trim()
  const items = parsed.get(currentClass) ?? []
  items.push(currentFeature)
  parsed.set(currentClass, items)
  currentFeature = undefined
}
for (const line of source.split(/\r?\n/)) {
  const classHeading = line.match(/^# (.+)$/)
  if (classHeading && classIds[classHeading[1]]) { flush(); currentClass = classIds[classHeading[1]]; subclassStarted = false; continue }
  if (/^## /.test(line)) { flush(); if (/Unterklasse/i.test(line)) subclassStarted = true; continue }
  const featureHeading = line.match(/^### (\d+)\. Stufe:\s*(.+)$/)
  if (featureHeading) { flush(); currentFeature = { level:Number(featureHeading[1]), featureType:subclassStarted?'subclass':'class', name:featureHeading[2].trim(), lines:[] }; continue }
  if (currentFeature) currentFeature.lines.push(line)
}
flush()
let imported = 0
const errors = []
for (const [classId, features] of parsed) for (const featureType of ['class','subclass']) {
  const headings = features.filter(x => x.featureType === featureType)
  const targets = records.filter(x => x.classId === classId && x.featureType === featureType)
  const levels = [...new Set([...headings.map(x=>x.level),...targets.map(x=>x.level)])]
  for (const level of levels) {
    const src = headings.filter(x=>x.level===level), dst = targets.filter(x=>x.level===level)
    if (src.length !== dst.length) { errors.push(`${classId}/${featureType}/${level}: ${src.length} headings vs ${dst.length} records`); continue }
    src.forEach((x,i)=>{dst[i].names.de=x.name;dst[i].descriptions.de=x.description;imported++})
  }
}
if (errors.length) throw new Error(errors.join('\n'))
fs.writeFileSync(dataPath, JSON.stringify(records,null,2)+'\n')
console.log(`Imported German text for ${imported} class and subclass features.`)
