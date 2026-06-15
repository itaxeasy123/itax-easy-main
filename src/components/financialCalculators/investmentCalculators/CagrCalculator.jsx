'use client';
import CalculatorShell from '../components/CalculatorShell';

const CAGRCalculator = () => (
  <CalculatorShell
    title="CAGR Calculator"
    subtitle="Calculate Compound Annual Growth Rate (CAGR) for your investments."
    icon="ph:trend-up"
    fields={[
      { name: 'initialInvestment', label: 'Initial Investment', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'finalInvestment', label: 'Final Investment', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'timePeriod', label: 'Investment Duration', type: 'number', suffix: 'years', placeholder: '0' },
    ]}
    compute={(v) => {
      const initial = parseFloat(v.initialInvestment) || 0;
      const final = parseFloat(v.finalInvestment) || 0;
      const years = parseFloat(v.timePeriod) || 0;
      let cagr = 0;
      let totalGrowth = 0;
      if (initial > 0 && final > 0 && years > 0) {
        cagr = ((final / initial) ** (1 / years) - 1) * 100;
        totalGrowth = (final / initial - 1) * 100;
      }
      return {
        highlight: { label: 'CAGR', value: `${cagr.toFixed(2)}%` },
        rows: [
          { label: 'Initial Investment', value: initial, format: 'currency' },
          { label: 'Final Investment', value: final, format: 'currency' },
          { label: 'Investment Duration', value: `${years} years` },
          { label: 'CAGR', value: `${cagr.toFixed(2)}%` },
          { label: 'Total Growth', value: `${totalGrowth.toFixed(2)}%`, strong: true },
        ],
      };
    }}
  />
);

export default CAGRCalculator;
