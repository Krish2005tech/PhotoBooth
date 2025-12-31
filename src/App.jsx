import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import FrameSelection from "./pages/FrameSelection"
import TakePicture from "./pages/TakePicture"
import Strip from "./pages/Strip"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/frameselection" element={<FrameSelection />} />
      <Route path="/takepicture" element={<TakePicture />} />
      <Route path="/strip" element={<Strip />} />
    </Routes>
  )
}
