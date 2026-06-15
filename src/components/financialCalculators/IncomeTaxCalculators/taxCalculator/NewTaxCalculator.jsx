'use client';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getUserDetailsUsingPAN } from './utils/rest';
import { handleCalculations } from './utils/calculationHandler';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import { DOMESTIC_COMPANY_CATEGORY } from './utils/constants';
import { ChevronDown, Info } from 'lucide-react';

function NewTaxCalculator() {
  const {
    register,
    watch,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pan: '',
      taxPayerCategory: '',
      status: '',
      firstName: '',
      lastName: '',
      assessmentYear: '',
      isOldRegime: 'no',
      gender: '',
      residentStatus: '',
      basicIncome: '',
      calculatedNetTax: '',
      surcharge: '',
      educationCess: '',
      totalTaxLiability: '',
      domesticCategory: '',
      coOperative1115bad: 'no',
      '115BAE': 'no',
    },
    mode: 'onChange',
  });

  const [comparison, setComparison] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [result, setResult] = useState(null);

  // Watch individual fields to prevent unnecessary lag spikes during typing
  const taxPayerCategory = watch('taxPayerCategory');
  const assessmentYear = watch('assessmentYear');
  const gender = watch('gender');
  const residentStatus = watch('residentStatus');
  const basicIncome = watch('basicIncome');
  const domesticCategory = watch('domesticCategory');
  const isOldRegime = watch('isOldRegime');
  const coOperative1115bad = watch('coOperative1115bad');
  const coOperative115BAE = watch('115BAE');

  const panRegex = /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;

  const sanitizeIncome = (value) => {
    if (value === null || value === undefined) return '';
    return String(value).replace(/[^\d.]/g, '');
  };

  const handleIncomeChange = (event) => {
    const cleaned = sanitizeIncome(event.target.value);
    setValue('basicIncome', cleaned, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const panOnBlurHandler = async (event) => {
    const value = event.target.value?.trim()?.toUpperCase();

    setValue('pan', value || '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (!value) {
      setError('pan', { type: 'custom', message: 'PAN number is required' });
      return;
    }

    if (!panRegex.test(value)) {
      setError('pan', { type: 'custom', message: 'PAN number is invalid' });
      return;
    }

    try {
      const response = await getUserDetailsUsingPAN(value, setValue, setError, setUserDetails);
      if (response) {
        clearErrors('pan');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shouldShow115BAC =
    taxPayerCategory === 'General' &&
    ['AY 2024-25', 'AY 2023-24', 'AY 2022-23', 'AY 2021-22'].includes(assessmentYear);

  const canAutoCalculate = useMemo(() => {
    if (!taxPayerCategory || !assessmentYear) return false;

    const incomeValue = Number(sanitizeIncome(basicIncome || '0'));
    if (!basicIncome || Number.isNaN(incomeValue)) return false;

    if (taxPayerCategory === 'General') {
      return Boolean(gender && residentStatus);
    }

    if (
      ['AOP/BOI', 'HUF(Hindu undivided family)', 'Foreign Company', 'LLP'].includes(taxPayerCategory)
    ) {
      return true;
    }

    if (taxPayerCategory === 'Domestic Company') {
      return Boolean(domesticCategory);
    }

    if (taxPayerCategory === 'Co-operative Society') {
      return Boolean(coOperative1115bad);
    }

    return false;
  }, [taxPayerCategory, assessmentYear, basicIncome, gender, residentStatus, domesticCategory, coOperative1115bad]);

  // Combined targeted state updates for automatic computations trigger loop
  useEffect(() => {
    if (!canAutoCalculate) {
      setComparison(null);
      setResult(null);
      setValue('calculatedNetTax', '');
      setValue('surcharge', '');
      setValue('educationCess', '');
      setValue('totalTaxLiability', '');
      return;
    }

    const timer = setTimeout(() => {
      try {
        const formValues = getValues();
        handleCalculations(formValues, setValue, setComparison, setResult);
      } catch (error) {
        console.error(error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [
    taxPayerCategory,
    assessmentYear,
    gender,
    residentStatus,
    basicIncome,
    domesticCategory,
    isOldRegime,
    coOperative1115bad,
    coOperative115BAE,
    canAutoCalculate,
    setValue,
    getValues
  ]);

  const renderDomesticCompanyOptions = () => {
    if (taxPayerCategory !== 'Domestic Company') return null;

    return (
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5 mt-4 w-full">
        <h3 className="mb-3 text-sm font-bold text-blue-900 uppercase tracking-wider">
          Domestic Company Options
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {assessmentYear === 'AY 2024-25' && (
            <RadioOption
              register={register}
              name="domesticCategory"
              value={DOMESTIC_COMPANY_CATEGORY.LESS_THAN_400}
              id="domestic-less-than-400-ay2425"
              label='Turnover/gross receipt in previous year does not exceed ₹400 crore'
            />
          )}

          {assessmentYear === 'AY 2023-24' && (
            <RadioOption
              register={register}
              name="domesticCategory"
              value={DOMESTIC_COMPANY_CATEGORY.LESS_THAN_400}
              id="domestic-less-than-400-ay2324"
              label="Turnover/gross receipt in previous year 2020-21 does not exceed ₹400 crore"
            />
          )}

          {assessmentYear === 'AY 2022-23' && (
            <RadioOption
              register={register}
              name="domesticCategory"
              value={DOMESTIC_COMPANY_CATEGORY.LESS_THAN_400}
              id="domestic-less-than-400-ay2223"
              label="Turnover/gross receipt in previous year 2019-20 does not exceed ₹400 crore"
            />
          )}

          {assessmentYear === 'AY 2021-22' && (
            <RadioOption
              register={register}
              name="domesticCategory"
              value={DOMESTIC_COMPANY_CATEGORY.LESS_THAN_400}
              id="domestic-less-than-400-ay2122"
              label="Turnover/gross receipt in previous year 2018-19 does not exceed ₹400 crore"
            />
          )}

          <RadioOption
            register={register}
            name="domesticCategory"
            value={DOMESTIC_COMPANY_CATEGORY.SECTION_115BA}
            id="domestic-115ba"
            label="Company opted and qualifies under section 115BA"
          />

          <RadioOption
            register={register}
            name="domesticCategory"
            value={DOMESTIC_COMPANY_CATEGORY.SECTION_115BAA}
            id="domestic-115baa"
            label="Company opted and qualifies under section 115BAA"
          />

          <RadioOption
            register={register}
            name="domesticCategory"
            value={DOMESTIC_COMPANY_CATEGORY.SECTION_115BAB}
            id="domestic-115bab"
            label="Company opted and qualifies under section 115BAB"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-blue-700 px-2 sm:px-4 py-4 sm:py-6 md:py-8 transition-all">
      <main className="max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-md">
          
          {/* Header Bar */}
          <header className="border-b border-white/10 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                  Corporate Tax Calculator
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-blue-100">
                  Fully updated dynamic taxation estimation engine module layers.
                </p>
              </div>
              <div className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs sm:text-sm font-bold text-blue-700 shadow-sm w-max">
                Old vs New Framework
              </div>
            </div>
          </header>

          <div className="p-3 sm:p-6 lg:p-8">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-5 items-start">
              
              {/* Left Form Workspace Section */}
              <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <FormField label="PAN Card Identification" required error={errors.pan?.message}>
                    <input
                      type="text"
                      id="pan"
                      placeholder="ABCDE1234F"
                      autoComplete="off"
                      className={inputClassName}
                      {...register('pan', {
                        required: 'PAN identity string is mandatory',
                        pattern: { value: panRegex, message: 'Invalid PAN syntax' },
                        onBlur: panOnBlurHandler,
                      })}
                    />
                  </FormField>

                  <ResponsiveDropdown
                    label="Tax Payer Category"
                    required
                    value={taxPayerCategory}
                    error={errors.taxPayerCategory?.message}
                    onChange={(val) => setValue('taxPayerCategory', val, { shouldValidate: true })}
                    options={[
                      { label: "Individual", value: "General" },
                      { label: "HUF (Undivided Family)", value: "HUF(Hindu undivided family)" },
                      { label: "AOP / BOI Entities", value: "AOP/BOI" },
                      { label: "Domestic Company", value: "Domestic Company" },
                      { label: "Foreign Company Base", value: "Foreign Company" },
                      { label: "Firm / LLP Structure", value: "LLP" },
                      { label: "Co-operative Society", value: "Co-operative Society" },
                    ]}
                  />

                  <FormField label="Status Status">
                    <input
                      readOnly
                      placeholder="Fetched Status"
                      type="text"
                      className={`${inputClassName} bg-gray-50 text-gray-500 font-medium cursor-not-allowed`}
                      {...register('status')}
                    />
                  </FormField>

                  <FormField label="First Name">
                    <input
                      type="text"
                      placeholder="Automatic extraction"
                      readOnly
                      className={`${inputClassName} bg-gray-50 text-gray-500 cursor-not-allowed`}
                      {...register('firstName')}
                    />
                  </FormField>

                  <FormField label="Last Name">
                    <input
                      type="text"
                      placeholder="Automatic extraction"
                      readOnly
                      className={`${inputClassName} bg-gray-50 text-gray-500 cursor-not-allowed`}
                      {...register('lastName')}
                    />
                  </FormField>

                  <ResponsiveDropdown
                    label="Assessment Fiscal Year"
                    required
                    value={assessmentYear}
                    error={errors.assessmentYear?.message}
                    onChange={(val) => setValue('assessmentYear', val, { shouldValidate: true })}
                    options={[
                      { label: "2024 - 25", value: "AY 2024-25" },
                      { label: "2023 - 24", value: "AY 2023-24" },
                      { label: "2022 - 23", value: "AY 2022-23" },
                      { label: "2021 - 22", value: "AY 2021-22" },
                      { label: "2020 - 21", value: "AY 2020-21" },
                    ]}
                  />

                  {taxPayerCategory === 'General' && shouldShow115BAC && (
                    <ResponsiveDropdown
                      label="Opting under Section 115BAC?"
                      value={isOldRegime}
                      onChange={(val) => setValue('isOldRegime', val)}
                      options={[
                        { label: "Select Options", value: "no" },
                        { label: "Yes (Opted In)", value: "yes" },
                        { label: "No (Standard Framework)", value: "no" },
                      ]}
                    />
                  )}

                  {taxPayerCategory === 'General' && (
                    <>
                      <ResponsiveDropdown
                        label="Gender/Age Bracket"
                        required
                        value={gender}
                        error={errors.gender?.message}
                        onChange={(val) => setValue('gender', val, { shouldValidate: true })}
                        options={[
                          { label: "Male Base", value: "male" },
                          { label: "Female Base", value: "female" },
                          { label: "Senior Citizen (Age 60+)", value: "senior_citizen" },
                          { label: "Super Senior Citizen (Age 80+)", value: "super_senior_citizen" },
                        ]}
                      />

                      <ResponsiveDropdown
                        label="Residential Criteria"
                        required
                        value={residentStatus}
                        error={errors.residentStatus?.message}
                        onChange={(val) => setValue('residentStatus', val, { shouldValidate: true })}
                        options={[
                          { label: "Resident Individual", value: "resident" },
                          { label: "Non-Resident (NRI)", value: "non_resident" },
                          { label: "Not Ordinary Resident", value: "not_ordinary_resident" },
                        ]}
                      />
                    </>
                  )}

                  {taxPayerCategory === 'Co-operative Society' && (
                    <>
                      <ResponsiveDropdown
                        label="Section 115BAD Election"
                        value={coOperative1115bad}
                        onChange={(val) => setValue('coOperative1115bad', val)}
                        options={[
                          { label: "No", value: "no" },
                          { label: "Yes", value: "yes" },
                        ]}
                      />

                      {assessmentYear === 'AY 2024-25' && (
                        <ResponsiveDropdown
                          label="Section 115BAE Election"
                          value={coOperative115BAE}
                          onChange={(val) => setValue('115BAE', val)}
                          options={[
                            { label: "No", value: "no" },
                            { label: "Yes", value: "yes" },
                          ]}
                        />
                      )}
                    </>
                  )}

                  <FormField label="Net Taxable Income (₹)" required error={errors.basicIncome?.message} className="sm:col-span-2">
                    <div className="relative flex rounded-xl border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
                      <span className="bg-gray-50 text-gray-500 font-bold px-4 flex items-center justify-center border-r border-gray-100 text-sm">₹</span>
                      <input
                        type="text"
                        id="income"
                        inputMode="decimal"
                        placeholder="0"
                        className="w-full h-11 px-3 text-sm text-black outline-none bg-transparent font-medium"
                        {...register('basicIncome', {
                          required: 'Taxable valuation field is mandatory',
                          onChange: handleIncomeChange,
                        })}
                      />
                    </div>
                  </FormField>
                </div>

                {renderDomesticCompanyOptions()}
              </div>

              {/* Right Side Sticky Breakdown Summary Dashboard panel */}
              <div className="lg:col-span-2 space-y-4 w-full">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full">
                  <h2 className="mb-4 text-base sm:text-lg font-bold text-gray-800 uppercase tracking-wider border-b pb-2">
                    Tax Breakdown Liability
                  </h2>

                  <div className="space-y-2.5">
                    <SummaryRow label="Tax Net after relief 87A" value={watch('calculatedNetTax') || '₹0'} />
                    <SummaryRow label="Surcharge Surcharges" value={watch('surcharge') || '₹0'} />
                    <SummaryRow label="Education Cess (4%)" value={watch('educationCess') || '₹0'} />
                    <SummaryRow label="Net Tax Liability Balance" value={watch('totalTaxLiability') || '₹0'} strong />
                  </div>

                  <div className="mt-4 flex gap-2.5 bg-blue-50 text-blue-800 text-xs font-semibold p-3 rounded-xl border border-blue-100">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Real-time values updates completely on input state change modifications.</span>
                  </div>
                </div>

                {/* Comparative Analytics Module Block layout rendering */}
                {comparison && (
                  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-emerald-100 w-full animate-fadeIn">
                    <h2 className="mb-4 text-base sm:text-lg font-bold text-emerald-950 uppercase tracking-wider border-b pb-2">
                      Regime Cross Analysis
                    </h2>

                    <div className="space-y-2.5">
                      <SummaryRow label="Old Slab Assessment" value={formatINRCurrency(comparison.oldRegime)} />
                      <SummaryRow label="New Slab Assessment" value={formatINRCurrency(comparison.newRegime)} />
                    </div>

                    <div className="mt-4 text-center bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold p-3.5 rounded-xl shadow-inner">
                      Net Saving estimation: {formatINRCurrency(comparison.save)} via {comparison.regime} Configuration.
                    </div>
                  </div>
                )}

                {!canAutoCalculate && (
                  <div className="border border-dashed border-white/20 bg-white/5 p-5 text-center text-xs sm:text-sm text-blue-50 font-medium rounded-2xl">
                    Fill the form configuration metrics above to populate computations blocks parameters.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Fixed Dynamic Custom Select Dropdown logic module
function ResponsiveDropdown({ label, required, value, options = [], onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedLabel = useMemo(() => {
    const match = options.find(o => o.value === value);
    return match ? match.label : "Select Options";
  }, [value, options]);

  useEffect(() => {
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="w-full relative flex flex-col justify-end" ref={containerRef}>
      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputClassName} text-left flex items-center justify-between font-medium ${error ? 'border-red-500 focus:ring-red-100' : ''}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown size={16} className={`text-gray-400 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-40 max-h-56 overflow-y-auto transform origin-top transition-all scale-100">
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b last:border-0 border-gray-50 ${
                value === opt.value ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function FormField({ label, required, error, children, className = '' }) {
  return (
    <div className={`w-full flex flex-col justify-end ${className}`}>
      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 px-4 py-3.5 transition ${
        strong ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-gray-50/50'
      }`}
    >
      <span className={`text-xs sm:text-sm ${strong ? 'font-bold' : 'font-semibold text-gray-500'}`}>{label}</span>
      <span className={`text-xs sm:text-sm font-black tracking-wide ${strong ? 'text-white' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
}

function RadioOption({ register, name, value, id, label }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4 transition hover:bg-gray-50/40"
    >
      <input
        type="radio"
        id={id}
        value={value}
        className="mt-1 h-4 w-4 accent-blue-600 flex-shrink-0"
        {...register(name)}
      />
      <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{label}</span>
    </label>
  );
}

const inputClassName =
  'h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium';

export default NewTaxCalculator;