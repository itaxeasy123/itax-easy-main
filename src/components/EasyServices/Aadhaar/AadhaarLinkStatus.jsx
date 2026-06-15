'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import {
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import { useReactToPrint } from 'react-to-print';
import useAuth from '../../../hooks/useAuth';
import ServiceToolShell, { ToolInput } from '../ServiceToolShell';

/* =========================================================
REGEX VALIDATION
========================================================= */

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAAR_REGEX = /^[2-9]{1}[0-9]{11}$/;

const AadhaarLinkStatus = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    pan: '',
    aadhaar: '',
  });

  const [errors, setErrors] = useState({
    pan: '',
    aadhaar: '',
  });

  const pdf_ref = useRef();

  const { token } = useAuth();

  /* =========================================================
PDF
========================================================= */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Aadhaar-PAN Link Status',
  });

  /* =========================================================
VALIDATION
========================================================= */

  const validatePAN = (pan) => PAN_REGEX.test(pan);

  const validateAadhaar = (aadhaar) => AADHAAR_REGEX.test(aadhaar);

  /* =========================================================
INPUT HANDLING
========================================================= */

  const handlePANChange = (e) => {
    const value = e.target.value.toUpperCase();

    setFormData((prev) => ({
      ...prev,
      pan: value,
    }));

    if (value && !validatePAN(value)) {
      setErrors((prev) => ({
        ...prev,
        pan: 'Invalid PAN format (ABCDE1234F)',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        pan: '',
      }));
    }
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);

    setFormData((prev) => ({
      ...prev,
      aadhaar: value,
    }));

    if (value && !validateAadhaar(value)) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: 'Invalid Aadhaar number',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        aadhaar: '',
      }));
    }
  };

  /* =========================================================
CLEAR
========================================================= */

  const handleClear = () => {
    setFormData({
      pan: '',
      aadhaar: '',
    });

    setErrors({
      pan: '',
      aadhaar: '',
    });

    setData('');
    setSuccess(false);
    setError('');
  };

  /* =========================================================
API
========================================================= */

  const handleSubmit = async () => {
    if (!validatePAN(formData.pan)) {
      setErrors((prev) => ({ ...prev, pan: 'Enter valid PAN' }));
      return;
    }

    if (!validateAadhaar(formData.aadhaar)) {
      setErrors((prev) => ({ ...prev, aadhaar: 'Enter valid Aadhaar' }));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pan/pan-aadhaar-link-status/`,

        {
          pan: formData.pan,
          aadhaar: formData.aadhaar,
        },

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(true);

      setData(res?.data?.data?.message || '');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to check link status');

      setSuccess(false);
    }

    setLoading(false);
  };

  /* =========================================================
STATUS TYPE
========================================================= */

  const getLinkStatusType = (message) => {
    if (!message) return 'neutral';

    const text = message.toLowerCase();

    if (text.includes('linked') || text.includes('success')) return 'success';

    if (text.includes('not') || text.includes('failed')) return 'error';

    return 'neutral';
  };

  /* =========================================================
FORMATTERS
========================================================= */

  const formatPAN = (pan) => pan?.toUpperCase() || '';

  const formatAadhaar = (aadhaar) => {
    if (!aadhaar) return '';

    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-XXXX-$3');
  };

  /* =========================================================
RESULT
========================================================= */

  const isLinked = getLinkStatusType(data) === 'success';

  const result = data ? (
    <div>
      <div className="mb-4 border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-800">
          Aadhaar-PAN Link Status
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          PAN:{' '}
          <span className="font-semibold text-slate-700">
            {formatPAN(formData.pan)}
          </span>
        </p>
        <p className="text-sm text-slate-500">
          Aadhaar:{' '}
          <span className="font-semibold text-slate-700">
            {formatAadhaar(formData.aadhaar)}
          </span>
        </p>
      </div>

      <div
        className={`flex items-center gap-4 rounded-xl border p-5 ${
          isLinked
            ? 'border-emerald-200 bg-emerald-50'
            : 'border-rose-200 bg-rose-50'
        }`}
      >
        {isLinked ? (
          <CheckCircle className="h-10 w-10 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="h-10 w-10 shrink-0 text-rose-500" />
        )}

        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {isLinked ? 'Successfully Linked' : 'Not Linked'}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{data}</p>
        </div>
      </div>
    </div>
  ) : null;

  /* =========================================================
EMPTY STATE (guidance)
========================================================= */

  const empty = (
    <div>
      <h2 className="mb-2 text-lg font-bold text-slate-800">
        Check Aadhaar-PAN Link Status
      </h2>
      <p className="mb-5 text-sm text-slate-500">
        Check if your Aadhaar number is linked with your PAN card as required by
        the Income Tax Department.
      </p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">
          How to check link status:
        </h3>
        <ol className="list-inside list-decimal space-y-1.5 text-sm text-slate-600">
          <li>Enter your 12-digit Aadhaar number</li>
          <li>Enter your 10-character PAN number</li>
          <li>Click &quot;Status&quot; to verify if they are linked</li>
          <li>View the link status result</li>
          <li>Download the result as PDF if needed</li>
        </ol>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
          <AlertCircle className="h-4 w-4" />
          Important Note:
        </h3>
        <p className="mt-1 text-sm text-amber-700">
          Linking your PAN with Aadhaar is mandatory as per the Income Tax Act.
          Failure to link may result in your PAN becoming inoperative, which can
          affect your financial transactions.
        </p>
      </div>
    </div>
  );

  /* =========================================================
UI
========================================================= */

  return (
    <ServiceToolShell
      title="Check Aadhaar-PAN Link Status"
      formTitle="Aadhaar-PAN Link Status"
      formSubtitle="Check if Aadhaar is linked with PAN"
      icon="ph:link"
      searchLabel="Check Status"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={!!data}
      loading={loading}
      result={result}
      empty={empty}
      error={error}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="Aadhaar Number"
        type="text"
        value={formData.aadhaar}
        onChange={handleAadhaarChange}
        placeholder="Enter 12-digit Aadhaar"
        maxLength={12}
        inputMode="numeric"
        autoComplete="off"
        error={errors.aadhaar}
      />

      <ToolInput
        label="PAN Number"
        type="text"
        value={formData.pan}
        onChange={handlePANChange}
        placeholder="ABCDE1234F"
        maxLength={10}
        autoComplete="off"
        error={errors.pan}
      />
    </ServiceToolShell>
  );
};

export default AadhaarLinkStatus;
