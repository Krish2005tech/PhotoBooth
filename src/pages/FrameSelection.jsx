import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function FrameSelection() {
  const navigate = useNavigate()
  const [ratio, setRatio] = useState("4:3")
  const [mode, setMode] = useState("color")

  return (
    <div style={{ padding: 40 }}>
      <h2>Select Frame</h2>

      <label>Aspect Ratio</label>
      <select value={ratio} onChange={e => setRatio(e.target.value)}>
        <option value="4:3">4:3</option>
        <option value="3:4">3:4</option>
      </select>

      <br /><br />

      <label>Mode</label>
      <select value={mode} onChange={e => setMode(e.target.value)}>
        <option value="color">Color</option>
        <option value="bw">Black & White</option>
      </select>

      <br /><br />

      <button
        onClick={() =>
          navigate("/takepicture", {
            state: { ratio, mode }
          })
        }
      >
        Next
      </button>
    </div>
  )
}
