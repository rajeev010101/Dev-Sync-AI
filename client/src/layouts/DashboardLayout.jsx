import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { AppShell } from '@/components/layout/AppShell'
import { DashboardNavbar } from '@/components/layout/DashboardNavbar'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { selectCurrentUserRole } from '@/features/auth/authSelectors'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const role = useSelector(selectCurrentUserRole)

  return (
    <AppShell>
      <div className="flex min-h-screen">
        <DashboardSidebar collapsed={collapsed} mobileOpen={mobileOpen} role={role} onCollapsedChange={setCollapsed} onMobileOpenChange={setMobileOpen} />
        <div className="min-w-0 flex-1">
          <DashboardNavbar onOpenNavigation={() => setMobileOpen(true)} />
          <main className="p-4 sm:p-6"><Outlet /></main>
        </div>
      </div>
    </AppShell>
  )
}
