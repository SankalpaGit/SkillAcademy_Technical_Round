import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Menu, X,User } from 'lucide-react'
import gsap from 'gsap'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [menuOpen])

  const navLinks = [
    { to: '/blog', label: 'Blog' },
    { to: '/todo', label: 'Task' },
    { to: '/explore', label: 'Explore' },
  ]

  return (
    <nav
      ref={navRef}
      className="bg-white text-gray-800 px-8 py-5 flex items-center justify-between shadow-md sticky top-0 z-30"
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide text-indigo-500 lg:ml-16">
        GyanAnchal
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-12 items-center">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative text-base  transition-all duration-300 pb-1 hover:text-indigo-500 hover:scale-105 ${
                isActive ? 'text-indigo-500 border-b-3 border-indigo-500' : ''
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Profile Icon */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `mr-16 hidden md:block hover:text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 p-2 transition-colors ${isActive ? 'text-indigo-700' : ''}`
        }
      >
        <User size={30} />
      </NavLink>

      {/* Hamburger Button */}
      <button className="md:hidden z-20" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute top-20 left-0 w-full bg-white text-gray-800 flex flex-col items-center space-y-4 py-6 px-4 transition-opacity duration-300 z-10 md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-lg hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold underline' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `text-lg hover:text-indigo-600 transition-colors ${isActive ? 'font-semibold underline' : ''}`
          }
        >
          <User className="inline mr-1" size={18} /> Profile
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
