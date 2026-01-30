import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6 mt-10 rounded-t-[2.5rem] md:rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6 max-w-sm">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <img src="/Logowhite.png" alt="Logo" className="w-8 h-8" />
              DBSynchro
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed">
              Stop building boring CRUD apps. Turn your spreadsheets into production-grade databases in seconds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links - Simplified */}
          <div className="flex gap-16 flex-wrap">
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-white">Platform</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li><Link to="/syncit" className="hover:text-white transition-colors">Sync Sheet</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-lg text-white">Support</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:help@dbsynchro.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center md:text-left">
          <p>© {currentYear} DBSynchro Inc.</p>
          <div className="flex gap-8">
            <p>Made with 🦇 by Sriyush</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
