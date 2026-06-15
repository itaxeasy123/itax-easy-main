'use client';
import CalculatorShell from '../components/CalculatorShell';

export default function CompoundInterestCalculator() {
  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      subtitle="Calculate the maturity value of an investment with compound interest."
      icon="ph:percent"
      fields={[
        { name: 'principal', label: 'Principal Amount', type: 'number', prefix: '₹', placeholder: 'Enter value' },
        { name: 'rate', label: 'Interest Rate (P.A.)', type: 'number', suffix: '%', step: '0.01', placeholder: 'Enter value' },
        { name: 'years', label: 'Time Period', type: 'number', suffix: 'years', placeholder: 'Enter value' },
        { name: 'frequency', label: 'Compounding Frequency', type: 'number', suffix: '/ year', placeholder: 'Enter value' },
      ]}
      compute={(v) => {
        const P = Number(v.principal) || 0;
        const rPercent = Number(v.rate) || 0;
        const t = Number(v.years) || 0;
        const n = Number(v.frequency) || 0;

        let amount = 0;
        let interest = 0;
        if (P > 0 && rPercent > 0 && t > 0 && n > 0) {
          const r = rPercent / 100;
          amount = P * Math.pow(1 + r / n, n * t);
          interest = amount - P;
        }

        return {
          highlight: { label: 'Final Amount', value: amount, format: 'currency' },
          rows: [
            { label: 'Principal', value: P, format: 'currency' },
            { label: 'Interest', value: interest, format: 'currency' },
            { label: 'Rate', value: rPercent, format: 'percent' },
            { label: 'Tenure', value: `${t || 0} Years` },
            { label: 'Compounding', value: `${n || 0} / year` },
            { label: 'Final Amount', value: amount, format: 'currency', strong: true },
          ],
        };
      }}
    />
  );
}
