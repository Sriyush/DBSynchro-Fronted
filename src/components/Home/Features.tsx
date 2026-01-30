import { motion , type Variants} from "framer-motion";
import { Zap, Shield, Globe, Code } from "lucide-react";

const features = [
  {
    title: "Instant API",
    desc: "Auto-generated REST endpoints. No backend code needed.",
    icon: <Zap size={40} strokeWidth={1.5} />,
  },
  {
    title: "Type Safety",
    desc: "Inferred data types (String, Number, Boolean) from columns.",
    icon: <Shield size={40} strokeWidth={1.5} />,
  },
  {
    title: "Real-time Sync",
    desc: "Changes in Sheets reflect in DB instantly (and vice-versa).",
    icon: <Globe size={40} strokeWidth={1.5} />,
  },
  {
    title: "Developer First",
    desc: "Export SQL, manage schemas, ship faster.",
    icon: <Code size={40} strokeWidth={1.5} />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item : Variants= {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

export function Features() {
  return (
    <section className="min-h-screen md:h-screen flex items-center justify-center bg-white py-8 px-4 md:px-6 md:snap-start">
      <div className="w-full max-w-[95%] min-h-[auto] md:h-[90vh] mx-auto border-4 border-black rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col justify-center bg-white">
        
        {/* Inner Black Border */}
        <div className="absolute inset-2 md:inset-4 border-2 border-black/10 rounded-[2rem] md:rounded-[2.5rem] pointer-events-none z-0" />

        <div className="relative z-10 mb-8  flex justify-between items-end border-b-4 border-black pb-4  overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Why Us?</h2>
          <div className="text-6xl md:text-9xl font-bold text-gray-300 hidden lg:block opacity-50 select-none ">02</div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black relative z-10 bg-white shadow-none"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className={`
                p-3 md:p-6 border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-default relative overflow-hidden
                border-b-2 last:border-b-0 md:border-b-0
                ${i === 0 ? 'md:border-r-2 md:border-b-2' : ''}
                ${i === 1 ? 'md:border-b-2' : ''}
                ${i === 2 ? 'md:border-r-2' : ''}
              `}
            >
              <div className="mb-8 p-4 w-fit border-2 border-black rounded-lg bg-gray-50 text-black group-hover:bg-white group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-4xl font-bold mb-4">{f.title}</h3>
              <p className="text-xl text-gray-500 group-hover:text-gray-300 leading-relaxed max-w-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
