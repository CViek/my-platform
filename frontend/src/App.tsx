import './App.css'
import { useState } from 'react'

type ReportKind = 'bug' | 'feature'
type Priority = 'new' | 'urgent' | 'high' | 'medium' | 'low'


type Report = {
  id: string
  text: string
  kind: ReportKind
  priority: Priority;
}



function App() {
  const initialReports: Report[] = [
    { id: '1', text: 'Navigation link is broken', kind: 'bug', priority: 'high' },
    { id: '2', text: 'Add dark mode', kind: 'feature', priority: 'low' },
  ]

  const [reports, setReports] = useState<Report[]>(initialReports)
  const [newReportText, setNewReportText] = useState('')

  function addReport() {
    const text = newReportText.trim()
    if (text.length === 0) return

    const newReport: Report = {
      id: crypto.randomUUID(),
      text: text,    
      kind: 'bug',
      priority: 'new',
    }

    // ... unpacks reports since its an object - allows an iterable, such as an array or string, to be expanded in places where zero or more arguments or elements are expected
    // Creates a new array of Reports, it is a shallow copy which is actually good here
    // reports.push will add to the array, but it wont rerender so the user wont see it. 
    // Define useState along with setter so the array is updated and the reference is changed, which causes the page to be rerendered in JS/TS
    setReports([...reports, newReport])
    setNewReportText('')
  }


  return (
    <main className="intro">
      <div className="avatar" aria-hidden="true">CV</div>

      <h1>Christian V</h1>

      <p className="subtitle">
        Senior Computer Science major · Minors in Cybersecurity and AI and Machine Learning
      </p>

      <p>
        I enjoy building secure, reliable software and turning ideas into
        production systems. This site will showcase my projects and
        engineering decisions.
      </p>
      <section className="report-board">
        <h2>Bugs & Feature Requests</h2>
        
        <input
          type="text"
          value={newReportText}
          onChange={(event) => setNewReportText(event.target.value)}
          placeholder="Describe a bug..."
          aria-label="New bug report"
        />

        <button type="button" onClick={addReport}>
          Add Bug
        </button>

        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              {report.text} ({report.kind}, {report.priority})
            </li>
          ))}
        </ul>
        
      </section>
    </main>
  )
}

export default App