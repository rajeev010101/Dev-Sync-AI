export function UsageSummary({ usage }) {
  if (!usage) return null
  return <p className="text-xs text-slate-500">{usage.totalTokens.toLocaleString()} tokens · ${usage.cost.toFixed(4)} estimated cost</p>
}
