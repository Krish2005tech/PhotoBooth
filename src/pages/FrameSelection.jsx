import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function FrameSelection() {
  const navigate = useNavigate()
  const [ratio, setRatio] = useState("4:3")
  const [mode, setMode] = useState("color")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-2xl font-semibold">Frame Selection</h1>

      <div className="flex flex-col gap-4">
        <select
          className="px-4 py-2 rounded border"
          value={ratio}
          onChange={e => setRatio(e.target.value)}
        >
          <option value="4:3">4 : 3</option>
          <option value="3:4">3 : 4</option>
        </select>

        <select
          className="px-4 py-2 rounded border"
          value={mode}
          onChange={e => setMode(e.target.value)}
        >
          <option value="color">Color</option>
          <option value="bw">Black & White</option>
        </select>
      </div>

      <button
        onClick={() =>
          navigate("/takepicture", {
            state: { ratio, mode }
          })
        }
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Next
      </button>
    </div>
  )
}
