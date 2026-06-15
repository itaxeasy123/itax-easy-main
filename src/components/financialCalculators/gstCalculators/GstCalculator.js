'use client';
import CalculatorShell from '../components/CalculatorShell';

const GstCalculator = () => (
  <CalculatorShell
    title="GST Calculator"
    subtitle="Add GST to an amount or extract GST from a GST-inclusive amount."
    icon="ph:percent"
    fields={[
      {
        name: 'calculationType',
        label: 'Calculation Type',
        type: 'select',
        default: 'exclusive',
        options: [
          { label: 'Add GST to amount (Exclusive)', value: 'exclusive' },
          { label: 'Extract GST from amount (Inclusive)', value: 'inclusive' },
        ],
      },
      { name: 'amount', label: 'Amount', type: 'number', prefix: '₹', placeholder: '0.00' },
      { name: 'gstRate', label: 'GST Rate', type: 'number', suffix: '%', placeholder: '0' },
    ]}
    compute={(v) => {
      const baseAmount = parseFloat(v.amount) || 0;
      const rate = (parseFloat(v.gstRate) || 0) / 100;
      let gstAmount = 0;
      let totalAmount = 0;
      let netAmount = 0;
      if (v.calculationType === 'exclusive') {
        netAmount = baseAmount;
        gstAmount = baseAmount * rate;
        totalAmount = baseAmount + gstAmount;
      } else {
        totalAmount = baseAmount;
        netAmount = baseAmount / (1 + rate);
        gstAmount = baseAmount - netAmount;
      }
      return {
        highlight: { label: 'GST Amount', value: gstAmount, format: 'currency2' },
        rows: [
          { label: 'Net Amount (excl. GST)', value: netAmount, format: 'currency2' },
          { label: 'GST Amount', value: gstAmount, format: 'currency2' },
          { label: 'Total Amount (incl. GST)', value: totalAmount, format: 'currency2', strong: true },
        ],
      };
    }}
  />
);

export default GstCalculator;
