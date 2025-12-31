import { useLocation, useNavigate } from "react-router-dom"

export default function Strip() {
  const { state } = useLocation()
  const navigate = useNavigate()

  function download() {
    const a = document.createElement("a")
    a.href = state.image
    a.download = "photo.png"
    a.click()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <img
        src={state.image}
        alt="Captured"
        className="rounded-lg shadow-lg"
      />

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded-lg"
        >
          Restart
        </button>

        <button
          onClick={download}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Download
        </button>
      </div>
    </div>
  )
}
