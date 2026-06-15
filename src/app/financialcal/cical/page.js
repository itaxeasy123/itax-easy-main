import CompoundInterestCalculator from '@/components/financialCalculators/bankCalculators/CompoundInterestCalculator';

export const metadata = {
  title: 'Compound Interest Calculator',
  description:
    "Unlock the potential of compound interest with Itax Easy's calculator. Predict future savings, investment growth, and loan progress with precision.",
};

export default function Page() {
  return <CompoundInterestCalculator />;
}
