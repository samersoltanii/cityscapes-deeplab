export default function Result({ data }) {
  if (!data) return null

  const topClasses = Object.entries(data.percentages).slice(0, 10)

  return (
    <div>
      <div className="results-grid">
        <div className="result-card">
          <h3>📷 Original Photo</h3>
          <img
            src={`data:image/png;base64,${data.original_image}`}
            alt="original"
          />
        </div>
        <div className="result-card">
          <h3>🎨 Segmentation Mask</h3>
          <img
            src={`data:image/png;base64,${data.mask_image}`}
            alt="mask"
          />
        </div>
      </div>

      <div className="result-card" style={{ marginTop: '1.5rem' }}>
        <h3>📊 Detected Classes ({data.num_classes} total)</h3>
        <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
          File: {data.filename}
        </p>
        <div>
          {topClasses.map(([label, pct]) => (
            <div key={label} className="class-bar">
              <span className="name">{label}</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <span className="pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
