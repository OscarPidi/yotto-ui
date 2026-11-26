// Fails if component code uses raw colours instead of semantic tokens.
// Allowed only in src/styles/ and src/tokens/.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'src'
const SKIP = ['src/styles', 'src/tokens']
const RULES = [
  [/#[0-9a-fA-F]{3,8}\b/, 'hex colour'],
  [/\brgba?\(|\bhsla?\(|\boklch\(/, 'raw colour function'],
  [/\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/, 'Tailwind palette colour'],
  [/\b(?:bg|text|border)-(?:white|black)\b/, 'white/black instead of a token'],
  [/--yotto-/, 'primitive token used directly'],
  [/\[(?:#|rgb)/, 'arbitrary colour value'],
]

const files = []
const walk = (d) => {
  if (SKIP.some((s) => d.startsWith(s))) return
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(p) && !p.endsWith('.test.tsx')) files.push(p)
  }
}
walk(ROOT)

let problems = 0
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return
    for (const [re, why] of RULES) {
      if (re.test(line)) {
        problems++
        console.error(`${f}:${i + 1}  ${why}: ${line.trim()}`)
      }
    }
  })
}
if (problems) {
  console.error(`\n✖ ${problems} hard-coded value(s). Use semantic tokens (bg-primary, text-foreground, …).`)
  process.exit(1)
}
console.log(`✔ ${files.length} files use tokens only.`)
