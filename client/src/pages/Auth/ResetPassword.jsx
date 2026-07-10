import { useMutation } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'

import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm'
import { authAPI } from '@/features/auth/authAPI'
import { ROUTES } from '@/constants/routes'
import { AuthCard } from '@/pages/Auth/Login'

export function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const mutation = useMutation({ mutationFn: authAPI.resetPassword })
  const submit = (values) => mutation.mutate({ ...values, token })
  return <AuthCard title="Choose a new password" description="Use a strong password you have not used elsewhere."><ResetPasswordForm error={token ? mutation.error?.response?.data?.message ?? mutation.error?.message : 'The reset token is missing or invalid.'} isSubmitting={mutation.isPending} onSubmit={submit} success={mutation.isSuccess} /><p className="mt-6 text-center text-sm"><Link className="text-primary hover:underline" to={ROUTES.login}>Back to sign in</Link></p></AuthCard>
}
