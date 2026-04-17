import { useState, useRef } from 'react'

export default function Upload({ onUpload, loading }) {
  const [dragging, setDragging] = useState(false)
  const [preview,  setPreview]  = useState(null)
  const [file,     setFile]     = useState(null)
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = () => {
    if (file) onUpload(file)
  }

  return (
    <div>
      <div
        className={`upload-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {preview ? (
          <img src={preview} alt="preview"
               style={{ maxHeight: 200, borderRadius: 8, marginBottom: 12 }} />
        ) : (
          <>
            <div className="upload-icon">🏙️</div>
            <h3>Drop a street photo here</h3>
            <p>or click to browse — JPG / PNG</p>
          </>
        )}
      </div>

      {file && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', marginBottom: 8 }}>📁 {file.name}</p>
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Segmenting...' : '🚀 Run Segmentation'}
          </button>
        </div>
      )}
    </div>
  )
}
