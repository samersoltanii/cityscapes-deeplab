import { useState } from 'react'
import axios from 'axios'
import Upload  from './components/Upload'
import Result  from './components/Result'
import Metrics from './components/Metrics'
import './index.css'

const API = ''

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState(null)

  const handleUpload = async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await axios.post(`${API}/predict`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(res.data)
    } catch (err) {
      const detail = err?.response?.data?.detail || err?.message || 'Unknown error'
      setError(`Prediction failed: ${detail}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">🏙️</div>
          <span className="navbar-title">CityScape</span>
        </div>
        <div className="navbar-badge">
          <span className="dot" />
          DeepLabV3 · ResNet-50
        </div>
      </nav>

      {/* Hero Header */}
      <header className="header" id="hero">
        <div className="header-eyebrow">✨ AI-Powered Urban Analysis</div>
        <h1>CityScape</h1>
        <p>
          Upload any street scene photo and watch our DeepLabV3 model
          segment it into 34 semantic classes in real time.
        </p>
        <div className="header-tech">
          <span className="tech-pill">🧠 DeepLabV3</span>
          <span className="tech-pill">🔗 ResNet-50</span>
          <span className="tech-pill">🎯 34 Classes</span>
          <span className="tech-pill">📊 MLflow</span>
        </div>
      </header>

      {/* Model metrics */}
      <Metrics />

      {/* Upload */}
      <Upload onUpload={handleUpload} loading={loading} />

      {/* Loader */}
      {loading && (
        <div className="loader" id="loader">
          <div className="spinner" />
          <p className="loader-text">Running DeepLabV3 inference…</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="error" id="error-message">⚠️ {error}</p>}

      {/* Results */}
      {result && <Result data={result} />}

      {/* Footer */}
      <footer className="footer" id="footer">
        <p>
          MLflow UI →{' '}
          <a href="http://127.0.0.1:5000" target="_blank" rel="noopener noreferrer">
            127.0.0.1:5000
          </a>
        </p>
        <div className="footer-tech">
          <span>React</span>
          <span>·</span>
          <span>FastAPI</span>
          <span>·</span>
          <span>PyTorch</span>
        </div>
      </footer>
    </div>
  )
}