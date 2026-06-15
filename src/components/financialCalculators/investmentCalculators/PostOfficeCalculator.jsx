'use client';
import CalculatorShell from '../components/CalculatorShell';

const PostOfficeMonthlyIncomeSchemeCal = () => (
  <CalculatorShell
    title="Post Office Monthly Income Scheme Calculator"
    subtitle="Calculate your monthly and annual income from Post Office Monthly Income Scheme."
    icon="ph:piggy-bank"
    fields={[
      { name: 'investmentAmount', label: 'Investment Amount', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'interestRate', label: 'Interest Rate', type: 'number', suffix: '%', placeholder: '0' },
    ]}
    compute={(v) => {
      const investment = parseFloat(v.investmentAmount) || 0;
      const rate = parseFloat(v.interestRate) || 0;
      const monthlyIncome = investment * (rate / 1200);
      const annualIncome = monthlyIncome * 12;
      return {
        highlight: { label: 'Monthly Income', value: monthlyIncome, format: 'currency2' },
        rows: [
          { label: 'Investment Amount', value: investment, format: 'currency2' },
          { label: 'Interest Rate', value: rate, format: 'percent' },
          { label: 'Annual Income', value: annualIncome, format: 'currency2', strong: true },
        ],
      };
    }}
  />
);

export default PostOfficeMonthlyIncomeSchemeCal;
