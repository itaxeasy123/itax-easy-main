
// "use client";
// import {
//   Shield,
//   Eye,
//   Lock,
//   Users,
//   FileText,
//   Mail,
//   Calendar,
//   ArrowLeft,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function PrivacyPolicy() {
//   const router = useRouter();

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

//       {/* ================= HEADER ================= */}
//       <section className="relative py-10 text-center">
//         <div className="relative z-10 max-w-4xl mx-auto px-4">
//           <div className="flex justify-center mb-4">
//           </div>

//           <h1 className="text-3xl md:text-5xl font-semibold">
//             Privacy Policy
//           </h1>

//           <p className="text-white/70 mt-3 text-sm md:text-base">
//             Privacy Policy for iTaxEasy
//           </p>
//         </div>
//       </section>

//       {/* ================= CONTENT ================= */}
//       <section className="max-w-6xl mx-auto px-4 pb-24 space-y-12">

//         {/* INTRO */}
//         <GlassCard>
//           <p className="text-sm md:text-base leading-relaxed text-white/80">
//             Thank you for using iTaxEasy. This Privacy Policy outlines how we
//             collect, use, store, and protect your personal information when you
//             use our finance app. By using iTaxEasy, you consent to the practices
//             described in this Privacy Policy.
//           </p>
//         </GlassCard>

//         {/* SECTION 1 */}
//         <PolicySection
//           icon={<Eye className="h-5 w-5" />}
//           title="1. Information We Collect"
//         >
//           <h4 className="font-semibold mb-3">1.1 Personal Information</h4>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {[
//               "Name",
//               "Gender",
//               "Address",
//               "Phone number",
//               "Email address",
//               "Aadhaar number",
//               "PAN number",
//               "Father's name",
//             ].map((item) => (
//               <span
//                 key={item}
//                 className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>

//           <h4 className="font-semibold mt-6 mb-3">1.2 Usage Information</h4>
//           <ul className="list-disc ml-5 space-y-2 text-sm text-white/70">
//             <li>Device information (OS, device type, identifiers)</li>
//             <li>Log data (IP address, crashes, access timestamps)</li>
//             <li>Geolocation data (only if permitted)</li>
//           </ul>
//         </PolicySection>

//         {/* SECTION 2 */}
//         <PolicySection
//           icon={<Lock className="h-5 w-5" />}
//           title="2. Use of Personal Information"
//         >
//           <ul className="list-disc ml-5 space-y-2 text-sm text-white/70">
//             <li>Authenticating your identity</li>
//             <li>Processing financial transactions</li>
//             <li>Providing personalized offers</li>
//             <li>Sending important notifications</li>
//             <li>Customer support & research</li>
//           </ul>

//           <GlassHighlight>
           
//             <p> <strong>Important:</strong> We do not share your personal information with third parties without
//             consent, except as required by law.</p>
//           </GlassHighlight>
//         </PolicySection>

//         {/* SECTION 3 */}
//         <PolicySection
//           icon={<Shield className="h-5 w-5" />}
//           title="3. Data Security"
//         >
//           <p className="text-sm text-white/80 leading-relaxed">
//            We are committed to protecting the security of your personal information and have implemented appropriate technical and organizational measures to safeguard it. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
//           </p>
//         </PolicySection>

//         {/* SECTION 4 */}
//         <PolicySection
//           icon={<Users className="h-5 w-5" />}
//           title="4. Third-Party Services"
//         >
//           <p className="text-sm text-white/80">
//             TaxEasy may include links to third-party websites or services that are not operated or controlled by us. This Privacy Policy does not apply to any third-party services, and we encourage you to review the privacy policies of those services before providing them with any personal information.
//           </p>
//         </PolicySection>

//         {/* SECTION 5 */}
//         <PolicySection
//           icon={<Users className="h-5 w-5" />}
//           title="5. Children's Privacy"
//         >
//           <p className="text-sm text-white/80">
//           iTaxEasy is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected personal information from a child, please contact us immediately, and we will take steps to delete the information.
//           </p>
//         </PolicySection>

//         {/* SECTION 6 */}
//         <PolicySection
//           icon={<FileText className="h-5 w-5" />}
//           title="6. Changes to this Policy"
//         >
//           <p className="text-sm text-white/80">
//            We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of any significant changes by posting the updated Privacy Policy within the app or by other means. Your continued use of the app after such modifications constitutes your acknowledgment of the modified Privacy Policy.
//           </p>
//         </PolicySection>

//         {/* CONTACT */}
//         <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
//           <div className="flex justify-center mb-4">
//             <Mail className="h-8 w-8 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
//           <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
//             If you have any questions or concerns about this Privacy Policy,
//             please reach out to us.
//           </p>
//           <a
//             href="mailto:info@itaxeasy.com"
//             className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
//           >
//             <Mail className="h-4 w-4" />
//             info@itaxeasy.com
//           </a>
//         </div>

//         {/* ACKNOWLEDGMENT */}
//         <GlassHighlight>
//                  <h4 className="font-semibold text-green-800 mb-2">Acknowledgment</h4>
//           By using iTaxEasy, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.
//         </GlassHighlight>
//       </section>
//     </main>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */

// const GlassCard = ({ children }) => (
//   <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
//     {children}
//   </div>
// );

// const GlassHighlight = ({ children }) => (
//   <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90">
//     {children}
//   </div>
// );

// const PolicySection = ({ icon, title, children }) => (
//   <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 backdrop-blur">
//     <div className="flex items-center gap-3">
//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
//         {icon}
//       </div>
//       <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
//     </div>
//     {children}
//   </div>
// );

"use client";

import {
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Mail,
  Calendar,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* ================= HEADER ================= */}
      <section className="relative py-10 text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4">

          <h1 className="text-3xl md:text-5xl font-semibold">
            Privacy Policy
          </h1>

          <p className="text-white/70 mt-3 text-sm md:text-base">
            Privacy Policy for iTaxEasy
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Calendar className="h-4 w-4" />
            Last updated: May 2026
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-12">

        {/* INTRO */}
        <GlassCard>
          <p className="text-sm md:text-base leading-relaxed text-white/80">
            Thank you for using iTaxEasy. This Privacy Policy outlines how we
            collect, use, store, and protect your personal information when you
            use our financial and tax-related services, applications, and tools.
            By using iTaxEasy, you consent to the practices described in this
            Privacy Policy.
          </p>
        </GlassCard>

        {/* SECTION 1 */}
        <PolicySection
          icon={<Eye className="h-5 w-5" />}
          title="1. Information We Collect"
        >
          <h4 className="font-semibold mb-3">
            1.1 Personal Information
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Name",
              "Gender",
              "Address",
              "Phone number",
              "Email address",
              "Government-issued identification details (if voluntarily provided)",
              "Parent/guardian details (if applicable)",
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
              >
                {item}
              </span>
            ))}
          </div>

          <h4 className="font-semibold mt-6 mb-3">
            1.2 Usage Information
          </h4>

          <ul className="list-disc ml-5 space-y-2 text-sm text-white/70">
            <li>
              Device information (OS version, device type, identifiers)
            </li>

            <li>
              Application usage analytics and crash reports
            </li>

            <li>
              Log information such as IP address and access timestamps
            </li>
          </ul>
        </PolicySection>

        {/* SECTION 2 */}
        <PolicySection
          icon={<Lock className="h-5 w-5" />}
          title="2. Use of Personal Information"
        >
          <ul className="list-disc ml-5 space-y-2 text-sm text-white/70">
            <li>Authenticating your identity</li>

            <li>
              Providing financial calculation and estimation tools
            </li>

            <li>
              Improving app performance and user experience
            </li>

            <li>
              Sending important service-related notifications
            </li>

            <li>
              Customer support and technical assistance
            </li>
          </ul>

          <GlassHighlight>
            <p>
              <strong>Important:</strong> We do not sell or share your
              personal information with third parties without your consent,
              except where required by applicable law, legal obligations,
              or trusted service providers necessary for app functionality.
            </p>
          </GlassHighlight>
        </PolicySection>

        {/* SECTION 3 */}
        <PolicySection
          icon={<Shield className="h-5 w-5" />}
          title="3. Data Security"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            We are committed to protecting the security of your personal
            information and have implemented appropriate technical and
            organizational measures to safeguard it. However, no method
            of transmission over the internet or electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </PolicySection>

        {/* SECTION 4 */}
        <PolicySection
          icon={<FileText className="h-5 w-5" />}
          title="4. Document Scanning and OCR"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            iTaxEasy may provide optional OCR (Optical Character Recognition)
            features that allow users to scan and extract information from
            documents such as PAN cards, Aadhaar cards, bank statements,
            invoices, or other financial documents voluntarily uploaded by
            the user.
            <br />
            <br />

            Extracted information is used only for autofill, document
            processing, financial calculations, and user convenience
            features within the app.
          </p>
        </PolicySection>

        {/* SECTION 5 */}
        <PolicySection
          icon={<Users className="h-5 w-5" />}
          title="5. Third-Party Services"
        >
          <p className="text-sm text-white/80">
            iTaxEasy may include links to third-party websites or services
            that are not operated or controlled by us. This Privacy Policy
            does not apply to third-party services, and we encourage users
            to review the privacy policies of those services before
            providing personal information.
          </p>
        </PolicySection>

        {/* SECTION 6 */}
        <PolicySection
          icon={<Users className="h-5 w-5" />}
          title="6. Children's Privacy"
        >
          <p className="text-sm text-white/80">
            iTaxEasy is not intended for use by individuals under the age
            of 18. We do not knowingly collect personal information from
            children. If you believe that we have inadvertently collected
            information from a child, please contact us immediately, and
            we will take steps to delete such information.
          </p>
        </PolicySection>

        {/* SECTION 7 */}
        <PolicySection
          icon={<FileText className="h-5 w-5" />}
          title="7. Changes to this Policy"
        >
          <p className="text-sm text-white/80">
            We may update this Privacy Policy from time to time to reflect
            changes in legal requirements, business operations, or platform
            policies. Updated versions of this Privacy Policy will be
            posted on this page with a revised effective date.
          </p>
        </PolicySection>

        {/* SECTION 8 */}
        <PolicySection
          icon={<Shield className="h-5 w-5" />}
          title="8. Data Deletion Requests"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Users may request deletion of their account information,
            uploaded documents, or stored data by contacting us at
            info@itaxeasy.com.

            <br />
            <br />

            We will process valid deletion requests in accordance with
            applicable laws, security standards, and platform policies.
          </p>
        </PolicySection>

        {/* CONTACT */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">

          <div className="flex justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold mb-3">
            Contact Us
          </h3>

          <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us.
          </p>

          <a
            href="mailto:info@itaxeasy.com"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            <Mail className="h-4 w-4" />
            info@itaxeasy.com
          </a>
        </div>

        {/* DISCLAIMER */}
        <GlassHighlight>
          <h4 className="font-semibold text-yellow-300 mb-2">
            Financial Disclaimer
          </h4>

          <p>
            iTaxEasy provides financial, tax, and calculation tools for
            informational purposes only. Results generated by the app are
            estimates and should not be considered professional financial,
            legal, or tax advice.
          </p>
        </GlassHighlight>

        {/* ACKNOWLEDGMENT */}
        <GlassHighlight>
          <h4 className="font-semibold text-green-300 mb-2">
            Acknowledgment
          </h4>

          <p>
            By using iTaxEasy, you acknowledge that you have read and
            understood this Privacy Policy and agree to the collection,
            use, and disclosure of your personal information as described
            herein.
          </p>
        </GlassHighlight>
      </section>
    </main>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const GlassCard = ({ children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
    {children}
  </div>
);

const GlassHighlight = ({ children }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90">
    {children}
  </div>
);

const PolicySection = ({
  icon,
  title,
  children,
}) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 backdrop-blur">

    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
        {icon}
      </div>

      <h2 className="text-lg md:text-xl font-semibold">
        {title}
      </h2>
    </div>

    {children}
  </div>
);