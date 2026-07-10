import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUserRole, selectIsAuthenticated } from '@/features/auth/authSelectors'
import { ROUTES } from '@/constants/routes'

export function AdminRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectCurrentUserRole)

  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />
  return role === 'admin' ? <Outlet /> : <Navigate to={ROUTES.dashboard} replace />
}
