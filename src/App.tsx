import './App.css'

export default function App() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <h1>AI Smart Paste</h1>
        <p className="subtitle">
          Hover images. Stack them automatically. Paste into AI <strong>instantly.</strong>
        </p>

        <p className="description">
          AI Smart Paste lets you collect images from anywhere on the web
          and paste them directly into Gemini, Grok or Claude — no downloads, no uploads.
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
        <p className="trust">
          No sign-up · No tracking · Works instantly
        </p>

      </section>

      {/* DEMO */}
      <section id="demo" className="demo">
        <div className="demo-content">
          <div className="demo-inner">
            <h2>How it works in seconds
            </h2>

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
                <div className="step-text">
                  <p className="step-sub">
                    Ctrl + Shift + V → Ctrl + V
                  </p>
                </div>
              </li>

              <li>
                <span>4</span>
                <p>Images appear inside Gemini, Grok or Claude</p>
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
        </div>
      </section>


      {/* SUPPORTED */}
      <section className="supported">
        <h2>Supported AIs</h2>

        <ul>
          <li>Gemini (clipboard-based paste)</li>
          <li>Grok (clipboard-based paste)</li>
          <li>Claude (clipboard-based paste)</li>
        </ul>

        <p className="note">
          ⚠️ AI limitations — images paste one at a time.
        </p>
      </section>

      <section className="why">
        <h2>Why AI Smart Paste?</h2>

        <p>
          Uploading images to AI tools is slow and repetitive.
          AI Smart Paste removes friction so you can stay in flow.
        </p>

        <p>
          Built for designers, researchers, and power users
          who work with AI every day.
        </p>
      </section>


      {/* INSTALL */}
      <section id="install" className="install">
        <h2>Install</h2>

        <p>
          AI Smart Paste is currently available as a Chrome extension.
        </p>

        {/* <a
          href="https://chrome.google.com/webstore/detail/EXTENSION_ID"
          className="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to Chrome — It’s Free
        </a> */}

        <a
          href="#"
          className="primary"
        >
          Chrome Web Store (coming soon)
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          Built for power users who work with AI every day.
        </p>

        <p style={{ marginTop: '12px' }}>
          <a
            href="/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#666', fontSize: '14px' }}
          >
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  )
}
