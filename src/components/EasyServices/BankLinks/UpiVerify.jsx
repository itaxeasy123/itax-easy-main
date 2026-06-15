'use client';
import { useRef, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import useAuth from '../../../hooks/useAuth';
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
} from '../ServiceToolShell';

const UpiVerify = () => {
  const { token } = useAuth();
  const [upiAddress, setUpiAddress] = useState('');
  const [name, setName] = useState('');
  const [showdata, setShowData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUpiValid, setIsUpiValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const pdf_ref = useRef();

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'UPI Verification Result',
  });

  const validateUpi = (upi) => /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/i.test(upi);
  const validateName = (n) => n.trim().length >= 2;

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiAddress(value);
    setIsUpiValid(value ? validateUpi(value) : true);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIsNameValid(value ? validateName(value) : true);
  };

  const handleSubmit = async () => {
    if (!upiAddress || !validateUpi(upiAddress)) {
      setIsUpiValid(false);
      toast.error('Please enter a valid UPI address');
      return;
    }
    if (!name || !validateName(name)) {
      setIsNameValid(false);
      toast.error('Please enter a valid name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bank/upi-verify`,
        {
          params: { virtual_payment_address: upiAddress, name },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data && response.data.data) {
        setShowData(response.data.data.account_exists);
        toast.success('UPI verification completed');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error verifying UPI:', err);
      setError(
        err.response?.data?.message ||
          'Failed to verify UPI details. Please try again.',
      );
      toast.error('Details entered are incorrect or not found');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUpiAddress('');
    setName('');
    setShowData('');
    setError('');
    setIsUpiValid(true);
    setIsNameValid(true);
  };

  const isValid = showdata === 'Yes' || showdata === true;

  const result = showdata ? (
    <div>
      <ResultHeader
        title="UPI Verification Result"
        subtitle={`Verification for UPI: ${upiAddress}`}
      />
      <div
        className={`flex items-center gap-4 rounded-xl border p-5 ${
          isValid
            ? 'border-emerald-200 bg-emerald-50'
            : 'border-rose-200 bg-rose-50'
        }`}
      >
        <Icon
          icon={isValid ? 'ph:check-circle-fill' : 'ph:x-circle-fill'}
          className={`h-10 w-10 ${
            isValid ? 'text-emerald-500' : 'text-rose-500'
          }`}
        />
        <div>
          <h3
            className={`text-base font-semibold ${
              isValid ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {isValid ? 'Valid UPI ID' : 'Invalid UPI ID'}
          </h3>
          <p
            className={`mt-1 text-sm ${
              isValid ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isValid
              ? `The UPI ID ${upiAddress} is valid and belongs to ${name}.`
              : `The UPI ID ${upiAddress} is not valid or does not belong to ${name}.`}
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <ServiceToolShell
      title="UPI Verification"
      formTitle="Verify UPI Details"
      formSubtitle="Enter UPI address and name to verify the account"
      icon="ph:credit-card"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={!!showdata}
      loading={loading}
      searchLabel="Verify UPI"
      result={result}
      error={error || null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="UPI Address"
        type="text"
        value={upiAddress}
        onChange={handleUpiChange}
        placeholder="e.g., name@upi"
        error={!isUpiValid ? 'Enter a valid UPI address (e.g., username@bankname)' : ''}
        hint={isUpiValid ? 'Format: username@bankname' : ''}
      />
      <ToolInput
        label="Account Holder Name"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter account holder name"
        error={!isNameValid ? 'Enter a valid name (at least 2 characters)' : ''}
        hint={isNameValid ? 'Enter the name exactly as registered with the UPI' : ''}
      />
    </ServiceToolShell>
  );
};

export default UpiVerify;
