import { useEffect, useRef, useState } from 'react'
import { Check, Code2, MousePointer2, Palette, SlidersHorizontal } from 'lucide-react'

const listExampleSkills = ['html', 'css', 'java', 'maven']
const childAges = [20, 30, 50, 100, 65]

export default function ConceptsPage() {
  const [appName, setAppName] = useState('Contact Manager')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [experience, setExperience] = useState(13)
  const [company, setCompany] = useState('ITC')
  const [skills, setSkills] = useState(['html', 'nodejs', 'react', 'ng'])
  const [newSkill, setNewSkill] = useState('')
  const [clickMessage, setClickMessage] = useState('')
  const [eventStatus, setEventStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const timerId = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerId.current), [])

  const addSkill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const skill = newSkill.trim()
    if (!skill) return
    setSkills((current) => [...current, skill])
    setNewSkill('')
  }

  const loadChildResult = () => {
    if (eventStatus === 'loading') return
    setEventStatus('loading')
    timerId.current = window.setTimeout(() => setEventStatus('done'), 2000)
  }

  return (
    <section className="page-content concepts-page">
      <header className="page-heading learning-heading">
        <p className="eyebrow">FIELD NOTES · REACT LEARNING</p>
        <h1>Concepts</h1>
        <p>Small interactive studies in values, events, and visual state.</p>
      </header>

      <nav className="topic-nav" aria-label="Concept topics">
        <a href="#editable-values"><Code2 size={15} /> Values</a>
        <a href="#child-examples"><MousePointer2 size={15} /> Components</a>
        <a href="#conditional-content"><Check size={15} /> Conditions</a>
        <a href="#visual-state"><Palette size={15} /> Visual state</a>
      </nav>

      <section className="demo-section" id="editable-values">
        <div className="demo-section-heading">
          <span className="section-index">01</span>
          <div><p className="eyebrow">EDITABLE VALUES</p><h2>Change the source, see the view</h2></div>
        </div>
        <div className="binding-layout">
          <div className="binding-controls">
            <div className="form-field">
              <label htmlFor="demo-app-name">Application name</label>
              <input id="demo-app-name" value={appName} onChange={(event) => setAppName(event.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="demo-company">Company</label>
              <input id="demo-company" value={company} onChange={(event) => setCompany(event.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="demo-experience">Experience (years)</label>
              <input id="demo-experience" type="number" min="0" value={experience} onChange={(event) => setExperience(Number(event.target.value))} />
            </div>
            <label className="check-control"><input type="checkbox" checked={isLoggedIn} onChange={(event) => setIsLoggedIn(event.target.checked)} /><span>Signed in for this local demo</span></label>
            <form className="inline-entry" onSubmit={addSkill}>
              <label htmlFor="demo-skill">Add a skill</label>
              <div><input id="demo-skill" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="e.g. TypeScript" /><button className="button button-outline" type="submit">Add skill</button></div>
            </form>
          </div>
          <div className="binding-preview" aria-label="Live example values">
            <p className="eyebrow">LIVE PREVIEW</p>
            <h3>{appName || 'Your app name'}</h3>
            <dl>
              <div><dt>Company</dt><dd>{company || 'Not set'}</dd></div>
              <div><dt>Experience</dt><dd>{experience} years</dd></div>
              <div><dt>Local state</dt><dd>{isLoggedIn ? 'Signed in' : 'Signed out'}</dd></div>
            </dl>
            <div className="skill-list" aria-label="Editable skills">
              {skills.map((skill, index) => <span className="skill-chip" key={`${skill}-${index}`}>{skill}</span>)}
            </div>
            <button className="button button-small button-accent" type="button" onClick={() => setClickMessage('The example action ran locally.')}>Run example action</button>
            <p className="demo-feedback" aria-live="polite">{clickMessage}</p>
          </div>
        </div>
      </section>

      <section className="demo-section" id="child-examples">
        <div className="demo-section-heading">
          <span className="section-index">02</span>
          <div><p className="eyebrow">COMPONENT COMMUNICATION</p><h2>Values down, events up</h2></div>
        </div>
        <div className="example-columns">
          <article className="example-panel">
            <p className="example-label">A · Supplied values</p>
            <p className="example-description">A parent can provide a value to a smaller display.</p>
            <div className="age-list">{childAges.map((age, index) => <span key={`${age}-${index}`}><small>AGE</small>{age}</span>)}</div>
          </article>
          <article className="example-panel event-panel">
            <p className="example-label">B · Returned event</p>
            <p className="example-description">Activate the example and wait two seconds for its result.</p>
            <button className="button button-dark" type="button" disabled={eventStatus === 'loading'} onClick={loadChildResult}>
              {eventStatus === 'loading' ? 'Loading result…' : 'Load child result'}
            </button>
            <p className="event-result" role="status">{eventStatus === 'done' ? 'Arun' : eventStatus === 'loading' ? 'Waiting for result…' : 'No result yet'}</p>
          </article>
        </div>
      </section>

      <section className="demo-section" id="conditional-content">
        <div className="demo-section-heading">
          <span className="section-index">03</span>
          <div><p className="eyebrow">CONDITIONAL CONTENT</p><h2>Render what the state describes</h2></div>
        </div>
        <div className="example-columns">
          <article className="example-panel conditional-panel">
            <p className="example-label">Signed-out example</p>
            <p className="signed-out-note">You are not authenticated. This is a local teaching example, not account access.</p>
          </article>
          <article className="example-panel">
            <p className="example-label">Repeated content</p>
            <ul className="plain-skill-list">{listExampleSkills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="demo-section visual-demo-section" id="visual-state">
        <div className="demo-section-heading">
          <span className="section-index">04</span>
          <div><p className="eyebrow">VISUAL STATE</p><h2>A value can shape an element</h2></div>
          <SlidersHorizontal size={19} aria-hidden="true" />
        </div>
        <div className="visual-demo-block" role="img" aria-label="Yellow demonstration block, 200 pixels high"><span>200 px</span><strong>Sample style</strong></div>
      </section>
    </section>
  )
}
