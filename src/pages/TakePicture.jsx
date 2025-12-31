import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function TakePicture() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const { state } = useLocation()

  const [stream, setStream] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [flash, setFlash] = useState(false)

  const ratio = state?.ratio || "4:3"
  const mode = state?.mode || "color"

  const width = ratio === "4:3" ? 400 : 300
  const height = ratio === "4:3" ? 300 : 400

  async function startCamera() {
    const s = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.current.srcObject = s
    setStream(s)
  }

  function capturePhoto() {
    let count = 3
    setCountdown(count)

    const interval = setInterval(() => {
      count--
      setCountdown(count)

      if (count === 0) {
        clearInterval(interval)
        setCountdown(null)

        setFlash(true)
        setTimeout(() => setFlash(false), 100)

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        if (mode === "bw") {
          ctx.filter = "grayscale(100%)"
        }

        ctx.drawImage(videoRef.current, 0, 0, width, height)

        const image = canvas.toDataURL("image/png")

        navigate("/strip", { state: { image } })
      }
    }, 1000)
  }

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach(t => t.stop())
    }
  }, [stream])

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={startCamera}>Enable Camera</button>

      <div
        style={{
          width,
          height,
          margin: "20px auto",
          position: "relative",
          background: "#000"
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width={width}
          height={height}
        />

        {countdown && (
          <div style={{
            position: "absolute",
            inset: 0,
            color: "white",
            fontSize: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {countdown}
          </div>
        )}

        {flash && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "white"
          }} />
        )}
      </div>

      <button onClick={capturePhoto}>📸 Click</button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: "none" }}
      />
    </div>
  )
}
