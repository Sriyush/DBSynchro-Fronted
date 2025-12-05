import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../store/ZustandStore";
import { loginWithGoogle, logout } from "../../helpers/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export function Navbar() {
  const user = useUser((s) => s.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);

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
    <nav className="fixed right-0 left-0 top-0 px-6 z-20 py-4 bg-white shadow flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        DBSynchro
      </Link>

      {!user ? (
        <button
          className="px-6 py-2 border-2 border-black font-bold rounded-lg hover:bg-black hover:text-white"
          onClick={loginWithGoogle}
        >
          Login
        </button>
      ) : (
        <div className="relative">
          <div
            ref={buttonRef}
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-2 border-2 py-1 border-black bg-gray-100  rounded-lg cursor-pointer hover:bg-black hover:text-white"
          >
            <img
              src={user.avatar}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover"
              alt="avatar"
            />

            <span className="font-medium">{user.name || user.email}</span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden "
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                style={{ width: dropdownWidth }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-center hover:bg-black hover:text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
}
