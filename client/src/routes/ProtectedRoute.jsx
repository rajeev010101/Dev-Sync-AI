import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectIsAuthenticated } from '@/features/auth/authSelectors'
import { ROUTES } from '@/constants/routes'

export function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace state={{ from: location }} />
  return <Outlet />
}
