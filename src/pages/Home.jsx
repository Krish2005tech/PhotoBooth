import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: "center", marginTop: "40vh" }}>
      <button onClick={() => navigate("/frameselection")}>
        Enter Photobooth
      </button>
    </div>
  )
}
