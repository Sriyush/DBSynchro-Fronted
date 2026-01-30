import { motion , type Variants} from "framer-motion";
import { Database, Sheet, RefreshCw, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect Sheet",
    desc: "Paste your Google Sheet URL. We'll extract the structure automatically.",
    icon: <Sheet size={32} className="text-black" />,
  },
  {
    id: 2,
    title: "Map & Sync",
    desc: "We create a matching Postgres table and sync your data instantly.",
    icon: <RefreshCw size={32} className="text-black" />,
  },
  {
    id: 3,
    title: "Your DB or Ours",
    desc: "We host it for free, or you can paste your own Postgres Connection String to own the data.",
    icon: <Database size={32} className="text-black" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item : Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } },
};

export function HowItWorks() {
  return (
    <section className="min-h-screen md:h-screen flex items-center justify-center py-4 px-4 md:px-6 bg-white md:snap-start">
      <div className="max-w-[98%] md:max-w-[95%] w-full min-h-[80vh] md:h-[90vh] mx-auto bg-black text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border-4 border-black relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-center">
        
        {/* Inner White Border */}
        <div className="absolute inset-2 md:inset-4 border-2 border-white/20 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none" />

        <div className="mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-white/20 pb-6 md:pb-10 relative z-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Process</h2>
            <p className="text-gray-400 text-base md:text-xl max-w-lg">
              From spreadsheet to SQL in three simple steps.
            </p>
          </div>
          <div className="text-9xl font-bold opacity-10 hidden lg:block">01</div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              variants={item}
              className="relative group z-10"
            >
              {/* Connector Arrow */}
              {idx !== steps.length - 1 && (
                <div className="hidden md:block absolute -right-10 top-9 z-10 text-white/30 transform -translate-y-1/2">
                  <ArrowRight size={32} />
                </div>
              )}

              <div className="mb-6 md:mb-8 relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute -inset-2 border-2 border-white/20 rounded-3xl -z-10 group-hover:border-white/50 transition-colors" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{step.title}</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
