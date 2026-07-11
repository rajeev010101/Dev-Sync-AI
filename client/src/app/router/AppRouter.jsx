import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { NotFoundRoute } from '@/routes/NotFoundRoute'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicRoute } from '@/routes/PublicRoute'
import { Login } from '@/pages/Auth/Login'
import { Register } from '@/pages/Auth/Register'
import { ForgotPassword } from '@/pages/Auth/ForgotPassword'
import { ResetPassword } from '@/pages/Auth/ResetPassword'
import { DashboardHome } from '@/pages/Dashboard/DashboardHome'
import { AIWorkspace } from '@/pages/AI/AIWorkspace'
import { UploadCenter } from '@/pages/Uploads/UploadCenter'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="ai" element={<AIWorkspace />} />
            <Route path="uploads" element={<UploadCenter />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
