'use client';
import CalculatorShell from '../components/CalculatorShell';

const LumpSumCalculator = () => (
  <CalculatorShell
    title="Lump Sum Investment Calculator"
    subtitle="Calculate the future value of a one-time investment."
    icon="ph:chart-line-up"
    fields={[
      { name: 'principal', label: 'Initial Investment', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'rate', label: 'Annual Interest Rate', type: 'number', suffix: '%', placeholder: '0' },
      { name: 'time', label: 'Investment Period', type: 'number', suffix: 'years', placeholder: '0' },
    ]}
    compute={(v) => {
      const P = parseFloat(v.principal) || 0;
      const R = parseFloat(v.rate) || 0;
      const T = parseFloat(v.time) || 0;
      let total = 0;
      let gain = 0;
      if (P > 0 && R > 0 && T > 0) {
        const r = R / 100;
        total = P * Math.pow(1 + r, T);
        gain = total - P;
      }
      return {
        highlight: { label: 'Final Value', value: total, format: 'currency2' },
        rows: [
          { label: 'Initial Investment', value: P, format: 'currency2' },
          { label: 'Interest Rate', value: R, format: 'percent' },
          { label: 'Investment Period', value: `${T} years` },
          { label: 'Total Gain', value: gain, format: 'currency2', strong: true },
        ],
      };
    }}
  />
);

export default LumpSumCalculator;
