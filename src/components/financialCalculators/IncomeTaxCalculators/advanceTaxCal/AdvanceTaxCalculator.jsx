
'use client';

import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';

import NotSelected from './calculatorComponents/NotSelected';
import HUF_HinduUndividedFamily from './calculatorComponents/HUF_HinduUndividedFamily';
import AOP_BOI from './calculatorComponents/AOP_BOI';
import DomesticCompany from './calculatorComponents/DomesticCompany';
import ForeignCompany from './calculatorComponents/ForeignCompany';
import Firms from './calculatorComponents/Firms';
import LLP from './calculatorComponents/LLP';
import Co_OperativeSociety from './calculatorComponents/Co_OperativeSociety';

const QUARTER_KEYS = ['value1', 'value2', 'value3', 'value4', 'value5'];
const EMPTY_QUARTERS = {
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
};
const EMPTY_OTHER_SOURCES = { interest: '', commission: '', lottery: '' };
const EMPTY_NPS = { employeeNps: '', employerNps: '' };
const EMPTY_DEDUCTIONS_80C = {
  lifeInsurance: '',
  annuityPlan: '',
  pfPpf: '',
  nsc: '',
  ulip: '',
  pensionFund: '',
  housingLoanPrincipal: '',
  tuitionFees: '',
  fiveYearFd: '',
  npf: '',
  nps80ccd1: '',
  sukanya: '',
  other80C: '',
};
const EMPTY_DEDUCTIONS_OTHER = {
  mediclaim80D: '',
  medical80DDB: '',
  houseLoan80EEA: '',
  evLoan80EEB: '',
  donation80G: '',
  educationLoan80E: '',
  houseLoan80EE: '',
  deposit80TTB: '',
  other: '',
};

const initialValues = {
  pan: '',
  filing_category: '',
  person_type: '',
  residential_status: '',
  section115BAC: '',
  basic_salary: '',
  business_income: '',
  agricultural_income: '',
  tds_tcs_amt_credit: '',
  relief_other_than_87a: '',
  letout_selected: false,
  self_occupied_interest: '',
  letout_rent_received: '',
  letout_property_tax_paid: '',
  letout_unrealized_rent: '',
  letout_interest_on_loan: '',
};

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const num = Number(String(value).replace(/,/g, '').trim());
  return Number.isFinite(num) ? num : 0;
};

const sumObject = (obj = {}) =>
  Object.values(obj).reduce((sum, value) => sum + toNumber(value), 0);

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

const getFinancialYearInfo = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const startYear = month >= 4 ? year : year - 1;
  const endYear = startYear + 1;
  return {
    startYear,
    endYear,
    label: `${startYear}-${endYear}`,
  };
};

const getQuarterDates = (startYear, endYear) => [
  `15 June ${startYear}`,
  `15 September ${startYear}`,
  `15 December ${startYear}`,
  `15 March ${endYear}`,
];

const calculateOldRegimeTax = (taxableIncome, personType = 'male') => {
  const income = Math.max(0, taxableIncome);
  let exemption = 250000;

  if (personType === 'senior_citizen') exemption = 300000;
  if (personType === 'super_senior_citizen') exemption = 500000;

  if (income <= exemption) return 0;

  let tax = 0;

  if (income > exemption) {
    tax +=
      Math.min(income, 500000) - exemption > 0
        ? (Math.min(income, 500000) - exemption) * 0.05
        : 0;
  }
  if (income > 500000) {
    tax +=
      Math.min(income, 1000000) - 500000 > 0
        ? (Math.min(income, 1000000) - 500000) * 0.2
        : 0;
  }
  if (income > 1000000) {
    tax += (income - 1000000) * 0.3;
  }

  return Math.max(0, tax);
};

const calculateNewRegimeTaxFY2025_26 = (taxableIncome) => {
  const income = Math.max(0, taxableIncome);
  const slabs = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.1],
    [1600000, 0.15],
    [2000000, 0.2],
    [2400000, 0.25],
    [Infinity, 0.3],
  ];

  let previousLimit = 0;
  let tax = 0;

  for (const [limit, rate] of slabs) {
    if (income <= previousLimit) break;
    const taxablePortion = Math.min(income, limit) - previousLimit;
    if (taxablePortion > 0) {
      tax += taxablePortion * rate;
    }
    previousLimit = limit;
  }

  return Math.max(0, tax);
};

const calculateRebate = ({
  regime,
  taxableIncome,
  baseTax,
  residentialStatus,
}) => {
  const isResident = residentialStatus === 'resident';
  if (!isResident) return 0;

  if (regime === 'new') {
    if (taxableIncome <= 1200000) {
      return Math.min(baseTax, 60000);
    }
  } else {
    if (taxableIncome <= 500000) {
      return Math.min(baseTax, 12500);
    }
  }

  return 0;
};

const calculateSurchargeRate = (totalIncome, regime) => {
  const income = Math.max(0, totalIncome);
  if (income > 50000000) return regime === 'new' ? 0.25 : 0.37;
  if (income > 20000000) return 0.25;
  if (income > 10000000) return 0.15;
  if (income > 5000000) return 0.1;
  return 0;
};

const createLiabilityRows = (totalTaxLiability, dates) => {
  const cumulative15 = totalTaxLiability * 0.15;
  const cumulative45 = totalTaxLiability * 0.45;
  const cumulative75 = totalTaxLiability * 0.75;
  const cumulative100 = totalTaxLiability;

  return [
    {
      description: `Advance tax payable upto ${dates[0]} (Cumulative)`,
      amount: cumulative15,
    },
    {
      description: `Advance tax payable upto ${dates[1]} (Cumulative)`,
      amount: cumulative45,
    },
    {
      description: `Advance tax payable upto ${dates[2]} (Cumulative)`,
      amount: cumulative75,
    },
    {
      description: `Advance tax payable upto ${dates[3]} (Cumulative)`,
      amount: cumulative100,
    },
  ];
};

const createInstallmentRows = (totalTaxLiability, dates) => {
  const first = totalTaxLiability * 0.15;
  const second = totalTaxLiability * 0.3;
  const third = totalTaxLiability * 0.3;
  const fourth = totalTaxLiability * 0.25;

  return [
    {
      description: `First installment payable for the period April 1 to ${dates[0]}`,
      amount: first,
    },
    {
      description: `Second installment payable for the period June 16 to ${dates[1]}`,
      amount: second,
    },
    {
      description: `Third installment payable for the period September 16 to ${dates[2]}`,
      amount: third,
    },
    {
      description: `Last installment payable for the period December 16 to ${dates[3]}`,
      amount: fourth,
    },
  ];
};

const FieldRow = ({ label, children, className = '' }) => (
  <div
    className={`grid grid-cols-1 gap-3 py-2 md:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)] md:items-start ${className}`}
  >
    <div className="pt-1 text-sm font-medium leading-6 text-white">{label}</div>
    <div className="w-full">{children}</div>
  </div>
);

const NumberInput = ({
  value,
  onChange,
  name,
  placeholder,
  readOnly = false,
  disabled = false,
  min,
  className = '',
}) => (
  <input
    type="number"
    step="any"
    min={min}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    disabled={disabled}
    className={`h-11 w-full rounded-lg border border-blue-200 bg-white px-3 text-sm font-medium text-black outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100 ${className}`}
  />
);

const SelectInput = ({ value, onChange, name, children, className = '' }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`h-11 w-full rounded-lg border border-blue-200 bg-white px-3 text-sm font-medium text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300 ${className}`}
  >
    {children}
  </select>
);

const TableCard = ({
  title,
  rows,
  onExportExcel,
  titleButtonLabel = 'Export Excel',
}) => (
  <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-lg">
    <div className="flex flex-col gap-3 border-b border-blue-100 bg-blue-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-lg font-bold text-blue-900">{title}</h3>
      <button
        type="button"
        onClick={onExportExcel}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        {titleButtonLabel}
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={`${row.description}-${index}`}
              className="border-b border-blue-100 odd:bg-white even:bg-blue-50/50"
            >
              <td className="px-4 py-3 text-gray-800">{row.description}</td>
              <td className="px-4 py-3 font-semibold text-gray-900">
                {formatINR(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function AdvanceTaxCalc() {
  const fy = useMemo(() => getFinancialYearInfo(), []);
  const quarterDueDates = useMemo(
    () => getQuarterDates(fy.startYear, fy.endYear),
    [fy],
  );

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showHouseDetails, setShowHouseDetails] = useState(false);
  const [showCapitalDetails, setShowCapitalDetails] = useState(false);
  const [showOtherIncomeDetails, setShowOtherIncomeDetails] = useState(false);
  const [showDeductionDetails, setShowDeductionDetails] = useState(false);

  const [otherSources, setOtherSources] = useState(EMPTY_OTHER_SOURCES);
  const [npsAmount, setNpsAmount] = useState(EMPTY_NPS);
  const [deductions80C, setDeductions80C] = useState(EMPTY_DEDUCTIONS_80C);
  const [deductionsOther, setDeductionsOther] = useState(
    EMPTY_DEDUCTIONS_OTHER,
  );
  const [claim80DD, setClaim80DD] = useState(false);
  const [severe80DD, setSevere80DD] = useState(false);
  const [claim80U, setClaim80U] = useState(false);
  const [severe80U, setSevere80U] = useState(false);

  const [stcgNormal, setStcgNormal] = useState(EMPTY_QUARTERS);
  const [stcg111A, setStcg111A] = useState(EMPTY_QUARTERS);
  const [ltcg20, setLtcg20] = useState(EMPTY_QUARTERS);
  const [ltcg10, setLtcg10] = useState(EMPTY_QUARTERS);
  const [ltcg112A, setLtcg112A] = useState(EMPTY_QUARTERS);

  const [advanceTaxCalculated, setAdvanceTaxCalculated] = useState(null);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (values.pan) {
        const regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (!regex.test(values.pan.toUpperCase())) {
          errors.pan = 'Invalid PAN number';
        }
      }
      return errors;
    },
    onSubmit: (values) => {
      if (selectedCategory !== 'General') return;

      const salaryIncome = toNumber(values.basic_salary);
      const businessIncome = toNumber(values.business_income);
      const agriculturalIncome = toNumber(values.agricultural_income);
      const letoutSelected = !!values.letout_selected;

      const housePropertyIncome = letoutSelected
        ? letOutIncomeFromHouseProperty
        : selfOccupiedIncomeFromHouseProperty;

      const grossTotalIncome =
        salaryIncome +
        housePropertyIncome +
        totalCapitalGains +
        totalOtherSources +
        businessIncome;

      const taxableIncome = Math.max(0, grossTotalIncome - totalDeductions);
      const regime = values.section115BAC === 'yes' ? 'new' : 'old';
      const normalRateIncome = Math.max(
        0,
        taxableIncome -
          stcg111ATotal -
          ltcg112ATotal -
          ltcg20Total -
          ltcg10Total -
          lotteryIncome,
      );

      const normalTax =
        regime === 'new'
          ? calculateNewRegimeTaxFY2025_26(normalRateIncome)
          : calculateOldRegimeTax(normalRateIncome, values.person_type);

      const stcg111ATax = stcg111ATotal * 0.15;
      const ltcg112ATax = Math.max(0, ltcg112ATotal - 125000) * 0.1;
      const ltcg20Tax = ltcg20Total * 0.2;
      const ltcg10Tax = ltcg10Total * 0.1;
      const lotteryTax = lotteryIncome * 0.3;

      const baseTaxBeforeRelief =
        normalTax +
        stcg111ATax +
        ltcg112ATax +
        ltcg20Tax +
        ltcg10Tax +
        lotteryTax;

      const rebate87A = calculateRebate({
        regime,
        taxableIncome,
        baseTax: baseTaxBeforeRelief,
        residentialStatus: values.residential_status,
      });

      const reliefOtherThan87A = toNumber(values.relief_other_than_87a);
      const incomeTaxAfterRelief = Math.max(
        0,
        baseTaxBeforeRelief - rebate87A - reliefOtherThan87A,
      );
      const surchargeRate = calculateSurchargeRate(taxableIncome, regime);
      const surcharge = incomeTaxAfterRelief * surchargeRate;
      const cess = (incomeTaxAfterRelief + surcharge) * 0.04;
      const tdsCredit = toNumber(values.tds_tcs_amt_credit);
      const assessedTax = Math.max(
        0,
        incomeTaxAfterRelief + surcharge + cess - tdsCredit,
      );
      const totalTaxLiability = assessedTax;

      const liabilityRows = createLiabilityRows(
        totalTaxLiability,
        quarterDueDates,
      );
      const installmentRows = createInstallmentRows(
        totalTaxLiability,
        quarterDueDates,
      );

      setAdvanceTaxCalculated({
        regime,
        financialYear: fy.label,
        taxableIncome,
        grossTotalIncome,
        salaryIncome,
        businessIncome,
        agriculturalIncome,
        housePropertyIncome,
        totalOtherSources,
        totalCapitalGains,
        totalDeductions,
        selfOccupiedIncomeFromHouseProperty,
        letOutIncomeFromHouseProperty,
        netAnnualValue,
        standardDeductionOnHouse,
        normalRateIncome,
        stcg111ATotal,
        ltcg112ATotal,
        ltcg20Total,
        ltcg10Total,
        lotteryIncome,
        normalTax,
        stcg111ATax,
        ltcg112ATax,
        ltcg20Tax,
        ltcg10Tax,
        lotteryTax,
        baseTaxBeforeRelief,
        rebate87A,
        reliefOtherThan87A,
        incomeTaxAfterRelief,
        surcharge,
        cess,
        tdsCredit,
        assessedTax,
        totalTaxLiability,
        liabilityRows,
        installmentRows,
      });
    },
  });

  const activeRegimeLabel =
    formik.values.section115BAC === 'yes'
      ? 'New Regime'
      : formik.values.section115BAC === 'no'
        ? 'Old Regime'
        : '';

  const selfOccupiedInterest = toNumber(formik.values.self_occupied_interest);
  const selfOccupiedIncomeFromHouseProperty =
    selfOccupiedInterest > 0 ? -selfOccupiedInterest : 0;

  const rentReceived = toNumber(formik.values.letout_rent_received);
  const propertyTaxPaid = toNumber(formik.values.letout_property_tax_paid);
  const unrealizedRent = toNumber(formik.values.letout_unrealized_rent);
  const letoutInterestOnLoan = toNumber(formik.values.letout_interest_on_loan);

  const netAnnualValue = Math.max(
    0,
    rentReceived - (propertyTaxPaid + unrealizedRent),
  );
  const standardDeductionOnHouse = netAnnualValue * 0.3;
  const letOutIncomeFromHouseProperty =
    netAnnualValue - standardDeductionOnHouse - letoutInterestOnLoan;

  const totalOtherSources = useMemo(
    () => sumObject(otherSources),
    [otherSources],
  );
  const interestIncome = toNumber(otherSources.interest);
  const commissionIncome = toNumber(otherSources.commission);
  const lotteryIncome = toNumber(otherSources.lottery);

  const stcgNormalTotal = useMemo(() => sumObject(stcgNormal), [stcgNormal]);
  const stcg111ATotal = useMemo(() => sumObject(stcg111A), [stcg111A]);
  const ltcg20Total = useMemo(() => sumObject(ltcg20), [ltcg20]);
  const ltcg10Total = useMemo(() => sumObject(ltcg10), [ltcg10]);
  const ltcg112ATotal = useMemo(() => sumObject(ltcg112A), [ltcg112A]);

  const totalCapitalGains =
    stcgNormalTotal + stcg111ATotal + ltcg20Total + ltcg10Total + ltcg112ATotal;

  const total80C = Math.min(150000, sumObject(deductions80C));
  const totalNps = sumObject(npsAmount);
  const amount80DD = claim80DD ? (severe80DD ? 125000 : 75000) : 0;
  const amount80U = claim80U ? (severe80U ? 125000 : 75000) : 0;
  const totalOtherDeductions = sumObject(deductionsOther);
  const totalDeductions =
    total80C + totalNps + totalOtherDeductions + amount80DD + amount80U;

  const previewHousePropertyIncome = formik.values.letout_selected
    ? letOutIncomeFromHouseProperty
    : selfOccupiedIncomeFromHouseProperty;
  const previewGrossTotalIncome =
    toNumber(formik.values.basic_salary) +
    previewHousePropertyIncome +
    totalCapitalGains +
    totalOtherSources +
    toNumber(formik.values.business_income);
  const previewTaxableIncome = Math.max(
    0,
    previewGrossTotalIncome - totalDeductions,
  );

  const handleQuarterChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtherSourcesChange = (e) => {
    const { name, value } = e.target;
    setOtherSources((prev) => ({ ...prev, [name]: value }));
  };

  const handleNpsChange = (e) => {
    const { name, value } = e.target;
    setNpsAmount((prev) => ({ ...prev, [name]: value }));
  };

  const handle80CChange = (e) => {
    const { name, value } = e.target;
    setDeductions80C((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtherDeductionChange = (e) => {
    const { name, value } = e.target;
    setDeductionsOther((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullReset = () => {
    formik.resetForm();
    setSelectedCategory('');
    setShowHouseDetails(false);
    setShowCapitalDetails(false);
    setShowOtherIncomeDetails(false);
    setShowDeductionDetails(false);
    setOtherSources(EMPTY_OTHER_SOURCES);
    setNpsAmount(EMPTY_NPS);
    setDeductions80C(EMPTY_DEDUCTIONS_80C);
    setDeductionsOther(EMPTY_DEDUCTIONS_OTHER);
    setClaim80DD(false);
    setSevere80DD(false);
    setClaim80U(false);
    setSevere80U(false);
    setStcgNormal(EMPTY_QUARTERS);
    setStcg111A(EMPTY_QUARTERS);
    setLtcg20(EMPTY_QUARTERS);
    setLtcg10(EMPTY_QUARTERS);
    setLtcg112A(EMPTY_QUARTERS);
    setAdvanceTaxCalculated(null);
  };

  const exportRowsToExcel = async (sheetName, rows) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = [
      { header: 'Description', key: 'description', width: 60 },
      { header: 'Amount', key: 'amount', width: 20 },
    ];
    rows.forEach((item) =>
      worksheet.addRow({
        description: item.description,
        amount: Number(item.amount || 0).toFixed(2),
      }),
    );
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${sheetName}-${fy.label}.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportPdf = () => {
    if (!advanceTaxCalculated) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    pdf.setFontSize(16);
    pdf.text('Advance Tax Calculator Summary', 14, 15);
    pdf.setFontSize(10);
    pdf.text(`Financial Year: ${advanceTaxCalculated.financialYear}`, 14, 22);
    pdf.text(
      `Regime: ${advanceTaxCalculated.regime === 'new' ? 'New Regime' : 'Old Regime'}`,
      14,
      27,
    );

    autoTable(pdf, {
      startY: 34,
      head: [['Particular', 'Amount (₹)']],
      body: [
        ['Salary Income', formatINR(advanceTaxCalculated.salaryIncome)],
        [
          'Income from House Property',
          formatINR(advanceTaxCalculated.housePropertyIncome),
        ],
        ['Capital Gains', formatINR(advanceTaxCalculated.totalCapitalGains)],
        ['Other Sources', formatINR(advanceTaxCalculated.totalOtherSources)],
        ['Business Income', formatINR(advanceTaxCalculated.businessIncome)],
        [
          'Gross Total Income',
          formatINR(advanceTaxCalculated.grossTotalIncome),
        ],
        ['Total Deductions', formatINR(advanceTaxCalculated.totalDeductions)],
        ['Taxable Income', formatINR(advanceTaxCalculated.taxableIncome)],
        [
          'Income Tax after Relief',
          formatINR(advanceTaxCalculated.incomeTaxAfterRelief),
        ],
        ['Surcharge', formatINR(advanceTaxCalculated.surcharge)],
        ['Health & Education Cess', formatINR(advanceTaxCalculated.cess)],
        [
          'TDS/TCS/MAT Credit Utilized',
          formatINR(advanceTaxCalculated.tdsCredit),
        ],
        [
          'Total Tax Liability',
          formatINR(advanceTaxCalculated.totalTaxLiability),
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
    });

    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 8,
      head: [['Advance Tax Liability', 'Amount (₹)']],
      body: advanceTaxCalculated.liabilityRows.map((row) => [
        row.description,
        formatINR(row.amount),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
    });

    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 8,
      head: [['Advance Tax Installments', 'Amount (₹)']],
      body: advanceTaxCalculated.installmentRows.map((row) => [
        row.description,
        formatINR(row.amount),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
    });

    pdf.save(`advance-tax-summary-${fy.label}.pdf`);
  };

  const renderQuarterGrid = (data, total, onChange) => (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-6">
      {QUARTER_KEYS.map((key, index) => (
        <div key={key}>
          <label className="mb-1 block text-xs font-medium text-white/90">
            Quarter {index + 1}
          </label>
          <NumberInput
            name={key}
            value={data[key]}
            onChange={onChange}
            placeholder="0"
          />
        </div>
      ))}
      <div>
        <label className="mb-1 block text-xs font-medium text-white/90">
          Total
        </label>
        <NumberInput value={total.toFixed(2)} readOnly />
      </div>
    </div>
  );

  return (
    <div className="px-3 py-6 text-white sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="rounded-2xl border border-blue-300 bg-[#3c7cdd] px-4 py-4 shadow-2xl sm:px-6">
          <div className="flex flex-col gap-3">
            {/* TITLE */}
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl text-white">
              ADVANCE TAX CALCULATOR
            </h1>

            {/* SINGLE ROW */}
            <div className="flex flex-wrap items-center gap-3">
              {/* FY */}
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
                FY {fy.label}
              </span>

              {/* REGIME */}
              {activeRegimeLabel && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-800 sm:text-sm">
                  {activeRegimeLabel}
                </span>
              )}

              {/* PAN */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-white whitespace-nowrap">
                  PAN
                </label>

                <input
                  type="text"
                  name="pan"
                  value={formik.values.pan}
                  onChange={(e) =>
                    formik.setFieldValue('pan', e.target.value.toUpperCase())
                  }
                  placeholder="ABCDE1234F"
                  className="h-9 w-36 rounded-md border border-blue-200 bg-white px-2 text-sm text-black outline-none focus:border-blue-500"
                />
              </div>

              {/* TAX PAYER */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-white whitespace-nowrap">
                  Tax Payer
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategory(value);
                    formik.setFieldValue('filing_category', value);
                    setAdvanceTaxCalculated(null);
                  }}
                  className="h-9 rounded-md border border-blue-200 bg-white px-2 text-sm text-black outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="General">Individual</option>
                  <option value="HUF(Hindu undivided family)">HUF</option>
                  <option value="AOP/BOI">AOP/BOI</option>
                  <option value="Domestic Company">Domestic Company</option>
                  <option value="Foreign Company">Foreign Company</option>
                  <option value="Firms">Firms</option>
                  <option value="LLP">LLP</option>
                  <option value="Co-operative Society">
                    Co-operative Society
                  </option>
                </select>
              </div>

              {/* PDF BUTTON */}
              {advanceTaxCalculated && (
                <button
                  type="button"
                  onClick={exportPdf}
                  className="h-9 rounded-md bg-white px-4 text-sm font-bold text-blue-800 hover:bg-blue-100"
                >
                  Export PDF
                </button>
              )}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-4">
            {selectedCategory === '' && <NotSelected />}

            {selectedCategory === 'General' && (
              <>
                <div className="space-y-2 rounded-2xl bg-blue-800/60 p-4 sm:p-5">
                  <FieldRow label="Whether opting for taxation under Section 115BAC? (Old Regime/New Regime)">
                    <SelectInput
                      name="section115BAC"
                      value={formik.values.section115BAC}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAdvanceTaxCalculated(null);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="yes">New Regime</option>
                      <option value="no">Old Regime</option>
                    </SelectInput>
                  </FieldRow>

                  <FieldRow label="Male / Female / Senior Citizen">
                    <SelectInput
                      name="person_type"
                      value={formik.values.person_type}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="senior_citizen">Senior Citizen</option>
                      <option value="super_senior_citizen">
                        Super Senior Citizen
                      </option>
                    </SelectInput>
                  </FieldRow>

                  <FieldRow label="Residential Status">
                    <SelectInput
                      name="residential_status"
                      value={formik.values.residential_status}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="resident">Resident</option>
                      <option value="non_resident">Non Resident</option>
                      <option value="not_ordinary_resident">
                        Not Ordinary Resident
                      </option>
                    </SelectInput>
                  </FieldRow>

                  <FieldRow
                    label={
                      formik.values.section115BAC === 'yes'
                        ? 'Income from Salary (before exemptions / deductions)'
                        : 'Income from Salary (after standard deduction of Rs. 50,000)'
                    }
                  >
                    <NumberInput
                      name="basic_salary"
                      value={formik.values.basic_salary}
                      onChange={formik.handleChange}
                      placeholder="Enter salary income"
                    />
                  </FieldRow>

                  <FieldRow
                    label={
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Income From House Property</span>
                        <button
                          type="button"
                          onClick={() => setShowHouseDetails((prev) => !prev)}
                          className="text-xs font-semibold text-blue-100 underline underline-offset-2"
                        >
                          {showHouseDetails ? 'Hide Details' : 'Show Details'}
                        </button>
                      </div>
                    }
                  >
                    <NumberInput
                      value={previewHousePropertyIncome.toFixed(2)}
                      readOnly
                    />
                  </FieldRow>

                  {showHouseDetails && (
                    <div className="rounded-2xl border border-blue-400/50 bg-blue-900/40 p-4">
                      <label className="mb-4 flex cursor-pointer items-center gap-3 text-sm text-white">
                        <input
                          type="checkbox"
                          checked={formik.values.letout_selected}
                          onChange={(e) =>
                            formik.setFieldValue(
                              'letout_selected',
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded border-white"
                        />
                        Income from Let-out Property (unchecked means
                        Self-occupied Property)
                      </label>

                      {!formik.values.letout_selected ? (
                        <div className="space-y-4">
                          <FieldRow label="Interest on Housing Loan">
                            <NumberInput
                              name="self_occupied_interest"
                              value={formik.values.self_occupied_interest}
                              onChange={formik.handleChange}
                              placeholder="Enter interest on housing loan"
                            />
                          </FieldRow>
                          <FieldRow label="Income from Self-occupied House Property">
                            <NumberInput
                              value={selfOccupiedIncomeFromHouseProperty.toFixed(
                                2,
                              )}
                              readOnly
                            />
                          </FieldRow>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-sm font-semibold text-white">
                            Income from Let-out Property
                          </div>
                          <FieldRow label="Annual Letable Value / Rent Received or Receivable">
                            <NumberInput
                              name="letout_rent_received"
                              value={formik.values.letout_rent_received}
                              onChange={formik.handleChange}
                              placeholder="Enter rent received"
                            />
                          </FieldRow>
                          <FieldRow label="Less: Municipal Taxes Paid During the Year">
                            <NumberInput
                              name="letout_property_tax_paid"
                              value={formik.values.letout_property_tax_paid}
                              onChange={formik.handleChange}
                              placeholder="Enter municipal tax"
                            />
                          </FieldRow>
                          <FieldRow label="Less: Unrealized Rent">
                            <NumberInput
                              name="letout_unrealized_rent"
                              value={formik.values.letout_unrealized_rent}
                              onChange={formik.handleChange}
                              placeholder="Enter unrealized rent"
                            />
                          </FieldRow>
                          <FieldRow label="Net Annual Value">
                            <NumberInput
                              value={netAnnualValue.toFixed(2)}
                              readOnly
                            />
                          </FieldRow>
                          <FieldRow label="Standard Deduction @ 30% of Net Annual Value">
                            <NumberInput
                              value={standardDeductionOnHouse.toFixed(2)}
                              readOnly
                            />
                          </FieldRow>
                          <FieldRow label="Interest on Housing Loan">
                            <NumberInput
                              name="letout_interest_on_loan"
                              value={formik.values.letout_interest_on_loan}
                              onChange={formik.handleChange}
                              placeholder="Enter loan interest"
                            />
                          </FieldRow>
                          <FieldRow label="Income from Let-out House Property">
                            <NumberInput
                              value={letOutIncomeFromHouseProperty.toFixed(2)}
                              readOnly
                            />
                          </FieldRow>
                        </div>
                      )}
                    </div>
                  )}

                  <FieldRow
                    label={
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Capital Gains</span>
                        <button
                          type="button"
                          onClick={() => setShowCapitalDetails((prev) => !prev)}
                          className="text-xs font-semibold text-blue-100 underline underline-offset-2"
                        >
                          {showCapitalDetails ? 'Hide Details' : 'Show Details'}
                        </button>
                      </div>
                    }
                  >
                    <NumberInput
                      value={totalCapitalGains.toFixed(2)}
                      readOnly
                    />
                  </FieldRow>

                  {showCapitalDetails && (
                    <div className="space-y-5 rounded-2xl border border-blue-400/50 bg-blue-900/40 p-4">
                      <div>
                        <p className="mb-3 text-sm font-semibold text-white">
                          (a) Short Term Capital Gains (Other than covered under
                          section 111A)
                        </p>
                        {renderQuarterGrid(
                          stcgNormal,
                          stcgNormalTotal,
                          handleQuarterChange(setStcgNormal),
                        )}
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-white">
                          (b) Short Term Capital Gains (Covered under section
                          111A)
                        </p>
                        {renderQuarterGrid(
                          stcg111A,
                          stcg111ATotal,
                          handleQuarterChange(setStcg111A),
                        )}
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-white">
                          (c) Long Term Capital Gains (Charged to tax @ 20%)
                        </p>
                        {renderQuarterGrid(
                          ltcg20,
                          ltcg20Total,
                          handleQuarterChange(setLtcg20),
                        )}
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-white">
                          (d) Long Term Capital Gains (Charged to tax @ 10%)
                        </p>
                        {renderQuarterGrid(
                          ltcg10,
                          ltcg10Total,
                          handleQuarterChange(setLtcg10),
                        )}
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-white">
                          (e) Long Term Capital Gains (Covered under section
                          112A)
                        </p>
                        {renderQuarterGrid(
                          ltcg112A,
                          ltcg112ATotal,
                          handleQuarterChange(setLtcg112A),
                        )}
                      </div>
                    </div>
                  )}

                  <FieldRow
                    label={
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Income From Other Sources</span>
                        <button
                          type="button"
                          onClick={() =>
                            setShowOtherIncomeDetails((prev) => !prev)
                          }
                          className="text-xs font-semibold text-blue-100 underline underline-offset-2"
                        >
                          {showOtherIncomeDetails
                            ? 'Hide Details'
                            : 'Show Details'}
                        </button>
                      </div>
                    }
                  >
                    <NumberInput
                      value={totalOtherSources.toFixed(2)}
                      readOnly
                    />
                  </FieldRow>

                  {showOtherIncomeDetails && (
                    <div className="rounded-2xl border border-blue-400/50 bg-blue-900/40 p-4">
                      <div className="space-y-4">
                        <FieldRow label="Interest">
                          <NumberInput
                            name="interest"
                            value={otherSources.interest}
                            onChange={handleOtherSourcesChange}
                            placeholder="Enter interest income"
                          />
                        </FieldRow>
                        <FieldRow label="Commission / Other Income">
                          <NumberInput
                            name="commission"
                            value={otherSources.commission}
                            onChange={handleOtherSourcesChange}
                            placeholder="Enter commission or other income"
                          />
                        </FieldRow>
                        <FieldRow label="Winnings from Lottery, Crossword Puzzles, etc.">
                          <NumberInput
                            name="lottery"
                            value={otherSources.lottery}
                            onChange={handleOtherSourcesChange}
                            placeholder="Enter lottery income"
                          />
                        </FieldRow>
                      </div>
                    </div>
                  )}

                  <FieldRow label="Profits and Gains of Business or Profession (enter profit only)">
                    <NumberInput
                      name="business_income"
                      value={formik.values.business_income}
                      onChange={formik.handleChange}
                      placeholder="Enter business income"
                    />
                  </FieldRow>

                  <FieldRow label="Agricultural Income">
                    <NumberInput
                      name="agricultural_income"
                      value={formik.values.agricultural_income}
                      onChange={formik.handleChange}
                      placeholder="Enter agricultural income"
                    />
                  </FieldRow>

                  <FieldRow
                    label={
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Deductions</span>
                        <button
                          type="button"
                          onClick={() =>
                            setShowDeductionDetails((prev) => !prev)
                          }
                          className="text-xs font-semibold text-blue-100 underline underline-offset-2"
                        >
                          {showDeductionDetails
                            ? 'Hide Details'
                            : 'Show Details'}
                        </button>
                      </div>
                    }
                  >
                    <NumberInput value={totalDeductions.toFixed(2)} readOnly />
                  </FieldRow>

                  {showDeductionDetails && (
                    <div className="rounded-2xl border border-blue-400/50 bg-blue-900/40 p-4">
                      <div className="mb-4 text-sm font-semibold text-white">
                        Chapter VI-A Deductions
                      </div>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {[
                          ['lifeInsurance', 'Life Insurance premium paid'],
                          ['annuityPlan', 'Payment for annuity plan'],
                          ['pfPpf', 'Contribution toward provident fund / PPF'],
                          ['nsc', 'Investment in NSC + Interest'],
                          ['ulip', 'Contribution toward ULIP'],
                          [
                            'pensionFund',
                            'Contribution toward notified pension fund by MF/UTI',
                          ],
                          [
                            'housingLoanPrincipal',
                            'Re-payment of housing loan principal',
                          ],
                          ['tuitionFees', 'Tuition fees paid for children'],
                          [
                            'fiveYearFd',
                            '5 Years fixed deposit with PO / Scheduled Bank',
                          ],
                          ['npf', 'Contribution toward NPF'],
                          [
                            'nps80ccd1',
                            'Employee / Self contribution toward NPS u/s 80CCD(1)',
                          ],
                          [
                            'sukanya',
                            'Deposit with Sukanya Samriddhi Accounts',
                          ],
                          ['other80C', 'Any other deductible u/s 80C'],
                        ].map(([name, label]) => (
                          <div key={name}>
                            <label className="mb-1 block text-xs font-medium text-white/90">
                              {label}
                            </label>
                            <NumberInput
                              name={name}
                              value={deductions80C[name]}
                              onChange={handle80CChange}
                              placeholder="0"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="mb-1 block text-xs font-medium text-white/90">
                            Additional contribution towards NPS u/s 80CCD(1B)
                          </label>
                          <NumberInput
                            name="employeeNps"
                            value={npsAmount.employeeNps}
                            onChange={handleNpsChange}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-white/90">
                            Employers contribution toward NPS
                          </label>
                          <NumberInput
                            name="employerNps"
                            value={npsAmount.employerNps}
                            onChange={handleNpsChange}
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl bg-blue-800/80 p-4 text-sm font-semibold text-white">
                        80C Total (capped at ₹1,50,000): ₹ {formatINR(total80C)}
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {[
                          ['mediclaim80D', 'Medi-claim premium u/s 80D'],
                          [
                            'medical80DDB',
                            'Actual payment towards medical treatment u/s 80DDB',
                          ],
                          [
                            'houseLoan80EEA',
                            'Interest payable on loan for residential house property u/s 80EEA',
                          ],
                          [
                            'evLoan80EEB',
                            'Interest payable on loan for electric vehicle u/s 80EEB',
                          ],
                          ['donation80G', 'Donations u/s 80G'],
                          [
                            'educationLoan80E',
                            'Interest on loan for higher education u/s 80E',
                          ],
                          [
                            'houseLoan80EE',
                            'Interest on loan taken for residential house u/s 80EE',
                          ],
                          ['deposit80TTB', 'Interest on deposits u/s 80TTB'],
                          ['other', 'Any other deductions'],
                        ].map(([name, label]) => (
                          <div key={name}>
                            <label className="mb-1 block text-xs font-medium text-white/90">
                              {label}
                            </label>
                            <NumberInput
                              name={name}
                              value={deductionsOther[name]}
                              onChange={handleOtherDeductionChange}
                              placeholder="0"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border border-blue-300/30 bg-blue-800/80 p-4">
                          <label className="flex items-center gap-3 text-sm font-medium text-white">
                            <input
                              type="checkbox"
                              checked={claim80DD}
                              onChange={(e) => setClaim80DD(e.target.checked)}
                              className="h-4 w-4"
                            />
                            Claim deduction u/s 80DD
                          </label>
                          <label className="mt-3 flex items-center gap-3 text-sm font-medium text-white">
                            <input
                              type="checkbox"
                              checked={severe80DD}
                              onChange={(e) => setSevere80DD(e.target.checked)}
                              className="h-4 w-4"
                              disabled={!claim80DD}
                            />
                            Severe disability under 80DD
                          </label>
                          <div className="mt-3 text-sm font-semibold text-white">
                            80DD Amount: ₹ {formatINR(amount80DD)}
                          </div>
                        </div>

                        <div className="rounded-xl border border-blue-300/30 bg-blue-800/80 p-4">
                          <label className="flex items-center gap-3 text-sm font-medium text-white">
                            <input
                              type="checkbox"
                              checked={claim80U}
                              onChange={(e) => setClaim80U(e.target.checked)}
                              className="h-4 w-4"
                            />
                            Claim deduction u/s 80U
                          </label>
                          <label className="mt-3 flex items-center gap-3 text-sm font-medium text-white">
                            <input
                              type="checkbox"
                              checked={severe80U}
                              onChange={(e) => setSevere80U(e.target.checked)}
                              className="h-4 w-4"
                              disabled={!claim80U}
                            />
                            Severe disability under 80U
                          </label>
                          <div className="mt-3 text-sm font-semibold text-white">
                            80U Amount: ₹ {formatINR(amount80U)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <FieldRow label="Taxable Income">
                    <NumberInput
                      value={previewTaxableIncome.toFixed(2)}
                      readOnly
                      className="bg-blue-50 font-semibold"
                    />
                  </FieldRow>

                  <FieldRow label="Income Liable to Tax at Normal Rate">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput
                        value={Math.max(
                          0,
                          previewTaxableIncome -
                            stcg111ATotal -
                            ltcg112ATotal -
                            ltcg20Total -
                            ltcg10Total -
                            lotteryIncome,
                        ).toFixed(2)}
                        readOnly
                      />
                      <NumberInput
                        value={(formik.values.section115BAC === 'yes'
                          ? calculateNewRegimeTaxFY2025_26(
                              Math.max(
                                0,
                                previewTaxableIncome -
                                  stcg111ATotal -
                                  ltcg112ATotal -
                                  ltcg20Total -
                                  ltcg10Total -
                                  lotteryIncome,
                              ),
                            )
                          : calculateOldRegimeTax(
                              Math.max(
                                0,
                                previewTaxableIncome -
                                  stcg111ATotal -
                                  ltcg112ATotal -
                                  ltcg20Total -
                                  ltcg10Total -
                                  lotteryIncome,
                              ),
                              formik.values.person_type,
                            )
                        ).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Short Term Capital Gains (Covered u/s 111A) 15%">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput value={stcg111ATotal.toFixed(2)} readOnly />
                      <NumberInput
                        value={(stcg111ATotal * 0.15).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Long Term Capital Gains (Covered u/s 112A) 10%">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput value={ltcg112ATotal.toFixed(2)} readOnly />
                      <NumberInput
                        value={(
                          Math.max(0, ltcg112ATotal - 125000) * 0.1
                        ).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Long Term Capital Gains (Charged to tax @ 20%) 20%">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput value={ltcg20Total.toFixed(2)} readOnly />
                      <NumberInput
                        value={(ltcg20Total * 0.2).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Long Term Capital Gains (Charged to tax @ 10%) 10%">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput value={ltcg10Total.toFixed(2)} readOnly />
                      <NumberInput
                        value={(ltcg10Total * 0.1).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Winnings from Lottery, Crossword Puzzles, etc. 30%">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <NumberInput value={lotteryIncome.toFixed(2)} readOnly />
                      <NumberInput
                        value={(lotteryIncome * 0.3).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Relief other than relief u/s 87A">
                    <NumberInput
                      name="relief_other_than_87a"
                      value={formik.values.relief_other_than_87a}
                      onChange={formik.handleChange}
                      placeholder="Enter relief amount"
                    />
                  </FieldRow>

                  <FieldRow label="TDS/TCS/MAT (AMT) Credit Utilized">
                    <NumberInput
                      name="tds_tcs_amt_credit"
                      value={formik.values.tds_tcs_amt_credit}
                      onChange={formik.handleChange}
                      placeholder="Enter tax credit utilized"
                    />
                  </FieldRow>

                  <FieldRow label="Assessed Tax">
                    <NumberInput
                      value={
                        advanceTaxCalculated
                          ? advanceTaxCalculated.assessedTax.toFixed(2)
                          : ''
                      }
                      readOnly
                    />
                  </FieldRow>

                  <FieldRow label="Income Tax after relief u/s 87A">
                    <NumberInput
                      value={
                        advanceTaxCalculated
                          ? advanceTaxCalculated.incomeTaxAfterRelief.toFixed(2)
                          : ''
                      }
                      readOnly
                      className="bg-blue-50 font-semibold"
                    />
                  </FieldRow>

                  <FieldRow label="Surcharge">
                    <NumberInput
                      value={
                        advanceTaxCalculated
                          ? advanceTaxCalculated.surcharge.toFixed(2)
                          : ''
                      }
                      readOnly
                      className="bg-blue-50 font-semibold"
                    />
                  </FieldRow>

                  <FieldRow label="Health and Education Cess">
                    <NumberInput
                      value={
                        advanceTaxCalculated
                          ? advanceTaxCalculated.cess.toFixed(2)
                          : ''
                      }
                      readOnly
                      className="bg-blue-50 font-semibold"
                    />
                  </FieldRow>

                  <FieldRow label="Total Tax Liability">
                    <NumberInput
                      value={
                        advanceTaxCalculated
                          ? advanceTaxCalculated.totalTaxLiability.toFixed(2)
                          : ''
                      }
                      readOnly
                      className="bg-blue-50 font-semibold"
                    />
                  </FieldRow>
                </div>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleFullReset}
                    className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-lg bg-red-600 px-6 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-lg bg-blue-500 px-6 text-sm font-bold text-white transition hover:bg-blue-600"
                  >
                    Calculate
                  </button>
                </div>
              </>
            )}

            {selectedCategory === 'HUF(Hindu undivided family)' && (
              <HUF_HinduUndividedFamily
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'AOP/BOI' && (
              <AOP_BOI
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'Domestic Company' && (
              <DomesticCompany
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'Foreign Company' && (
              <ForeignCompany
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'Firms' && (
              <Firms
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'LLP' && (
              <LLP
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
            {selectedCategory === 'Co-operative Society' && (
              <Co_OperativeSociety
                handleGetLiability_And_Installments={setAdvanceTaxCalculated}
              />
            )}
          </form>
        </div>

        {advanceTaxCalculated && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-white p-5 text-gray-900 shadow-lg">
                <h3 className="text-lg font-bold text-blue-900">
                  Calculation Summary
                </h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span>Gross Total Income</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.grossTotalIncome)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Total Deductions</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.totalDeductions)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Taxable Income</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.taxableIncome)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Income Tax after Relief</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.incomeTaxAfterRelief)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Total Tax Liability</span>
                    <span className="font-semibold text-blue-900">
                      ₹ {formatINR(advanceTaxCalculated.totalTaxLiability)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5 text-gray-900 shadow-lg">
                <h3 className="text-lg font-bold text-blue-900">
                  Income Breakup
                </h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span>Salary Income</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.salaryIncome)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>House Property</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.housePropertyIncome)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Capital Gains</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.totalCapitalGains)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Other Sources</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.totalOtherSources)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Business Income</span>
                    <span className="font-semibold">
                      ₹ {formatINR(advanceTaxCalculated.businessIncome)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <TableCard
              title="Advance Tax Liability"
              rows={advanceTaxCalculated.liabilityRows}
              onExportExcel={() =>
                exportRowsToExcel(
                  'Advance-Tax-Liability',
                  advanceTaxCalculated.liabilityRows,
                )
              }
            />

            <TableCard
              title="Advance Tax Installments"
              rows={advanceTaxCalculated.installmentRows}
              onExportExcel={() =>
                exportRowsToExcel(
                  'Advance-Tax-Installments',
                  advanceTaxCalculated.installmentRows,
                )
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
