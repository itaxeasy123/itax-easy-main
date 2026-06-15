"use client";
import CalculatorShell from "../components/CalculatorShell";

const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const assetRates = {
  computer: 14,
  vehicle: 30,
  motorcar: 15,
  furniture: 10,
};

export default function DepreciationCalculator() {
  return (
    <CalculatorShell
      title="Depreciation Calculator"
      subtitle="Calculate year-wise asset depreciation by WDV or Straight Line method."
      icon="ph:trend-down"
      fields={[
        { name: "purchasePrice", label: "Purchase Price", type: "number", prefix: "₹", placeholder: "0" },
        { name: "scrapValue", label: "Scrap Value", type: "number", prefix: "₹", placeholder: "0" },
        { name: "life", label: "Estimated Useful Life (Years)", type: "number", placeholder: "0" },
        {
          name: "assetType",
          label: "Asset Type",
          type: "select",
          default: "computer",
          options: [
            { label: "Computer (14%)", value: "computer" },
            { label: "Commercial Vehicle (30%)", value: "vehicle" },
            { label: "Personal / Motor Car (15%)", value: "motorcar" },
            { label: "Furniture & Fixtures (10%)", value: "furniture" },
            { label: "Other Rate", value: "other" },
          ],
        },
        {
          name: "customRate",
          label: "Custom Depreciation Rate (%)",
          type: "number",
          suffix: "%",
          placeholder: "0",
          show: (v) => v.assetType === "other",
        },
        {
          name: "method",
          label: "Depreciation Method",
          type: "select",
          default: "wdv",
          options: [
            { label: "Written Down Value (WDV)", value: "wdv" },
            { label: "Straight Line Method (SLM)", value: "straight" },
          ],
        },
      ]}
      compute={(v) => {
        const p = toNumber(v.purchasePrice);
        const s = toNumber(v.scrapValue);
        const t = toNumber(v.life);
        const method = v.method;
        const rate =
          v.assetType === "other" ? toNumber(v.customRate) : assetRates[v.assetType] || 0;

        const schedule = [];
        if (p > 0 && t > 0 && rate > 0) {
          const safeYears = Math.min(t, 50);
          let opening = p;
          for (let year = 1; year <= safeYears; year++) {
            const dep =
              method === "wdv"
                ? opening * (rate / 100)
                : Math.max(0, (p - s) * (rate / 100));
            const closing = Math.max(0, opening - dep);
            schedule.push({ year, opening, dep, closing });
            opening = closing;
            if (opening <= 0) break;
          }
        }

        const cost = p > 0 ? Math.max(0, p - s) : 0;

        return {
          highlight: { label: "Cost Of Asset (Net)", value: cost, format: "currency" },
          rows: [
            { label: "Cost Of Asset (Net)", value: cost, format: "currency" },
            { label: "Applied Depreciation Rate", value: rate, format: "percent" },
          ],
          table:
            schedule.length > 0
              ? {
                  columns: ["Year", "Opening Value", "Depreciation", "Closing Value"],
                  rows: schedule.map((row) => [
                    row.year,
                    formatINR(row.opening),
                    formatINR(row.dep),
                    formatINR(row.closing),
                  ]),
                }
              : undefined,
          note:
            toNumber(v.life) > 50
              ? "* Schedule calculations are restricted to a maximum of 50 years."
              : undefined,
        };
      }}
    />
  );
}
