import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Footer } from "@/components/common/Footer";

const faqs = [
  {
    q: "Do I need to know SQL?",
    a: "Not at all. We handle all the schema creation and data mapping automatically. You just work with your Google Sheet as usual.",
  },
  {
    q: "Is it real-time?",
    a: "Yes. When you edit the sheet, we sync to the DB. When you write to the DB via API, we update the sheet. It's magic.",
  },
  {
    q: "Can I bring my own database?",
    a: "Absolutely. In the dashboard settings, you can paste your own Postgres connection string. We'll verify it and start syncing tables there instead of our hosted instances.",
  },
  {
    q: "What happens if I change a column name?",
    a: "We detect schema changes. If you rename a header in Sheets, we'll ask if you want to rename the column in Postgres or map it to a new one to prevent data loss.",
  },
  {
    q: "Is there a row limit?",
    a: "For the free tier, we support up to 10,000 rows per sheet. Enterprise plans support millions of rows with dedicated indexing.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Questions?</h1>
          <p className="text-gray-500 text-lg">Everything you need to know about the product.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-2 border-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-bold pr-8">{faq.q}</span>
                <span className="shrink-0 p-2 bg-black text-white rounded-full">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 text-lg leading-relaxed border-t-2 border-dashed border-gray-200">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
