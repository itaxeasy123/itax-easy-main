
import './globals.css';
import 'react-toastify/ReactToastify.css';
import { Inter } from 'next/font/google';
import AppLayout from '@/layouts/AppLayout';
import ToastProvider from '@/components/partials/ToastProvider';
import StoreProvider from '@/store/StoreProvider';
import ReduxProvider from '@/store/redux-provider';
import Script from 'next/script';
import { Suspense } from 'react';
import Loader from '@/components/partials/loading/Loader';
import { AuthProvider } from '@/context/AuthContext';
import { GstinProvider } from '@/contexts/GstinContext'; // ✅ ADD THIS

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | Itax Easy',
    default: 'Itax Easy',
  },
  description:
    'Welcome to iTaxesy, your all-in-one solution for simplified financial management...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root" className={`${inter.className} text-slate-800`}>

        <Script
          id="easebuzz-checkout-script"
          src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js"
          strategy="afterInteractive"
        />

        <ToastProvider />

        <AuthProvider>
          <ReduxProvider>
            <StoreProvider>
             <GstinProvider>
              <AppLayout>
                <Suspense fallback={<Loader />}>
                  {children}
                </Suspense>
              </AppLayout>
              </GstinProvider>
            </StoreProvider>
          </ReduxProvider>
        </AuthProvider>

      </body>
    </html>
  );
}