import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { LoginForm } from '@/components/forms/LoginForm'
import { login } from '@/features/auth/authThunks'
import { selectAuthError, selectAuthStatus } from '@/features/auth/authSelectors'
import { ROUTES } from '@/constants/routes'

export function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const submit = async (values) => {
    await dispatch(login(values)).unwrap()
    navigate(location.state?.from?.pathname ?? ROUTES.dashboard, { replace: true })
  }
  return <AuthCard title="Welcome back" description="Sign in to continue to DevSync AI"><LoginForm error={error} isSubmitting={status === 'loading'} onSubmit={submit} /><p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300"><Link className="text-primary hover:underline" to={ROUTES.forgotPassword}>Forgot password?</Link> · New here? <Link className="text-primary hover:underline" to={ROUTES.register}>Create an account</Link></p></AuthCard>
}

export function AuthCard({ title, description, children }) {
  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-xl shadow-slate-950/5 sm:p-8"><p className="text-sm font-semibold text-primary">DevSync AI</p><h1 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p><div className="mt-7">{children}</div></motion.section>
}
