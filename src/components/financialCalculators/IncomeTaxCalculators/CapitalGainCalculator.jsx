"use client"
import CalculatorShell from "../components/CalculatorShell"

const CapitalGainsCalculator = () => (
  <CalculatorShell
    title="Capital Gains Calculator"
    subtitle="Calculate your capital gains and potential tax liability."
    icon="ph:chart-line-up"
    fields={[
      { name: "purchasePrice", label: "Purchase Price", type: "number", prefix: "₹", placeholder: "0" },
      { name: "salePrice", label: "Sale Price", type: "number", prefix: "₹", placeholder: "0" },
      { name: "capitalGainsTaxRate", label: "Capital Gains Tax Rate", type: "number", suffix: "%", step: 0.01, placeholder: "0" },
    ]}
    compute={(v) => {
      const purchase = parseFloat(v.purchasePrice) || 0
      const sale = parseFloat(v.salePrice) || 0
      const taxRate = parseFloat(v.capitalGainsTaxRate) || 0

      const totalCapitalGains = sale - purchase
      const taxOwed = (totalCapitalGains * taxRate) / 100

      return {
        highlight: { label: "Total Capital Gains", value: totalCapitalGains, format: "currency2" },
        rows: [
          { label: "Purchase Price", value: purchase, format: "currency2" },
          { label: "Sale Price", value: sale, format: "currency2" },
          { label: "Capital Gains Tax Rate", value: taxRate, format: "percent" },
          { label: "Total Capital Gains", value: totalCapitalGains, format: "currency2" },
          { label: "Tax Owed", value: taxOwed, format: "currency2", strong: true },
        ],
      }
    }}
  />
)

export default CapitalGainsCalculator
