'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import {
  Fingerprint,
  KeyRound,
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Download,
} from 'lucide-react';

import useAuth from '../../../hooks/useAuth';
import { useReactToPrint } from 'react-to-print';
import SearchResult_section from '@/components/pagesComponents/pageLayout/SearchResult_section.js';

/* =========================================================
REGEX VALIDATION
========================================================= */

const AADHAAR_REGEX = /^[2-9]{1}[0-9]{11}$/;
const OTP_REGEX = /^\d{6}$/;

const AadhaarVerify = () => {
  const { token } = useAuth();

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const [showdata, setShowData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({
    message: '',
    type: '',
  });

  const [verificationComplete, setVerificationComplete] = useState(false);

  const [errors, setErrors] = useState({
    aadhaar: '',
    otp: '',
  });

  const pdf_ref = useRef();

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Aadhaar Verification Result',
  });

  /* =========================================================
VALIDATION FUNCTIONS
========================================================= */

  const validateAadhaar = (value) => {
    return AADHAAR_REGEX.test(value);
  };

  const validateOTP = (value) => {
    return OTP_REGEX.test(value);
  };

  /* =========================================================
INPUT HANDLING
========================================================= */

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);

    setAadhaarNumber(value);

    if (value && !validateAadhaar(value)) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: 'Enter valid 12-digit Aadhaar number',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        aadhaar: '',
      }));
    }
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);

    setOtp(value);

    if (value && !validateOTP(value)) {
      setErrors((prev) => ({
        ...prev,
        otp: 'Enter valid 6 digit OTP',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        otp: '',
      }));
    }
  };

  /* =========================================================
GENERATE OTP
========================================================= */

  const handleGenerateOTP = async (e) => {
    e.preventDefault();

    if (!validateAadhaar(aadhaarNumber)) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: 'Please enter valid Aadhaar',
      }));

      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/aadhaar/aadhaar-generate-otp`,

        { aadhaar: aadhaarNumber },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const apiData = res?.data;

      if (apiData?.success) {
        setReferenceId(apiData?.data?.data?.reference_id || '');

        setResponse({
          message: 'OTP sent successfully',
          type: 'success',
        });

        setCurrentStep(2);
      } else {
        setResponse({
          message: apiData?.message || 'OTP sending failed',
          type: 'error',
        });
      }
    } catch (err) {
      setResponse({
        message: err?.response?.data?.message || 'Server error',
        type: 'error',
      });
    }

    setLoading(false);
  };

  /* =========================================================
VERIFY OTP
========================================================= */

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!validateOTP(otp)) {
      setErrors((prev) => ({
        ...prev,
        otp: 'Enter valid OTP',
      }));

      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/aadhaar/aadhaar-verify-otp`,

        {
          otp,
          reference_id: referenceId,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const apiData = res?.data;

      if (apiData?.success) {
        setShowData(apiData?.data || {});

        setVerificationComplete(true);

        setResponse({
          message: 'Aadhaar verified successfully',
          type: 'success',
        });
      } else {
        setResponse({
          message: apiData?.message || 'Verification failed',
          type: 'error',
        });
      }
    } catch (err) {
      setResponse({
        message: err?.response?.data?.message || 'OTP verification failed',
        type: 'error',
      });
    }

    setLoading(false);
  };

  /* =========================================================
CLEAR
========================================================= */

  const handleClear = () => {
    setAadhaarNumber('');
    setOtp('');
    setReferenceId('');
    setShowData(null);
    setCurrentStep(1);
    setVerificationComplete(false);

    setErrors({
      aadhaar: '',
      otp: '',
    });

    setResponse({
      message: '',
      type: '',
    });
  };

  /* =========================================================
FORMAT AADHAAR
========================================================= */

  const formatAadhaarForDisplay = (aadhaar) => {
    if (!aadhaar) return '';

    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  /* =========================================================
UI
========================================================= */

  return (
    <SearchResult_section title="Aadhaar Verification">
      {/* LEFT PANEL */}

      <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Fingerprint className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Aadhaar Verification
            </h3>
            <p className="text-xs text-slate-500">
              Verify Aadhaar securely via OTP authentication
            </p>
          </div>
        </div>

        <form className="space-y-4">
          {/* STEP INDICATOR */}

          {!verificationComplete && (
            <div className="mb-3 flex justify-center">
              <div className="flex items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  1
                </div>

                <div
                  className={`h-1 w-16 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}
                ></div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  2
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 */}

          {currentStep === 1 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Aadhaar Number
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={handleAadhaarChange}
                  placeholder="Enter 12 digit Aadhaar"
                  className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.aadhaar ? 'border-rose-400 bg-rose-50' : 'border-slate-300'}`}
                />

                <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              </div>

              {errors.aadhaar && (
                <p className="text-xs text-rose-600">{errors.aadhaar}</p>
              )}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  onClick={handleGenerateOTP}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  OTP
                </button>

                <button
                  onClick={handleClear}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {currentStep === 2 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                OTP
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOTPChange}
                  placeholder="Enter 6 digit OTP"
                  className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.otp ? 'border-rose-400 bg-rose-50' : 'border-slate-300'}`}
                />

                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              </div>

              {errors.otp && (
                <p className="text-xs text-rose-600">{errors.otp}</p>
              )}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  onClick={handleVerifyOTP}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Verify OTP
                </button>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  onClick={handleGenerateOTP}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <Send className="h-4 w-4" />
                  Resend OTP
                </button>
              </div>
            </div>
          )}
        </form>
      </li>

      {/* RIGHT PANEL */}

      <li className="lg:col-span-2">
        {verificationComplete && showdata ? (
          <div
            ref={pdf_ref}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 className="mb-3 text-base font-bold text-slate-800">
              Aadhaar Verification Result
            </h2>

            <p className="mb-4 text-sm text-slate-500">
              Aadhaar:{' '}
              <span className="font-semibold text-slate-700">
                {formatAadhaarForDisplay(showdata?.aadhaar_number)}
              </span>
            </p>

            <div className="space-y-3">
              {showdata?.name && (
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <User className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Name
                    </p>

                    <p className="font-semibold text-slate-800">
                      {showdata.name}
                    </p>
                  </div>
                </div>
              )}

              {showdata?.dob && (
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <Calendar className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      DOB
                    </p>

                    <p className="font-semibold text-slate-800">
                      {showdata.dob}
                    </p>
                  </div>
                </div>
              )}

              {showdata?.address && (
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <MapPin className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Address
                    </p>

                    <p className="font-semibold text-slate-800">
                      {showdata.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={generatePDF}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>

              <button
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" />
                Verify Another
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-2 text-lg font-bold text-slate-800">
              Welcome to Aadhaar Verification
            </h2>
            <p className="mb-5 text-sm text-slate-500">
              Verify your Aadhaar details securely through OTP verification sent
              to your registered mobile number.
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                How to verify your Aadhaar:
              </h3>
              <ol className="list-inside list-decimal space-y-1.5 text-sm text-slate-600">
                <li>Enter your 12-digit Aadhaar number</li>

                <li>
                  Click &quot;Generate OTP&quot; to receive a one-time password
                  on your registered mobile
                </li>
                <li>Enter the 6-digit OTP you received</li>
                <li>Click &quot;Verify OTP&quot; to complete the verification</li>

                <li>View and download your verification details</li>
              </ol>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <AlertCircle className="h-4 w-4" />
                Important Note:
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                Make sure your mobile number is registered with your Aadhaar.
                The OTP will only be sent to the registered mobile number. This
                verification is secure and compliant with UIDAI guidelines.
              </p>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  );
};

export default AadhaarVerify;
