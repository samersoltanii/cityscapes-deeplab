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
      {/* Header */}
      <div className="header">
        <h1>🏙️ Cityscapes Segmentation</h1>
        <p>DeepLabV3 · ResNet-50 · 34 Classes · MLflow Tracked</p>
      </div>

      {/* Model metrics */}
      <Metrics />

      {/* Upload */}
      <Upload onUpload={handleUpload} loading={loading} />

      {/* Loader */}
      {loading && (
        <div className="loader">
          <div className="spinner" />
          Running DeepLabV3 inference...
        </div>
      )}

      {/* Error */}
      {error && <p className="error">⚠️ {error}</p>}

      {/* Results */}
      {result && <Result data={result} />}

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#444' }}>
        <p>MLflow UI → <a href="http://127.0.0.1:5000"
           style={{ color: '#4f8ef7' }}>127.0.0.1:5000</a></p>
      </div>
    </div>
  )
}