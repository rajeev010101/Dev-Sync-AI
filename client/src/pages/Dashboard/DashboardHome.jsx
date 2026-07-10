import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '@/features/auth/authSelectors'

export function DashboardHome() {
  const user = useSelector(selectCurrentUser)
  const firstName = user?.firstName || 'there'

  return <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-7xl"><p className="text-sm font-medium text-primary">Workspace</p><h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, {firstName}</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your DevSync AI workspace is ready.</p></motion.section>
}
