import { Bell, ChevronDown, LogOut, Moon, Search, Sun } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileNavigationButton } from '@/components/layout/DashboardSidebar'
import { logout } from '@/features/auth/authThunks'
import { selectCurrentUser } from '@/features/auth/authSelectors'
import { useTheme } from '@/hooks/useTheme'

export function DashboardNavbar({ onOpenNavigation }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { theme, toggleTheme } = useTheme()
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'Account'
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6">
    <MobileNavigationButton onClick={onOpenNavigation} />
    <Breadcrumbs />
    <div className="relative ml-auto hidden max-w-sm flex-1 md:block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" /><input className="w-full rounded-lg border bg-muted/30 py-2 pl-9 pr-3 text-sm outline-none ring-primary focus:ring-2" type="search" placeholder="Search workspace" aria-label="Search workspace" /></div>
    <button className="rounded-lg p-2 hover:bg-muted" type="button" aria-label="Notifications"><Bell className="size-5" /></button>
    <button className="rounded-lg p-2 hover:bg-muted" type="button" aria-label="Toggle color theme" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}</button>
    <div className="relative"><button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted" type="button" aria-expanded={menuOpen} aria-haspopup="menu" onClick={() => setMenuOpen((open) => !open)}><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-white">{initials}</span><span className="hidden max-w-32 truncate text-sm font-medium lg:block">{name}</span><ChevronDown className="hidden size-4 lg:block" /></button>{menuOpen && <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background p-1 shadow-lg" role="menu"><button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted" type="button" role="menuitem" onClick={() => dispatch(logout())}><LogOut className="size-4" />Sign out</button></div>}</div>
  </header>
}
