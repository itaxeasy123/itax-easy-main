'use client';
import CalculatorShell from '../components/CalculatorShell';

export default function SimpleInterestCalculator() {
  return (
    <CalculatorShell
      title="Simple Interest Calculator"
      subtitle="Calculate simple interest and the total maturity amount."
      icon="ph:percent"
      fields={[
        { name: 'principal', label: 'Principal Amount', type: 'number', prefix: '₹', placeholder: 'Enter amount' },
        { name: 'rate', label: 'Interest Rate (%)', type: 'number', suffix: '%', placeholder: 'Enter rate' },
        { name: 'time', label: 'Time Period', type: 'number', suffix: 'years', placeholder: 'Enter years' },
      ]}
      compute={(v) => {
        const P = Number(v.principal) || 0;
        const R = Number(v.rate) || 0;
        const T = Number(v.time) || 0;

        const interest = (P * R * T) / 100;
        const total = P + interest;

        return {
          highlight: { label: 'Final Amount', value: total, format: 'currency' },
          rows: [
            { label: 'Principal', value: P, format: 'currency' },
            { label: 'Interest', value: interest, format: 'currency' },
            { label: 'Tenure', value: `${T} Years` },
            { label: 'Final Amount', value: total, format: 'currency', strong: true },
          ],
        };
      }}
    />
  );
}
