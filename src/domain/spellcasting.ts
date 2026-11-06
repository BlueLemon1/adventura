import type { Character } from './character'

export interface SpellSlot {
  spellLevel: number
  max: number
  current: number
}
export interface PactMagic {
  spellLevel: number
  max: number
  current: number
}
export interface SpellcastingProgression {
  kind: 'full' | 'half' | 'third' | 'warlock'
  slots: number[]
  pactMagic?: { spellLevel: number; max: number }
}

const FULL: number[][] = [
  [], [2], [3], [4,2], [4,3], [4,3,2], [4,3,3], [4,3,3,1], [4,3,3,2], [4,3,3,3,1],
  [4,3,3,3,2], [4,3,3,3,2,1], [4,3,3,3,2,1], [4,3,3,3,2,1,1],
  [4,3,3,3,2,1,1], [4,3,3,3,2,1,1,1], [4,3,3,3,2,1,1,1],
  [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1],
  [4,3,3,3,3,2,2,1,1],
]
const THIRD_2014: number[][] = [
  [],[],[],[2],[3],[3],[3],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1],
]
const THIRD_2024: number[][] = [
  [],[],[],[2],[3],[3],[3],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3],[4,3,3],[4,3,3],
]
const PACT: Array<{ spellLevel: number; max: number }> = [
  {spellLevel:0,max:0},{spellLevel:1,max:1},{spellLevel:1,max:2},{spellLevel:2,max:2},
  {spellLevel:2,max:2},{spellLevel:3,max:2},{spellLevel:3,max:2},{spellLevel:4,max:2},
  {spellLevel:4,max:2},{spellLevel:5,max:2},{spellLevel:5,max:2},{spellLevel:5,max:3},
  {spellLevel:5,max:3},{spellLevel:5,max:3},{spellLevel:5,max:3},{spellLevel:5,max:3},
  {spellLevel:5,max:3},{spellLevel:5,max:4},{spellLevel:5,max:4},{spellLevel:5,max:4},{spellLevel:5,max:4},
]

function normalize(value: string | undefined): string {
  return (value ?? '').trim().toLowerCase().replace(/[ä]/g,'ae').replace(/[ö]/g,'oe').replace(/[ü]/g,'ue').replace(/ß/g,'ss').replace(/[^a-z]/g,'')
}
function casterKind(character: Pick<Character,'classId'|'subclassId'|'level'>): SpellcastingProgression['kind'] | null {
  const classId = normalize(character.classId)
  if (classId === 'warlock' || classId === 'hexenmeister') return 'warlock'
  if (['bard','barde','cleric','kleriker','druid','druide','sorcerer','zauberer','wizard','magier'].includes(classId)) return 'full'
  if (['paladin','ranger','waldlaeufer'].includes(classId)) return 'half'
  const subclass = normalize(character.subclassId)
  if ((classId === 'fighter' || classId === 'kaempfer') && ['eldritchknight','arkaeneritter'].includes(subclass) && character.level >= 3) return 'third'
  if ((classId === 'rogue' || classId === 'schurke') && ['arcanetrickster','arkanergauner'].includes(subclass) && character.level >= 3) return 'third'
  return null
}
export function getSpellcastingProgression(character: Pick<Character,'ruleset'|'classId'|'subclassId'|'level'>): SpellcastingProgression | null {
  const kind = casterKind(character)
  if (!kind) return null
  if (kind === 'warlock') return {kind,slots:[],pactMagic:PACT[character.level]}
  if (kind === 'half' && character.ruleset === '2014' && character.level < 2) return null
  const casterLevel = kind === 'full' ? character.level : kind === 'half' ? Math.ceil(character.level / 2) : Math.floor(character.level / 3)
  const slots = kind === 'third' ? (character.ruleset === '2014' ? THIRD_2014[character.level] : THIRD_2024[character.level]) ?? [] : FULL[casterLevel] ?? []
  return {kind,slots}
}
export function createSpellSlots(character: Pick<Character,'ruleset'|'classId'|'subclassId'|'level'>): SpellSlot[] {
  return getSpellcastingProgression(character)?.slots.map((max,index)=>({spellLevel:index+1,max,current:max})) ?? []
}
export function updateSpellSlots(character: Pick<Character,'ruleset'|'classId'|'subclassId'|'level'>, previous: SpellSlot[] = []): SpellSlot[] {
  return createSpellSlots(character).map(slot => {
    const old = previous.find(item=>item.spellLevel===slot.spellLevel)
    const spent = old ? old.max-old.current : 0
    return {...slot,current:Math.max(0,slot.max-spent)}
  })
}
export function createPactMagic(character: Pick<Character,'ruleset'|'classId'|'subclassId'|'level'>): PactMagic | undefined {
  const pact = getSpellcastingProgression(character)?.pactMagic
  return pact ? {...pact,current:pact.max} : undefined
}
export function updatePactMagic(character: Pick<Character,'ruleset'|'classId'|'subclassId'|'level'>, previous?: PactMagic): PactMagic | undefined {
  const next = createPactMagic(character)
  if (!next) return undefined
  const spent = previous ? previous.max-previous.current : 0
  return {...next,current:Math.max(0,next.max-spent)}
}
export function isWarlock(character: Pick<Character,'classId'>): boolean {
  return ['warlock','hexenmeister'].includes(normalize(character.classId))
}
