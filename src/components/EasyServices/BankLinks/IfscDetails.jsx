'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from '../ServiceToolShell';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const IfscDetails = () => {
  const { token } = useAuth();

  const [showdata, setShowdata] = useState({});
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const pdf_ref = useRef();

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'IFSC Details',
  });

  const validateIfsc = (ifsc) => ifscRegex.test(ifsc);

  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    setInputValue(value);
    setIsValid(value ? validateIfsc(value) : true);
  };

  const handleSubmit = async () => {
    if (!inputValue || !validateIfsc(inputValue)) {
      setIsValid(false);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/bank/details?ifsc=${inputValue}`,
        { ifsc: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setShowdata(response?.data?.data || {});
      setShowHide(true);
    } catch (err) {
      console.error('Error fetching IFSC:', err);
      setError(true);
      setShowHide(false);
      toast.error('Could not find any details for this IFSC code!');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setShowdata({});
    setShowHide(false);
    setError(false);
    setIsValid(true);
  };

  const details = [
    { label: 'Bank Name', value: showdata.BANK },
    { label: 'Address', value: showdata.ADDRESS },
    { label: 'Bank Code', value: showdata.BANKCODE },
    { label: 'Center', value: showdata.CENTRE },
    { label: 'Branch', value: showdata.BRANCH },
    { label: 'City', value: showdata.CITY },
    { label: 'State', value: showdata.STATE },
  ];

  const result = showhide ? (
    <div>
      <ResultHeader
        title="Bank Branch Details"
        subtitle={`Information for IFSC: ${inputValue}`}
      />
      <DetailGrid items={details} />
    </div>
  ) : null;

  return (
    <ServiceToolShell
      title="IFSC Code Details"
      formTitle="Bank IFSC Search"
      formSubtitle="Enter an IFSC code to retrieve bank branch details"
      icon="ph:bank"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error ? 'Could not find any details for this IFSC code.' : null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="IFSC Code"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter IFSC Code (AAAA0XXXXXX)"
        maxLength={11}
        autoComplete="off"
        error={!isValid ? 'Invalid IFSC (Format: AAAA0XXXXXX)' : ''}
        hint={isValid ? 'Format: AAAA0XXXXXX (4 letters + 0 + 6 alphanumeric)' : ''}
      />
    </ServiceToolShell>
  );
};

export default IfscDetails;
