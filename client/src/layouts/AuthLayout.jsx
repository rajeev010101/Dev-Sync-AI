import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 p-6">
      <Outlet />
    </main>
  )
}
