"use client";
import CalculatorShell from "../components/CalculatorShell";

export default function HRACalculator() {
  return (
    <CalculatorShell
      title="HRA Calculator"
      subtitle="Calculate your House Rent Allowance exemption instantly."
      icon="ph:house"
      fields={[
        { name: "basic", label: "Basic Salary", type: "number", prefix: "₹", placeholder: "Enter amount" },
        { name: "hra", label: "HRA Received", type: "number", prefix: "₹", placeholder: "Enter amount" },
        { name: "rent", label: "Rent Paid", type: "number", prefix: "₹", placeholder: "Enter amount" },
        { name: "da", label: "Dearness Allowance", type: "number", prefix: "₹", placeholder: "Enter amount" },
        { name: "metro", label: "Living in Metro City", type: "checkbox", default: false },
      ]}
      compute={(v) => {
        const basicSalary = Number(v.basic) || 0;
        const hraReceived = Number(v.hra) || 0;
        const rentPaid = Number(v.rent) || 0;
        const daAmount = Number(v.da) || 0;
        const metro = !!v.metro;

        const salary = basicSalary + daAmount;
        const metroLimit = metro ? salary * 0.5 : salary * 0.4;
        const rentMinusTenPercent = rentPaid - salary * 0.1;

        const hraExempt = Math.max(
          0,
          Math.min(hraReceived, metroLimit, rentMinusTenPercent)
        );
        const taxableHra = Math.max(0, hraReceived - hraExempt);

        return {
          highlight: { label: "HRA Exemption", value: hraExempt, format: "currency" },
          rows: [
            { label: "Basic Salary", value: basicSalary, format: "currency" },
            { label: "HRA Received", value: hraReceived, format: "currency" },
            { label: "Rent Paid", value: rentPaid, format: "currency" },
            { label: "Dearness Allowance", value: daAmount, format: "currency" },
            { label: "Metro City", value: metro ? "Yes" : "No" },
            { label: "Salary for HRA", value: salary, format: "currency" },
            { label: metro ? "50% Salary Limit" : "40% Salary Limit", value: metroLimit, format: "currency" },
            { label: "Rent - 10% Salary", value: rentMinusTenPercent, format: "currency" },
            { label: "HRA Exemption", value: hraExempt, format: "currency", strong: true },
            { label: "Taxable HRA", value: taxableHra, format: "currency" },
          ],
        };
      }}
    />
  );
}
