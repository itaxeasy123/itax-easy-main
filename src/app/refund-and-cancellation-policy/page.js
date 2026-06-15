'use client';

import {
  RefreshCw,
  XCircle,
  AlertCircle,
  Mail,
  FileText,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function RefundCancellationPolicy() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <section className="relative py-10 text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Refund & Cancellation Policy
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-12">
        {/* INTRO */}
        <GlassCard>
          <p className="text-sm md:text-base leading-relaxed text-white/80">
            We understand that circumstances may change, and we strive to
            provide the best service for our customers at iTaxEasy. Please
            review our refund and cancellation policies below for our tax
            filing, GST-related services, and online products.
          </p>
        </GlassCard>

        {/* SECTION 1 */}
        <PolicySection
          icon={<RefreshCw className="h-5 w-5" />}
          title="1. Refund Policy"
        >
          <div className="space-y-5">
            <GlassHighlight>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                For Tax Filing & GST Services
              </h4>
              <p>
                We are committed to ensuring your satisfaction with our tax
                filing and GST-related services. If you encounter any issues or
                decide not to proceed with our services, please contact us at{' '}
                <a
                  href="mailto:info@itaxeasy.com"
                  className="underline text-blue-300"
                >
                  info@itaxeasy.com
                </a>{' '}
                for assistance.
              </p>
            </GlassHighlight>

            <GlassHighlight>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                For Online Products
              </h4>
              <p>
                For online products purchased through iTaxEasy, refunds may be
                provided under certain circumstances. Please refer to the
                specific refund policies outlined during the purchase process or
                contact our support team for further assistance.
              </p>
            </GlassHighlight>
          </div>
        </PolicySection>

        {/* SECTION 2 */}
        <PolicySection
          icon={<XCircle className="h-5 w-5" />}
          title="2. Cancellation Policy"
        >
          <div className="space-y-5">
            <GlassHighlight>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                For Tax Filing & GST Services
              </h4>
              <p>
                If you need to cancel your tax filing or GST-related service
                request, please notify us as soon as possible. Cancellation
                requests received before the commencement of the service will be
                processed accordingly.
              </p>
            </GlassHighlight>

            <GlassHighlight>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                For Online Products
              </h4>
              <p>
                Cancellation policies for online products vary depending on the
                product and service agreement. Please refer to the terms and
                conditions provided during the purchase or contact our support
                team for assistance with cancellations.
              </p>
            </GlassHighlight>
          </div>
        </PolicySection>

        {/* SECTION 3 */}
        <PolicySection
          icon={<AlertCircle className="h-5 w-5" />}
          title="3. Important Notes"
        >
          <div className="space-y-3">
            {[
              'All refund and cancellation requests must be submitted in writing to support@itaxeasy.com',
              'Refunds may be subject to internal verification and processing fees',
              'Refunds for online products may require service deactivation',
              'iTaxEasy reserves the right to modify these policies at any time',
            ].map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/80"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-red-400" />
                {note}
              </div>
            ))}
          </div>
        </PolicySection>

        {/* CONTACT */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
          <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
            For any inquiries or assistance regarding refunds or cancellations,
            please contact our support team. We are here to help ensure a
            seamless experience for our customers.
          </p>
          <a
            href="mailto:info@itaxeasy.com"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            <Mail className="h-4 w-4" />
            info@itaxeasy.com
          </a>
        </div>
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

const PolicySection = ({ icon, title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
        {icon}
      </div>
      <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);
