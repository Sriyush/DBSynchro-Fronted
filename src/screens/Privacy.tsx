import { Footer } from "@/components/common/Footer";

export function Privacy() {
  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <div className="max-w-4xl mx-auto border-4 border-black rounded-[2.5rem] p-8 md:p-16 mb-20 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        
        <h1 className="text-5xl font-black mb-8 uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last Updated: January 30, 2026</p>

        <div className="space-y-10 text-lg text-gray-800 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">1. Introduction</h2>
            <p>
              Welcome to DBSynchro. We respect your privacy and are committed to protecting the personal information you share with us. 
              This policy explains how we collect, use, and safeguard your data when you use our Google Sheets synchronization service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">2. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
              <li><strong>Account Information:</strong> When you login via Google, we collect your name, email address, and profile picture.</li>
              <li><strong>Google Sheets Data:</strong> We access the spreadsheets you explicitly select to read columns and rows for synchronization.</li>
              <li><strong>Database Credentials:</strong> If you provide a custom Postgres connection string, we store it in encrypted format (AES-256).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">3. How We Use Your Data</h2>
            <p>
              We use your data solely to provide the synchronization service:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
              <li>To authenticate you.</li>
              <li>To create database tables that match your sheet structure.</li>
              <li>To perform 2-way sync (reading from Sheets to DB, and writing from DB to Sheets).</li>
            </ul>
            <p className="mt-4 font-medium">
              We do not sell your data to third parties or use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">4. Google API Services Disclosure</h2>
            <p>
              DBSynchro's use and transfer to any other app of information received from Google APIs will adhere to the 
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" className="underline font-bold mx-1">
                Google API Services User Data Policy
              </a>, including the Limited Use requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">5. Data Retention</h2>
            <p>
              We retain your data only as long as your account is active. You can request full deletion of your data (tables, logs, and account info) 
              at any time by contacting us or deleting your account from the dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 inline-block">6. Contact Us</h2>
            <p>
              If you have questions about this policy, please contact us at: <br/>
              <strong>help@dbsynchro.com</strong>
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
