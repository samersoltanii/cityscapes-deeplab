import { useEffect, useState } from 'react'
import axios from 'axios'

const API = ''

export default function Metrics() {
  const [metrics, setMetrics] = useState(null)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    axios.get(`${API}/metrics`)
      .then(r => setMetrics(r.data))
      .catch(() => setError(true))
  }, [])

  if (error) return (
    <p style={{ color: '#f87171', textAlign: 'center', marginBottom: '2rem' }}>
      ⚠️ Backend offline — start the FastAPI server to see metrics.
    </p>
  )
  if (!metrics) return null

  const cards = [
    { label: 'mIoU',       value: metrics.mIoU,       suffix: '' },
    { label: 'Dice Score', value: metrics.dice_score,  suffix: '' },
    { label: 'Val Loss',   value: metrics.val_loss,    suffix: '' },
    { label: 'Epochs',     value: metrics.epochs,      suffix: '' },
    { label: 'Image Size', value: metrics.img_size,    suffix: 'px' },
    { label: 'Best mIoU',  value: metrics.best_mIoU,   suffix: '' },
  ]

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#a78bfa' }}>
        📈 Model Performance — {metrics.model}
      </h2>
      <div className="metrics-grid">
        {cards.map(c => (
          <div key={c.label} className="metric-card">
            <div className="value">{c.value}{c.suffix}</div>
            <div className="label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
