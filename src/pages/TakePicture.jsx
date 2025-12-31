import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function TakePicture() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const { state } = useLocation()

  const ratio = state?.ratio || "4:3"
  const mode = state?.mode || "color"

  const width = ratio === "4:3" ? 400 : 300
  const height = ratio === "4:3" ? 300 : 400

  const [stream, setStream] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [flash, setFlash] = useState(false)

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
        setTimeout(() => setFlash(false), 320)

        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const vw = video.videoWidth
        const vh = video.videoHeight
        const targetRatio = width / height
        const videoRatio = vw / vh

        let sx, sy, sw, sh

        if (videoRatio > targetRatio) {
          sh = vh
          sw = sh * targetRatio
          sx = (vw - sw) / 2
          sy = 0
        } else {
          sw = vw
          sh = sw / targetRatio
          sx = 0
          sy = (vh - sh) / 2
        }

        ctx.filter = mode === "bw" ? "grayscale(100%)" : "none"

        ctx.drawImage(
          video,
          sx, sy, sw, sh,
          0, 0, width, height
        )

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <button
        onClick={startCamera}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Enable Camera
      </button>

      <div
        className="relative overflow-hidden bg-black rounded-lg"
        style={{ width, height }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-black/40">
            {countdown}
          </div>
        )}

        {flash && (
          <div className="absolute inset-0 bg-white" />
        )}
      </div>

      <button
        onClick={capturePhoto}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        📸 Click
      </button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="hidden"
      />
    </div>
  )
}
