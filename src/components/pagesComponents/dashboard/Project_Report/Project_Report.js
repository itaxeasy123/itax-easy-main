'use client';

import React, { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';
import { InputStyles } from '@/app/styles/InputStyles';
import { addProjectReport } from '@/lib/projectReportHistory';
import userbackAxios from '@/lib/userbackAxios';

const BUSINESS_OPTIONS = [
  'Flour Mill',
  'Toilet Soap Manufacturing Unit',
  'Tomato sauce Manufacturing Unit',
  'Roasted Rice Flakes',
  'Banana Fiber Extraction and weaving',
  'Computer Assembling',
  'Light Engineering (Nuts, Bolts, Washers, Rivets etc.)',
  'Metal Based Industries: Agricultural Implements, Cutleries & Hand Tools',
  'Manufacturing of Paper Products (Paper Cups)',
  'Curry and Rice Powder',
  'Bakery Products',
  'Steel Furniture',
  'Desiccated Coconut Powder',
  'Foot Wear',
  'Wooden Furniture Manufacturing Unit',
  'Manufacturing of Paper Napkins',
  'Pappad Manufacturing',
  'Readymade Garments',
  'Pickle Unit',
  'Manufacturing of Palm Plate',
  'Note Book Manufacturing',
];

const Project_Report = () => {
  const [formStep, setFormStep] = useState(1);
  const [machineryRows, setMachineryRows] = useState([
    { id: 1, name: '', price: '', depreciationRate: '' },
  ]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    unregister,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      area: '',
      propertyType: '',
      securityDeposit: '',
      monthlyRent: '',
      value: '',
      depreciationRate: '',
      workingCapital: {
        rawMaterial: '',
        wages: '',
        electricityCharges: '',
        otherCharges: '',
      },
      promoterContribution: '',
      haveLoan: false,
      loanAmount: '',
      loanInterest: '',
      turnover: '',
      plantAndMachinery: {
        1: {
          name: '',
          price: '',
          depreciationRate: '',
        },
      },
    },
  });

  const propertyType = watch('propertyType');
  const haveLoan = watch('haveLoan');

  const totalSteps = 3;

  const stepFields = useMemo(() => {
    return {
      1: [
        'businessName',
        'area',
        'propertyType',
        ...(propertyType === 'rent'
          ? ['securityDeposit', 'monthlyRent']
          : propertyType === 'own'
            ? ['value', 'depreciationRate']
            : []),
      ],
      2: [
        ...machineryRows.flatMap((row) => [
          `plantAndMachinery.${row.id}.name`,
          `plantAndMachinery.${row.id}.price`,
          `plantAndMachinery.${row.id}.depreciationRate`,
        ]),
        'workingCapital.rawMaterial',
        'workingCapital.wages',
        'workingCapital.electricityCharges',
        'workingCapital.otherCharges',
      ],
      3: [
        'promoterContribution',
        'turnover',
        ...(haveLoan ? ['loanAmount', 'loanInterest'] : []),
      ],
    };
  }, [propertyType, haveLoan, machineryRows]);

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-blue-500';
  const labelClass = 'mb-2 block text-sm font-semibold text-slate-700';
  const sectionCard =
    'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm';
  const stepCircleBase =
    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold';
  const buttonBase =
    'w-full rounded-xl px-4 py-3 text-sm font-semibold transition-none';

  const showWarningToast = (
    message = 'Please fill all required fields correctly before continuing.',
  ) => {
    if (!toast.isActive('project-report-validation-warning')) {
      toast.warning(message, {
        toastId: 'project-report-validation-warning',
      });
    }
  };

  const showSuccessToast = (message, id) => {
    if (!toast.isActive(id)) {
      toast.success(message, { toastId: id });
    }
  };

  const showErrorToast = (message, id) => {
    if (!toast.isActive(id)) {
      toast.error(message, { toastId: id });
    }
  };

  const cleanNumber = (value) => {
    if (value === undefined || value === null) return '';
    return String(value).replace(/[^\d.]/g, '');
  };

  const parseNumber = (value) => {
    const cleaned = cleanNumber(value);
    if (!cleaned) return 0;
    const parsed = Number(cleaned);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const formatCurrency = (value) => {
    const number = parseNumber(value);
    return `Rs. ${number.toLocaleString('en-IN')}`;
  };

  const sanitizePdfText = (value) => {
    if (value === undefined || value === null) return '';
    return String(value)
      .replace(/₹/g, 'Rs.')
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const isPositiveNumber = (value) => {
    if (value === '' || value === undefined || value === null) return false;
    return !Number.isNaN(parseNumber(value)) && parseNumber(value) >= 0;
  };

  const validateRequiredNumber = (label) => ({
    required: `${label} is required`,
    validate: (value) =>
      isPositiveNumber(value) || `Please enter a valid ${label.toLowerCase()}`,
  });

  const goNext = async () => {
    const fieldsToValidate = stepFields[formStep] || [];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      showWarningToast(
        'Please fill all required fields correctly before continuing.',
      );
      return;
    }

    if (formStep < totalSteps) {
      setFormStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrevious = () => {
    if (formStep > 1) {
      setFormStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addMachineryRow = () => {
    const nextId =
      machineryRows.length > 0
        ? Math.max(...machineryRows.map((item) => item.id)) + 1
        : 1;

    setMachineryRows((prev) => [
      ...prev,
      { id: nextId, name: '', price: '', depreciationRate: '' },
    ]);

    setValue(`plantAndMachinery.${nextId}.name`, '');
    setValue(`plantAndMachinery.${nextId}.price`, '');
    setValue(`plantAndMachinery.${nextId}.depreciationRate`, '');
  };

  const deleteMachineryRow = (id) => {
    if (machineryRows.length === 1) {
      showWarningToast('At least one plant and machinery row is required.');
      return;
    }

    setMachineryRows((prev) => prev.filter((item) => item.id !== id));
    unregister(`plantAndMachinery.${id}`);
    setValue(`plantAndMachinery.${id}.name`, '');
    setValue(`plantAndMachinery.${id}.price`, '');
    setValue(`plantAndMachinery.${id}.depreciationRate`, '');
  };

  const buildPdf = (formData) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 14;
    let y = 18;

    const addPageIfNeeded = (extra = 10) => {
      if (y + extra > pageHeight - 15) {
        doc.addPage();
        y = 18;
      }
    };

    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('PROJECT REPORT', pageWidth / 2, 11, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(
      sanitizePdfText(
        `Generated on: ${new Date().toLocaleDateString('en-IN')}`,
      ),
      pageWidth / 2,
      19,
      { align: 'center' },
    );

    y = 36;
    doc.setTextColor(20, 20, 20);

    const addSectionTitle = (title) => {
      addPageIfNeeded(12);
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(marginX, y - 5, pageWidth - marginX * 2, 9, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(sanitizePdfText(title), marginX + 3, y + 1);
      y += 10;
    };

    const addKeyValue = (label, value) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === false
      ) {
        return;
      }

      addPageIfNeeded(8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(sanitizePdfText(`${label}:`), marginX, y);

      doc.setFont('helvetica', 'normal');
      const safeValue = sanitizePdfText(value);
      const wrappedValue = doc.splitTextToSize(
        safeValue,
        pageWidth - marginX - (marginX + 48),
      );
      doc.text(wrappedValue, marginX + 48, y);
      y += Math.max(7, wrappedValue.length * 5);
    };

    addSectionTitle('Business Information');
    addKeyValue('Business Name', formData.businessName);
    addKeyValue('Area of Property', formData.area);
    addKeyValue(
      'Property Type',
      formData.propertyType === 'rent' ? 'Rental' : 'Owned',
    );

    if (formData.propertyType === 'rent') {
      addKeyValue('Security Deposit', formatCurrency(formData.securityDeposit));
      addKeyValue('Monthly Rent', formatCurrency(formData.monthlyRent));
    }

    if (formData.propertyType === 'own') {
      addKeyValue('Land / Building Value', formatCurrency(formData.value));
      addKeyValue(
        'Building Depreciation Rate',
        `${parseNumber(formData.depreciationRate)}%`,
      );
    }

    y += 3;

    const machineryEntries = machineryRows
      .map((row) => {
        const item = formData?.plantAndMachinery?.[row.id];
        return {
          name: sanitizePdfText(item?.name || ''),
          price: item?.price || '',
          depreciationRate: item?.depreciationRate || '',
        };
      })
      .filter((item) => item.name || item.price || item.depreciationRate);

    if (machineryEntries.length > 0) {
      addSectionTitle('Plant and Machinery');

      autoTable(doc, {
        startY: y,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 9,
          cellPadding: 2.5,
          overflow: 'linebreak',
          textColor: [35, 35, 35],
        },
        headStyles: {
          fillColor: [30, 64, 175],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [35, 35, 35],
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        margin: { left: marginX, right: marginX },
        head: [['S. No.', 'Name', 'Price', 'Depreciation Rate']],
        body: machineryEntries.map((item, index) => [
          sanitizePdfText(index + 1),
          sanitizePdfText(item.name),
          sanitizePdfText(formatCurrency(item.price)),
          sanitizePdfText(
            item.depreciationRate
              ? `${parseNumber(item.depreciationRate)}%`
              : '-',
          ),
        ]),
      });

      y = doc.lastAutoTable.finalY + 8;
    }

    addSectionTitle('Working Capital');
    addKeyValue(
      'Raw Material',
      formatCurrency(formData?.workingCapital?.rawMaterial),
    );
    addKeyValue(
      'Wages',
      formatCurrency(formData?.workingCapital?.wages),
    );
    addKeyValue(
      'Electricity Charges',
      formatCurrency(formData?.workingCapital?.electricityCharges),
    );
    addKeyValue(
      'Other Charges',
      formatCurrency(formData?.workingCapital?.otherCharges),
    );

    y += 3;

    addSectionTitle('Finance');
    addKeyValue(
      "Promoter's Contribution",
      formatCurrency(formData.promoterContribution),
    );
    addKeyValue('Loan Required', formData.haveLoan ? 'Yes' : 'No');

    if (formData.haveLoan) {
      addKeyValue('Loan Amount', formatCurrency(formData.loanAmount));
      addKeyValue(
        'Interest Rate',
        `${parseNumber(formData.loanInterest)}%`,
      );
    }

    addKeyValue(
      'Expected Annual Turnover',
      formatCurrency(formData.turnover),
    );

    const totalWorkingCapital =
      parseNumber(formData?.workingCapital?.rawMaterial) +
      parseNumber(formData?.workingCapital?.wages) +
      parseNumber(formData?.workingCapital?.electricityCharges) +
      parseNumber(formData?.workingCapital?.otherCharges);

    const totalMachineryCost = machineryEntries.reduce(
      (sum, item) => sum + parseNumber(item.price),
      0,
    );

    y += 3;
    addSectionTitle('Summary');
    addKeyValue(
      'Total Plant & Machinery Cost',
      formatCurrency(totalMachineryCost),
    );
    addKeyValue(
      'Total Working Capital',
      formatCurrency(totalWorkingCapital),
    );
    addKeyValue(
      'Project Estimated Base Cost',
      formatCurrency(totalMachineryCost + totalWorkingCapital),
    );

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i += 1) {
      doc.setPage(i);
      doc.setDrawColor(226, 232, 240);
      doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text('Professional Project Report', 14, pageHeight - 7);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, pageHeight - 7, {
        align: 'right',
      });
    }

    const safeBusinessName = sanitizePdfText(formData.businessName || 'Business')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '_');

    const fileName = `Project_Report_${safeBusinessName}_${
      new Date().toISOString().split('T')[0]
    }.pdf`;

    // Return the built document so callers can download it and/or persist it
    // to the project-report history.
    return { doc, fileName };
  };

  const handleGeneratePDF = async () => {
    const allFields = [...stepFields[1], ...stepFields[2], ...stepFields[3]];
    const isValid = await trigger(allFields);

    if (!isValid) {
      showWarningToast(
        'Please fill all required fields correctly before generating the PDF.',
      );
      return;
    }

    const formData = getValues();
    const { doc, fileName } = buildPdf(formData);
    doc.save(fileName);
    showSuccessToast(
      'Professional PDF generated successfully.',
      'project-report-pdf-success',
    );
  };

  const onSubmit = async (formData) => {
    const allFields = [...stepFields[1], ...stepFields[2], ...stepFields[3]];
    const isValid = await trigger(allFields);

    if (!isValid) {
      showWarningToast(
        'Please fill all required fields correctly before submitting.',
      );
      return;
    }

    try {
      const { doc, fileName } = buildPdf(formData);
      const businessName = formData.businessName || 'Business';

      // Immediate UX: download + local history (works even if backend is down).
      addProjectReport({
        businessName,
        fileName,
        pdfDataUri: doc.output('datauristring'),
      });
      doc.save(fileName);

      // Persist to the backend so it appears in the super-admin dashboard and
      // syncs across devices. Non-fatal if it fails — local copy already saved.
      try {
        const pdfBlob = doc.output('blob');
        const form = new FormData();
        form.append('pdf', pdfBlob, fileName);
        form.append('businessName', businessName);
        await userbackAxios.post('/projectreport/submit', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (uploadError) {
        console.error('Project report backend upload failed:', uploadError);
      }

      showSuccessToast(
        'Project report submitted successfully.',
        'project-report-submit-success',
      );
    } catch (error) {
      console.error(error);
      showErrorToast(
        'Something went wrong while submitting the form.',
        'project-report-submit-error',
      );
    }
  };

  return (
    <>
      <div className={`${InputStyles.Reportsection} w-full`}>
        <div className="w-full px-2 py-2 sm:px-3">
          <div className="border-b border-slate-200 px-2 py-2 sm:px-2 md:px-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-slate-900 sm:text-xl md:text-2xl">
                Project Report Generator
              </h1>
            </div>
          </div>

          <div className="px-3 py-3 sm:px-4 md:px-5">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {[1, 2, 3].map((step, index) => {
                const active = formStep === step;
                const completed = formStep > step;

                return (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`${stepCircleBase} ${
                          active || completed
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-300 text-slate-700'
                        }`}
                      >
                        {step}
                      </div>
                    </div>

                    {index < 2 && (
                      <div
                        className={`h-1 w-10 rounded-full sm:w-16 md:w-24 ${
                          formStep > step ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
              <div
                className={`rounded-2xl border p-3 text-sm font-semibold ${
                  formStep === 1
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Step 1: Business Information
              </div>
              <div
                className={`rounded-2xl border p-2 text-sm font-semibold ${
                  formStep === 2
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Step 2: Machinery & Working Capital
              </div>
              <div
                className={`rounded-2xl border p-2 text-sm font-semibold ${
                  formStep === 3
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Step 3: Finance & Report
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formStep === 1 && (
                <div className={sectionCard}>
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                      Business Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Enter business and property-related details carefully.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="md:col-span-2 xl:col-span-3">
                      <label className={labelClass}>Business Name</label>
                      <select
                        className={inputClass}
                        {...register('businessName', {
                          required: 'Business name is required',
                        })}
                      >
                        <option value="">-- Select an Option --</option>
                        {BUSINESS_OPTIONS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.businessName && (
                        <span className="mt-1 block text-sm text-red-600">
                          {errors.businessName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Area of Property</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter area of property"
                        {...register('area', {
                          required: 'Area of property is required',
                          minLength: {
                            value: 2,
                            message: 'Please enter a valid area',
                          },
                        })}
                      />
                      {errors.area && (
                        <span className="mt-1 block text-sm text-red-600">
                          {errors.area.message}
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-2 xl:col-span-2">
                      <label className={labelClass}>Property Type</label>
                      <div className="flex flex-col gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <input
                            type="radio"
                            value="rent"
                            className="h-4 w-4"
                            {...register('propertyType', {
                              required: 'Property type is required',
                              onChange: () => {
                                setValue('value', '');
                                setValue('depreciationRate', '');
                              },
                            })}
                          />
                          Rental
                        </label>

                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <input
                            type="radio"
                            value="own"
                            className="h-4 w-4"
                            {...register('propertyType', {
                              required: 'Property type is required',
                              onChange: () => {
                                setValue('securityDeposit', '');
                                setValue('monthlyRent', '');
                              },
                            })}
                          />
                          Owned
                        </label>
                      </div>
                      {errors.propertyType && (
                        <span className="mt-1 block text-sm text-red-600">
                          {errors.propertyType.message}
                        </span>
                      )}
                    </div>

                    {propertyType === 'rent' && (
                      <>
                        <div>
                          <label className={labelClass}>
                            Security Deposit
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className={inputClass}
                            placeholder="Enter security deposit"
                            {...register('securityDeposit', {
                              ...validateRequiredNumber('Security deposit'),
                              setValueAs: (value) => cleanNumber(value),
                            })}
                          />
                          {errors.securityDeposit && (
                            <span className="mt-1 block text-sm text-red-600">
                              {errors.securityDeposit.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>Monthly Rent</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className={inputClass}
                            placeholder="Enter monthly rent"
                            {...register('monthlyRent', {
                              ...validateRequiredNumber('Monthly rent'),
                              setValueAs: (value) => cleanNumber(value),
                            })}
                          />
                          {errors.monthlyRent && (
                            <span className="mt-1 block text-sm text-red-600">
                              {errors.monthlyRent.message}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {propertyType === 'own' && (
                      <>
                        <div>
                          <label className={labelClass}>
                            Value of Land / Building
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className={inputClass}
                            placeholder="Enter value in Rs."
                            {...register('value', {
                              ...validateRequiredNumber(
                                'Land / Building value',
                              ),
                              setValueAs: (value) => cleanNumber(value),
                            })}
                          />
                          {errors.value && (
                            <span className="mt-1 block text-sm text-red-600">
                              {errors.value.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>
                            Depreciation Rate of Building (%)
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className={inputClass}
                            placeholder="Enter depreciation rate"
                            {...register('depreciationRate', {
                              required: 'Depreciation rate is required',
                              setValueAs: (value) => cleanNumber(value),
                              validate: (value) =>
                                (!Number.isNaN(parseNumber(value)) &&
                                  parseNumber(value) >= 0 &&
                                  parseNumber(value) <= 100) ||
                                'Please enter a valid depreciation rate between 0 and 100',
                            })}
                          />
                          {errors.depreciationRate && (
                            <span className="mt-1 block text-sm text-red-600">
                              {errors.depreciationRate.message}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={goNext}
                      className={`${buttonBase} bg-blue-600 text-white sm:w-auto sm:min-w-[160px]`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6">
                  <div className={sectionCard}>
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                          Plant and Machinery
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Add all plant and machinery with price and
                          depreciation rate.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addMachineryRow}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <Icon icon="gg:add" className="h-5 w-5" />
                        Add Row
                      </button>
                    </div>

                    <div className="space-y-4">
                      {machineryRows.map((row, index) => (
                        <div
                          key={row.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-700 sm:text-base">
                              Machinery Item {index + 1}
                            </h3>

                            {machineryRows.length > 1 && (
                              <button
                                type="button"
                                onClick={() => deleteMachineryRow(row.id)}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                              >
                                <Icon
                                  icon="mdi:delete-outline"
                                  className="h-5 w-5"
                                />
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                              <label className={labelClass}>Name</label>
                              <input
                                type="text"
                                className={inputClass}
                                placeholder="Enter machine name"
                                {...register(
                                  `plantAndMachinery.${row.id}.name`,
                                  {
                                    required: 'Machine name is required',
                                  },
                                )}
                              />
                              {errors?.plantAndMachinery?.[row.id]?.name && (
                                <span className="mt-1 block text-sm text-red-600">
                                  {
                                    errors.plantAndMachinery[row.id].name
                                      .message
                                  }
                                </span>
                              )}
                            </div>

                            <div>
                              <label className={labelClass}>Price</label>
                              <input
                                type="text"
                                inputMode="decimal"
                                className={inputClass}
                                placeholder="Enter price"
                                {...register(
                                  `plantAndMachinery.${row.id}.price`,
                                  {
                                    ...validateRequiredNumber(
                                      'Machine price',
                                    ),
                                    setValueAs: (value) => cleanNumber(value),
                                  },
                                )}
                              />
                              {errors?.plantAndMachinery?.[row.id]?.price && (
                                <span className="mt-1 block text-sm text-red-600">
                                  {
                                    errors.plantAndMachinery[row.id].price
                                      .message
                                  }
                                </span>
                              )}
                            </div>

                            <div>
                              <label className={labelClass}>
                                Depreciation Rate (%)
                              </label>
                              <input
                                type="text"
                                inputMode="decimal"
                                className={inputClass}
                                placeholder="Enter depreciation rate"
                                {...register(
                                  `plantAndMachinery.${row.id}.depreciationRate`,
                                  {
                                    required: 'Depreciation rate is required',
                                    setValueAs: (value) => cleanNumber(value),
                                    validate: (value) =>
                                      (!Number.isNaN(parseNumber(value)) &&
                                        parseNumber(value) >= 0 &&
                                        parseNumber(value) <= 100) ||
                                      'Please enter a valid rate between 0 and 100',
                                  },
                                )}
                              />
                              {errors?.plantAndMachinery?.[row.id]
                                ?.depreciationRate && (
                                <span className="mt-1 block text-sm text-red-600">
                                  {
                                    errors.plantAndMachinery[row.id]
                                      .depreciationRate.message
                                  }
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={sectionCard}>
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                        Working Capital
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Enter all expected working capital amounts.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <label className={labelClass}>Raw Material</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter raw material cost"
                          {...register('workingCapital.rawMaterial', {
                            ...validateRequiredNumber('Raw material'),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors?.workingCapital?.rawMaterial && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.workingCapital.rawMaterial.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Wages</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter wages"
                          {...register('workingCapital.wages', {
                            ...validateRequiredNumber('Wages'),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors?.workingCapital?.wages && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.workingCapital.wages.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>
                          Electricity Charges
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter electricity charges"
                          {...register('workingCapital.electricityCharges', {
                            ...validateRequiredNumber('Electricity charges'),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors?.workingCapital?.electricityCharges && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.workingCapital.electricityCharges.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Other Charges</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter other charges"
                          {...register('workingCapital.otherCharges', {
                            ...validateRequiredNumber('Other charges'),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors?.workingCapital?.otherCharges && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.workingCapital.otherCharges.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={goPrevious}
                      className={`${buttonBase} border border-slate-300 bg-white text-slate-700 sm:w-auto sm:min-w-[160px]`}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className={`${buttonBase} bg-blue-600 text-white sm:w-auto sm:min-w-[160px]`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6">
                  <div className={sectionCard}>
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                        Finance Details
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Enter promoter contribution, loan details, and
                        turnover.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          Promoter&apos;s Contribution
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter promoter contribution"
                          {...register('promoterContribution', {
                            ...validateRequiredNumber(
                              'Promoter contribution',
                            ),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors.promoterContribution && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.promoterContribution.message}
                          </span>
                        )}
                      </div>

                      <div className="flex items-end">
                        <div className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3">
                          <label className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-slate-700">
                              Do You Have Any Loan?
                            </span>
                            <input
                              type="checkbox"
                              className="h-5 w-5"
                              {...register('haveLoan')}
                            />
                          </label>
                        </div>
                      </div>

                      {haveLoan && (
                        <>
                          <div>
                            <label className={labelClass}>
                              Amount of Loan
                            </label>
                            <input
                              type="text"
                              inputMode="decimal"
                              className={inputClass}
                              placeholder="Enter loan amount"
                              {...register('loanAmount', {
                                ...validateRequiredNumber('Loan amount'),
                                setValueAs: (value) => cleanNumber(value),
                              })}
                            />
                            {errors.loanAmount && (
                              <span className="mt-1 block text-sm text-red-600">
                                {errors.loanAmount.message}
                              </span>
                            )}
                          </div>

                          <div>
                            <label className={labelClass}>
                              Interest Rate on Loan (%)
                            </label>
                            <input
                              type="text"
                              inputMode="decimal"
                              className={inputClass}
                              placeholder="Enter interest rate"
                              {...register('loanInterest', {
                                required: 'Loan interest rate is required',
                                setValueAs: (value) => cleanNumber(value),
                                validate: (value) =>
                                  (!Number.isNaN(parseNumber(value)) &&
                                    parseNumber(value) >= 0 &&
                                    parseNumber(value) <= 100) ||
                                  'Please enter a valid rate between 0 and 100',
                              })}
                            />
                            {errors.loanInterest && (
                              <span className="mt-1 block text-sm text-red-600">
                                {errors.loanInterest.message}
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      <div className="md:col-span-2">
                        <label className={labelClass}>
                          Expected Sale Turnover per Year
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          placeholder="Enter annual turnover"
                          {...register('turnover', {
                            ...validateRequiredNumber('Annual turnover'),
                            setValueAs: (value) => cleanNumber(value),
                          })}
                        />
                        {errors.turnover && (
                          <span className="mt-1 block text-sm text-red-600">
                            {errors.turnover.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <button
                      type="button"
                      onClick={goPrevious}
                      className={`${buttonBase} border border-slate-300 bg-white text-slate-700 lg:w-auto lg:min-w-[160px]`}
                    >
                      Previous
                    </button>

                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[520px]">
                      <button
                        type="button"
                        onClick={handleGeneratePDF}
                        className={`${buttonBase} bg-emerald-600 text-white`}
                      >
                        Generate PDF
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${buttonBase} bg-blue-600 text-white`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          limit={1}
        />
      </div>
    </>
  );
};

export default Project_Report;