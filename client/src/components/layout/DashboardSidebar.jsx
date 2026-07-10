import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { dashboardNavigation } from '@/components/layout/dashboardNavigation'
import { cn } from '@/utils/cn'

const visibleItems = (role) => dashboardNavigation.filter((item) => !item.roles || item.roles.includes(role))

function SidebarContent({ collapsed, onClose, role }) {
  return (
    <>
      <div className="flex h-16 items-center justify-between border-b px-4">
        <span className={cn('font-semibold tracking-tight text-primary', collapsed && 'sr-only')}>DevSync AI</span>
        <button className="rounded-md p-2 hover:bg-muted md:hidden" type="button" aria-label="Close navigation" onClick={onClose}><X className="size-5" /></button>
      </div>
      <nav className="space-y-1 p-3" aria-label="Primary navigation">
        {visibleItems(role).map(({ icon: Icon, label, to }) => (
          <NavLink key={to} to={to} end={to === '/dashboard'} onClick={onClose} className={({ isActive }) => cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-muted hover:text-foreground dark:text-slate-300', isActive && 'bg-primary text-white hover:bg-primary hover:text-white', collapsed && 'justify-center px-2')}>
            <Icon className="size-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export function DashboardSidebar({ collapsed, onCollapsedChange, mobileOpen, onMobileOpenChange, role }) {
  return (
    <>
      <aside className={cn('hidden shrink-0 border-r bg-background transition-[width] duration-200 md:block', collapsed ? 'w-18' : 'w-64')}>
        <SidebarContent collapsed={collapsed} role={role} onClose={() => undefined} />
        <button className="absolute bottom-5 rounded-r-lg border border-l-0 bg-background p-2 hover:bg-muted" type="button" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => onCollapsedChange(!collapsed)}><ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} /></button>
      </aside>
      <AnimatePresence>
        {mobileOpen && <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="absolute inset-0 bg-slate-950/40" type="button" aria-label="Close navigation" onClick={() => onMobileOpenChange(false)} />
          <motion.aside className="relative h-full w-72 bg-background shadow-2xl" initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }} transition={{ type: 'tween', duration: 0.2 }}><SidebarContent role={role} onClose={() => onMobileOpenChange(false)} /></motion.aside>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}

export function MobileNavigationButton({ onClick }) {
  return <button className="rounded-md p-2 hover:bg-muted md:hidden" type="button" aria-label="Open navigation" onClick={onClick}><Menu className="size-5" /></button>
}
