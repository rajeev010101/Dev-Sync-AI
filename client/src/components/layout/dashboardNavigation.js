import { Bot, LayoutDashboard, ShieldCheck } from 'lucide-react'

import { ROUTES } from '@/constants/routes'

export const dashboardNavigation = [
  { label: 'Overview', to: ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'AI Workspace', to: ROUTES.aiWorkspace, icon: Bot },
  { label: 'Administration', to: `${ROUTES.dashboard}/admin`, icon: ShieldCheck, roles: ['admin', 'super_admin'] },
]
