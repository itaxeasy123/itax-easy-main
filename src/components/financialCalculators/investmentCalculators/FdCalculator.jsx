'use client';
import CalculatorShell from '../components/CalculatorShell';

const FixedDepositCalculator = () => (
  <CalculatorShell
    title="Fixed Deposit Calculator"
    subtitle="Calculate your fixed deposit maturity value and interest earnings."
    icon="ph:piggy-bank"
    fields={[
      { name: 'principal', label: 'Principal Amount', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'interestRate', label: 'Interest Rate (P.A.)', type: 'number', suffix: '%', placeholder: '0' },
      { name: 'timePeriod', label: 'Time Period', type: 'number', suffix: 'years', placeholder: '0' },
    ]}
    compute={(v) => {
      const P = parseFloat(v.principal) || 0;
      const R = parseFloat(v.interestRate) || 0;
      const T = parseFloat(v.timePeriod) || 0;
      let interest = 0;
      let maturity = 0;
      if (P > 0 && R > 0 && T > 0) {
        // Indian bank FDs compound quarterly: A = P (1 + r/4)^(4t).
        maturity = P * Math.pow(1 + R / 100 / 4, 4 * T);
        interest = maturity - P;
      }
      return {
        highlight: { label: 'Maturity Amount', value: maturity, format: 'currency2' },
        rows: [
          { label: 'Principal Amount', value: P, format: 'currency2' },
          { label: 'Interest Rate', value: R, format: 'percent' },
          { label: 'Time Period', value: `${T} years` },
          { label: 'Interest Earned', value: interest, format: 'currency2', strong: true },
        ],
        note: 'Interest is compounded quarterly, as is standard for bank fixed deposits.',
      };
    }}
  />
);

export default FixedDepositCalculator;
