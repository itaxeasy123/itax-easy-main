'use client';
import CalculatorShell from '../components/CalculatorShell';

const PersonalLoanCalculator = () => (
  <CalculatorShell
    title="Personal Loan Calculator"
    subtitle="Calculate your personal loan EMI and repayment summary."
    icon="ph:bank"
    fields={[
      { name: 'loanAmount', label: 'Loan Amount', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'interestRate', label: 'Annual Interest Rate', type: 'number', suffix: '%', placeholder: '0' },
      { name: 'loanTenure', label: 'Loan Tenure', type: 'number', suffix: 'years', placeholder: '0' },
    ]}
    compute={(v) => {
      const P = parseFloat(v.loanAmount) || 0;
      const annualRate = parseFloat(v.interestRate) || 0;
      const years = parseFloat(v.loanTenure) || 0;
      let emi = 0;
      let totalAmount = 0;
      let totalInterest = 0;
      if (P > 0 && annualRate > 0 && years > 0) {
        const r = annualRate / 100 / 12;
        const n = years * 12;
        emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        totalAmount = emi * n;
        totalInterest = totalAmount - P;
      }
      return {
        highlight: { label: 'Monthly EMI', value: emi, format: 'currency' },
        rows: [
          { label: 'Loan Amount', value: P, format: 'currency' },
          { label: 'Interest Rate', value: annualRate, format: 'percent' },
          { label: 'Loan Tenure', value: `${years} years` },
          { label: 'Total Interest', value: totalInterest, format: 'currency' },
          { label: 'Total Amount', value: totalAmount, format: 'currency', strong: true },
        ],
      };
    }}
  />
);

export default PersonalLoanCalculator;
