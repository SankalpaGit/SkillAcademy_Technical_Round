import { Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Task from "./pages/Task"
import Navbar from "./components/Navbar"
import Explore from "./pages/Explore"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/todo" element={<Task />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div className="p-6 text-center text-xl">404 - Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
