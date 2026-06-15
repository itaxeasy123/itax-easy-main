'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import ServiceToolShell, { ToolInput } from '../ServiceToolShell';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================================
   REGEX
================================ */

const nameRegex = /^[A-Za-z\s.'-]{2,}$/;
const ifscRegex = /^[A-Z]{4}0[0-9A-Z]{6}$/;
const accountRegex = /^\d{9,18}$/;
const phoneRegex = /^[6-9]\d{9}$/;

const VerifyBankDetails = () => {
  const { token } = useAuth();

  const [showdata, setShowdata] = useState(null);
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    phone: '',
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pdf_ref = useRef();

  const navigate = useRouter();

  /* ================================
     PDF
  ================================= */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Bank Account Verification',
  });

  /* ================================
     VALIDATE FIELD
  ================================= */

  const validateField = (name, value) => {
    switch (name) {
      case 'accountNumber':
        return accountRegex.test(value)
          ? ''
          : 'Account number must be 9-18 digits';

      case 'ifscCode':
        return ifscRegex.test(value)
          ? ''
          : 'Invalid IFSC (Format: HDFC0001234)';

      case 'accountHolderName':
        return nameRegex.test(value) ? '' : 'Enter valid account holder name';

      case 'phone':
        return phoneRegex.test(value)
          ? ''
          : 'Enter valid 10 digit mobile number';

      default:
        return '';
    }
  };

  /* ================================
     HANDLE INPUT
  ================================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processed = value;

    if (name === "ifscCode") {

      let val = value.toUpperCase()

      /* remove invalid characters */
      val = val.replace(/[^A-Z0-9]/g, "")

      /* limit length */
      val = val.slice(0, 11)

      /* enforce first 4 letters */
      if (val.length <= 4) {
        val = val.replace(/[^A-Z]/g, "")
      }

      /* enforce 5th character = 0 */
      if (val.length === 5 && val[4] !== "0") {
        val = val.slice(0, 4) + "0"
      }

      processed = val
    }

    if (name === 'accountHolderName') {
      processed = value.toUpperCase();
    }

    if (name === 'phone') {
      processed = value.replace(/\D/g, '').slice(0, 10);
    }

    if (name === "accountNumber") {

      processed = value
        .replace(/\D/g, "")
        .slice(0, 18)

    }

    setFormValues({
      ...formValues,
      [name]: processed,
    });

    if (processed) {
      setFormErrors({
        ...formErrors,
        [name]: validateField(name, processed),
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  /* ================================
     VALIDATE FORM
  ================================= */

  const validateForm = () => {
    let errors = {};
    let valid = true;

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key];

      if (!value) {
        errors[key] = 'Field is required';
        valid = false;
      } else {
        const err = validateField(key, value);

        if (err) {
          errors[key] = err;
          valid = false;
        }
      }
    });

    setFormErrors(errors);

    return valid;
  };

  /* ================================
     SUBMIT
  ================================= */

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all fields correctly');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/bank/verify-account`,

        {
          accountNumber: formValues.accountNumber,
          ifsc: formValues.ifscCode,
          name: formValues.accountHolderName,
          mobile: formValues.phone,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      if (response.data && response.data.data) {
        setShowdata(response.data.data);
        setShowHide(true);

        toast.success('Bank details verified successfully');
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error(err);

      let message = 'Verification failed';

      if (err.response) {
        message = err.response.data?.message || 'Server error';
      } else if (err.request) {
        message = 'No response from server';
      } else {
        message = err.message;
      }

      setError(true);
      setErrorMessage(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     CLEAR
  ================================= */

  const handleClear = (e) => {
    if (e?.preventDefault) e.preventDefault();

    setFormValues({
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      phone: '',
    });

    setFormErrors({
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      phone: '',
    });

    setShowdata(null);
    setShowHide(false);
    setError(false);
    setErrorMessage('');
  };

  /* ================================
     RESULT
  ================================= */

  const result = showhide && showdata ? (
    <div>
      <h2 className="mb-3 text-base font-bold text-slate-800">
        Verification Result
      </h2>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 font-semibold text-slate-800">{showdata.message}</p>
        <p className="text-sm text-slate-600">
          Account Holder: {showdata.name_at_bank}
        </p>
        <p className="text-sm text-slate-600">Reference ID: {showdata.utr}</p>
      </div>
    </div>
  ) : null;

  /* ================================
     UI
  ================================= */

  return (
    <ServiceToolShell
      title="Bank Account Verification"
      formTitle="Verify Bank Account Details"
      formSubtitle="Enter account details to verify bank information"
      icon="ph:bank"
      searchLabel="Verify"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error ? errorMessage : null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="Account Number"
        name="accountNumber"
        value={formValues.accountNumber}
        onChange={handleInputChange}
        placeholder="Enter Account Number"
        error={formErrors.accountNumber}
        hint={!formErrors.accountNumber ? '9-18 digit account number' : ''}
      />

      <ToolInput
        label="IFSC Code"
        name="ifscCode"
        value={formValues.ifscCode}
        onChange={handleInputChange}
        maxLength={11}
        placeholder="HDFC0001234"
        error={formErrors.ifscCode}
      />

      <ToolInput
        label="Account Holder Name"
        name="accountHolderName"
        value={formValues.accountHolderName}
        onChange={handleInputChange}
        placeholder="Account Holder Name"
        error={formErrors.accountHolderName}
      />

      <ToolInput
        label="Mobile Number"
        name="phone"
        value={formValues.phone}
        onChange={handleInputChange}
        placeholder="10 digit mobile"
        error={formErrors.phone}
      />
    </ServiceToolShell>
  );
};

export default VerifyBankDetails;
