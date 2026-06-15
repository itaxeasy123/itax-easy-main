'use client';
import CalculatorShell from '../components/CalculatorShell';

const RecurringDepositCalculator = () => (
  <CalculatorShell
    title="Recurring Deposit Calculator"
    subtitle="Calculate your maturity value and interest from a recurring deposit."
    icon="ph:piggy-bank"
    fields={[
      { name: 'monthlyDeposit', label: 'Monthly Deposit', type: 'number', prefix: '₹', placeholder: '0' },
      { name: 'interestRate', label: 'Annual Interest Rate', type: 'number', suffix: '%', placeholder: '0' },
      { name: 'months', label: 'Number of Months', type: 'number', suffix: 'months', placeholder: '0' },
    ]}
    compute={(v) => {
      const P = parseFloat(v.monthlyDeposit) || 0;
      const r = parseFloat(v.interestRate) || 0;
      const n = parseFloat(v.months) || 0;
      const totalInvested = P * n;
      let interest = 0;
      let maturity = 0;
      if (P > 0 && r > 0 && n > 0) {
        // Bank RDs compound quarterly. i = quarterly rate, quarters = months / 3.
        // M = P · [(1+i)^q − 1] / [1 − (1+i)^(−1/3)]
        const i = r / 400;
        const quarters = n / 3;
        maturity =
          (P * (Math.pow(1 + i, quarters) - 1)) /
          (1 - Math.pow(1 + i, -1 / 3));
        interest = maturity - totalInvested;
      }
      return {
        highlight: { label: 'Maturity Value', value: maturity, format: 'currency2' },
        rows: [
          { label: 'Monthly Deposit', value: P, format: 'currency2' },
          { label: 'Interest Rate', value: r, format: 'percent' },
          { label: 'Total Months', value: `${n} months` },
          { label: 'Total Invested', value: totalInvested, format: 'currency2' },
          { label: 'Interest Earned', value: interest, format: 'currency2', strong: true },
        ],
        note: 'Interest is compounded quarterly, as is standard for bank recurring deposits.',
      };
    }}
  />
);

export default RecurringDepositCalculator;
