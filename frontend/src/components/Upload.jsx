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
    <div className="upload-section">
      <div className="section-title">
        <div className="icon">📤</div>
        <span>Upload Street Scene</span>
      </div>

      <div
        id="upload-dropzone"
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
          <img src={preview} alt="Preview of uploaded street scene" />
        ) : (
          <>
            <div className="upload-icon">🏙️</div>
            <h3>Drop a street photo here</h3>
            <p>or click to browse — JPG / PNG supported</p>
          </>
        )}
      </div>

      {file && (
        <div className="upload-actions">
          <div className="file-info">
            📁 {file.name}
          </div>
          <br />
          <button
            id="run-segmentation-btn"
            className="btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Segmenting…' : '🚀 Run Segmentation'}
          </button>
        </div>
      )}
    </div>
  )
}
