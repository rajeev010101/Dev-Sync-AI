import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectIsAuthenticated } from '@/features/auth/authSelectors'
import { ROUTES } from '@/constants/routes'

export function PublicRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()
  return isAuthenticated ? <Navigate to={location.state?.from?.pathname ?? ROUTES.dashboard} replace /> : <Outlet />
}
