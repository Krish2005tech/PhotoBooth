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
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <img src={state.image} alt="Captured" />

      <br /><br />

      <button onClick={() => navigate("/")}>Restart</button>
      <button onClick={download}>Download</button>
    </div>
  )
}
