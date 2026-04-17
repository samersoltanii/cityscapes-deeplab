export default function Result({ data }) {
  if (!data) return null

  const topClasses = Object.entries(data.percentages).slice(0, 10)

  return (
    <div className="results-section" id="results">
      <div className="section-title">
        <div className="icon">🔍</div>
        <span>Segmentation Results</span>
      </div>

      {/* Images side by side */}
      <div className="results-grid">
        <div className="result-card">
          <h3>📷 Original Photo</h3>
          <img
            src={`data:image/png;base64,${data.original_image}`}
            alt="Original uploaded street photo"
          />
        </div>
        <div className="result-card">
          <h3>🎨 Segmentation Mask</h3>
          <img
            src={`data:image/png;base64,${data.mask_image}`}
            alt="DeepLabV3 segmentation mask"
          />
        </div>
      </div>

      {/* Class breakdown */}
      <div className="result-card breakdown-card">
        <h3>📊 Detected Classes ({data.num_classes} total)</h3>
        <p className="file-label">File: {data.filename}</p>
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
