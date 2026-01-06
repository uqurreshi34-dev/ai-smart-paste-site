import './App.css'

export default function App() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <h1>AI Smart Paste</h1>
        <p className="subtitle">
          Hover images → press <strong>Ctrl + Shift + V</strong> → paste into AI.
        </p>

        <p className="description">
          A Chrome extension that lets you collect images from anywhere
          and inject them into ChatGPT or Gemini — instantly.
        </p>

        <div className="cta">
          <a
            href="#demo"
            className="primary"
          >
            Watch demo
          </a>

          <a
            href="#install"
            className="secondary"
          >
            Install extension
          </a>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="demo">
        <div className="demo-inner">
          <h2>How it works</h2>

          <ul className="steps">
            <li>
              <span>1</span>
              <p>Hover images anywhere on the web</p>
            </li>

            <li>
              <span>2</span>
              <p>Images stack automatically (no clicks)</p>
            </li>

            <li>
              <span>3</span>
              <p>
                Press <strong>Ctrl + Shift + V</strong>
              </p>
            </li>

            <li>
              <span>4</span>
              <p>Images appear inside ChatGPT or Gemini</p>
            </li>
          </ul>
        </div>

        <div className="demo-box">
          <img
            src="/demo.gif"
            alt="AI Smart Paste demo"
            className="demo-gif"
          />
        </div>
      </section>


      {/* SUPPORTED */}
      <section className="supported">
        <h2>Supported AIs</h2>

        <ul>
          <li>✅ ChatGPT (multi-image upload)</li>
          <li>⚠️ Gemini (clipboard-based paste)</li>
        </ul>

        <p className="note">
          Gemini has stricter limitations — images paste one at a time.
        </p>
      </section>

      {/* INSTALL */}
      <section id="install" className="install">
        <h2>Install</h2>

        <p>
          AI Smart Paste is currently available as a Chrome extension.
        </p>

        <a
          href="#"
          className="primary"
        >
          Chrome Web Store (coming soon)
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          Built for power users who work with AI every day.
        </p>
      </footer>
    </div>

  )
}
