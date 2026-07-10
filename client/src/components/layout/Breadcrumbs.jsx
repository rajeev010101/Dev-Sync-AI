import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const labels = { dashboard: 'Overview', admin: 'Administration' }

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  return <nav className="hidden items-center gap-1 text-sm text-slate-500 sm:flex" aria-label="Breadcrumb">{segments.map((segment, index) => { const isLast = index === segments.length - 1; const to = `/${segments.slice(0, index + 1).join('/')}`; return <span className="flex items-center gap-1" key={segment}>{index > 0 && <ChevronRight className="size-4" aria-hidden="true" />}{isLast ? <span className="font-medium text-foreground">{labels[segment] ?? segment}</span> : <Link className="hover:text-foreground" to={to}>{labels[segment] ?? segment}</Link>}</span> })}</nav>
}
