export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-px w-16 bg-border" />
      <span className="mx-4 text-xl text-accent/60 select-none">{"\u2764\uFE0F"}</span>
      <div className="h-px w-16 bg-border" />
    </div>
  )
}
