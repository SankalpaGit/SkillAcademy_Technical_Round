import { Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Task from "./pages/Task"
import Navbar from "./components/Navbar"
import Explore from "./pages/Explore"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import PasswordResetRequest from "./pages/PasswordResetRequest"
import ResetPassword from "./pages/ResetPassword"
import BlogDetail from "./pages/BlogDetail"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div className="p-6 text-center text-xl">404 - Page Not Found</div>} />

        {/** Protected Routes  starts here **/}

        <Route path="/blog" element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        } />
        <Route path="/todo" element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
        } />
        <Route path="/explore" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="auth/password_reset/" element={<PasswordResetRequest />} />
        <Route path="/reset-password/:uid/:token/" element={<ResetPassword />} />
        <Route path="/blog/:id" element={
          <ProtectedRoute>
            <BlogDetail />
          </ProtectedRoute>
        } />
        {/** Protected Routes ends here **/}
      </Routes>
    </div>
  )
}

export default App
