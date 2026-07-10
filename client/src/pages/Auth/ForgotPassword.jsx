import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'
import { authAPI } from '@/features/auth/authAPI'
import { ROUTES } from '@/constants/routes'
import { AuthCard } from '@/pages/Auth/Login'

export function ForgotPassword() {
  const mutation = useMutation({ mutationFn: authAPI.forgotPassword })
  return <AuthCard title="Reset your password" description="Enter your email and we’ll send reset instructions."><ForgotPasswordForm error={mutation.error?.response?.data?.message ?? mutation.error?.message} isSubmitting={mutation.isPending} onSubmit={mutation.mutate} success={mutation.isSuccess} /><p className="mt-6 text-center text-sm"><Link className="text-primary hover:underline" to={ROUTES.login}>Back to sign in</Link></p></AuthCard>
}
