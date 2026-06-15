'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import userAxios from '@/lib/userAxios';
import { toast } from 'react-toastify';
import Chatbot from '@/components/chatbot/index.jsx';

export default function Footer() {
  const [socials, setSocials] = useState({});
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  const getSocials = useCallback(async () => {
    try {
      const { data, status } = await userAxios.get('/cms/footer');
      if (status === 200 && data) setSocials(data.data?.socials || {});
      else toast.error('Error fetching socials');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    getSocials();
    const handleScroll = () => setIsScrollButtonVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getSocials]);

  const links = [
    ['/about', 'About Us'],
    ['/contactus', 'Contact Us'],
    ['https://profile.itaxeasy.com/', 'Company Profile'],
    ['/tc', 'Terms & Conditions'],
    ['/privacy-policy', 'Privacy Policy'],
    ['/disclaimerpolicy', 'Disclaimer Policy'],
    ['/refund-and-cancellation-policy', 'Refund & Cancellation Policy'],
    ['/shipping-and-delivery-policy', 'Shipping & Delivery Policy'],
    ['/softwarelicense', 'Software License'],
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ABOUT */}
        <div className="space-y-2">
          <h4 className="text-2xl font-extrabold tracking-tight">iTaxEasy</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Trusted Accounting & Financial Platform in India. Continuing the
            legacy of N.S. Bedi & Associates since 1972.
          </p>
          <iframe
            className="mt-2 w-full rounded-md border border-gray-700 hover:shadow-lg transition-all h-28"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4668.759088204337!2d78.1760718502079!3d26.2171536260565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c69faa0547f1%3A0x3996f8cdea3069b!2sItax%20easy%20private%20limited!5e0!3m2!1sen!2sin!4v1676326483432!5m2!1sen!2sin"
            allowFullScreen
          />
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="font-bold text-lg mb-2 border-b border-gray-700 pb-1">
            Quick Links
          </h5>
          <ul className="space-y-1 text-sm">
            {links.map(([link, label]) => (
              <li key={link}>
                <Link
                  href={link}
                  target={link.startsWith('http') ? '_blank' : '_self'}
                  className="hover:text-white hover:underline transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h5 className="font-bold text-lg mb-2 border-b border-gray-700 pb-1">
            We Offer
          </h5>
          <ul className="space-y-1 text-sm">
          <li>
              <Link
                href="/delete-account"
                className="hover:text-white hover:underline transition-all"
              >
                Delete Account
              </Link>
            </li>
            <li>
              <Link
                href="/career"
                className="hover:text-white hover:underline transition-all"
              >
                Careers
              </Link>
            </li>
             <li>
              <Link
                href="/internship"
                className="hover:text-white hover:underline transition-all"
              >
              Internship
              </Link>
            </li>
             
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h5 className="font-bold text-lg mb-2 border-b border-gray-700 pb-1">
            Contact Us
          </h5>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`tel:${socials?.phone || '+918770877270'}`}
                className="hover:text-white font-semibold"
              >
                {socials?.phone || 'Not available'}
              </a>
            </li>
            <li>
              <a
                href="mailto:info@itaxeasy.com?subject=Contact%20Request&body=Hello%20iTaxEasy%20Team%2C"
                className="hover:text-white font-semibold"
              >
                info@itaxeasy.com
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-3">
            <SocialIcon
              href={socials?.facebook}
              icon="mdi:facebook"
              color="#1877F2"
            />
            <SocialIcon
              href={socials?.instagram}
              icon="mdi:instagram"
              color="#E1306C"
            />
            <SocialIcon
              href={socials?.linkedin}
              icon="mdi:linkedin"
              color="#0A66C2"
            />
            <SocialIcon
              href={socials?.whatsapp}
              icon="mdi:whatsapp"
              color="#25D366"
            />
            <SocialIcon
              href={socials?.youtube}
              icon="mdi:youtube"
              color="#FF0000"
            />
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-4 bg-gray-800 text-center py-2 text-xs font-bold text-gray-400">
        © {new Date().getFullYear()} iTaxEasy. All rights reserved.
      </div>

      {/* CHATBOT */}
      <div className="fixed bottom-20 right-4 z-50">
        <Chatbot />
      </div>

      {/* SCROLL TO TOP */}
      {isScrollButtonVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg text-white z-50"
        >
          <Icon icon="mdi:arrow-up" width={24} height={24} />
        </button>
      )}
    </footer>
  );
}

// SOCIAL ICON COMPONENT
const SocialIcon = ({ href, icon, color }) => (
  <a
    href={href || '#'}
    target="_blank"
    className="hover:scale-110 transition-transform"
    style={{ color }}
  >
    <Icon icon={icon} width={24} height={24} />
  </a>
);
