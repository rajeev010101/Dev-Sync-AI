import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RegisterForm } from '@/components/forms/RegisterForm'
import { register as registerAccount } from '@/features/auth/authThunks'
import { selectAuthError, selectAuthStatus } from '@/features/auth/authSelectors'
import { ROUTES } from '@/constants/routes'
import { AuthCard } from '@/pages/Auth/Login'

export function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const submit = async (values) => { await dispatch(registerAccount(values)).unwrap(); navigate(ROUTES.dashboard, { replace: true }) }
  return <AuthCard title="Create your workspace" description="Start collaborating with DevSync AI."><RegisterForm error={error} isSubmitting={status === 'loading'} onSubmit={submit} /><p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">Already have an account? <Link className="text-primary hover:underline" to={ROUTES.login}>Sign in</Link></p></AuthCard>
}
