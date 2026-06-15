"use client"
import CalculatorShell from "../components/CalculatorShell"

const retirementAge = 60

const NpsCalculator = () => (
  <CalculatorShell
    title="NPS Calculator"
    subtitle="Calculate your National Pension Scheme (NPS) maturity amount."
    icon="ph:umbrella"
    fields={[
      { name: "monthlyInvestment", label: "Monthly Investment", type: "number", prefix: "₹", placeholder: "0" },
      { name: "interestRate", label: "Expected Return (P.A.)", type: "number", suffix: "%", placeholder: "0" },
      { name: "currentAge", label: "Current Age", type: "number", suffix: "years", placeholder: "0" },
    ]}
    compute={(v) => {
      const P = parseFloat(v.monthlyInvestment) || 0
      const annualRate = parseFloat(v.interestRate) || 0
      const age = parseFloat(v.currentAge) || 0

      let totalInvested = 0
      let totalInterest = 0
      let maturityAmount = 0

      if (P > 0 && annualRate > 0 && age >= 18 && age < retirementAge) {
        const r = annualRate / 100 / 12
        const months = (retirementAge - age) * 12
        const futureValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
        totalInvested = P * months
        totalInterest = futureValue - totalInvested
        maturityAmount = futureValue
      }

      return {
        highlight: { label: "Maturity Amount", value: maturityAmount, format: "currency" },
        rows: [
          { label: "Monthly Investment", value: P, format: "currency" },
          { label: "Interest Rate", value: annualRate, format: "percent" },
          { label: "Current Age", value: `${age} years` },
          { label: "Total Invested", value: totalInvested, format: "currency" },
          { label: "Total Interest", value: totalInterest, format: "currency" },
          { label: "Maturity Amount", value: maturityAmount, format: "currency", strong: true },
        ],
      }
    }}
  />
)

export default NpsCalculator
