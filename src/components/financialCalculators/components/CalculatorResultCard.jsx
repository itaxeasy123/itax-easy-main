export const ResultItem = ({ label, value, isHighlighted, className }) => {
  return (
    <div className={`flex justify-between py-2 ${className || ""}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${isHighlighted ? "text-primary font-semibold" : ""}`}>{value}</span>
    </div>
  )
}

export const CalculatorResultCard = ({ results, className }) => {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {results.map((result, index) => (
        <ResultItem key={index} label={result.label} value={result.value} isHighlighted={result.isHighlighted} />
      ))}
    </div>
  )
}
