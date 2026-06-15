'use client';
import {
  Truck,
  Monitor,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Mail,
} from 'lucide-react';

export default function ShippingAndDeliveryPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <section className="relative py-10 text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Shipping & Delivery Policy
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-12">
        {/* INTRO */}
        <GlassCard>
          <p className="text-sm md:text-base leading-relaxed text-white/80">
            This Shipping & Delivery Policy explains how services are delivered
            by iTaxEasy. Since iTaxEasy provides digital-only services, no
            physical shipping is involved.
          </p>
        </GlassCard>

        {/* SECTION 1 */}
        <PolicySection
          icon={<Monitor className="h-5 w-5" />}
          title="1. Digital Services Only"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Shipping is not applicable for our services at iTaxEasy. As we
            primarily provide digital services related to taxation, GST filing,
            and online products, there are no physical shipments involved.
          </p>
        </PolicySection>

        {/* SECTION 2 */}
        <PolicySection
          icon={<CheckCircle2 className="h-5 w-5" />}
          title="2. How We Deliver Our Services"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Digital Platform Access',
                icon: <Monitor className="h-4 w-4" />,
                text: "All our services are delivered through our secure online platform. You'll receive instant access to your dashboard and tools upon successful registration and payment.",
              },
              {
                title: 'Immediate Availability',
                icon: <CheckCircle2 className="h-4 w-4" />,
                text: 'Our tax filing, GST services, and online products are available immediately after purchase. No waiting for physical delivery required.',
              },
              {
                title: '24/7 Access',
                icon: <Calendar className="h-4 w-4" />,
                text: 'Access your services anytime, anywhere through our web platform. Your data and tools are always available when you need them.',
              },
              {
                title: 'Cloud-Based Delivery',
                icon: <Truck className="h-4 w-4" />,
                text: 'All services are delivered through secure cloud infrastructure, ensuring reliability and instant access to your tax and GST solutions.',
              },
            ].map((item, index) => (
              <GlassHighlight key={index}>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </h4>
                <p>{item.text}</p>
              </GlassHighlight>
            ))}
          </div>
        </PolicySection>

        {/* SECTION 3 */}
        <PolicySection
          icon={<AlertCircle className="h-5 w-5" />}
          title="3. Disclaimer"
        >
          <GlassHighlight>
            <p>
              The above content is provided solely for informational purposes by
              iTaxEasy. We take every effort to ensure accuracy, but we shall
              not be liable for any claims or liabilities arising from
              non-adherence to this policy by our users.
            </p>
          </GlassHighlight>
        </PolicySection>

        {/* CONTACT */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Questions About Our Services?</h3>
          <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
            Since we provide digital services only, there are no shipping delays
            or delivery concerns. If you have any questions about accessing your
            services, our support team is here to help.
          </p>
          <a
            href="mailto:info@itaxeasy.com"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            <Monitor className="h-4 w-4" />
            Contact Support
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
