import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/ZustandStore";
import { loginWithGoogle, logout } from "../../helpers/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import PillNav from "../PillNav";
import logo from "/Logowhite.png";
export function Navbar() {
  const user = useUser((s) => s.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const location = useLocation();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
    setOpen((prev) => !prev);
  };

  return (
<nav className="fixed top-0 left-0 right-0 px-6 z-20 py-4 bg-white shadow flex items-center">
  {/* LEFT: Logo */}
  <Link to="/" className="text-2xl font-bold flex items-center gap-2 w-1/3">
    <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
    DBSynchro
  </Link>

  {/* CENTER: PillNav */}
  <div className="flex justify-center w-1/3">
    <PillNav
    key="main-nav"
      logo={logo}
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Dashboard", href: "/dashboard" },
      ]}
      activeHref={location.pathname}
      className="custom-nav"
      pillColor="#ffffff"
      baseColor="#000000"
    />
  </div>

  {/* RIGHT: User */}
  <div className="w-1/3 flex justify-end">
    {user ? (
      <div className="relative">
        <div
          ref={buttonRef}
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-2 border-2 py-1 border-black bg-gray-100 rounded-lg cursor-pointer hover:bg-black hover:text-white"
        >
          <img src={user.avatar} className="w-7 h-7 rounded-full" />
          <span>{user.name}</span>
          <ChevronDown size={18} />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{ width: dropdownWidth }}
            >
              <Link to="/dashboard" className="flex gap-2 px-4 py-2 hover:bg-black hover:text-white">
                <User size={18} /> Profile
              </Link>

              <button onClick={handleLogout} className="flex gap-2 px-4 py-2 hover:bg-black hover:text-white">
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <button className="px-6 py-2 border-2 border-black rounded-lg hover:bg-black hover:text-white" onClick={loginWithGoogle}>
        Login
      </button>
    )}
  </div>
</nav>

  );
}
