import { useState } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'

const birthday = new Date(1988, 3, 15)
const sampleText = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam harum facere omnis aspernatur recusandae nam consectetur laboriosam ab non expedita cum saepe obcaecati, officia laborum iusto facilis ullam fugit eaque!'
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function explicitDateFormat(date: Date) {
  const hour = date.getHours() % 12 || 12
  const period = date.getHours() >= 12 ? 'PM' : 'AM'
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${pad(date.getDate())}/${monthNames[date.getMonth()]}/${date.getFullYear()} ${pad(hour)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${period}`
}

function withEllipsis(value: string, limit: number) {
  return `${value.slice(0, limit)}...`
}

export default function AboutPage() {
  const [chips, setChips] = useState<string[]>([])
  const [chipDraft, setChipDraft] = useState('')
  const [range, setRange] = useState<[number, number]>([20, 80])
  const [submitted, setSubmitted] = useState(false)

  const addChip = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = chipDraft.trim()
    if (!value) return
    setChips((current) => [...current, value])
    setChipDraft('')
    setSubmitted(false)
  }

  return (
    <section className="page-content about-page">
      <header className="page-heading about-heading">
        <p className="eyebrow">PRIMENG · UI STUDIES</p>
        <h1>About</h1>
        <p>Controls and formatting examples, running entirely in this browser.</p>
      </header>

      <section className="demo-section about-controls-section">
        <div className="demo-section-heading">
          <span className="section-index">01</span>
          <div><p className="eyebrow">INPUT STUDIES</p><h2>Try the controls</h2></div>
        </div>
        <div className="about-control-grid">
          <div className="about-control-block">
            <label htmlFor="chip-entry">Chips</label>
            <form className="inline-entry chip-entry" onSubmit={addChip}>
              <div><input id="chip-entry" value={chipDraft} onChange={(event) => setChipDraft(event.target.value)} placeholder="Type a value" /><button className="icon-button add-chip-button" type="submit" aria-label="Add chip"><Plus size={17} /></button></div>
            </form>
            <ul className="chip-list" aria-label="Entered chips">
              {chips.map((chip, index) => <li key={`${chip}-${index}`}><span>{chip}</span><button type="button" className="chip-remove" aria-label={`Remove ${chip}`} onClick={() => { setChips((current) => current.filter((_, chipIndex) => chipIndex !== index)); setSubmitted(false) }}><X size={14} /></button></li>)}
            </ul>
            {chips.length === 0 && <p className="field-hint">Values stay here while this page is open.</p>}
          </div>
          <div className="about-control-block range-block">
            <div className="range-heading"><label htmlFor="range-min">Range</label><output>{range[0]} <span>—</span> {range[1]}</output></div>
            <label className="range-label" htmlFor="range-min">Lower boundary</label>
            <input id="range-min" type="range" min="0" max={range[1]} value={range[0]} onChange={(event) => { setRange([Number(event.target.value), range[1]]); setSubmitted(false) }} />
            <label className="range-label" htmlFor="range-max">Upper boundary</label>
            <input id="range-max" type="range" min={range[0]} max="100" value={range[1]} onChange={(event) => { setRange([range[0], Number(event.target.value)]); setSubmitted(false) }} />
          </div>
        </div>
        <button className="button button-dark" type="button" onClick={() => setSubmitted(true)}>Send Data <ArrowUpRight size={16} /></button>
        {submitted && <div className="submitted-data" role="status"><strong>Local demo result</strong><span>Chips: {chips.length ? chips.join(', ') : 'none'}</span><span>Range: {range[0]}–{range[1]}</span></div>}
      </section>

      <section className="demo-section formatting-section">
        <div className="demo-section-heading">
          <span className="section-index">02</span>
          <div><p className="eyebrow">FORMATTING</p><h2>One value, different presentations</h2></div>
        </div>
        <div className="formatting-grid">
          <article className="format-example">
            <p className="example-label">Date · April 15, 1988</p>
            <dl><div><dt>Default</dt><dd>{birthday.toLocaleDateString()}</dd></div><div><dt>dd/MMMM/yyyy hh:mm:ss a</dt><dd>{explicitDateFormat(birthday)}</dd></div></dl>
          </article>
          <article className="format-example text-format-example">
            <p className="example-label">Text · original and transformed</p>
            <p>{sampleText}</p>
            <p className="uppercase-example">{sampleText.toUpperCase()}</p>
            <p>{withEllipsis(sampleText, 60)}</p>
            <p>{withEllipsis(sampleText, 240)}</p>
          </article>
        </div>
      </section>

      <section className="demo-section safety-section">
        <div className="demo-section-heading">
          <span className="section-index">03</span>
          <div><p className="eyebrow">URL SAFETY</p><h2>Only safe navigation</h2></div>
        </div>
        <p className="example-description">This example uses a normal HTTPS destination. No script URL or injected markup is rendered.</p>
        <a className="text-link" href="https://example.com/" target="_blank" rel="noreferrer">Open safe example <ArrowUpRight size={16} /></a>
      </section>
    </section>
  )
}
