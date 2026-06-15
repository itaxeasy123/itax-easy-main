'use client';
import CalculatorShell from '../components/CalculatorShell';

const SipCalculator = () => (
  <CalculatorShell
    title="SIP Calculator"
    subtitle="Calculate the future value of your Systematic Investment Plan."
    icon="ph:chart-line-up"
    fields={[
      { name: 'monthlyInvestment', label: 'Monthly Investment', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'expectedReturn', label: 'Expected Annual Return', type: 'number', suffix: '%', placeholder: '0' },
      { name: 'timePeriod', label: 'Investment Time Period', type: 'number', suffix: 'years', placeholder: '0' },
    ]}
    compute={(v) => {
      const P = parseFloat(v.monthlyInvestment) || 0;
      const annualRate = parseFloat(v.expectedReturn) || 0;
      const years = parseFloat(v.timePeriod) || 0;
      let futureValue = 0;
      let totalInvestment = 0;
      let estimatedReturns = 0;
      if (P > 0 && annualRate > 0 && years > 0) {
        const r = annualRate / 100 / 12;
        const n = years * 12;
        futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        totalInvestment = P * n;
        estimatedReturns = futureValue - totalInvestment;
      }
      return {
        highlight: { label: 'Future Value', value: futureValue, format: 'currency' },
        rows: [
          { label: 'Monthly Investment', value: P, format: 'currency' },
          { label: 'Expected Return', value: annualRate, format: 'percent' },
          { label: 'Time Period', value: `${years} years` },
          { label: 'Total Investment', value: totalInvestment, format: 'currency' },
          { label: 'Estimated Returns', value: estimatedReturns, format: 'currency', strong: true },
        ],
      };
    }}
  />
);

export default SipCalculator;
