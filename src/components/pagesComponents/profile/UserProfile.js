
'use client';
import userAxios from '@/lib/userbackAxios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserProfileCard from './UserProfileCard';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@/components/partials/loading/Loader';
import regex from '@/utils/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreate, userSchema } from './validation/schemas';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { parseNonNullObject } from '@/utils/utilityFunctions';
import { Edit2, Save, X, CheckCircle, Upload, Smartphone } from 'lucide-react';

// --- Simple debounce hook (reusable) ---
function useDebounce(value, delay = 450) {
  const [v, setV] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return v;
}

function splitFullName(fullName = '') {
  const cleaned = String(fullName)
    .replace(/.*\//, '') // remove prefix like "NAME/ABC"
    .replace(/\b(S\/O|D\/O|W\/O|C\/O|SON OF|DAUGHTER OF|WIFE OF)\b.*$/i, '')
    .replace(/[^A-Za-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const parts = cleaned.split(' ').filter(Boolean);

  if (parts.length === 0) {
    return { firstName: '', middleName: '', lastName: '' };
  }

  return {
    firstName: parts[0] || '',
    middleName: parts.length > 2 ? parts.slice(1, -1).join(' ') : '',
    lastName: parts.length > 1 ? parts[parts.length - 1] : '',
  };
}

// --- Normalize OCR gender to your form values ---
function normalizeGender(value = '') {
  const g = String(value).trim().toLowerCase();
  if (g === 'male' || g === 'm') return 'male';
  if (g === 'female' || g === 'f') return 'female';
  return '';
}

// --- Extract 6 digit pin from text ---
function extractPinFromText(text = '') {
  const match = String(text).match(/\b\d{6}\b/);
  return match ? match[0] : '';
}

// --- Convert dd/mm/yyyy to yyyy-mm-dd for date input state if needed ---
function convertDDMMYYYYToInputDate(dateStr = '') {
  const match = String(dateStr).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return '';
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

// --- File validator for OCR uploads ---
function validateOcrFile(file) {
  if (!file) return 'No file selected';

  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
  ];

  if (!allowedTypes.includes(file.type)) {
    return 'Only PNG, JPG, JPEG, PDF files are allowed';
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'File size must be less than 5MB';
  }

  return '';
}

const UserProfile = () => {
  const router = useRouter();
  const { token } = useAuth();

  // DATA FOR PROFILE CARD ~ USER DETAILS
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // PAN CARD
  const [loading, setLoading] = useState(false);
  const [panDetails, setPanDetails] = useState('');
  const [panVerificationOpen, setPanVerificationOpen] = useState(false);
  const [nameAsPan, setNameAsPan] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isverify, setIsVerify] = useState(false);

  // Local state for PAN input inside modal
  const [panNumber, setPanNumber] = useState('');
  const [panError, setPanError] = useState(false);

  // HOOK FORM
  const [editable, setEditable] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: userCreate,
    resolver: zodResolver(userSchema),
  });

  const panCard = watch('pan');

  // PIN WATCH + DEBOUNCE + LOCAL UI STATE
  const pin = watch('pin');
  const debouncedPin = useDebounce(pin, 450);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState(null);

  // EVENT HANDLERS
  const handleEditbutton = () => setEditable(!editable);

  // EDIT CANCEL HANDLER
  const editCancelHandler = () => {
    setEditable(!editable);
    reset(data);
    setPanDetails('');
    setPanVerificationOpen(false);
    setPanNumber('');
    setPanError(false);
    setNameAsPan('');
    setDateOfBirth('');
    setIsVerify(Boolean(data?.ispanlinked));
  };

  const formatDateForApi = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const applyNameToForm = useCallback(
    ({ firstName = '', middleName = '', lastName = '' }) => {
      if (firstName) {
        setValue('firstName', firstName, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
      setValue('middleName', middleName || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('lastName', lastName || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const verifyPanAndFill = useCallback(
    async ({ pan, name, dobInputDate }) => {
      const existingValues = getValues();
      const formattedDate = formatDateForApi(dobInputDate);

      const response = await userAxios.post(`/pan/get-pan-details`, {
        pan: String(pan || '').toUpperCase(),
        name_as_per_pan: String(name || '').trim(),
        date_of_birth: formattedDate,
      });

      const pdata = response?.data?.data;

      if (!pdata) {
        throw new Error('No data received from PAN verification');
      }

      setPanDetails(pdata);
      setIsVerify(true);

      setValue('firstName', pdata.first_name || existingValues?.firstName || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('lastName', pdata.last_name || existingValues?.lastName || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('email', pdata.email || existingValues?.email || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('phone', pdata.phone || existingValues?.phone || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('address', pdata.address || existingValues?.address || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(
        'gender',
        normalizeGender(pdata.gender) || existingValues?.gender || '',
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
      setValue('pin', pdata.pin || existingValues?.pin || '', {
        shouldDirty: true,
        shouldValidate: true,
      });

      setPanVerificationOpen(false);
      return pdata;
    },
    [getValues, setValue],
  );

  const submitHandler = async (form) => {
    const BASE = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === 'avatar') {
        if (form.avatar && form.avatar[0]) {
          formData.append('avatar', form.avatar[0]);
        }
      } else {
        formData.append(key, form[key] ?? '');
      }
    });

    const originalPan = String(data?.pan || '').toUpperCase();
    const currentPan = String(form?.pan || '').toUpperCase();
    const isPanChanged = originalPan !== currentPan;

    formData.append(
      'ispanlinked',
      JSON.stringify(isverify && !isPanChanged ? true : false),
    );

    try {
      setIsSubmitting(true);
      setIsLoading(true);

      const response = await axios.put(`${BASE}/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setEditable(false);
        setData((prev) => ({
          ...prev,
          avatar: prev?.avatar ? `${prev.avatar}?t=${Date.now()}` : prev?.avatar,
        }));

        await getUserDetails();
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await userAxios.get(`/user/profile`);
      const { data, status } = response;

      if (status === 200 && data) {
        const userData = parseNonNullObject(data);
        reset(userData);
        setData(userData);
        setIsVerify(Boolean(userData?.ispanlinked));
      } else {
        toast.error('Invalid user data received');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error(error?.response?.data?.message || 'Error fetching user details');
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    const currentPan = String(panCard || '').toUpperCase();
    const savedPan = String(data?.pan || '').toUpperCase();

    if (currentPan && savedPan && currentPan !== savedPan) {
      setIsVerify(false);
    }
  }, [panCard, data?.pan]);

  const handlePanDetails = useCallback(
    async (rawPan) => {
      if (!rawPan) {
        toast.error('Please enter a PAN number');
        return;
      }

      const pan = String(rawPan).toUpperCase();
      setValue('pan', pan, { shouldDirty: true, shouldValidate: true });

      if (!regex.PAN_CARD.test(pan)) {
        toast.error('Please enter a valid PAN number');
        return;
      }

      if (!nameAsPan || !dateOfBirth) {
        setPanNumber(pan);
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        setPanError(!panRegex.test(pan));
        setPanVerificationOpen(true);
        return;
      }

      try {
        setLoading(true);
        await verifyPanAndFill({
          pan,
          name: nameAsPan,
          dobInputDate: dateOfBirth,
        });
        toast.success('PAN details verified successfully');
      } catch (error) {
        console.error('PAN verification error:', error);
        toast.error(error?.response?.data?.message || error?.message || 'Error verifying PAN details');
      } finally {
        setLoading(false);
      }
    },
    [setValue, nameAsPan, dateOfBirth, verifyPanAndFill],
  );

  const handlePanUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationMessage = validateOcrFile(file);
    if (validationMessage) {
      toast.error(validationMessage);
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await fetch('https://ocr.itaxeasy.com/api/pan', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || 'PAN OCR request failed');

      const dataArr = Array.isArray(result?.data) ? result.data : [];
      let extractedPan = '';
      let extractedName = '';
      let extractedDob = '';

      dataArr.forEach((item) => {
        const label = String(item?.label || '').toLowerCase();
        const text = String(item?.text || '').trim();

        if (!text) return;
        if (label.includes('pan')) {
          const panMatch = text.match(/[A-Z]{5}[0-9]{4}[A-Z]/i);
          extractedPan = panMatch ? panMatch[0].toUpperCase() : text.toUpperCase();
        }
        if (label.includes('name')) extractedName = text;
        if (label.includes('dob')) {
          const dobMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);
          extractedDob = dobMatch ? dobMatch[0] : text;
        }
      });

      if (!extractedPan) throw new Error('PAN number not found in uploaded document');

      const nameParts = splitFullName(extractedName);
      setValue('pan', extractedPan, { shouldDirty: true, shouldValidate: true });
      applyNameToForm(nameParts);

      setPanNumber(extractedPan);
      setPanError(false);

      const autoName = [nameParts.firstName, nameParts.middleName, nameParts.lastName].filter(Boolean).join(' ').trim();
      if (autoName) setNameAsPan(autoName);

      if (extractedDob) {
        const dobForInput = convertDDMMYYYYToInputDate(extractedDob);
        if (dobForInput) setDateOfBirth(dobForInput);
      }

      toast.success('PAN OCR extraction completed successfully');

      if (extractedPan && autoName && extractedDob && convertDDMMYYYYToInputDate(extractedDob)) {
        try {
          await verifyPanAndFill({
            pan: extractedPan,
            name: autoName,
            dobInputDate: convertDDMMYYYYToInputDate(extractedDob),
          });
          toast.success('PAN OCR extraction and auto verification completed successfully');
        } catch (verifyError) {
          console.error('PAN auto verification failed:', verifyError);
          toast.error(verifyError?.response?.data?.message || verifyError?.message || 'PAN extracted but verification failed');
          setPanVerificationOpen(true);
        }
      } else {
        setPanVerificationOpen(true);
      }
    } catch (err) {
      console.error('PAN OCR failed:', err);
      toast.error(err?.message || 'PAN OCR failed');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleAadhaarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationMessage = validateOcrFile(file);
    if (validationMessage) {
      toast.error(validationMessage);
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await fetch('https://ocr.itaxeasy.com/api/aadhar', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || 'Aadhaar OCR request failed');

      const fields = result?.extracted_fields || {};
      const aadhaarRaw = fields?.['Aadhaar Numbers']?.[0] || fields?.['Aadhaar Number']?.[0] || fields?.aadhaar_number || '';
      const fullName = fields?.Names?.[0] || fields?.Name?.[0] || fields?.name || '';
      const genderRaw = fields?.Gender?.[0] || fields?.gender || '';
      const addressRaw = fields?.address?.[0] || fields?.Address?.[0] || fields?.address || '';

      const cleanedAadhaar = String(aadhaarRaw).replace(/\D/g, '').slice(0, 12);
      const nameParts = splitFullName(fullName);
      const normalizedGender = normalizeGender(genderRaw);
      const extractedPin = extractPinFromText(addressRaw);

      if (!cleanedAadhaar && !fullName && !addressRaw) {
        throw new Error('No useful Aadhaar data found in uploaded document');
      }

      if (cleanedAadhaar) {
        setValue('aadhaar', cleanedAadhaar, { shouldDirty: true, shouldValidate: true });
      }

      applyNameToForm(nameParts);

      if (normalizedGender) {
        setValue('gender', normalizedGender, { shouldDirty: true, shouldValidate: true });
      }
      if (addressRaw) {
        setValue('address', String(addressRaw).trim(), { shouldDirty: true, shouldValidate: true });
      }
      if (extractedPin) {
        setValue('pin', extractedPin, { shouldDirty: true, shouldValidate: true });
      }

      toast.success('Aadhaar OCR extraction completed successfully');
    } catch (err) {
      console.error('Aadhaar OCR failed:', err);
      toast.error(err?.message || 'Aadhaar OCR failed');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const submitPanVerification = async () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panNumber || !panRegex.test(panNumber)) {
      toast.error('Please enter a valid PAN number');
      setPanError(true);
      return;
    }
    if (!nameAsPan?.trim()) {
      toast.error('Please enter your name as per PAN');
      return;
    }
    if (!dateOfBirth) {
      toast.error('Please enter your date of birth');
      return;
    }

    try {
      setLoading(true);
      await verifyPanAndFill({
        pan: panNumber,
        name: nameAsPan.trim(),
        dobInputDate: dateOfBirth,
      });
      toast.success('PAN details verified successfully');
    } catch (error) {
      console.error('PAN verification error:', error);
      toast.error(error?.response?.data?.message || error?.message || 'Error verifying PAN details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (panCard && typeof panCard === 'string') {
      const upper = panCard.toUpperCase();
      if (upper !== panCard) {
        setValue('pan', upper, { shouldDirty: true, shouldValidate: true });
      }
    }
  }, [panCard, setValue]);

  useEffect(() => {
    let mounted = true;

    async function fetchCityFromPincode(pincode) {
      setPinError(null);
      if (!pincode || pincode.length < 6 || !/^\d{6}$/.test(pincode)) return;

      setPinLoading(true);
      try {
        const { data } = await userAxios.get(`/pincode/info-by-pincode`, {
          params: { pincode },
        });

        const arr = Array.isArray(data) ? data : data?.data ?? [];
        const item = arr?.[0];

        if (!item) {
          if (mounted) setPinError('Pincode not found');
          return;
        }

        const city = item?.taluk || item?.districtName || '';
        if (!city) return;

        if (mounted) {
          const currentAddress = getValues('address') || '';
          if (!currentAddress.trim()) {
            setValue('address', city, { shouldDirty: true, shouldValidate: false });
          } else if (!currentAddress.toLowerCase().includes(String(city).toLowerCase())) {
            setValue('address', `${currentAddress}, ${city}`, { shouldDirty: true, shouldValidate: false });
          }
        }
      } catch (e) {
        if (mounted) {
          setPinError(e?.response?.data?.message || 'Failed to fetch city for this pincode');
        }
      } return () => {
        mounted = false;
      };
    }

    fetchCityFromPincode(debouncedPin || '');
    return () => { mounted = false; };
  }, [debouncedPin, getValues, setValue]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh] sm:h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-5 items-start">

          {/* Left Side Profile View Card */}
          <div className="xl:col-span-2 w-full sticky xl:top-24">
            <UserProfileCard panDetails={panDetails} data={data} />
          </div>

          {/* Right Side Complex Input Forms Section */}
          <div className="xl:col-span-3 bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-slate-200 gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {editable ? 'Edit Your Profile' : 'Your Profile Details'}
              </h1>
              {!editable && (
                <button
                  onClick={handleEditbutton}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>

            {/* PAN Verification Layer Modal */}
            {panVerificationOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md transform transition-all animate-slideIn max-h-[92vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">Verify PAN Status</h2>
                    <button
                      onClick={() => setPanVerificationOpen(false)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">PAN Number</label>
                      <input
                        type="text"
                        maxLength={10}
                        value={panNumber}
                        onChange={(e) => {
                          let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          setPanNumber(input);
                          setPanError(!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(input));
                        }}
                        placeholder="ABCDE1234F"
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none tracking-widest transition-all ${
                          panError && panNumber.length > 0 ? 'border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      {panError && panNumber.length > 0 && (
                        <p className="text-xs text-rose-600 mt-1">Format mismatch (e.g., ABCDE1234F)</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Name as per PAN</label>
                      <input
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        type="text"
                        value={nameAsPan}
                        onChange={(e) => setNameAsPan(e.target.value)}
                        placeholder="Full Name on PAN Card"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 border-t border-slate-200 pt-4">
                    <button
                      className="w-full sm:w-auto border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-2 px-5 rounded-lg transition-all text-sm"
                      onClick={() => setPanVerificationOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={panError || panNumber.length !== 10 || loading}
                      className={`w-full sm:w-auto text-white font-semibold py-2 px-5 rounded-lg transition-all text-sm flex items-center justify-center ${
                        panError || panNumber.length !== 10 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      onClick={submitPanVerification}
                    >
                      {loading ? 'Verifying...' : 'Verify Identity'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(submitHandler)} className="p-4 sm:p-6 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                
                {/* PAN Input Row */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold" htmlFor="pan">PAN Card</label>
                    <div className="flex items-center text-xs">
                      {data?.ispanlinked || isverify ? (
                        <span className="flex items-center text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle size={13} className="mr-1" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded italic">Not Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none uppercase transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                        errors.pan ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      }`}
                      id="pan"
                      type="text"
                      disabled={!editable}
                      placeholder="ABCDE1234F"
                      {...register('pan')}
                    />
                    {editable && (
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-lg text-sm transition-all shadow-sm flex items-center justify-center"
                        onClick={() => handlePanDetails(panCard)}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                  {errors.pan && <p className="text-rose-600 text-xs mt-1">{errors.pan.message}</p>}
                </div>

                {/* Aadhaar Input Row */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Aadhaar</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.aadhaar ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="aadhaar"
                    type="text"
                    disabled={!editable}
                    placeholder="Enter your Aadhaar number"
                    {...register('aadhaar')}
                  />
                  {errors.aadhaar && <p className="text-rose-600 text-xs mt-1">{errors.aadhaar.message}</p>}
                </div>

                {/* First Name */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">First Name</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.firstName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    disabled={!editable}
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-rose-600 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                {/* Middle Name */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Middle Name</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.middleName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="middleName"
                    type="text"
                    placeholder="Middle name"
                    disabled={!editable}
                    {...register('middleName')}
                  />
                </div>

                {/* Last Name */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Last Name</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.lastName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    disabled={!editable}
                    {...register('lastName')}
                  />
                </div>

                {/* Email Fields */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Email Address</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="email"
                    disabled={!editable}
                    type="email"
                    placeholder="name@domain.com"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Mobile Number */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Phone Number</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="mobile"
                    type="text"
                    disabled={!editable}
                    placeholder="10 digit mobile number"
                    {...register('phone')}
                  />
                  {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Gender Select Grid Option */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2">Gender</label>
                  <div className="relative">
                    <select
                      {...register('gender')}
                      id="gender"
                      disabled={!editable}
                      className={`w-full appearance-none capitalize rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                        errors.gender ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Pin Code Box */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2" htmlFor="pin">Pin Code</label>
                  <div className="relative">
                    <input
                      id="pin"
                      type="text"
                      placeholder="6-Digit Area Code"
                      disabled={!editable}
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 pr-16 ${
                        errors.pin ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      }`}
                      {...register('pin')}
                      maxLength={6}
                      inputMode="numeric"
                    />
                    {pinLoading && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 font-medium">info...</span>
                    )}
                  </div>
                  {pinError && <p className="text-rose-600 text-xs mt-1">{pinError}</p>}
                </div>

                {/* Address Row Block */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2" htmlFor="address">Address</label>
                  <input
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 ${
                      errors.address ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                    id="address"
                    type="text"
                    placeholder="House/Flat No, Street, City Name"
                    {...register('address')}
                    disabled={!editable}
                  />
                </div>

                {/* Inventory Action Wrapper */}
                <div className="flex items-center md:mt-6 py-2">
                  <input
                    type="checkbox"
                    id="inventory"
                    {...register('inventory')}
                    checked={watch('inventory') || false}
                    onChange={(e) => setValue('inventory', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 transition cursor-pointer disabled:opacity-50"
                    disabled={!editable}
                  />
                  <label htmlFor="inventory" className="ml-2 text-sm text-slate-700 font-medium cursor-pointer select-none">
                    Enable Inventory Dashboard Access
                  </label>
                </div>

                {/* Profile Attachment Photo */}
                <div className="w-full">
                  <label className="block uppercase tracking-wider text-slate-600 text-xs font-bold mb-2" htmlFor="file_input">Profile Picture</label>
                  <input
                    disabled={!editable}
                    className="block w-full text-sm text-slate-500 border border-slate-300 rounded-lg cursor-pointer bg-slate-50 focus:outline-none file:mr-4 file:py-2.5 file:px-4 file:rounded-l-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-60 transition"
                    id="file_input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    {...register('avatar')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                        toast.error('Only PNG, JPG, JPEG formats allowed');
                        e.target.value = '';
                        return;
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('File bounds exceeded maximum limit 2MB');
                        e.target.value = '';
                        return;
                      }

                      const previewUrl = URL.createObjectURL(file);
                      setData((prev) => ({ ...prev, avatar: previewUrl }));
                    }}
                  />
                </div>
              </div>

              {/* Advanced Document Verification Scan Zone */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Fast Scan Verification (OCR)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="cursor-pointer flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-all text-center">
                    <Upload size={16} /> Upload & Extract PAN
                    <input
                      type="file"
                      hidden
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handlePanUpload}
                    />
                  </label>

                  <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-all text-center">
                    <Upload size={16} /> Upload & Extract Aadhaar
                    <input
                      type="file"
                      hidden
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleAadhaarUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Progress Modal Backdrop overlay */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 rounded-2xl backdrop-blur-sm animate-fadeIn">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center max-w-xs mx-4 text-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-800 font-semibold text-base">Saving Profile...</p>
                    <p className="text-slate-500 text-xs mt-1">Synchronizing profile credentials securely.</p>
                  </div>
                </div>
              )}

              {/* Form Action Buttons Footer layout */}
              {editable && (
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-8 border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-6 rounded-lg transition-all text-sm"
                    onClick={editCancelHandler}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all text-sm disabled:bg-blue-400"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Styled JSX Layers for Native Keyframe Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;