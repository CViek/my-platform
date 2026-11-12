import './App.css'

type ReportKind = 'bug' | 'feature'

type Report = {
  id: string
  text: string
  kind: ReportKind
}



function App() {
  const sampleReport: Report = {
    id: '1',
    text: 'Navigation link is broken',
    kind: 'bug',
  }

  const initialReports: Report[] = [
    { id: '1', text: 'Navigation link is broken', kind: 'bug' },
    { id: '2', text: 'Add dark mode', kind: 'feature' },
  ]


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
        <ul>  
          {initialReports.map((report) => (    
                <li key={report.id}>     
                    {report.text} ({report.kind})    
                </li>  
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App