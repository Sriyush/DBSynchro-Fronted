import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/ZustandStore";
import { loginWithGoogle, logout } from "../../helpers/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown, LogOut, User, Settings, Menu, X } from "lucide-react";
import PillNav from "../PillNav";
import logo from "/Logowhite.png";

export function Navbar() {
  const user = useUser((s) => s.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetUser } = useUser();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    resetUser();
    navigate("/");
  };

  const toggleDropdown = () => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
    setOpen((prev) => !prev);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Sync Sheet", href: "/syncit" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 px-6 z-50 py-4 bg-white shadow flex items-center justify-between"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* LEFT: Logo */}
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        <span className="hidden md:inline">DBSynchro</span>
      </Link>

      {/* CENTER: PillNav (Desktop) */}
      <div className="hidden md:flex justify-center flex-1">
        <PillNav
          key="main-nav"
          logo={logo}
          items={navItems}
          activeHref={location.pathname}
          className="custom-nav"
          pillColor="#ffffff"
          baseColor="#000000"
        />
      </div>

      {/* RIGHT: User & Mobile Menu */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <div
              ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-2 border-2 py-1 border-black bg-gray-100 rounded-lg cursor-pointer hover:bg-black hover:text-white transition-colors"
            >
              <img src={user.avatar} className="w-7 h-7 rounded-full" />
              <span className="hidden md:inline">{user.name}</span>
              <ChevronDown size={18} />
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md z-50 min-w-[150px]"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ width: dropdownWidth || "auto" }}
                >
                  <Link to="/dashboard" className="flex gap-2 px-4 py-2 hover:bg-black hover:text-white rounded-t-lg transition-colors">
                    <User size={18} /> <span className="md:hidden">Dash</span><span className="hidden md:inline">Dashboard</span>
                  </Link>
                  <Link to="/settings" className="flex gap-2 px-4 py-2 hover:bg-black hover:text-white transition-colors">
                    <Settings size={18} /> Settings
                  </Link>

                  <button onClick={handleLogout} className="flex w-full rounded-b-lg gap-2 px-4 py-2 hover:bg-black hover:text-white transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button className="hidden md:block px-6 py-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors" onClick={loginWithGoogle}>
            Login
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed inset-0 top-[72px] bg-white z-40 flex flex-col p-6 gap-6 md:hidden"
          >
            {navItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold border-b-2 border-gray-100 pb-4"
              >
                {item.label}
              </Link>
            ))}
            {!user && (
               <button 
                className="w-full py-4 border-2 border-black rounded-xl text-xl font-bold bg-black text-white" 
                onClick={() => {
                  loginWithGoogle();
                  setMobileMenuOpen(false);
                }}
              >
                Login with Google
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
