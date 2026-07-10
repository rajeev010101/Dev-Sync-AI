export function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" aria-label="Loading" />
    </div>
  )
}
