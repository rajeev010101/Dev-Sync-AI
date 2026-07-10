import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

export function NotFoundRoute() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-center text-foreground">
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <Link className="mt-6 inline-flex text-sm font-medium text-primary hover:underline" to={ROUTES.dashboard}>
          Go to dashboard
        </Link>
      </motion.section>
    </main>
  )
}
