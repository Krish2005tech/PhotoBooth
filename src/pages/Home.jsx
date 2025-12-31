import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => navigate("/frameselection")}
        className="px-8 py-4 text-lg bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Enter Photobooth
      </button>
    </div>
  )
}
